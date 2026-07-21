/* ============================================================
   ANIOR ORGANIC — interactivity
   ============================================================ */
(function () {
  "use strict";

  /* ---------- DATA ---------- */
  const CATEGORIES = [
    { name: "Ghee & Oils",  key: "Oils",       emoji: "🫙", tag: "Cold-pressed" },
    { name: "Honey & Sweeteners", key: "Sweeteners", emoji: "🍯", tag: "Raw & pure" },
    { name: "Pulses",       key: "Pulses",     emoji: "🫘", tag: "Unpolished" },
    { name: "Grains & Millets", key: "Grains", emoji: "🌾", tag: "Gluten-free" },
    { name: "Spices",       key: "Spices",     emoji: "🌶️", tag: "Sun-dried" },
    { name: "Superfoods",   key: "Superfoods", emoji: "🥜", tag: "Nutrient-dense" },
  ];

  const IMG = (id) => `https://images.unsplash.com/photo-${id}?w=640&q=60&auto=format&fit=crop`;
  const PRODUCTS = [
    { id: 1,  name: "A2 Desi Cow Ghee", cat: "Oils", emoji: "🫙", img: IMG("1631452180519-c014fe946bc7"), desc: "Bilona-churned, hormone-free.", price: 899, mrp: 1099, rating: 4.9, reviews: 214, badge: "Bestseller" },
    { id: 2,  name: "Cold-Pressed Groundnut Oil", cat: "Oils", emoji: "🛢️", img: IMG("1474979266404-7eaacbcd87c5"), desc: "100% pure, wood-pressed.", price: 420, mrp: 480, rating: 4.6, reviews: 88, badge: "" },
    { id: 3,  name: "Wild Forest Honey", cat: "Sweeteners", emoji: "🍯", img: IMG("1587049352846-4a222e784d38"), desc: "Raw, unheated, from beekeepers.", price: 340, mrp: 399, rating: 4.8, reviews: 176, badge: "Bestseller" },
    { id: 4,  name: "Organic Jaggery Powder", cat: "Sweeteners", emoji: "🟤", img: IMG("1610452220299-5edf90b8a6ed"), desc: "Chemical-free sugar substitute.", price: 180, mrp: 210, rating: 4.7, reviews: 92, badge: "" },
    { id: 5,  name: "Unpolished Toor Dal", cat: "Pulses", emoji: "🫘", img: IMG("1585996950364-1f0e91ba7bfe"), desc: "Everyday protein, no polish.", price: 210, mrp: 260, rating: 4.8, reviews: 54, badge: "" },
    { id: 6,  name: "Organic Green Moong", cat: "Pulses", emoji: "🟢", img: IMG("1615485500834-bc10199bc727"), desc: "High-fibre, easy to digest.", price: 165, mrp: 190, rating: 4.6, reviews: 41, badge: "" },
    { id: 7,  name: "Foxtail Millet", cat: "Grains", emoji: "🌾", img: IMG("1586201375761-83865001e31c"), desc: "Ancient grain, gluten-free.", price: 145, mrp: 180, rating: 4.7, reviews: 63, badge: "New" },
    { id: 8,  name: "Chakki Whole Wheat Atta", cat: "Grains", emoji: "🌾", img: IMG("1509440159596-0249088772ff"), desc: "Stone-ground, fibre-rich.", price: 320, mrp: 360, rating: 4.5, reviews: 77, badge: "" },
    { id: 9,  name: "Organic Turmeric Powder", cat: "Spices", emoji: "🟡", img: IMG("1615485500704-8e990f9900f7"), desc: "High-curcumin, lab-tested.", price: 130, mrp: 160, rating: 4.9, reviews: 145, badge: "Bestseller" },
    { id: 10, name: "Whole Red Chilli", cat: "Spices", emoji: "🌶️", img: IMG("1526346698789-22fd84314424"), desc: "Sun-dried, no colour added.", price: 150, mrp: 175, rating: 4.4, reviews: 33, badge: "" },
    { id: 11, name: "Raw Almonds", cat: "Superfoods", emoji: "🥜", img: IMG("1508061253366-f7da158b6d46"), desc: "California-grade, unroasted.", price: 640, mrp: 750, rating: 4.8, reviews: 121, badge: "" },
    { id: 12, name: "Chia Seeds", cat: "Superfoods", emoji: "🖤", img: IMG("1541364983171-a8ba01e95cfc"), desc: "Omega-3 rich, premium grade.", price: 240, mrp: 300, rating: 4.7, reviews: 69, badge: "New" },
  ];

  const REVIEWS = [
    { text: "Finally food I can trust. The A2 ghee is rich and fragrant — nothing like store-bought. Lifelong customer now.", name: "Priya Menon", role: "Bangalore", initial: "P", stars: 5 },
    { text: "The forest honey is thick and full of flavour, exactly as raw honey should be. Beautiful eco-friendly packaging too.", name: "Arjun Rao", role: "Chennai", initial: "A", stars: 5 },
    { text: "As a mother I'm picky about what I feed my family. Anior's flours and spices are clean and authentic. So reassuring.", name: "Sneha Kulkarni", role: "Pune", initial: "S", stars: 5 },
    { text: "Switched to their millets and jaggery months ago. You can taste the difference — pure food with no chemical smell.", name: "Rahul Nair", role: "Kochi", initial: "R", stars: 5 },
  ];

  const CERTS = [
    { icon: "🌿", label: "India Organic — Jaivik Bharat" },
    { icon: "🏅", label: "USDA Organic" },
    { icon: "🇪🇺", label: "EU Organic" },
    { icon: "✅", label: "FSSAI Certified" },
    { icon: "🔬", label: "ISO 22000" },
    { icon: "🛡️", label: "HACCP Certified" },
  ];

  const FREE_SHIP = 999;
  const money = (n) => "₹" + n.toLocaleString("en-IN");

  /* ---------- STATE ---------- */
  let cart = loadCart();
  const favs = new Set(loadFavs());

  function loadCart() {
    try { return JSON.parse(localStorage.getItem("anior_cart") || "[]"); }
    catch (e) { return []; }
  }
  function saveCart() {
    try { localStorage.setItem("anior_cart", JSON.stringify(cart)); } catch (e) {}
  }
  function loadFavs() {
    try { return JSON.parse(localStorage.getItem("anior_favs") || "[]"); }
    catch (e) { return []; }
  }
  function saveFavs() {
    try { localStorage.setItem("anior_favs", JSON.stringify([...favs])); } catch (e) {}
  }

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ============ RENDER CATEGORIES (home page only) ============ */
  const catGrid = $("#catGrid");
  if (catGrid) {
    catGrid.innerHTML = CATEGORIES.map(c => `
      <a class="cat-card" href="shop.html?cat=${encodeURIComponent(c.key)}" aria-label="Shop ${c.name}">
        <span class="cat-card__emoji">${c.emoji}</span>
        <h3>${c.name}</h3>
        <p>${c.tag}</p>
      </a>`).join("");
  }

  /* ============ RENDER FILTERS ============ */
  const filtersEl = $("#filters");
  const filterList = ["All", ...CATEGORIES.map(c => c.key)];
  if (filtersEl) {
    filtersEl.innerHTML = filterList.map((f, i) =>
      `<button class="filter-chip ${i === 0 ? "is-active" : ""}" data-cat="${f}">${f === "All" ? "All products" : f}</button>`
    ).join("");
    filtersEl.addEventListener("click", (e) => {
      const chip = e.target.closest(".filter-chip");
      if (chip) setFilter(chip.dataset.cat);
    });
  }

  let currentFilter = "All";
  let currentSearch = "";
  let currentSort = "featured";

  function setFilter(cat) {
    currentFilter = cat;
    $$(".filter-chip").forEach(c => c.classList.toggle("is-active", c.dataset.cat === cat));
    renderProducts();
  }

  /* optional sort dropdown (shop page) */
  const sortSelect = $("#sortSelect");
  if (sortSelect) sortSelect.addEventListener("change", () => { currentSort = sortSelect.value; renderProducts(); });

  /* ============ RENDER PRODUCTS ============ */
  const grid = $("#productGrid");
  const emptyMsg = $("#productEmpty");

  function cardHTML(p) {
    const off = Math.round((1 - p.price / p.mrp) * 100);
    const stars = "★".repeat(Math.round(p.rating)) + "☆".repeat(5 - Math.round(p.rating));
    return `
      <article class="product-card reveal" data-id="${p.id}">
        <div class="product-card__media" style="background:${tint(p.cat)}" data-view="${p.id}" role="button" tabindex="0" aria-label="Quick view ${p.name}">
          ${p.badge ? `<span class="product-card__badge">${p.badge}</span>` : ""}
          <button class="product-card__fav ${favs.has(p.id) ? "is-fav" : ""}" data-fav="${p.id}" aria-label="Save ${p.name}">♥</button>
          <img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.remove()">
          <span>${p.emoji}</span>
        </div>
        <div class="product-card__body">
          <span class="product-card__cat">${p.cat}</span>
          <h3 class="product-card__name"><a href="product.html?id=${p.id}">${p.name}</a></h3>
          <p class="product-card__desc">${p.desc}</p>
          <div class="product-card__rating"><span class="stars">${stars}</span> ${p.rating} <span>(${p.reviews})</span></div>
          <div class="product-card__price">
            <span class="now">${money(p.price)}</span>
            <span class="was">${money(p.mrp)}</span>
            <span class="off">${off}% off</span>
          </div>
          <button class="add-btn" data-add="${p.id}">＋ Add to basket</button>
        </div>
      </article>`;
  }

  function renderProducts() {
    if (!grid) return;
    const q = currentSearch.trim().toLowerCase();
    let list = PRODUCTS.filter(p => {
      const matchCat = currentFilter === "All" || p.cat === currentFilter;
      const matchSearch = !q || (p.name + " " + p.desc + " " + p.cat).toLowerCase().includes(q);
      return matchCat && matchSearch;
    });

    if (currentSort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    else if (currentSort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    else if (currentSort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    else if (currentSort === "discount") list = [...list].sort((a, b) => (1 - b.price / b.mrp) - (1 - a.price / a.mrp));

    const countEl = $("#resultCount");
    if (countEl) countEl.textContent = `${list.length} product${list.length === 1 ? "" : "s"}`;

    if (emptyMsg) emptyMsg.hidden = list.length !== 0;
    grid.innerHTML = list.map(cardHTML).join("");
    // staggered entrance per card
    $$(".product-card", grid).forEach((c, i) => c.style.setProperty("--stagger", (i % 4) * 0.08 + "s"));
    observeReveals();
  }

  function tint(cat) {
    const map = {
      Oils: "#fdf3e0", Sweeteners: "#fcefd6", Pulses: "#eef3e2",
      Grains: "#f4efe0", Spices: "#fbeadf", Superfoods: "#eef1ea"
    };
    return map[cat] || "#f2ecdd";
  }

  /* card interactions — delegated at document level so they work in ANY grid */
  document.addEventListener("click", (e) => {
    const addBtn = e.target.closest("[data-add]");
    if (addBtn) { addToCart(+addBtn.dataset.add, addBtn); flyToCart(addBtn.closest(".product-card")); return; }
    const favBtn = e.target.closest("[data-fav]");
    if (favBtn) {
      const id = +favBtn.dataset.fav;
      favs.has(id) ? favs.delete(id) : favs.add(id);
      saveFavs();
      favBtn.classList.toggle("is-fav");
      return;
    }
    const media = e.target.closest("[data-view]");
    if (media) openQuickView(+media.dataset.view);
  });
  document.addEventListener("keydown", (e) => {
    const media = e.target.closest && e.target.closest("[data-view]");
    if (media && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openQuickView(+media.dataset.view); }
  });

  /* ============ FLY TO CART ============ */
  function flyToCart(card) {
    if (!card || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const p = PRODUCTS.find(x => x.id === +card.dataset.id);
    const from = card.querySelector(".product-card__media").getBoundingClientRect();
    const to = $("#cartToggle").getBoundingClientRect();
    const dot = document.createElement("div");
    dot.className = "fly-dot";
    const imgEl = card.querySelector(".product-card__media img");
    if (imgEl && imgEl.complete && imgEl.naturalWidth) dot.style.backgroundImage = `url("${imgEl.src}")`;
    else dot.textContent = p ? p.emoji : "🛒";
    dot.style.left = from.left + from.width / 2 - 23 + "px";
    dot.style.top = from.top + from.height / 2 - 23 + "px";
    document.body.appendChild(dot);
    requestAnimationFrame(() => {
      const dx = to.left + to.width / 2 - (from.left + from.width / 2);
      const dy = to.top + to.height / 2 - (from.top + from.height / 2);
      dot.style.transform = `translate(${dx}px,${dy}px) scale(.15)`;
      dot.style.opacity = "0";
    });
    setTimeout(() => dot.remove(), 850);
  }

  /* ============ QUICK VIEW ============ */
  const qv = $("#qv");
  let qvId = null, qvQty = 1;
  function openQuickView(id) {
    const p = PRODUCTS.find(x => x.id === id);
    if (!p) return;
    qvId = id; qvQty = 1;
    $("#qvQty").textContent = "1";
    $("#qvCat").textContent = p.cat;
    $("#qvName").textContent = p.name;
    $("#qvDesc").textContent = p.desc + " Sourced with care from our partner farms — certified organic, clean-label and traceable to origin.";
    const stars = "★".repeat(Math.round(p.rating)) + "☆".repeat(5 - Math.round(p.rating));
    $("#qvRating").innerHTML = `<span class="stars">${stars}</span> ${p.rating} <span>(${p.reviews} reviews)</span>`;
    const off = Math.round((1 - p.price / p.mrp) * 100);
    $("#qvPrice").innerHTML = `<span class="now">${money(p.price)}</span><span class="was">${money(p.mrp)}</span><span class="off">${off}% off</span>`;
    $("#qvMedia").style.background = tint(p.cat);
    $("#qvMedia").innerHTML = `<img src="${p.img}" alt="${p.name}" onerror="this.remove()"><span>${p.emoji}</span>`;
    qv.classList.add("show");
    qv.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    $("#qvClose").focus();
  }
  function closeQuickView() {
    qv.classList.remove("show");
    qv.setAttribute("aria-hidden", "true");
    if (!cartEl.classList.contains("show")) document.body.style.overflow = "";
  }
  $("#qvClose").addEventListener("click", closeQuickView);
  qv.addEventListener("click", (e) => { if (e.target === qv) closeQuickView(); });
  $("#qvInc").addEventListener("click", () => { qvQty++; $("#qvQty").textContent = qvQty; });
  $("#qvDec").addEventListener("click", () => { if (qvQty > 1) { qvQty--; $("#qvQty").textContent = qvQty; } });
  $("#qvAdd").addEventListener("click", () => {
    if (qvId == null) return;
    for (let i = 0; i < qvQty; i++) addToCart(qvId);
    closeQuickView();
    openCart();
  });

  /* ============ CART LOGIC ============ */
  const cartEl = $("#cart");
  const overlay = $("#overlay");

  function addToCart(id, btn) {
    const line = cart.find(i => i.id === id);
    if (line) line.qty++;
    else cart.push({ id, qty: 1 });
    saveCart();
    renderCart();
    bumpCount();
    if (btn) {
      const orig = btn.innerHTML;
      btn.innerHTML = "✓ Added";
      btn.classList.add("is-added");
      setTimeout(() => { btn.innerHTML = orig; btn.classList.remove("is-added"); }, 1100);
    }
    const p = PRODUCTS.find(x => x.id === id);
    toast(`${p.emoji} ${p.name} added`);
  }

  function changeQty(id, delta) {
    const line = cart.find(i => i.id === id);
    if (!line) return;
    line.qty += delta;
    if (line.qty <= 0) cart = cart.filter(i => i.id !== id);
    saveCart();
    renderCart();
    bumpCount();
  }

  function removeItem(id) {
    cart = cart.filter(i => i.id !== id);
    saveCart();
    renderCart();
    bumpCount();
  }

  function cartTotals() {
    let count = 0, subtotal = 0;
    cart.forEach(i => {
      const p = PRODUCTS.find(x => x.id === i.id);
      if (!p) return;
      count += i.qty;
      subtotal += p.price * i.qty;
    });
    return { count, subtotal };
  }

  function renderCart() {
    const itemsEl = $("#cartItems");
    const empty = $("#cartEmpty");
    const foot = $("#cartFoot");
    const { subtotal } = cartTotals();

    if (cart.length === 0) {
      itemsEl.innerHTML = "";
      empty.style.display = "flex";
      foot.hidden = true;
    } else {
      empty.style.display = "none";
      foot.hidden = false;
      itemsEl.innerHTML = cart.map(i => {
        const p = PRODUCTS.find(x => x.id === i.id);
        return `
        <div class="cart-item">
          <div class="cart-item__media"><img src="${p.img}" alt="" onerror="this.remove()"><span>${p.emoji}</span></div>
          <div>
            <div class="cart-item__name">${p.name}</div>
            <div class="cart-item__price">${money(p.price)}</div>
            <div class="cart-item__qty">
              <button data-dec="${p.id}" aria-label="Decrease">−</button>
              <span>${i.qty}</span>
              <button data-inc="${p.id}" aria-label="Increase">＋</button>
            </div>
          </div>
          <div>
            <div class="cart-item__line">${money(p.price * i.qty)}</div>
            <button class="cart-item__remove" data-remove="${p.id}">Remove</button>
          </div>
        </div>`;
      }).join("");
      $("#cartSubtotal").textContent = money(subtotal);
    }

    // free-shipping progress
    const remaining = Math.max(0, FREE_SHIP - subtotal);
    const pct = Math.min(100, (subtotal / FREE_SHIP) * 100);
    $("#shipBar").style.width = pct + "%";
    $("#shipMsg").innerHTML = remaining > 0
      ? `Add <b>${money(remaining)}</b> more for free delivery 🚚`
      : `🎉 You've unlocked <b>free delivery!</b>`;
  }

  $("#cartItems").addEventListener("click", (e) => {
    const inc = e.target.closest("[data-inc]");
    const dec = e.target.closest("[data-dec]");
    const rem = e.target.closest("[data-remove]");
    if (inc) changeQty(+inc.dataset.inc, 1);
    if (dec) changeQty(+dec.dataset.dec, -1);
    if (rem) removeItem(+rem.dataset.remove);
  });

  function bumpCount() {
    const { count } = cartTotals();
    const el = $("#cartCount");
    el.textContent = count;
    el.classList.toggle("show", count > 0);
    el.classList.remove("pop");
    void el.offsetWidth;
    if (count > 0) el.classList.add("pop");
  }

  /* open / close cart */
  function openCart() { cartEl.classList.add("show"); overlay.hidden = false; requestAnimationFrame(() => overlay.classList.add("show")); cartEl.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; }
  function closeCart() { cartEl.classList.remove("show"); overlay.classList.remove("show"); cartEl.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; setTimeout(() => { if (!cartEl.classList.contains("show")) overlay.hidden = true; }, 350); }

  $("#cartToggle").addEventListener("click", openCart);
  $("#cartClose").addEventListener("click", closeCart);
  overlay.addEventListener("click", () => { closeCart(); closeNav(); });
  $("#cartEmptyShop").addEventListener("click", () => { closeCart(); location.href = "shop.html"; });
  const drawerCheckout = $("#checkoutBtn");
  if (drawerCheckout) drawerCheckout.addEventListener("click", () => {
    if (cart.length === 0) { toast("Your basket is empty 🧺"); return; }
    location.href = "checkout.html";
  });

  /* ============ TOAST ============ */
  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2400);
  }

  /* ============ SEARCH (pages with a searchbar) ============ */
  const searchbar = $("#searchbar");
  if (searchbar) {
    $("#searchToggle").addEventListener("click", () => {
      const open = !searchbar.hidden;
      searchbar.hidden = open;
      if (!open) setTimeout(() => $("#searchInput").focus(), 50);
    });
    $("#searchClose").addEventListener("click", () => { searchbar.hidden = true; currentSearch = ""; $("#searchInput").value = ""; renderProducts(); });
    $("#searchInput").addEventListener("input", (e) => {
      currentSearch = e.target.value;
      if (currentFilter !== "All") setFilter("All");
      else renderProducts();
      const shopSec = $("#shop");
      if (currentSearch && shopSec) shopSec.scrollIntoView({ behavior: "smooth" });
    });
  }

  /* ============ HERO CAROUSEL (home page only) ============ */
  const slides = $$(".hero__slide");
  const dotsWrap = $("#heroDots");
  if (slides.length && dotsWrap) {
    let heroIndex = 0, heroTimer;
    dotsWrap.innerHTML = slides.map((_, i) => `<button role="tab" aria-label="Slide ${i + 1}" class="${i === 0 ? "is-active" : ""}"></button>`).join("");
    const heroDots = $$("#heroDots button");

    const goHero = (i) => {
      heroIndex = (i + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle("is-active", k === heroIndex));
      heroDots.forEach((d, k) => d.classList.toggle("is-active", k === heroIndex));
    };
    const nextHero = () => goHero(heroIndex + 1);
    const stopHero = () => clearInterval(heroTimer);
    const startHero = () => { stopHero(); heroTimer = setInterval(nextHero, 5500); };

    $("#heroNext").addEventListener("click", () => { nextHero(); startHero(); });
    $("#heroPrev").addEventListener("click", () => { goHero(heroIndex - 1); startHero(); });
    heroDots.forEach((d, i) => d.addEventListener("click", () => { goHero(i); startHero(); }));
    $("#hero").addEventListener("mouseenter", stopHero);
    $("#hero").addEventListener("mouseleave", startHero);
    startHero();
  }

  // hero buttons that also set a filter
  $$("[data-filter]").forEach(b => b.addEventListener("click", () => setFilter(b.dataset.filter)));

  /* ============ TESTIMONIALS (home page only) ============ */
  const track = $("#reviewsTrack");
  if (track) {
    track.innerHTML = REVIEWS.map(r => `
      <div class="review-card">
        <div class="stars">${"★".repeat(r.stars)}</div>
        <blockquote>“${r.text}”</blockquote>
        <div class="review-card__who">
          <div class="review-card__avatar">${r.initial}</div>
          <div style="text-align:left">
            <div class="review-card__name">${r.name}</div>
            <div class="review-card__role">${r.role}</div>
          </div>
        </div>
      </div>`).join("");
    const rDots = $("#reviewsDots");
    rDots.innerHTML = REVIEWS.map((_, i) => `<button aria-label="Review ${i + 1}" class="${i === 0 ? "is-active" : ""}"></button>`).join("");
    const reviewDots = $$("#reviewsDots button");
    let rIndex = 0, rTimer;
    const goReview = (i) => {
      rIndex = (i + REVIEWS.length) % REVIEWS.length;
      track.style.transform = `translateX(-${rIndex * 100}%)`;
      reviewDots.forEach((d, k) => d.classList.toggle("is-active", k === rIndex));
    };
    const stopReviews = () => clearInterval(rTimer);
    const startReviews = () => { stopReviews(); rTimer = setInterval(() => goReview(rIndex + 1), 5000); };
    reviewDots.forEach((d, i) => d.addEventListener("click", () => { goReview(i); startReviews(); }));
    startReviews();
  }

  /* ============ CERTIFICATIONS MARQUEE ============ */
  const certsRow = $("#certsRow");
  if (certsRow) {
    const certHTML = CERTS.map(c => `<div class="cert-chip"><span>${c.icon}</span>${c.label}</div>`).join("");
    certsRow.innerHTML = certHTML + certHTML; // duplicate for seamless loop
  }

  /* ============ NEWSLETTER ============ */
  const newsForm = $("#newsletterForm");
  if (newsForm) newsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = $("#emailInput");
    const msg = $("#newsletterMsg");
    const val = input.value.trim();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    if (!ok) {
      msg.textContent = "Please enter a valid email address.";
      msg.classList.add("error");
      return;
    }
    msg.classList.remove("error");
    msg.textContent = "🌿 You're in! Check your inbox for your 5% code.";
    input.value = "";
    toast("Subscribed — welcome to Anior!");
  });

  /* ============ MOBILE NAV ============ */
  const burger = $("#burgerBtn");
  const nav = $("#mainNav");
  function openNav() { nav.classList.add("show"); header.classList.add("nav-open"); overlay.hidden = false; requestAnimationFrame(() => overlay.classList.add("show")); burger.setAttribute("aria-expanded", "true"); document.body.style.overflow = "hidden"; }
  function closeNav() { nav.classList.remove("show"); header.classList.remove("nav-open"); burger.setAttribute("aria-expanded", "false"); if (!cartEl.classList.contains("show")) { overlay.classList.remove("show"); setTimeout(() => { if (!cartEl.classList.contains("show")) overlay.hidden = true; }, 350); } document.body.style.overflow = ""; }
  burger.addEventListener("click", () => nav.classList.contains("show") ? closeNav() : openNav());

  /* smooth-scroll nav links + close panels */
  $$("[data-nav]").forEach(a => a.addEventListener("click", (e) => {
    const href = a.getAttribute("href");
    if (href && href.startsWith("#")) {
      const target = $(href);
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: "smooth" }); }
    }
    closeNav();
  }));

  /* ============ HEADER SHADOW + BACK TO TOP ============ */
  const header = $("#header");
  const toTop = $("#toTop");
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    header.classList.toggle("is-stuck", y > 10);
    toTop.classList.toggle("show", y > 600);
  }, { passive: true });
  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* Esc closes overlays */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closeCart(); closeNav(); closeQuickView(); if (!searchbar.hidden) { searchbar.hidden = true; } }
  });

  /* ============ SCROLL REVEAL ============ */
  let io;
  function observeReveals() {
    if (!("IntersectionObserver" in window)) { $$(".reveal").forEach(el => el.classList.add("in")); return; }
    if (!io) io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    $$(".reveal:not(.in)").forEach(el => io.observe(el));
  }

  /* ============ FLOATING LEAVES (hero) ============ */
  (function leaves() {
    const wrap = $("#heroLeaves");
    if (!wrap || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const glyphs = ["🍃", "🌿", "🍂"];
    const n = innerWidth < 640 ? 6 : 10;
    let html = "";
    for (let i = 0; i < n; i++) {
      const left = Math.random() * 100;
      const dur = 9 + Math.random() * 8;
      const delay = Math.random() * -16;
      const size = 0.9 + Math.random() * 0.9;
      html += `<span class="leaf" style="left:${left}%;font-size:${size}rem;animation-duration:${dur}s;animation-delay:${delay}s">${glyphs[i % glyphs.length]}</span>`;
    }
    wrap.innerHTML = html;
  })();

  /* ============ ANIMATED STAT COUNTERS ============ */
  (function counters() {
    const statsEl = $("#storyStats");
    if (!statsEl) return;
    const run = () => {
      $$("[data-count]", statsEl).forEach(el => {
        const target = +el.dataset.count;
        const suffix = el.dataset.suffix || "";
        const dur = 1400;
        const t0 = performance.now();
        const step = (t) => {
          const p = Math.min(1, (t - t0) / dur);
          const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
          el.textContent = Math.round(target * eased) + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    };
    if (!("IntersectionObserver" in window)) { run(); return; }
    const obs = new IntersectionObserver((en) => {
      if (en[0].isIntersecting) { run(); obs.disconnect(); }
    }, { threshold: 0.4 });
    obs.observe(statsEl);
  })();

  /* ============ RIPPLE ON TAP ============ */
  document.addEventListener("click", (e) => {
    const el = e.target.closest(".btn, .add-btn, .filter-chip, .cat-card");
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const d = Math.max(rect.width, rect.height);
    const r = document.createElement("span");
    r.className = "ripple";
    r.style.width = r.style.height = d + "px";
    r.style.left = (e.clientX - rect.left - d / 2) + "px";
    r.style.top = (e.clientY - rect.top - d / 2) + "px";
    el.appendChild(r);
    setTimeout(() => r.remove(), 600);
  });

  /* stagger the value cards */
  $$(".values__grid .reveal").forEach((c, i) => c.style.setProperty("--stagger", i * 0.1 + "s"));

  /* ============ PRODUCT DETAIL PAGE ============ */
  const pdpEl = $("#pdp");
  if (pdpEl) {
    const pid = +new URLSearchParams(location.search).get("id") || 1;
    const p = PRODUCTS.find(x => x.id === pid) || PRODUCTS[0];
    let pdpQty = 1;

    document.title = `${p.name} — Anior Organic`;
    $("#pdpCrumb").textContent = p.name;
    $("#pdpCat").textContent = p.cat;
    $("#pdpName").textContent = p.name;
    const stars = "★".repeat(Math.round(p.rating)) + "☆".repeat(5 - Math.round(p.rating));
    $("#pdpRating").innerHTML = `<span class="stars">${stars}</span> ${p.rating} <span>(${p.reviews} reviews)</span>`;
    const off = Math.round((1 - p.price / p.mrp) * 100);
    $("#pdpPrice").innerHTML = `<span class="now">${money(p.price)}</span><span class="was">${money(p.mrp)}</span><span class="off">${off}% off</span>`;
    $("#pdpDesc").textContent = p.desc + " Sourced directly from our partner farms, tested in NABL-accredited labs, and packed in small batches so it reaches you fresh. Certified organic, clean-label and fully traceable to origin.";
    const mediaEl = $("#pdpMedia");
    mediaEl.style.background = tint(p.cat);
    mediaEl.innerHTML = `${p.badge ? `<span class="product-card__badge">${p.badge}</span>` : ""}<img src="${p.img}" alt="${p.name}" onerror="this.remove()"><span class="pdp__emoji">${p.emoji}</span>`;

    $("#pdpInc").addEventListener("click", () => { pdpQty++; $("#pdpQty").textContent = pdpQty; });
    $("#pdpDec").addEventListener("click", () => { if (pdpQty > 1) { pdpQty--; $("#pdpQty").textContent = pdpQty; } });
    $("#pdpAdd").addEventListener("click", () => {
      for (let i = 0; i < pdpQty; i++) addToCart(p.id);
      openCart();
    });
    $("#pdpBuy").addEventListener("click", () => {
      for (let i = 0; i < pdpQty; i++) addToCart(p.id);
      location.href = "checkout.html";
    });

    // related products: same category first, then top-rated others
    const relatedGrid = $("#relatedGrid");
    if (relatedGrid) {
      const related = [
        ...PRODUCTS.filter(x => x.cat === p.cat && x.id !== p.id),
        ...PRODUCTS.filter(x => x.cat !== p.cat && x.id !== p.id).sort((a, b) => b.rating - a.rating),
      ].slice(0, 4);
      relatedGrid.innerHTML = related.map(cardHTML).join("");
      $$(".product-card", relatedGrid).forEach((c, i) => c.style.setProperty("--stagger", i * 0.08 + "s"));
    }
  }

  /* ============ CHECKOUT PAGE ============ */
  const checkoutForm = $("#checkoutForm");
  if (checkoutForm) {
    const summaryEl = $("#summaryItems");
    const renderSummary = () => {
      const { subtotal } = cartTotals();
      const shipping = subtotal >= FREE_SHIP || subtotal === 0 ? 0 : 60;
      if (cart.length === 0) {
        $("#checkoutWrap").hidden = true;
        $("#checkoutEmpty").hidden = false;
        return;
      }
      summaryEl.innerHTML = cart.map(i => {
        const p = PRODUCTS.find(x => x.id === i.id);
        return `
        <div class="sum-item">
          <div class="cart-item__media"><img src="${p.img}" alt="" onerror="this.remove()"><span>${p.emoji}</span><b class="sum-item__qty">${i.qty}</b></div>
          <div class="sum-item__name">${p.name}</div>
          <div class="sum-item__price">${money(p.price * i.qty)}</div>
        </div>`;
      }).join("");
      $("#sumSubtotal").textContent = money(subtotal);
      $("#sumShipping").textContent = shipping === 0 ? "Free 🎉" : money(shipping);
      $("#sumTotal").textContent = money(subtotal + shipping);
    };
    renderSummary();

    // celebratory leaf confetti on order success
    const confettiBurst = () => {
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const glyphs = ["🌿", "🍃", "✨", "💚"];
      for (let i = 0; i < 24; i++) {
        const s = document.createElement("span");
        s.className = "confetti";
        s.textContent = glyphs[i % glyphs.length];
        s.style.left = Math.random() * 100 + "vw";
        s.style.animationDuration = 2.2 + Math.random() * 1.6 + "s";
        s.style.animationDelay = Math.random() * 0.6 + "s";
        s.style.fontSize = 0.9 + Math.random() * 1 + "rem";
        document.body.appendChild(s);
        setTimeout(() => s.remove(), 4600);
      }
    };

    // live validation styling
    checkoutForm.addEventListener("input", (e) => {
      if (e.target.matches("[required]")) e.target.classList.toggle("invalid", !e.target.checkValidity());
    });

    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!checkoutForm.checkValidity()) { checkoutForm.reportValidity(); return; }
      const orderId = "AO" + Date.now().toString().slice(-8);
      $("#orderId").textContent = orderId;
      cart = [];
      saveCart();
      renderCart();
      bumpCount();
      $("#checkoutWrap").hidden = true;
      $("#orderSuccess").hidden = false;
      window.scrollTo({ top: 0, behavior: "smooth" });
      confettiBurst();
    });
  }

  /* ============ CONTACT PAGE ============ */
  const contactForm = $("#contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!contactForm.checkValidity()) { contactForm.reportValidity(); return; }
      contactForm.hidden = true;
      $("#contactSuccess").hidden = false;
      toast("Message sent — we'll reply within 24 hrs 🌿");
    });
  }

  /* ============ INIT ============ */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // apply ?cat=... from URL (used when navigating from home to shop page)
  const urlCat = new URLSearchParams(location.search).get("cat");
  renderProducts();
  if (urlCat && filterList.includes(urlCat)) setFilter(urlCat);

  renderCart();
  bumpCount();
  observeReveals();
})();
