// Menu Categories
const menuCategories = {
    pizza: {
        name: 'Pizza',
        items: [
            { name: 'Onion Lover', price: { small: 99, medium: 159 } },
            { name: 'Tom Tom', price: { small: 99, medium: 159 } },
            { name: 'Corn', price: { small: 99, medium: 159 } },
            { name: 'Rainbow', price: { small: 99, medium: 159 } }
        ]
    },
    indianMain: {
        name: 'Main Course',
        items: [
            { name: 'Dal Fry', price: { '250gm': 80, '500gm': 140 } },
            { name: 'Shahi Paneer', price: { '250gm': 140, '500gm': 260 } },
            { name: 'Mushroom Special', price: { '250gm': 150, '500gm': 280 } }
        ]
    },
    quickBites: {
        name: 'Quick Bites',
        items: [
            { name: 'Veg Momo', price: { half: 30, full: 60 } },
            { name: 'White Sauce Pasta', price: { regular: 80, large: 150 } },
            { name: 'Veg Burger', price: { regular: 50 } }
        ]
    }
};

// Function to create menu cards
function createMenuCards() {
    const menuContainer = document.querySelector('#menu .grid');
    if (!menuContainer) return;

    Object.values(menuCategories).forEach(category => {
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card bg-white p-6 rounded-lg shadow-lg hover-scale';
        
        categoryCard.innerHTML = `
            <h3 class="text-xl font-bold mb-4">${category.name}</h3>
            <ul class="space-y-2">
                ${category.items.slice(0, 3).map(item => `
                    <li class="flex justify-between items-center">
                        <span>${item.name}</span>
                        <span class="text-brand-red font-semibold">
                            ₹${Object.values(item.price)[0]}
                        </span>
                    </li>
                `).join('')}
            </ul>
            <button class="btn-primary mt-4 w-full">View All</button>
        `;

        menuContainer.appendChild(categoryCard);
    });
}

// Mobile Menu Toggle
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('#mobile-menu-btn');
    const mobileMenu = document.querySelector('#mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Smooth Scroll for Navigation
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // createMenuCards(); // Removed to delete the three cards
    initializeMobileMenu();
    initializeSmoothScroll();
}); 