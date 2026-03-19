// Context Gap Scanner — main entry point

const PRESETS = {
  payments: `We run a payment processing platform serving 2,000+ merchants. Three core services:

1. Transaction Gateway — handles card payments, bank transfers, and digital wallets. Connects to 4 external payment providers (Stripe, Adyen, local bank APIs) via REST. Routes transactions based on merchant config, currency, and cost optimization rules.

2. Risk Engine — real-time fraud scoring using an ML model retrained weekly. Velocity checks, device fingerprinting, and rule-based overrides. The rules were written by a fraud analyst who left last year and nobody fully understands the edge cases.

3. Settlement Service — nightly batch job that reconciles transactions and generates merchant payouts. Runs on a legacy system. The batch occasionally fails silently and requires manual intervention from one specific engineer who knows the recovery procedure.

Key issues: The routing rules between gateway and providers are tribal knowledge. The risk engine rules have undocumented dependencies. Settlement recovery is a one-person skill.`,

  healthcare: `We operate a healthcare claims processing platform handling insurance claims from submission through adjudication and payment.

Core systems: Claims Gateway (receives claims from providers via EDI 837 files), Rules Engine (applies payer-specific adjudication rules — over 500 rules, many with undocumented exceptions), Member Eligibility Service (verifies coverage), Provider Network Service (checks in-network status and negotiated rates), and Payment Engine (generates ERA 835 remittance files).

Complexity: Each payer has different adjudication rules. Some rules contradict each other and resolution depends on which analyst configured them. Pre-authorization requirements vary by procedure code and payer. Appeals process involves manual review with institutional knowledge of payer-specific quirks.`,

  ecommerce: `We run a multi-channel e-commerce platform. Customers order online and in-store. Orders flow through: Order Capture (web/mobile/POS), Inventory Allocation (checks warehouse stock across 12 distribution centers), Fulfillment (picking, packing, shipping), and Delivery (last-mile via 3 carrier partners).

Key complexity: Delivery slot calculation depends on warehouse capacity templates that operations teams modify directly in production. Split orders (items from different warehouses) have special routing logic that was built during a holiday surge and never properly documented. Returns processing has 7 different paths depending on channel, item type, and return reason — most of this logic lives in one team lead's head.`
};

const MIN_CHARS = 50;

function init() {
  const textarea = document.getElementById('domain-input');
  const charCount = document.getElementById('char-count');
  const scanBtn = document.getElementById('scan-btn');
  const presetBtns = document.querySelectorAll('.preset-btn');

  // Character count and button state
  textarea.addEventListener('input', () => {
    const len = textarea.value.length;
    charCount.textContent = `${len} character${len !== 1 ? 's' : ''}`;
    scanBtn.disabled = len < MIN_CHARS;
  });

  // Preset buttons
  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const preset = btn.dataset.preset;
      if (PRESETS[preset]) {
        textarea.value = PRESETS[preset];
        textarea.dispatchEvent(new Event('input'));
        textarea.focus();
      }
    });
  });

  // Scan button
  scanBtn.addEventListener('click', () => {
    const description = textarea.value.trim();
    if (description.length < MIN_CHARS) return;
    // Integration with serverless functions handled in issue #28
    startScan(description);
  });
}

function startScan(description) {
  // Placeholder — wired up in issue #28
  const inputSection = document.getElementById('input-section');
  const processingSection = document.getElementById('processing-section');
  inputSection.classList.add('hidden');
  processingSection.classList.remove('hidden');
  processingSection.innerHTML = `<p class="text-mono">Scanning... (functions wired in issue #28)</p>`;
}

// Boot
document.addEventListener('DOMContentLoaded', init);
