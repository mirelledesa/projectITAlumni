document.addEventListener('DOMContentLoaded', () => {

    // =========================================================
    // 1. LÓGICA DO CARROSSEL
    // =========================================================
    const track = document.querySelector('.testimonials-grid, .carousel-track');
    const carouselButtons = document.querySelectorAll('.carousel-controls .carousel-btn');
    
    const prevBtn = Array.from(carouselButtons).find(btn => 
      btn.getAttribute('aria-label') === 'Anterior' || btn.classList.contains('carousel-prev')
    );
    
    const nextBtn = Array.from(carouselButtons).find(btn => 
      btn.getAttribute('aria-label') === 'Próximo' || btn.getAttribute('aria-label') === 'Proximo' || btn.classList.contains('carousel-next')
    );
  
    if (track) {
      let currentIndex = 0;
  
      const updateCarousel = () => {
        const cards = Array.from(track.children);
        if (cards.length === 0) return;
  
        const cardWidth = cards[0].getBoundingClientRect().width;
        const gap = parseFloat(window.getComputedStyle(track).gap) || 0;
        const amountToMove = (cardWidth + gap) * currentIndex;
  
        track.style.transform = `translateX(-${amountToMove}px)`;
      };

      if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
          e.preventDefault();
          const cards = track.children;
          if (currentIndex < cards.length - 1) {
            currentIndex++;
            updateCarousel();
          }
        });
      }
  
      if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
          e.preventDefault();
          if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
          }
        });
      }
  
      window.addEventListener('resize', () => {
        updateCarousel();
      });
    }
  
    // =========================================================
    // 2. LÓGICA DE FILTROS E BUSCA
    // =========================================================
    const searchInput = document.querySelector('.search-input');
    const cardElements = document.querySelectorAll('.network-card, .feed-card');
    const filterButtons = document.querySelectorAll('.desktop-filters .filter-btn');
    const container = document.querySelector('.network-list') || document.querySelector('.feed-cards');

    if (cardElements.length > 0 || searchInput) {
      const initialActiveButton = document.querySelector('.desktop-filters .filter-btn.active');
      let activeCategory = initialActiveButton?.dataset.filter ? initialActiveButton.dataset.filter.toLowerCase() : 'all';
      let currentSearchTerm = '';

      const items = Array.from(cardElements).map((card) => ({
        element: card,
        textContext: card.innerText.toLowerCase(),
        category: (card.dataset.category || 'all').toLowerCase()
      }));

      let emptyMessageEl = document.querySelector('.empty-state-message');
      if (!emptyMessageEl && container) {
        emptyMessageEl = document.createElement('div');
        emptyMessageEl.className = 'empty-state-message';
        emptyMessageEl.style.display = 'none';
        emptyMessageEl.style.textAlign = 'center';
        emptyMessageEl.style.padding = '2rem';
        emptyMessageEl.style.width = '100%';
        emptyMessageEl.style.gridColumn = '1 / -1';
        emptyMessageEl.innerHTML = `
          <i class="fa-solid fa-magnifying-glass" style="font-size: 2rem; margin-bottom: 0.5rem; color: #888;"></i>
          <p>No s'han trobat resultats.</p>
        `;
        container.appendChild(emptyMessageEl);
      }

      const applyFilters = () => {
        let visibleCount = 0;

        items.forEach(({ element, textContext, category }) => {
          const matchesSearch = textContext.includes(currentSearchTerm);
          const matchesCategory = activeCategory === 'all' || category === activeCategory;

          if (matchesSearch && matchesCategory) {
            element.style.display = '';
            visibleCount++;
          } else {
            element.style.display = 'none';
          }
        });

        if (emptyMessageEl) {
          emptyMessageEl.style.display = visibleCount === 0 ? 'block' : 'none';
        }
      };

      if (items.length > 0) {
        applyFilters();
      }

      if (searchInput) {
        searchInput.addEventListener('input', (event) => {
          const target = event.target;
          currentSearchTerm = target.value.trim().toLowerCase();
          applyFilters();
        });
      }

      filterButtons.forEach((button) => {
        button.addEventListener('click', () => {
          filterButtons.forEach((btn) => btn.classList.remove('active'));
          button.classList.add('active');

          activeCategory = button.dataset.filter ? button.dataset.filter.toLowerCase() : 'all';
          applyFilters();
        });
      });
    }

    // =========================================================
    // 3. LÓGICA DOS BOTÕES DE AÇÃO / CONEXÃO
    // =========================================================
    const connectButtons = document.querySelectorAll('.card-action-btn, .connect-btn');
    connectButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const button = e.currentTarget;
        button.textContent = 'Pendent / Enviada';
        button.style.opacity = '0.6';
        button.style.cursor = 'not-allowed';
        button.disabled = true;
      });
    });

});