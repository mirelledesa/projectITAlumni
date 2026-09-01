interface NetworkCardItem {
  element: HTMLElement;
  textContext: string;
  category: string;
}

document.addEventListener('DOMContentLoaded', (): void => {
  const searchInput = document.querySelector<HTMLInputElement>('.search-input');
  const cardElements = document.querySelectorAll<HTMLElement>('.network-card, .feed-card');
  const filterButtons = document.querySelectorAll<HTMLButtonElement>('.desktop-filters .filter-btn');
  const container = document.querySelector<HTMLElement>('.network-list') || document.querySelector<HTMLElement>('.feed-cards');

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
      if (visibleCount === 0) {
        emptyMessageEl.style.display = 'block';
      } else {
        emptyMessageEl.style.display = 'none';
      }
    }
  };

  applyFilters();

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

  const connectButtons = document.querySelectorAll<HTMLButtonElement>('.card-action-btn, .connect-btn');
  connectButtons.forEach((btn: HTMLButtonElement) => {
    btn.addEventListener('click', (e: Event): void => {
      const button = e.currentTarget as HTMLButtonElement;
      button.textContent = 'Pendenta / Enviada';
      button.style.opacity = '0.6';
      button.style.cursor = 'not-allowed';
      button.disabled = true;
    });
  });
});