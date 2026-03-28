// Readiness score dashboard module

const CATEGORY_LABELS = {
  systems: 'Systems & Services',
  processes: 'Business Processes',
  terminology: 'Domain Terminology',
  data_models: 'Data Models & Schemas',
  integrations: 'System Integrations',
  tribal_knowledge: 'Tribal Knowledge'
};

function getScoreClass(score) {
  if (score <= 30) return 'danger';
  if (score <= 60) return 'warning';
  return 'success';
}

function getInterpretationLabel(score) {
  if (score <= 20) return 'CRITICAL — Your agents are flying blind';
  if (score <= 40) return 'POOR — Major knowledge gaps will cause failures';
  if (score <= 60) return 'PARTIAL — Agents can handle basics but will miss edge cases';
  if (score <= 80) return 'GOOD — Most domain knowledge is accessible';
  return 'STRONG — Domain is well-documented for AI agents';
}

export function renderDashboard(container, analysis) {
  const { categories, overallScore, interpretation } = analysis;
  const scoreClass = getScoreClass(overallScore);

  container.innerHTML = `
    <div class="dashboard">
      <div class="dashboard__header">
        <div class="dashboard__score-block">
          <p class="text-mono text-muted" style="font-size: var(--font-size-xs); letter-spacing: 0.15em;">AI-READINESS SCORE</p>
          <div class="score score--large score--${scoreClass}">${overallScore}</div>
          <p class="text-mono" style="font-size: var(--font-size-xs);">/100</p>
        </div>
        <div class="dashboard__interpretation">
          <p class="text-mono text-${scoreClass}" style="font-size: var(--font-size-sm); font-weight: 700;">${getInterpretationLabel(overallScore)}</p>
          <p class="text-muted mt-sm">${interpretation}</p>
        </div>
      </div>

      <div class="dashboard__categories mt-xl">
        <h3 class="mb-md">Coverage by Category</h3>
        ${Object.entries(categories).map(([key, score]) => `
          <div class="category-row">
            <div class="category-row__header">
              <span class="text-mono" style="font-size: var(--font-size-sm);">${CATEGORY_LABELS[key] || key}</span>
              <span class="text-mono text-${getScoreClass(score)}" style="font-size: var(--font-size-sm); font-weight: 700;">${score}%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-bar__fill progress-bar__fill--${getScoreClass(score)}" style="width: ${score}%;"></div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
