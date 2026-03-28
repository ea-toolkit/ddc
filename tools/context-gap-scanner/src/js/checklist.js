// Prioritized curation checklist module

function severityIcon(severity) {
  const map = {
    critical: { class: 'danger', label: 'CRITICAL' },
    high: { class: 'warning', label: 'HIGH' },
    medium: { class: 'info', label: 'MEDIUM' }
  };
  const s = map[severity] || map.medium;
  return `<span class="badge badge--${s.class}">${s.label}</span>`;
}

const CATEGORY_LABELS = {
  systems: 'Systems',
  processes: 'Processes',
  terminology: 'Terminology',
  data_models: 'Data Models',
  integrations: 'Integrations',
  tribal_knowledge: 'Tribal Knowledge'
};

export function renderChecklist(container, topGaps) {
  container.innerHTML = `
    <div class="checklist mt-xl">
      <h3 class="mb-sm">What to curate first</h3>
      <p class="text-muted mb-lg">Prioritized by impact. This is what you'd bring back to your team.</p>

      <div class="checklist__items">
        ${topGaps.map((gap, i) => `
          <div class="checklist__item">
            <div class="checklist__item-header">
              <span class="checklist__item-number text-mono text-accent">${String(i + 1).padStart(2, '0')}</span>
              <span class="checklist__item-what">${gap.what}</span>
              ${severityIcon(gap.severity)}
            </div>
            <div class="checklist__item-meta">
              <span class="badge badge--info">${CATEGORY_LABELS[gap.category] || gap.category}</span>
              <span class="text-muted" style="font-size: var(--font-size-sm);">${gap.impact}</span>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="checklist__cta card mt-xl">
        <p class="text-mono text-strong">DDC is the methodology to systematically fill these gaps.</p>
        <p class="text-muted mt-sm">Demand-Driven Context uses agent failure as the signal for what to curate. Like TDD — but for knowledge.</p>
        <div class="flex gap-md mt-md flex-wrap">
          <a href="https://arxiv.org/abs/2603.14057" class="btn btn--primary" target="_blank" rel="noopener">Read the paper</a>
          <a href="https://github.com/ea-toolkit/ddc" class="btn btn--secondary" target="_blank" rel="noopener">View the framework</a>
        </div>
      </div>

      <button class="btn btn--secondary mt-lg" id="restart-btn" type="button">Scan another domain</button>
    </div>
  `;

  document.getElementById('restart-btn').addEventListener('click', () => {
    window.location.reload();
  });
}
