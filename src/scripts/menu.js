// Menu category filtering
document.addEventListener('DOMContentLoaded', () => {
    // Menu Image Click Handler
    const menuImages = document.querySelectorAll('#menu img');
    menuImages.forEach(img => {
        img.addEventListener('click', (e) => {
            e.preventDefault();
            // Create a modal to show the image
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                cursor: zoom-out;
            `;
            
            const modalImg = document.createElement('img');
            modalImg.src = img.src;
            modalImg.style.cssText = `
                max-width: 90%;
                max-height: 90vh;
                object-fit: contain;
                border-radius: 8px;
            `;
            
            modal.appendChild(modalImg);
            document.body.appendChild(modal);
            
            // Close modal on click
            modal.addEventListener('click', () => {
                modal.remove();
            });
        });
    });

    const categoryButtons = document.querySelectorAll('#menu button');
    const menuItems = document.querySelectorAll('#menu .grid > div');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button styles
            categoryButtons.forEach(btn => {
                btn.classList.remove('bg-red-600', 'text-white');
                btn.classList.add('bg-white', 'text-red-600');
            });
            button.classList.remove('bg-white', 'text-red-600');
            button.classList.add('bg-red-600', 'text-white');

            const category = button.textContent.toLowerCase();
            
            // Show/hide menu items based on category
            menuItems.forEach(item => {
                if (category === 'all') {
                    item.style.display = 'block';
                    return;
                }
                
                const itemCategory = item.querySelector('h3').textContent.toLowerCase();
                if (itemCategory.includes(category)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // View Full Menu button functionality
    const viewFullMenuBtn = document.querySelector('#menu button:last-child');
    if (viewFullMenuBtn) {
        viewFullMenuBtn.addEventListener('click', () => {
            // Show all menu items
            menuItems.forEach(item => item.style.display = 'block');
            // Reset category buttons
            categoryButtons[0].click();
        });
    }

    // Download Menu Functionality
    const downloadButton = document.querySelector('[download="Srijee-Food-Parlor-Menu.pdf"]');
    if (downloadButton) {
        downloadButton.addEventListener('click', async function(e) {
            e.preventDefault();
            
            // Function to download images
            async function downloadImages() {
                const imageUrls = [
                    './public/images/menu.jpg',
                    './public/images/menu-card.jpg',
                    './public/images/pizza.jpg'
                ];
                
                for (const url of imageUrls) {
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = url.split('/').pop(); // Get filename from URL
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    // Add a small delay between downloads
                    await new Promise(resolve => setTimeout(resolve, 500));
                }
            }

            // Download the images
            await downloadImages();
            
            // Create a new window to print the menu
            const printWindow = window.open('', '_blank');
            
            // Generate menu content
            const menuContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Srijee Food Parlor - Menu</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 40px; }
                        .header { text-align: center; margin-bottom: 30px; }
                        .menu-section { margin-bottom: 20px; }
                        .menu-section h2 { color: #E31837; border-bottom: 2px solid #E31837; padding-bottom: 5px; }
                        .menu-item { display: flex; justify-content: space-between; margin: 10px 0; }
                        .price { color: #E31837; }
                        .note { text-align: center; margin-top: 30px; font-style: italic; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>Srijee Food Parlor</h1>
                        <p>स्वाद हमारी परम्परा</p>
                        <p>Shop No. 6, C.I. Market, Opp. Prem Nagar Thana, Bareilly</p>
                        <p>Contact: 9837011124, 9756759555</p>
                    </div>
                    ${generateMenuHTML()}
                    <div class="note">
                        <p>Note: शादी व पार्टी के आर्डर बुक किये जाते हैं।</p>
                    </div>
                </body>
                </html>
            `;
            
            printWindow.document.write(menuContent);
            printWindow.document.close();
            
            // Wait for content to load then print
            printWindow.onload = function() {
                printWindow.print();
                printWindow.close();
            };
        });
    }
});

// Helper function to generate menu HTML
function generateMenuHTML() {
    const menuData = {
        'Pizza': [
            { name: 'Margherita (7"/10")', price: '₹99/₹159', description: 'Classic cheese with Italian herbs' },
            { name: 'Onion Lover (7"/10")', price: '₹99/₹159', description: 'Loaded with fresh onions' },
            { name: 'Tom Tom (7"/10")', price: '₹99/₹159', description: 'Fresh tomatoes with herbs' },
            { name: 'Corn (7"/10")', price: '₹99/₹159', description: 'Sweet corn with mozzarella' },
            { name: 'Rainbow (7"/10")', price: '₹99/₹159', description: 'Colorful mix of bell peppers' },
            { name: 'Capsicum (7"/10")', price: '₹99/₹159', description: 'Fresh capsicum with herbs' },
            { name: 'Mushroom (7"/10")', price: '₹99/₹159', description: 'Fresh mushrooms with herbs' },
            { name: 'Paneer Classic (7"/10")', price: '₹159/₹259', description: 'Fresh cottage cheese with herbs' },
            { name: 'Veggie Delight (7"/10")', price: '₹159/₹259', description: 'Mix of fresh vegetables' },
            { name: 'Ex Veganza (7"/10")', price: '₹279/₹419', description: 'Onion, Capsicum, Paneer, Olive, Mushroom, Jalapeno with Extra Cheese' },
            { name: 'Paneer Special (7"/10")', price: '₹299/₹449', description: 'Tandoori Sauce, Tandoori Paneer, Onion, Tomato, Capsicum, Red Paprika' },
            { name: 'Extra Toppings', price: 'Regular: ₹30, Paneer: ₹50', description: 'Add extra toppings of your choice' },
            { name: 'Extra Cheese', price: '₹50', description: 'Add extra mozzarella cheese' }
        ],
        'Dal & Regular Veg (250g/500g)': [
            { name: 'Dal Fry', price: '₹80/₹140' },
            { name: 'Dal Tadka', price: '₹90/₹160' },
            { name: 'Dal Makhani', price: '₹110/₹200' },
            { name: 'Dal Amritsari', price: '₹110/₹200' },
            { name: 'Pindi Chole', price: '₹120/₹220' },
            { name: 'Mix Veg', price: '₹120/₹220' },
            { name: 'Aloo Gobi', price: '₹120/₹220' },
            { name: 'Bhindi Masala', price: '₹120/₹220' },
            { name: 'Aloo Jeera', price: '₹120/₹220' }
        ],
        'Paneer Special (250g/500g)': [
            { name: 'Matar Paneer', price: '₹120/₹220' },
            { name: 'Shahi Paneer', price: '₹140/₹260' },
            { name: 'Kadai Paneer', price: '₹140/₹260' },
            { name: 'Paneer Butter Masala', price: '₹140/₹260' },
            { name: 'Paneer Bhurjia', price: '₹170/₹320' },
            { name: 'Handi Paneer', price: '₹160/₹300' },
            { name: 'Paneer Do Pyaza', price: '₹140/₹260' },
            { name: 'Paneer Lababdar', price: '₹160/₹300' }
        ],
        'Quick Bites': [
            { name: 'Veg Momo (Half/Full)', price: '₹30/₹60' },
            { name: 'Veg Momo Fry (Half/Full)', price: '₹35/₹70' },
            { name: 'Paneer Momo (Half/Full)', price: '₹40/₹80' },
            { name: 'Paneer Momo Crispy (Half/Full)', price: '₹50/₹100' },
            { name: 'White Sauce Pasta', price: '₹80/₹150' },
            { name: 'Red Sauce Pasta', price: '₹80/₹150' },
            { name: 'Hakka Noodles', price: '₹70/₹120' },
            { name: 'Singapore Noodles', price: '₹90/₹160' }
        ],
        'Rice (250g/500g)': [
            { name: 'Plain Rice', price: '₹60/₹100' },
            { name: 'Jeera Rice', price: '₹70/₹120' },
            { name: 'Matar Pulao', price: '₹80/₹140' },
            { name: 'Kashmiri Pulao', price: '₹100/₹200' },
            { name: 'Veg Biryani', price: '₹100/₹200' },
            { name: 'Veg Pulao', price: '₹80/₹140' },
            { name: 'Mushroom Pulao', price: '₹100/₹180' }
        ],
        'Breads': [
            { name: 'Tawa Chapati', price: '₹6' },
            { name: 'Tawa Butter Chapati', price: '₹8' },
            { name: 'Tandoori Roti', price: '₹12' },
            { name: 'Butter Naan', price: '₹50' },
            { name: 'Garlic Butter Naan', price: '₹70' },
            { name: 'Lachha Paratha', price: '₹40' },
            { name: 'Pudina Paratha', price: '₹40' }
        ],
        'Tandoor Se': [
            { name: 'Paneer Tikka', price: '₹160' },
            { name: 'Paneer Malai Tikka', price: '₹170' },
            { name: 'Paneer Hariyali Tikka', price: '₹170' },
            { name: 'Mushroom Tikka', price: '₹160' },
            { name: 'Chaap Tandoori', price: '₹140' },
            { name: 'Soya Chaap Masala', price: '₹160' },
            { name: 'Malai Chaap', price: '₹180' }
        ],
        'Extras': [
            { name: 'Raita Boondi (250g/500g)', price: '₹60/₹100' },
            { name: 'Raita Mix (250g/500g)', price: '₹70/₹120' },
            { name: 'Raita Pineapple (250g/500g)', price: '₹100/₹180' },
            { name: 'Green Salad', price: '₹60' },
            { name: 'Kachumber Salad', price: '₹60' },
            { name: 'Papad Roasted', price: '₹10' },
            { name: 'Papad Fry', price: '₹15' }
        ]
    };

    return Object.entries(menuData).map(([category, items]) => `
        <div class="menu-section">
            <h2>${category}</h2>
            ${items.map(item => `
                <div class="menu-item">
                    <span>${item.name}${item.description ? `<br><small class="text-gray-600">${item.description}</small>` : ''}</span>
                    <span class="price">${item.price}</span>
                </div>
            `).join('')}
        </div>
    `).join('');
}

// Add smooth animations for menu items
const menuItems = document.querySelectorAll('#menu .grid > div');
menuItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.classList.add('transform', 'scale-105');
        item.style.transition = 'all 0.3s ease';
    });
    
    item.addEventListener('mouseleave', () => {
        item.classList.remove('transform', 'scale-105');
    });
}); 