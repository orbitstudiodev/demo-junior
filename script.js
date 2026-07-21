document.addEventListener('DOMContentLoaded', () => {
  // ---- Lógica do Simulador ----
  const rendaSlider = document.getElementById('rendaSlider');
  const gastosSlider = document.getElementById('gastosSlider');
  const dependentes = document.getElementById('dependentes');
  const rendaValue = document.getElementById('rendaValue');
  const gastosValue = document.getElementById('gastosValue');
  const resultValue = document.getElementById('resultValue');

  function formatBRL(value) {
    return 'R$ ' + Math.round(value).toLocaleString('pt-BR');
  }

  function calcSim() {
    if (!rendaSlider || !gastosSlider || !dependentes) return;

    const renda = parseFloat(rendaSlider.value);
    const gastos = parseFloat(gastosSlider.value);
    const deps = parseInt(dependentes.value);

    rendaValue.textContent = formatBRL(renda);
    gastosValue.textContent = formatBRL(gastos);

    // Cálculo ilustrativo para engajamento do cliente
    const depDeduction = deps * 2275.08;
    const baseDeduction = 16754.34;
    const taxableBase = Math.max(renda - Math.max(gastos + depDeduction, baseDeduction), 0);
    
    let aliquota = 0;
    if (taxableBase > 55000) aliquota = 0.275;
    else if (taxableBase > 42000) aliquota = 0.225;
    else if (taxableBase > 33000) aliquota = 0.15;
    else if (taxableBase > 25000) aliquota = 0.075;

    const estimatedRefund = Math.max((gastos + depDeduction) * aliquota + 200, 150);
    resultValue.textContent = formatBRL(estimatedRefund);
  }

  [rendaSlider, gastosSlider, dependentes].forEach(el => {
    if (el) el.addEventListener('input', calcSim);
  });
  
  calcSim();

  // ---- Acordeão de FAQ ----
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const q = item.querySelector('.faq-q');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(i => i.classList.remove('open'));
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  // ---- Menu Hambúrguer (Mobile) ----
  const burgerBtn = document.getElementById('burgerBtn');
  const navLinks = document.getElementById('navLinks');

  if (burgerBtn && navLinks) {
    burgerBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
});
