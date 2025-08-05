async function loadProduct() {
  try {
    const productId = localStorage.getItem("selectedProductId") || 1; // default kalau kosong
    const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
    const product = await res.json();

    document.getElementById("main-image").src = product.image;
    document.getElementById("product-name").textContent = product.title;
    document.getElementById("product-subtitle").textContent = product.category;
    document.getElementById("description").textContent = product.description;
    document.getElementById("stock").textContent = "50"; // placeholder
    document.getElementById("price").textContent = product.price.toLocaleString("id-ID");
    document.getElementById("weight").textContent = "123"; // placeholder
  } catch (error) {
    console.error("Failed to load product:", error);
  }
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.qty += product.qty;
  } else {
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

window.addEventListener("DOMContentLoaded", () => {
  loadProduct();

  const btnAddToCart = document.getElementById("btnAddToCart");
  const btnCheckout = document.getElementById("btnCheckout");

  btnAddToCart?.addEventListener("click", () => {
    const qtyInput = document.querySelector('input[type="number"]');
    const qty = parseInt(qtyInput.value) || 1;

    const productId = localStorage.getItem("selectedProductId") || 1;
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then((res) => res.json())
      .then((product) => {
        addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          qty: qty,
        });
        alert("Produk berhasil ditambahkan ke keranjang!");
      })
      .catch(() => alert("Gagal menambahkan produk ke keranjang."));
  });

  btnCheckout?.addEventListener("click", () => {
    window.location.href = "form.html";
  });
});
