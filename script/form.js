const checkoutItems = JSON.parse(localStorage.getItem('checkoutItems')) || [];
const productListContainer = document.getElementById('selectedProducts');

if (checkoutItems.length === 0) {
  productListContainer.innerHTML = '<p class="text-gray-500">Tidak ada produk yang dipilih.</p>';
} else {
  checkoutItems.forEach(item => {
    const itemEl = document.createElement('div');
    itemEl.className = 'flex items-center gap-4 border rounded p-4 shadow mb-2';

    itemEl.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="w-20 h-20 object-contain rounded" />
      <div>
        <h4 class="font-semibold">${item.title}</h4>
        <p>Harga: Rp. ${item.price.toLocaleString('id-ID')}</p>
        <p>Jumlah: ${item.qty}</p>
        <p>Total: Rp. ${(item.price * item.qty).toLocaleString('id-ID')}</p>
      </div>
    `;

    productListContainer.appendChild(itemEl);
  });
  const confirmBtn = document.createElement('button');
  confirmBtn.id = 'confirmBtn';
  confirmBtn.textContent = 'Konfirmasi Pembelian';
  confirmBtn.className = 'mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700';
  productListContainer.appendChild(confirmBtn);
  confirmBtn.addEventListener('click', () => {
    localStorage.removeItem('checkoutItems');
    window.location.href = './home.html'; // Ganti jika nama file homepage beda
  });
}
