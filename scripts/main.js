// main.js - pequena demo para popular produtos e gerenciar carrinho
const products = [
  { id: 1, name: 'Camiseta Básica', price: 39.9, img: 'https://picsum.photos/seed/p1/400/300' },
  { id: 2, name: 'Tênis Esportivo', price: 199.0, img: 'https://picsum.photos/seed/p2/400/300' },
  { id: 3, name: 'Mochila Urbana', price: 129.5, img: 'https://picsum.photos/seed/p3/400/300' },
  { id: 4, name: 'Fone de Ouvido', price: 89.9, img: 'https://picsum.photos/seed/p4/400/300' },
  { id: 5, name: 'Relógio Casual', price: 249.0, img: 'https://picsum.photos/seed/p5/400/300' },
  { id: 6, name: 'Jaqueta Jeans', price: 179.9, img: 'https://picsum.photos/seed/p6/400/300' }
];

function formatPrice(v){return v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}

function renderProducts(){
  const el = document.getElementById('products');
  el.innerHTML = '';
  products.forEach(p=>{
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p class="price">${formatPrice(p.price)}</p>
      <a class="btn" href="#" data-id="${p.id}">Adicionar</a>
    `;
    el.appendChild(card);
  });
}

const cart = {count:0};
function updateCart(){
  cart.count++;
  document.getElementById('cart-count').textContent = cart.count;
}

document.addEventListener('click',e=>{
  const a = e.target.closest('.btn');
  if(a){
    e.preventDefault();
    updateCart();
  }
});

document.addEventListener('DOMContentLoaded',()=>{
  renderProducts();
});
