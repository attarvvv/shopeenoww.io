let allProducts = []; // Simpan data global

async function ambilData() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    allProducts = data; // Simpan semua produk
    renderProducts(allProducts); // Tampilkan semua dulu
  } catch (error) {
    console.error("Data Error:", error);
  }
}

function renderProducts(products) {
  const container = document.getElementById("data-product");
  container.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className =
      "bg-blue-50 rounded-lg shadow-xl p-6 text-left flex flex-col cursor-pointer";

    card.innerHTML = `
      <div class="flex justify-center mb-4">
        <img src="${product.image}" alt="${
      product.title
    }" class="w-48 h-48 object-contain" />
      </div>
      <h3 class="text-lg font-semibold mb-2">${product.title}</h3>
      <p class="text-sm text-gray-600 mb-1">1 Colour Available</p>
      <p class="text-gray-800 font-medium mb-2">Rp. ${product.price.toLocaleString(
        "id-ID"
      )}</p>
      <p class="text-yellow-500 text-sm mb-4">★★★★☆</p>
    `;

    card.addEventListener("click", () => {
      localStorage.setItem("selectedProductId", product.id);
      window.location.href = "detail.html";
    });

    const btnWrapper = document.createElement("div");
    btnWrapper.className = "flex gap-2";

    const buyBtn = document.createElement("button");
    buyBtn.className =
      "bg-green-900 text-white px-4 py-2 rounded hover:bg-green-800 transition";
    buyBtn.textContent = "Buy Now";

    buyBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      localStorage.setItem(
        "orderProduct",
        JSON.stringify({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          qty: 1,
        })
      );
      window.location.href = "form.html";
    });

    btnWrapper.appendChild(buyBtn);
    card.appendChild(btnWrapper);
    container.appendChild(card);
  });
}

// Filter saat user ketik di search bar
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const keyword = searchInput.value.trim().toLowerCase();
      const filtered = allProducts.filter((product) =>
        product.title.toLowerCase().includes(keyword)
      );
      renderProducts(filtered);
    });
  }
});

ambilData();
