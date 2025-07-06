
const products = [
  { id: 1, name: { ru: "Футляр №1", ua: "Футляр №1" }, price: 250, img: "case1.jpg" },
  { id: 2, name: { ru: "Футляр №2", ua: "Футляр №2" }, price: 300, img: "case2.jpg" }
];
let cart = [];
let lang = 'ru';

function renderProducts() {
  const container = document.getElementById("products");
  container.innerHTML = "";
  products.forEach(p => {
    const card = document.createElement("div");
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name[lang]}" style="max-width: 200px;"><br/>
      <h3>${p.name[lang]}</h3><p>${p.price} грн</p>
      <button onclick="addToCart(${p.id})" data-i18n="add_to_cart">Добавить в корзину</button>`;
    container.appendChild(card);
  });
}
function addToCart(id) {
  const item = products.find(p => p.id === id);
  cart.push(item);
  renderCart();
}
function renderCart() {
  const list = document.getElementById("cart-items");
  list.innerHTML = "";
  cart.forEach(i => {
    const li = document.createElement("li");
    li.innerText = `${i.name[lang]} - ${i.price} грн`;
    list.appendChild(li);
  });
  document.getElementById("cart-total").innerText = cart.reduce((sum, i) => sum + i.price, 0);
}
function setLang(l) {
  lang = l;
  renderProducts();
}
document.getElementById("order-form").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Заказ отправлен!");
});
window.onload = () => {
  renderProducts();
};


const translations = {
  ru: {
    add_to_cart: "Добавить в корзину",
    cart_title: "Корзина",
    total: "Сумма",
    place_order: "Оформить заказ",
    choose_payment: "Выберите способ оплаты",
    card_payment: "На карту",
    cod_payment: "Наложенный платеж",
    submit_order: "Отправить заказ"
  },
  ua: {
    add_to_cart: "Додати до кошика",
    cart_title: "Кошик",
    total: "Сума",
    place_order: "Оформити замовлення",
    choose_payment: "Оберіть спосіб оплати",
    card_payment: "На картку",
    cod_payment: "Післяплата",
    submit_order: "Надіслати замовлення"
  }
};

function setLang(l) {
  lang = l;
  renderProducts();
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      el.innerText = translations[lang][key];
    }
  });
}
