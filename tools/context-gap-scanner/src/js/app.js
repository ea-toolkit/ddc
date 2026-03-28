// Context Gap Scanner — main entry point

import { PRESETS } from './presets.js';
import { renderProcessing, updateStep, renderProbeComplete } from './processing.js';
import { renderDashboard } from './dashboard.js';
import { renderBreakdown } from './breakdown.js';
import { renderChecklist } from './checklist.js';
import { renderVision } from './vision.js';

const MIN_CHARS = 50;
let activePreset = null;

function init() {
  setupTabs();
  setupPresets();
  setupCustomInput();
}

// --- Tab switching ---
function setupTabs() {
  const tabs = document.querySelectorAll('.input-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      document.getElementById(`tab-${tab.dataset.tab}`).classList.add('active');
    });
  });
}

// --- Preset domain packages ---
function setupPresets() {
  const cards = document.querySelectorAll('.domain-card');
  const loadedSection = document.getElementById('loaded-files');
  const loadedList = document.getElementById('loaded-files-list');
  const loadedName = document.getElementById('loaded-domain-name');
  const loadedCount = document.getElementById('loaded-file-count');
  const clearBtn = document.getElementById('clear-preset-btn');
  const scanBtn = document.getElementById('scan-preset-btn');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const key = card.dataset.preset;
      const preset = PRESETS[key];
      if (!preset) return;

      activePreset = key;

      // Highlight selected card
      cards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');

      // Show loaded files
      loadedName.textContent = preset.name.toUpperCase();
      loadedCount.textContent = `${preset.files.length} files loaded`;
      loadedList.innerHTML = preset.files.map((f, i) => `
        <div class="loaded-file" style="animation-delay: ${i * 120}ms">
          <span class="loaded-file__icon text-mono">+</span>
          <span class="loaded-file__name text-mono">${f.name}</span>
          <span class="loaded-file__size text-muted text-mono">${f.size}</span>
        </div>
      `).join('');

      loadedSection.classList.remove('hidden');
    });
  });

  clearBtn.addEventListener('click', () => {
    activePreset = null;
    cards.forEach(c => c.classList.remove('selected'));
    loadedSection.classList.add('hidden');
  });

  scanBtn.addEventListener('click', () => {
    if (!activePreset) return;
    const preset = PRESETS[activePreset];
    const combined = preset.files.map(f =>
      `=== ${f.name} ===\n${f.content}`
    ).join('\n\n');
    startScan(combined);
  });
}

// --- Custom text input ---
function setupCustomInput() {
  const textarea = document.getElementById('domain-input');
  const charCount = document.getElementById('char-count');
  const scanBtn = document.getElementById('scan-btn');

  textarea.addEventListener('input', () => {
    const len = textarea.value.length;
    charCount.textContent = `${len} character${len !== 1 ? 's' : ''}`;
    scanBtn.disabled = len < MIN_CHARS;
  });

  scanBtn.addEventListener('click', () => {
    const description = textarea.value.trim();
    if (description.length < MIN_CHARS) return;
    startScan(description);
  });
}

// --- API call with error handling ---
async function callFunction(name, body) {
  const response = await fetch(`/api/${name}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.detail || error.error || `${name} failed`);
  }

  const data = await response.json();
  return data;
}

// --- Main scan pipeline ---
async function startScan(description) {
  const inputSection = document.getElementById('input-section');
  const processingSection = document.getElementById('processing-section');
  const resultsSection = document.getElementById('results-section');

  inputSection.classList.add('hidden');
  processingSection.classList.remove('hidden');
  resultsSection.classList.add('hidden');

  renderProcessing(processingSection);

  try {
    // Step 1: Generate probes
    updateStep('generate', 'active');
    const { probes } = await callFunction('generate-probes', { description });
    updateStep('generate', 'complete', `<span class="text-mono" style="font-size: var(--font-size-xs);">${probes.length} probes generated</span>`);

    // Step 2: Execute probes
    updateStep('execute', 'active');
    const { results } = await callFunction('execute-probes', { description, probes });
    results.forEach((result, i) => {
      renderProbeComplete(i, results.length, result);
    });
    updateStep('execute', 'complete');

    // Step 3: Analyze gaps
    updateStep('analyze', 'active');
    const { analysis } = await callFunction('analyze-gaps', { results });
    updateStep('analyze', 'complete');

    // Render results
    setTimeout(() => {
      processingSection.classList.add('hidden');
      resultsSection.classList.remove('hidden');
      resultsSection.innerHTML = '';

      const dashboardContainer = document.createElement('div');
      const breakdownContainer = document.createElement('div');
      const checklistContainer = document.createElement('div');
      const visionContainer = document.createElement('div');

      resultsSection.appendChild(dashboardContainer);
      resultsSection.appendChild(breakdownContainer);
      resultsSection.appendChild(checklistContainer);
      resultsSection.appendChild(visionContainer);

      renderDashboard(dashboardContainer, analysis);
      renderBreakdown(breakdownContainer, results);
      renderChecklist(checklistContainer, analysis.topGaps);
      renderVision(visionContainer);
    }, 600);

  } catch (error) {
    const activeStep = document.querySelector('[data-status="active"]');
    if (activeStep) {
      const stepId = activeStep.id.replace('step-', '');
      updateStep(stepId, 'error', `<span class="text-danger text-mono" style="font-size: var(--font-size-xs);">${error.message}</span>`);
    }

    processingSection.innerHTML += `
      <div class="mt-lg flex gap-md">
        <button class="btn btn--secondary" onclick="window.location.reload()">Try again</button>
      </div>
    `;
  }
}

document.addEventListener('DOMContentLoaded', init);
