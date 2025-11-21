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
    // envolver a imagem do primeiro produto em um link para a página do produto
    const imgHtml = p.id === 1
      ? `<a href="produto.html"><img src="${p.img}" alt="${p.name}" /></a>`
      : `<img src="${p.img}" alt="${p.name}" />`;
    card.innerHTML = `
      ${imgHtml}
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

  // FAQ: abrir/fechar painel (inicializa após DOM pronto)
  const btn = document.getElementById('faq-button');
  const overlay = document.getElementById('faq-overlay');
  const close = document.getElementById('faq-close');
  if(!btn || !overlay) return;

  function openFaq(){
    overlay.classList.add('open');
    overlay.removeAttribute('hidden');
    document.body.classList.add('no-scroll');
    const panel = document.getElementById('faq-panel');
    if(panel) panel.focus();
  }
  function closeFaq(){
    overlay.classList.remove('open');
    overlay.setAttribute('hidden','');
    document.body.classList.remove('no-scroll');
    btn.focus();
  }

  btn.addEventListener('click',openFaq);
  if(close) close.addEventListener('click',closeFaq);

  overlay.addEventListener('click',e=>{
    if(e.target === overlay) closeFaq();
  });

  const panelEl = document.getElementById('faq-panel');
  if(panelEl) panelEl.addEventListener('click', e=> e.stopPropagation());

  document.addEventListener('keydown',e=>{
    if(e.key === 'Escape' && !overlay.hidden) closeFaq();
  });

  // Carrossel: inicialização
  function initCarousel(){
    const track = document.getElementById('carousel-track');
    if(!track) return;
    const slides = Array.from(track.querySelectorAll('.carousel-slide'));
    const prev = document.getElementById('carousel-prev');
    const next = document.getElementById('carousel-next');
    const dotsContainer = document.getElementById('carousel-dots');
    let index = 0;
    // criar dots
    slides.forEach((_,i)=>{
      const b = document.createElement('button');
      b.className='dot';
      b.type='button';
      b.setAttribute('aria-label',`Ir para slide ${i+1}`);
      b.dataset.index = i;
      b.addEventListener('click', ()=> goTo(i));
      dotsContainer.appendChild(b);
    });
    const dots = Array.from(dotsContainer.children);

    function update(){
      track.style.transform = `translateX(-${index*100}%)`;
      dots.forEach((d,i)=> d.classList.toggle('active', i===index));
    }
    function goTo(i){ index = (i + slides.length) % slides.length; update(); resetTimer(); }
    function nextSlide(){ goTo(index+1); }
    function prevSlide(){ goTo(index-1); }

    if(next) next.addEventListener('click', ()=> nextSlide());
    if(prev) prev.addEventListener('click', ()=> prevSlide());

    let timer = setInterval(nextSlide, 5000);
    function resetTimer(){ clearInterval(timer); timer = setInterval(nextSlide, 5000); }

    const carouselEl = track.closest('.carousel');
    if(carouselEl){
      carouselEl.addEventListener('mouseenter', ()=> clearInterval(timer));
      carouselEl.addEventListener('mouseleave', ()=> resetTimer());
      carouselEl.addEventListener('focusin', ()=> clearInterval(timer));
      carouselEl.addEventListener('focusout', ()=> resetTimer());
    }

    // inicial
    update();
  }

  initCarousel();
});
