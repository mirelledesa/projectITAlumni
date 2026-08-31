interface NetworkCardItem {
  element: HTMLElement;
  textContext: string;
  category: string;
}

document.addEventListener('DOMContentLoaded', (): void => {
  const searchInput = document.querySelector<HTMLInputElement>('.search-input');
  const cardElements = document.querySelectorAll<HTMLElement>('.network-card, .feed-card');
  const filterButtons = document.querySelectorAll<HTMLButtonElement>('.desktop-filters .filter-btn');

  const initialActiveButton = document.querySelector<HTMLButtonElement>('.desktop-filters .filter-btn.active');
  let activeCategory: string = initialActiveButton?.dataset.filter ? initialActiveButton.dataset.filter.toLowerCase() : 'all';
  let currentSearchTerm: string = '';

  const items: NetworkCardItem[] = Array.from(cardElements).map((card: HTMLElement) => ({
    element: card,
    textContext: card.innerText.toLowerCase(),
    category: (card.dataset.category || 'all').toLowerCase()
  }));

  const applyFilters = (): void => {
    items.forEach(({ element, textContext, category }: NetworkCardItem) => {
      const matchesSearch = textContext.includes(currentSearchTerm);
      const matchesCategory = activeCategory === 'all' || category === activeCategory;

      if (matchesSearch && matchesCategory) {
        element.style.display = '';
      } else {
        element.style.display = 'none';
      }
    });
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
});