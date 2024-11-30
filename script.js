const medicines = [
  { id: 1, name: "Paracetamol", price: 10, source: "Mumbai", deliveryTime: "2 days", img: "images/paracetamol.jpg" },
  { id: 2, name: "Ibuprofen", price: 15, source: "Delhi", deliveryTime: "1 day", img: "images/ibuprofen.jpg" },
  { id: 3, name: "Amoxicillin", price: 20, source: "Bangalore", deliveryTime: "3 days", img: "images/amoxicillin.jpg" },
  { id: 4, name: "Aspirin", price: 12, source: "Chennai", deliveryTime: "2 days", img: "images/aspirin.jpg" },
  { id: 5, name: "Ciprofloxacin", price: 18, source: "Kolkata", deliveryTime: "3 days", img: "images/ciprofloxacin.jpg" },
  { id: 6, name: "Metformin", price: 25, source: "Hyderabad", deliveryTime: "2 days", img: "images/metformin.jpg" },
  { id: 7, name: "Cetirizine", price: 8, source: "Pune", deliveryTime: "1 day", img: "images/cetirizine.jpg" },
  { id: 8, name: "Azithromycin", price: 30, source: "Ahmedabad", deliveryTime: "4 days", img: "images/azithromycin.jpg" },
  { id: 9, name: "Pantoprazole", price: 22, source: "Lucknow", deliveryTime: "2 days", img: "images/pantoprazole.jpg" },
  { id: 10, name: "Omeprazole", price: 18, source: "Jaipur", deliveryTime: "3 days", img: "images/omeprazole.jpg" },
  { id: 11, name: "Lisinopril", price: 35, source: "Surat", deliveryTime: "2 days", img: "images/lisinopril.jpg" },
  { id: 12, name: "Metoprolol", price: 40, source: "Vadodara", deliveryTime: "1 day", img: "images/metoprolol.jpg" },
  { id: 13, name: "Simvastatin", price: 28, source: "Bhopal", deliveryTime: "4 days", img: "images/simvastatin.jpg" },
  { id: 14, name: "Losartan", price: 32, source: "Indore", deliveryTime: "2 days", img: "images/losartan.jpg" },
  { id: 15, name: "Loratadine", price: 20, source: "Nagpur", deliveryTime: "3 days", img: "images/loratadine.jpg" },
  {id: 16, name: "Albuterol", price: 35, source: "Surat", deliveryTime: "2 days", img: "images/albuterol.jpg"},
  {id: 17, name: "Budesonide", price: 40, source: "Vadodara", deliveryTime: "1 day", img: "images/budesonide.jpg"},
  {id: 18, name: "Diphenhydramine", price: 28, source: "Bhopal", deliveryTime: "4 days", img: "images/diphenhydramine.jpg"},
];

let cart = [];
function loadMedicines(filteredMedicines = medicines) {
  const productContainer = document.querySelector('.product-container');
  productContainer.innerHTML = ''; // Clear previous content

  filteredMedicines.forEach(medicine => {
    const product = document.createElement('div');
    product.classList.add('product');
    product.innerHTML = `
      <img src="${medicine.img}" alt="${medicine.name}">
      <h3>${medicine.name}</h3>
      <p>Price: ₹${medicine.price}</p>
      <p>Source: ${medicine.source}</p>
      <p>Delivery Time: ${medicine.deliveryTime}</p>
      <label for="quantity-${medicine.id}">Quantity:</label>
      <input type="number" id="quantity-${medicine.id}" value="1" min="1" max="99" />
      <button onclick="addToCart(${medicine.id})">Add to Cart</button>
    `;
    productContainer.appendChild(product);
  });
}


// Search medicines
function searchMedicine() {
  const query = document.getElementById('search').value.toLowerCase();
  const filteredMedicines = medicines.filter(medicine =>
    medicine.name.toLowerCase().includes(query)
  );
  loadMedicines(filteredMedicines);
}

// Add item to the cart
function addToCart(id) {
  const medicine = medicines.find(med => med.id === id);
  const quantityInput = document.getElementById(`quantity-${id}`);
  const quantity = parseInt(quantityInput.value);

  const existingItem = cart.find(item => item.id === id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ ...medicine, quantity });
  }

  updateCart();
}

// Update cart display
function updateCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  const cartTotal = document.getElementById('cart-total');

  cartItemsContainer.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    cartItemsContainer.innerHTML += `
      <div class="cart-item">
        <h4>${item.name}</h4>
        <p>Price: ₹${item.price}</p>
        <p>Quantity: 
          <button onclick="decreaseQuantity(${item.id})">-</button>
          ${item.quantity}
          <button onclick="increaseQuantity(${item.id})">+</button>
        </p>
        <p>Subtotal: ₹${item.price * item.quantity}</p>
      </div>
    `;
  });

  cartCount.textContent = cart.length;
  cartTotal.textContent = total;
}

// Increase quantity of a cart item
function increaseQuantity(id) {
  const item = cart.find(item => item.id === id);
  if (item) {
    item.quantity++;
    updateCart();
  }
}

// Decrease quantity of a cart item
function decreaseQuantity(id) {
  const item = cart.find(item => item.id === id);
  if (item && item.quantity > 1) {
    item.quantity--;
    updateCart();
  } else if (item) {
    cart = cart.filter(cartItem => cartItem.id !== id);
    updateCart();
  }
}

// Toggle cart visibility
function toggleCart() {
  const cartOverlay = document.getElementById('cart');
  cartOverlay.classList.toggle('hidden');
}

// Dummy checkout function
function checkout() {
  if (cart.length > 0) {
    alert('Order placed successfully!');
    cart = [];
    updateCart();
    toggleCart();
  } else {
    alert('Your cart is empty!');
  }
}

// Scroll to products
function scrollToProducts() {
  document.getElementById("product-list").scrollIntoView({ behavior: "smooth" });
}

loadMedicines();