"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-input');
    const cardElements = document.querySelectorAll('.network-card, .feed-card');
    const filterButtons = document.querySelectorAll('.desktop-filters .filter-btn');
    const initialActiveButton = document.querySelector('.desktop-filters .filter-btn.active');
    let activeCategory = (initialActiveButton === null || initialActiveButton === void 0 ? void 0 : initialActiveButton.dataset.filter) ? initialActiveButton.dataset.filter.toLowerCase() : 'all';
    let currentSearchTerm = '';
    const items = Array.from(cardElements).map((card) => ({
        element: card,
        textContext: card.innerText.toLowerCase(),
        category: (card.dataset.category || 'all').toLowerCase()
    }));
    const applyFilters = () => {
        items.forEach(({ element, textContext, category }) => {
            const matchesSearch = textContext.includes(currentSearchTerm);
            const matchesCategory = activeCategory === 'all' || category === activeCategory;
            if (matchesSearch && matchesCategory) {
                element.style.display = '';
            }
            else {
                element.style.display = 'none';
            }
        });
    };
    applyFilters();
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
});
