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

  // ---- Carrossel de Serviços (Mobile) ----
  const servicesGrid = document.querySelector('.services-grid');
  const servicesDots = document.getElementById('servicesDots');

  if (servicesGrid && servicesDots) {
    const cards = servicesGrid.querySelectorAll('.service-card');

    cards.forEach((_, i) => {
      const dot = document.createElement('span');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        cards[i].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
      });
      servicesDots.appendChild(dot);
    });

    const dots = servicesDots.querySelectorAll('span');

    function updateActiveDot() {
      let closestIndex = 0;
      let closestDistance = Infinity;
      cards.forEach((card, i) => {
        const distance = Math.abs(card.getBoundingClientRect().left - servicesGrid.getBoundingClientRect().left);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      });
      dots.forEach(d => d.classList.remove('active'));
      if (dots[closestIndex]) dots[closestIndex].classList.add('active');
    }

    let scrollTimeout;
    servicesGrid.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(updateActiveDot, 100);
    });
  }

  // ---- Menu Hambúrguer (Mobile) ----
  const burgerBtn = document.getElementById('burgerBtn');
  const navLinks = document.getElementById('navLinks');

  if (burgerBtn && navLinks) {
    burgerBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
});
