

let cartItems = [];

const listContainer = document.getElementById("cartItems");
const addBtn = document.getElementById("addBtn");
const totalBtn = document.getElementById("totalBtn");
const itemNameInput = document.getElementById("itemName");
const itemPriceInput = document.getElementById("itemPrice");
const totalDisplay = document.getElementById("totalDisplay");


// === Render the Grocery List ===
function renderList() {
  listContainer.innerHTML = "";

  cartItems.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - ₦${item.price.toLocaleString()}
      <button class="deleteBtn" onclick="deleteItem(${index})">Remove</button>
    `;
    listContainer.appendChild(li);
  });

  // TO Update total when item been remove
 if (totalItem) {
    calculateTotal();
  }
}

// === Add Item ===
addBtn.addEventListener("click", () => {
  const name = itemNameInput.value.trim();
  const price = parseFloat(itemPriceInput.value);

  if (name && !isNaN(price) && price > 0) {
    cartItems.push({ name, price });
    renderList();
    itemNameInput.value = "";
    itemPriceInput.value = "";
  } else {
      totalDisplay.textContent = "Please enter a valid item name and price!";
  }
});

// === Delete Item ===
function deleteItem(index) {
  cartItems.splice(index, 1);
  renderList(); // re-render and update total if visible
}

// Track whether total has been shown yet
let totalItem = false;

// === Calculate and Show Total ===
function calculateTotal() {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  totalDisplay.textContent = `Total Price: ₦${total.toLocaleString()}`;
 
}

// === Total Button Click ===
totalBtn.addEventListener("click", () => {
    if (cartItems.length === 0) {
   
    totalDisplay.textContent = "Please add at least one item before checking total!";
   totalItem = false;
  } else {
    totalItem = true;
    //totalDisplay.style.color = "#0c9cd5ff";
   // totalDisplay.style.display = "block";
    calculateTotal();
  }
   
  
});

// === Initial State ===
renderList();
