// Detailed gap breakdown module

const CATEGORY_LABELS = {
  INCIDENT: 'Incident Diagnosis',
  INTEGRATION: 'System Integration',
  DATA_FLOW: 'Data Flow',
  TERMINOLOGY: 'Domain Terminology',
  PROCESS: 'Business Process',
  ARCHITECTURE: 'Architecture'
};

function confidenceBadge(confidence) {
  const variant = confidence <= 2 ? 'danger' : confidence <= 3 ? 'warning' : 'success';
  return `<span class="badge badge--${variant}">${confidence}/5</span>`;
}

function severityBadge(severity) {
  const variant = severity === 'critical' ? 'danger' : severity === 'high' ? 'warning' : 'info';
  return `<span class="badge badge--${variant}">${severity.toUpperCase()}</span>`;
}

export function renderBreakdown(container, probeResults) {
  container.innerHTML = `
    <div class="breakdown mt-xl">
      <h3 class="mb-md">Probe Results</h3>
      ${probeResults.map((result, i) => `
        <details class="collapsible breakdown__probe">
          <summary>
            <span class="flex items-center gap-md">
              <span class="text-mono text-muted" style="font-size: var(--font-size-xs);">${String(i + 1).padStart(2, '0')}</span>
              <span>${CATEGORY_LABELS[result.category] || result.category}</span>
              ${confidenceBadge(result.confidence)}
            </span>
          </summary>
          <div class="collapsible__content breakdown__detail">
            <div class="breakdown__question">
              <p class="text-mono text-muted" style="font-size: var(--font-size-xs);">QUESTION</p>
              <p>${result.question}</p>
            </div>
            <div class="breakdown__attempt mt-md">
              <p class="text-mono text-muted" style="font-size: var(--font-size-xs);">AGENT ATTEMPT</p>
              <p class="text-muted">${result.attempt}</p>
            </div>
            <div class="breakdown__gaps mt-md">
              <p class="text-mono text-muted" style="font-size: var(--font-size-xs);">KNOWLEDGE GAPS (${result.gaps.length})</p>
              <ul class="breakdown__gap-list">
                ${result.gaps.map(gap => `<li>${gap}</li>`).join('')}
              </ul>
            </div>
          </div>
        </details>
      `).join('')}
    </div>
  `;
}
