const products = [
  { id: 1, name: "Milk 1L", price: 25.0 },
  { id: 2, name: "Sugar 2kg", price: 36.0 },
  { id: 3, name: "Brown Bread", price: 18.5 },
  { id: 4, name: "Eggs 12pc", price: 48.0 },
  { id: 5, name: "Rice 5kg", price: 70.0 },
  { id: 6, name: "Flour 2kg", price: 28.0 },
  { id: 7, name: "Tea 250g", price: 22.0 },
  { id: 8, name: "Coffee 250g", price: 55.0 },
  { id: 9, name: "Butter 500g", price: 40.0 },
  { id: 10, name: "Cheese 400g", price: 60.0 },
  { id: 11, name: "Salt 1kg", price: 12.0 },
  { id: 12, name: "Cooking Oil 2L", price: 70.0 },
  { id: 13, name: "Fruit Juice 1L", price: 35.0 },
  { id: 14, name: "Yogurt 500g", price: 20.0 },
  { id: 15, name: "Biscuits 300g", price: 25.0 },
  { id: 16, name: "Chips 125g", price: 15.0 },
  { id: 17, name: "Tomato Sauce 500g", price: 18.0 },
  { id: 18, name: "Mayonnaise 400g", price: 45.0 },
  { id: 19, name: "Chicken 1kg", price: 85.0 },
  { id: 20, name: "Beef 1kg", price: 120.0 },
];

let cart = [];

const productSelect = document.getElementById("productSelect");
const qtyInput = document.getElementById("qtyInput");
const addToCartBtn = document.getElementById("addToCartBtn");
const cartTableBody = document.querySelector("#cartTable tbody");
const subtotalEl = document.getElementById("subtotal");
const vatEl = document.getElementById("vat");
const totalEl = document.getElementById("total");
const printReceiptBtn = document.getElementById("printReceiptBtn");

function populateProducts() {
  products.forEach((p) => {
    const option = document.createElement("option");
    option.value = p.id;
    option.textContent = `${p.name} - R${p.price.toFixed(2)}`;
    productSelect.appendChild(option);
  });
}

function addToCart() {
  const productId = Number(productSelect.value);
  const qty = Number(qtyInput.value);

  if (!productId || qty <= 0) {
    alert("Please select a product and enter a valid quantity.");
    return;
  }

  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const cartItem = cart.find((item) => item.id === productId);
  if (cartItem) {
    cartItem.qty += qty;
  } else {
    cart.push({ ...product, qty });
  }
  updateCart();
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  updateCart();
}

function updateCart() {
  cartTableBody.innerHTML = "";
  if (cart.length === 0) {
    cartTableBody.innerHTML = `<tr><td colspan="5" style="text-align:center;">Cart is empty</td></tr>`;
    subtotalEl.textContent = "0.00";
    vatEl.textContent = "0.00";
    totalEl.textContent = "0.00";
    return;
  }

  let subtotal = 0;
  cart.forEach((item) => {
    const row = document.createElement("tr");

    const totalPrice = item.price * item.qty;
    subtotal += totalPrice;

    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.qty}</td>
      <td>${item.price.toFixed(2)}</td>
      <td>${totalPrice.toFixed(2)}</td>
      <td><button class="remove-btn" data-id="${item.id}">X</button></td>
    `;
    cartTableBody.appendChild(row);
  });

  const vat = subtotal * 0.15;
  const total = subtotal + vat;

  subtotalEl.textContent = subtotal.toFixed(2);
  vatEl.textContent = vat.toFixed(2);
  totalEl.textContent = total.toFixed(2);

  // Attach remove button listeners
  document.querySelectorAll(".remove-btn").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const id = Number(e.target.dataset.id);
      removeFromCart(id);
    })
  );
}

function printReceipt() {
  if (cart.length === 0) {
    alert("Cart is empty.");
    return;
  }

  let receipt = "RECEIPT\n\n";
  cart.forEach((item) => {
    receipt += `${item.name} x${item.qty} @ R${item.price.toFixed(2)} = R${(item.price * item.qty).toFixed(2)}\n`;
  });

  receipt += "\n";
  receipt += `Subtotal: R${subtotalEl.textContent}\n`;
  receipt += `VAT (15%): R${vatEl.textContent}\n`;
  receipt += `TOTAL: R${totalEl.textContent}\n`;
  receipt += "\nThank you for shopping with us!";
receipt+="\nHelped By Seabata Lebeko!";
  const printWindow = window.open("", "Print Receipt", "width=300,height=400");
  printWindow.document.write(`<pre>${receipt}</pre>`);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
}

addToCartBtn.addEventListener("click", addToCart);
printReceiptBtn.addEventListener("click", printReceipt);

populateProducts();
updateCart();