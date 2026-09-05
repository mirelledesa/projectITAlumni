interface NetworkCardItem {
  element: HTMLElement;
  textContext: string;
  category: string;
}

document.addEventListener('DOMContentLoaded', (): void => {

  // =========================================================
  // 1. LÓGICA DO CARROSSEL (Compatível com o seu HTML/CSS)
  // =========================================================
  const track = document.querySelector<HTMLElement>('.testimonials-grid, .carousel-track');
  const carouselButtons = document.querySelectorAll<HTMLButtonElement>('.carousel-controls .carousel-btn');
  
  const prevBtn = Array.from(carouselButtons).find(btn => 
    btn.getAttribute('aria-label') === 'Anterior' || btn.classList.contains('carousel-prev')
  );
  
  const nextBtn = Array.from(carouselButtons).find(btn => 
    btn.getAttribute('aria-label') === 'Próximo' || btn.getAttribute('aria-label') === 'Proximo' || btn.classList.contains('carousel-next')
  );

  if (track) {
    let currentIndex = 0;

    const updateCarousel = (): void => {
      const cards = Array.from(track.children) as HTMLElement[];
      if (cards.length === 0) return;

      const cardWidth = cards[0].getBoundingClientRect().width;
      const gap = parseFloat(window.getComputedStyle(track).gap) || 0;
      const amountToMove = (cardWidth + gap) * currentIndex;

      track.style.transform = `translateX(-${amountToMove}px)`;
    };

    if (nextBtn) {
      nextBtn.addEventListener('click', (): void => {
        const cards = track.children;
        // Permite avançar até que o último card fique visível
        if (currentIndex < cards.length - 1) {
          currentIndex++;
          updateCarousel();
        }
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (): void => {
        if (currentIndex > 0) {
          currentIndex--;
          updateCarousel();
        }
      });
    }

    window.addEventListener('resize', (): void => {
      updateCarousel();
    });
  }


  // =========================================================
  // 2. LÓGICA DE FILTROS E BUSCA (Condicional/Independente)
  // =========================================================
  const searchInput = document.querySelector<HTMLInputElement>('.search-input');
  const cardElements = document.querySelectorAll<HTMLElement>('.network-card, .feed-card');
  const filterButtons = document.querySelectorAll<HTMLButtonElement>('.desktop-filters .filter-btn');
  const container = document.querySelector<HTMLElement>('.network-list') || document.querySelector<HTMLElement>('.feed-cards');

  if (cardElements.length > 0 || searchInput) {
    const initialActiveButton = document.querySelector<HTMLButtonElement>('.desktop-filters .filter-btn.active');
    let activeCategory: string = initialActiveButton?.dataset.filter ? initialActiveButton.dataset.filter.toLowerCase() : 'all';
    let currentSearchTerm: string = '';

    const items: NetworkCardItem[] = Array.from(cardElements).map((card: HTMLElement) => ({
      element: card,
      textContext: card.innerText.toLowerCase(),
      category: (card.dataset.category || 'all').toLowerCase()
    }));

    let emptyMessageEl = document.querySelector<HTMLElement>('.empty-state-message');
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

    const applyFilters = (): void => {
      let visibleCount = 0;

      items.forEach(({ element, textContext, category }: NetworkCardItem) => {
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
      searchInput.addEventListener('input', (event: Event): void => {
        const target = event.target as HTMLInputElement;
        currentSearchTerm = target.value.trim().toLowerCase();
        applyFilters();
      });
    }

    filterButtons.forEach((button: HTMLButtonElement) => {
      button.addEventListener('click', (): void => {
        filterButtons.forEach((btn: HTMLButtonElement) => btn.classList.remove('active'));
        button.classList.add('active');

        activeCategory = button.dataset.filter ? button.dataset.filter.toLowerCase() : 'all';
        applyFilters();
      });
    });
  }


  // =========================================================
  // 3. LÓGICA DOS BOTÕES DE AÇÃO / CONEXÃO
  // =========================================================
  const connectButtons = document.querySelectorAll<HTMLButtonElement>('.card-action-btn, .connect-btn');
  connectButtons.forEach((btn: HTMLButtonElement) => {
    btn.addEventListener('click', (e: Event): void => {
      const button = e.currentTarget as HTMLButtonElement;
      button.textContent = 'Pendent / Enviada';
      button.style.opacity = '0.6';
      button.style.cursor = 'not-allowed';
      button.disabled = true;
    });
  });

});