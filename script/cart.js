const cartItemsContainer = document.getElementById("cartItems");
const totalAmountLeftEl = document.getElementById("totalAmountLeft");
const totalAmountRightEl = document.getElementById("totalAmountRight");
const clearCartBtn = document.getElementById("clearCart");
const selectAllCheckbox = document.getElementById("selectAll");
const checkoutBtn = document.getElementById('checkoutBtn');

function formatRupiah(number) {
  return "Rp. " + number.toLocaleString("id-ID");
}

function getCartData() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCartData(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateQuantity(id, change) {
  let cart = getCartData();
  const item = cart.find((item) => item.id === id);
  if (!item) return;

  item.qty += change;

  if (item.qty <= 0) {
    cart = cart.filter((item) => item.id !== id);
  }

  saveCartData(cart);
  renderCart();
}

function clearCart() {
  localStorage.removeItem("cart");
  renderCart();
}

function calculateSelectedTotal() {
  const checkboxes = document.querySelectorAll(".item-checkbox:checked");
  const cart = getCartData();
  let selectedTotal = 0;

  checkboxes.forEach((checkbox) => {
    const itemId = parseInt(checkbox.dataset.id);
    const item = cart.find((i) => i.id === itemId);
    if (item) {
      selectedTotal += item.price * item.qty;
    }
  });

  totalAmountLeftEl.textContent = formatRupiah(selectedTotal);
  totalAmountRightEl.textContent = formatRupiah(selectedTotal);
}

function renderCart() {
  const cart = getCartData();

  // Simpan item yang sebelumnya dicentang
  const previouslyCheckedIds = Array.from(document.querySelectorAll(".item-checkbox:checked")).map(cb => parseInt(cb.dataset.id));

  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p class="text-gray-500">Keranjang kosong.</p>`;
    totalAmountLeftEl.textContent = formatRupiah(0);
    totalAmountRightEl.textContent = formatRupiah(0);
    return;
  }

  cart.forEach((item) => {
    const itemTotal = item.price * item.qty;
    const isChecked = previouslyCheckedIds.includes(item.id) ? 'checked' : '';

    const itemEl = document.createElement("div");
    itemEl.className = "flex items-start gap-4 border rounded p-4 shadow";

    itemEl.innerHTML = `
      <input type="checkbox" class="item-checkbox mt-2" data-id="${item.id}" ${isChecked} />
      <img src="${item.image}" alt="${item.title}" class="w-24 h-24 object-contain rounded" />
      <div class="flex-1">
        <h4 class="font-semibold">${item.title}</h4>
        <p>Harga: ${formatRupiah(item.price)}</p>
        <div class="flex items-center gap-2 mt-2">
          <button onclick="updateQuantity(${item.id}, -1)" class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">-</button>
          <span>${item.qty}</span>
          <button onclick="updateQuantity(${item.id}, 1)" class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">+</button>
        </div>
        <p class="mt-1">Total: ${formatRupiah(itemTotal)}</p>
      </div>
    `;

    cartItemsContainer.appendChild(itemEl);
  });

  setTimeout(() => {
    const itemCheckboxes = document.querySelectorAll(".item-checkbox");

    itemCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", calculateSelectedTotal);
    });

    if (selectAllCheckbox) {
      selectAllCheckbox.addEventListener("change", function () {
        itemCheckboxes.forEach((cb) => {
          cb.checked = this.checked;
        });
        calculateSelectedTotal();
      });
    }

    calculateSelectedTotal();
  }, 0);
}

if (clearCartBtn) {
  clearCartBtn.addEventListener("click", clearCart);
}

renderCart();

if (checkoutBtn) {
  checkoutBtn.addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('.item-checkbox:checked');
    const cart = getCartData();
    const selectedItems = [];

    checkboxes.forEach((checkbox) => {
      const itemId = parseInt(checkbox.dataset.id);
      const item = cart.find((i) => i.id === itemId);
      if (item) {
        selectedItems.push(item);
      }
    });

    if (selectedItems.length === 0) {
      alert('Silakan pilih produk terlebih dahulu.');
      return;
    }
    localStorage.setItem('checkoutItems', JSON.stringify(selectedItems));

    // Redirect ke form.html
    window.location.href = './form.html';
  });
}
