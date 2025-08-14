const PRODUCTS = [
  {id:'scented-candles', name:'Scented candles', price:140, img:'images/scented-candles.png', category:'Individual Items'},
  {id:'diffuser', name:'Diffuser', price:200, img:'images/diffuser.png', category:'Individual Items'},
  {id:'bath-bombs-salts', name:'Bath bombs/salts', price:100, img:'images/bath-bombs-salts.png', category:'Individual Items'},
  {id:'mug', name:'Mug', price:50, img:'images/mug.png', category:'Individual Items'},
  {id:'essential-oil', name:'Essential oil', price:50, img:'images/essential-oil.png', category:'Individual Items'},
  {id:'plant', name:'Plant', price:200, img:'images/plant.png', category:'Individual Items'},
  {id:'roses-from', name:'Roses (from)', price:250, img:'images/roses--from-.png', category:'Individual Items'},
  {id:'flask', name:'Flask', price:200, img:'images/flask.png', category:'Individual Items'},

  {id:'balloon-arch-with-stickers', name:'Balloon arch with stickers', price:1500, img:'images/balloon-arch-with-stickers.png', category:'Local Services'},
  {id:'photo-booth', name:'Photo booth', price:1500, img:'images/photo-booth.png', category:'Local Services'},
  {id:'indoor-romantic-decor-mini-basket', name:'Indoor romantic décor (mini basket)', price:1500, img:'images/indoor-romantic-d-cor--mini-basket-.png', category:'Local Services'},

  {id:'bento-cake', name:'Bento cake', price:300, img:'images/bento-cake.png', category:'Bento Cakes'},
  {id:'bento-cake-cupcakes', name:'Bento cake + cupcakes', price:450, img:'images/bento-cake---cupcakes.png', category:'Bento Cakes'},
  {id:'custom-decor-message-from', name:'Custom décor & message (from)', price:30, img:'images/custom-d-cor---message--from-.png', category:'Bento Cakes'},

  {id:'sweet-treats-hamper', name:'Sweet treats hamper', price:300, img:'images/sweet-treats-hamper.png', category:'Hampers'},
  {id:'spa-relaxation-hamper', name:'Spa & relaxation hamper', price:500, img:'images/spa---relaxation-hamper.png', category:'Hampers'},
  {id:'tea-coffee-hamper', name:'Tea & Coffee hamper', price:300, img:'images/tea---coffee-hamper.png', category:'Hampers'},
  {id:'birthday-celebration-jar', name:'Birthday celebration jar', price:700, img:'images/birthday-celebration-jar.png', category:'Hampers'},
  {id:'romantic-love-hamper', name:'Romantic love hamper', price:850, img:'images/romantic-love-hamper.png', category:'Hampers'},
  {id:'healthy-snacks-hamper', name:'Healthy snacks hamper', price:500, img:'images/healthy-snacks-hamper.png', category:'Hampers'},
  {id:'baby-shower-hamper', name:'Baby Shower hamper', price:600, img:'images/baby-shower-hamper.png', category:'Hampers'},
  {id:'custom-mini-hamper-from', name:'Custom mini hamper (from)', price:200, img:'images/custom-mini-hamper--from-.png', category:'Hampers'},
];

const cart = [];
let filterText = "";

function formatR(v){ return 'R' + v.toFixed(0); }

function renderProducts(){
  const grid = document.querySelector('#grid');
  grid.innerHTML = '';
  PRODUCTS
    .filter(p => p.name.toLowerCase().includes(filterText))
    .forEach(p => {
      const el = document.createElement('div');
      el.className = 'card';
      el.innerHTML = `
        <img src="${p.img}" alt="${p.name}">
        <div class="info">
          <h3>${p.name}</h3>
          <span class="price">${formatR(p.price)}</span>
          <span class="badge">${p.category}</span>
          <div class="actions">
            <button class="btn" onclick="addToCart('${p.id}')">Add to Cart</button>
          </div>
        </div>`;
      grid.appendChild(el);
    });
}

function addToCart(id){
  const p = PRODUCTS.find(x => x.id === id);
  cart.push({...p});
  renderCart();
}

function removeFromCart(index){
  cart.splice(index,1);
  renderCart();
}

function renderCart(){
  const list = document.querySelector('#cart-list');
  const totalEl = document.querySelector('#cart-total');
  list.innerHTML = '';
  let total = 0;
  cart.forEach((item, i) => {
    total += item.price;
    const li = document.createElement('li');
    li.innerHTML = `<span>${item.name} — ${formatR(item.price)}</span>
                    <button class="btn secondary" onclick="removeFromCart(${i})">Remove</button>`;
    list.appendChild(li);
  });
  totalEl.textContent = formatR(total);
}

function toWhatsApp(){
  if(cart.length === 0){ alert('Your cart is empty'); return;}
  const name = document.querySelector('#cust-name').value.trim();
  const note = document.querySelector('#note').value.trim();
  let message = `Hello Floressence! I'd like to order:%0A`;
  cart.forEach(c => { message += `- ${c.name} (${formatR(c.price)})%0A`; });
  const total = cart.reduce((s,c)=>s+c.price,0);
  message += `%0ATotal: ${formatR(total)}`;
  if(name) message += `%0AName: ${encodeURIComponent(name)}`;
  if(note) message += `%0ANote: ${encodeURIComponent(note)}`;
  const phone = '27718008231'; // WhatsApp requires country code without +
  const url = `https://wa.me/${phone}?text=${message}`;
  window.open(url, '_blank');
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  document.querySelector('#search').addEventListener('input', (e)=>{
    filterText = e.target.value.toLowerCase();
    renderProducts();
  });
});