// Initialize Feather Icons
feather.replace();

document.addEventListener('DOMContentLoaded', () => {
  // 1. Handling Header background on scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(5, 5, 5, 0.95)';
      navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
      navbar.style.padding = '1rem 5%';
    } else {
      navbar.style.background = 'rgba(5, 5, 5, 0.7)';
      navbar.style.boxShadow = 'none';
      navbar.style.padding = '1.5rem 5%';
    }
  });

  // 2. Shopping Cart Logic
  let cartCount = 0;
  const cartBadge = document.getElementById('cart-count');
  const addButtons = document.querySelectorAll('.add-to-cart-btn');

  addButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Impede propagação se for link card inteiro
      e.stopPropagation();

      const productName = btn.getAttribute('data-product') || 'Produto';
      
      // Update badge
      cartCount++;
      cartBadge.textContent = cartCount;

      // Animate badge
      cartBadge.style.animation = 'none';
      cartBadge.offsetHeight; /* trigger reflow */
      cartBadge.style.animation = 'pulse 1s ease-out';

      // Show toast
      showToast(`<strong>${productName}</strong> foi adicionado ao carrinho.`);
    });
  });

  // 3. Size Selector Toggle Logic
  const sizeButtons = document.querySelectorAll('.size-btn');
  sizeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Remove class do mesmo grupo
      const parent = e.target.parentElement;
      const siblings = parent.querySelectorAll('.size-btn');
      siblings.forEach(s => s.classList.remove('active'));
      
      // Add na clicada
      e.target.classList.add('active');
    });
  });

  // 4. Toast Notification Function
  function showToast(message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    toast.innerHTML = `
      <i data-feather="check-circle"></i>
      <div>${message}</div>
    `;
    
    container.appendChild(toast);
    feather.replace(); // renderiza icone SVG injetado

    // Remove toast após animação css (3s delay + 0.3s fade out)
    setTimeout(() => {
      if (toast.parentElement) {
        toast.remove();
      }
    }, 3500);
  }
  
  // 5. Initial interaction test (opcional)
  console.log("MDstore UI Interactive Loaded Successfully.");
});
