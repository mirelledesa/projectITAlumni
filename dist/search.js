"use strict";

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-input');
    const cardElements = document.querySelectorAll('.network-card, .feed-card');
    const filterButtons = document.querySelectorAll('.desktop-filters .filter-btn');
    const initialActiveButton = document.querySelector('.desktop-filters .filter-btn.active');
    const container = document.querySelector('.network-list') || document.querySelector('.feed-cards');

    let activeCategory = initialActiveButton && initialActiveButton.dataset.filter ? initialActiveButton.dataset.filter.toLowerCase() : 'all';
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
            if (visibleCount === 0) {
                emptyMessageEl.style.display = 'block';
            } else {
                emptyMessageEl.style.display = 'none';
            }
        }
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

    const connectButtons = document.querySelectorAll('.card-action-btn, .connect-btn');
    connectButtons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const button = e.currentTarget;
            button.textContent = 'Pendenta / Enviada';
            button.style.opacity = '0.6';
            button.style.cursor = 'not-allowed';
            button.disabled = true;
        });
    });
});