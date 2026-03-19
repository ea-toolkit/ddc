// Processing state UI module

const STEPS = [
  { id: 'generate', label: 'GENERATING PROBES', description: 'Creating domain-specific test questions...' },
  { id: 'execute', label: 'RUNNING PROBES', description: 'Testing agent knowledge against your domain...' },
  { id: 'analyze', label: 'ANALYZING GAPS', description: 'Mapping knowledge gaps and scoring readiness...' }
];

export function renderProcessing(container) {
  container.innerHTML = `
    <div class="processing">
      <h2 class="processing__title">Scanning your domain</h2>
      <div class="processing__steps">
        ${STEPS.map((step, i) => `
          <div class="processing__step" id="step-${step.id}" data-status="pending">
            <div class="processing__step-header">
              <span class="processing__step-number text-mono">${String(i + 1).padStart(2, '0')}</span>
              <span class="processing__step-label text-mono">${step.label}</span>
              <span class="processing__step-status text-mono" id="status-${step.id}">WAITING</span>
            </div>
            <p class="processing__step-desc text-muted">${step.description}</p>
            <div class="processing__step-detail" id="detail-${step.id}"></div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

export function updateStep(stepId, status, detail) {
  const stepEl = document.getElementById(`step-${stepId}`);
  const statusEl = document.getElementById(`status-${stepId}`);
  const detailEl = document.getElementById(`detail-${stepId}`);

  if (!stepEl) return;

  stepEl.dataset.status = status;

  const statusMap = {
    active: 'RUNNING',
    complete: 'DONE',
    error: 'FAILED',
    pending: 'WAITING'
  };
  statusEl.textContent = statusMap[status] || status;

  if (detail) {
    detailEl.innerHTML = detail;
  }
}

export function renderProbeProgress(probeIndex, totalProbes, probe) {
  const detailEl = document.getElementById('detail-execute');
  if (!detailEl) return;

  detailEl.innerHTML = `
    <div class="probe-progress text-mono">
      <span class="text-accent">[${probeIndex + 1}/${totalProbes}]</span>
      <span>${probe.category}</span>
      <span class="text-muted">— ${probe.question.substring(0, 60)}...</span>
    </div>
  `;
}

export function renderProbeComplete(probeIndex, totalProbes, result) {
  const detailEl = document.getElementById('detail-execute');
  if (!detailEl) return;

  const confidenceClass = result.confidence <= 2 ? 'text-danger' : result.confidence <= 3 ? 'text-warning' : 'text-success';

  detailEl.innerHTML += `
    <div class="probe-result text-mono" style="font-size: var(--font-size-xs); margin-top: var(--space-xs);">
      <span class="text-muted">[${probeIndex + 1}/${totalProbes}]</span>
      <span>${result.category}</span>
      <span class="badge badge--${result.confidence <= 2 ? 'danger' : result.confidence <= 3 ? 'warning' : 'success'}">${result.confidence}/5</span>
      <span class="text-muted">${result.gaps.length} gaps found</span>
    </div>
  `;
}
