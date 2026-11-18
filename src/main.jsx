import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { byId, categories, dining, diningCategory, featured, item, media, money, products, shop } from './catalog.js';
import { guidePath, guides } from './journal.js';
import { useScrollReveal } from './motion.js';
import './styles.css';
import './motion.css';

const iconPaths = {
  search: <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></>,
  heart: <path d="M20.8 5.9c-2.2-2.2-5.5-1.8-8.8 1.5C8.7 4.1 5.4 3.7 3.2 5.9a5.2 5.2 0 0 0 0 7.4L12 22l8.8-8.7a5.2 5.2 0 0 0 0-7.4Z"/>,
  user: <><circle cx="12" cy="7" r="4"/><path d="M3.8 22c.8-4.6 3.6-7 8.2-7s7.4 2.4 8.2 7"/></>,
  bag: <><rect x="4" y="7" width="16" height="14" rx="2"/><path d="M8 10V6a4 4 0 0 1 8 0v4"/></>,
  close: <path d="m5 5 14 14M19 5 5 19"/>,
  menu: <path d="M3 6h18M3 12h18M3 18h18"/>,
  pause: <path d="M9 5v14m6-14v14"/>,
  play: <path d="m8 5 12 7-12 7Z"/>,
  arrow: <path d="M4 12h15m-6-6 6 6-6 6"/>,
  truck: <><path d="M2 5h13v12H2zm13 5h4l3 3v4h-7"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></>,
  return: <><path d="M4 10h11a5 5 0 0 1 0 10h-3M4 10l5-5M4 10l5 5"/></>,
  care: <><path d="M20 4C11 4 5 8 5 14a5 5 0 0 0 5 5c6 0 10-6 10-15ZM4 20l9-9"/></>,
  check: <path d="m4 12 5 5L20 6"/>,
};

function Icon({ name }) {
  return <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{iconPaths[name]}</svg>;
}

function useStored(key, initial) {
  const [value, setValue] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) ?? initial; } catch { return initial; }
  });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* Storage is optional. */ } }, [key, value]);
  return [value, setValue];
}

const links = [...categories, diningCategory];
const allCategory = { id: 'all', name: 'Shop All', description: 'Explore our complete collection of furniture, lighting and objects for the home.' };
const brand = 'Settle';

function Header({ total, current }) {
  const search = useRef(null);
  const menu = useRef(null);
  return <>
    <a href="#main" className="skip">Skip to content</a>
    <div className="announcement"><a href="/help/">UK delivery and returns</a></div>
    <header className="header">
      <button className="icon-button mobile-menu" aria-label="Open menu" onClick={() => menu.current.showModal()}><Icon name="menu"/></button>
      <a className="wordmark" href="/" aria-label={brand}>{brand}</a>
      <nav aria-label="Main navigation">
        {categories.map(category => <a href={shop(category.id)} key={category.id} aria-current={current === category.id ? 'page' : undefined}>{category.name}</a>)}
      </nav>
      <div className="header-actions">
        <button className="icon-button search-button" aria-label="Search" onClick={() => search.current.showModal()}><span>Search</span><Icon name="search"/></button>
        <a className="icon-button" href="/favourites/" aria-label="Favourites"><Icon name="heart"/></a>
        <a className="icon-button account-link" href="/account/" aria-label="My account"><Icon name="user"/></a>
        <a className="icon-button bag-icon" href="/bag/" aria-label={`Shopping bag, ${total} items`}><Icon name="bag"/>{total > 0 && <span key={total}>{total}</span>}</a>
      </div>
    </header>
    <dialog ref={search} className="search-dialog" aria-labelledby="search-title">
      <button className="icon-button close-dialog" onClick={() => search.current.close()} aria-label="Close search"><Icon name="close"/></button>
      <h2 id="search-title">Find something for home</h2>
      <form action={shop()} className="search-form"><input name="q" type="search" placeholder="Try ‘oak’, ‘sofa’ or ‘lighting’" aria-label="Search products" required autoFocus/><button className="button">Search</button></form>
      <div className="dialog-links">{links.map(({id, name}) => <a key={id} href={shop(id)}>{name}</a>)}</div>
    </dialog>
    <dialog ref={menu} className="menu-dialog" aria-label="Shop menu">
      <button className="icon-button close-dialog" onClick={() => menu.current.close()} aria-label="Close menu"><Icon name="close"/></button>
      <p className="wordmark">{brand}</p>
      {[allCategory, ...links].map(({id, name}) => <a key={id} href={shop(id)}>{name}<Icon name="arrow"/></a>)}
      <a href="/account/">My account<Icon name="arrow"/></a>
    </dialog>
  </>;
}

function Footer() {
  return <footer className="footer">
    <div className="footer-grid wrap">
      <div><a className="wordmark" href="/">{brand}</a><p>Contemporary furniture and objects for home.</p></div>
      <div><h3>How can we help</h3><a href="/help/#delivery">Delivery information</a><a href="/help/#returns">Returns</a><a href="/help/#faq">Frequently asked questions</a></div>
      <div><h3>About us</h3><a href="/inspiration/">Inspiration</a><a href="/journal/">Design journal</a><a href="/account/">My account</a><a href="/help/#privacy">Privacy</a></div>
      <div><h3>Shop by department</h3><a href={shop()}>Shop all</a>{links.map(({id, name}) => <a key={id} href={shop(id)}>{name}</a>)}</div>
    </div>
    <div className="footer-bottom wrap"><span>© {brand} {new Date().getFullYear()}</span><span>United Kingdom · GBP £</span></div>
  </footer>;
}

function ProductCard({ product, favourites, toggleFavourite }) {
  const { id, name, type, colour, price } = product;
  const saved = favourites.includes(id);
  return <article className="product-card">
    <a className="product-image" href={item(product)} aria-label={`${name} ${type}`}><img src={media(id)} alt={`${name} ${type} in ${colour}`} loading="lazy" width="396" height="470"/></a>
    <button className={`icon-button favourite ${saved ? 'saved' : ''}`} aria-pressed={saved} aria-label={`${saved ? 'Remove' : 'Save'} ${name} ${saved ? 'from' : 'to'} favourites`} onClick={() => toggleFavourite(id)}><Icon name="heart"/></button>
    <a className="product-text" href={item(product)}><strong>{name}</strong><span>{type}, {colour}</span><span className="price">{money(price)}</span></a>
  </article>;
}

function ProductGrid({ list, shopState, className = '' }) {
  const grid = useRef(null);
  useScrollReveal(grid, '.product-card', list.map(product => product.id).join(','));
  return <div ref={grid} className={`product-grid ${className}`}>{list.map(product => <ProductCard key={product.id} product={product} {...shopState}/>)}</div>;
}

function Hero() {
  const video = useRef(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      if (preference.matches) video.current?.pause();
      else video.current?.play().catch(() => {});
    };
    sync();
    preference.addEventListener('change', sync);
    return () => preference.removeEventListener('change', sync);
  }, []);
  return <section className="hero" aria-label="The dining collection">
    <video ref={video} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} muted playsInline loop preload="metadata" poster={media('dining-hero-slate')} src="/media/dining-hero-slate.mp4"/>
    <div className="hero-scrim"/>
    <div className="hero-copy"><h1>Room for good company</h1><a href={shop('dining')}>Shop dining</a></div>
    <button className="icon-button video-toggle" aria-label={playing ? 'Pause video' : 'Play video'} onClick={() => {
      if (video.current.paused) video.current.play().catch(() => {});
      else video.current.pause();
    }}><Icon name={playing ? 'pause' : 'play'}/></button>
  </section>;
}

function Collection() {
  return <section className="collection">
    <div className="collection-copy"><span className="eyebrow">Introducing</span><h2>The Stillwood Edit</h2><p>Curved velvet seating, dark oak and pale stone bring texture to a cool, quiet living room.</p><a className="text-link" href={shop('sofas')}>Shop the collection</a></div>
    <a href={shop('sofas')} className="collection-image"><img src={media('stillwood-slate')} alt="Blue-green velvet sofa beside a pale travertine coffee table" loading="lazy" width="1200" height="900"/></a>
  </section>;
}

const newArrivals = ['sofas-2', 'furniture-1', 'lighting-3', 'textiles-2'].map(id => byId[id]);
const sampleReviews = [
  { id: 'sofas-2', rating: 5, title: 'Room to stretch out', quote: 'The moss velvet gives the room some colour, and the wide seat is just right for an evening with a book.' },
  { id: 'furniture-1', rating: 5, title: 'Works for weekday dinners, too', quote: 'The oval ends make it easy to walk around the table, even with the chairs pulled out.' },
  { id: 'lighting-3', rating: 4, title: 'A softer light for the evening', quote: 'The linen shade gives a warm glow. I use it on the sideboard when the overhead light feels too bright.' },
];
const services = [
  { id: 'delivery', icon: 'truck', name: 'UK delivery', description: 'See the standard delivery charge used in our demo checkout.' },
  { id: 'returns', icon: 'return', name: 'Returns', description: 'Find out how returns work for demo orders.' },
  { id: 'care', icon: 'care', name: 'Furniture care', description: 'Everyday care for upholstery, wood and ceramics.' },
];

function JournalCards({ heading: Heading = 'h3' }) {
  return <div className="journal-grid">
    {guides.map(guide => <article className="journal-card" key={guide.slug}>
      <a href={guidePath(guide)}>
        <img className={`journal-image journal-image--${guide.category}`} src={media(guide.image)} alt="" loading="lazy"/>
        <span className="eyebrow">{guide.topic}</span>
        <Heading className="journal-card-title">{guide.title}</Heading>
        <span className="text-link">Read the guide</span>
      </a>
    </article>)}
  </div>;
}

function HomeReviews() {
  return <section className="reviews" aria-labelledby="reviews-title">
    <div className="wrap">
      <h2 id="reviews-title">Reviews</h2>
      <p className="reviews-note">Sample reviews for this demo store</p>
      <div className="review-grid">
        {sampleReviews.map(({ id, rating, title, quote }) => {
          const product = byId[id];
          return <article className="review-card" key={id}>
            <div className="review-rating" role="img" aria-label={`${rating} out of 5 stars`}><span aria-hidden="true">{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</span></div>
            <h3>{title}</h3>
            <blockquote>{quote}</blockquote>
            <a className="text-link" href={item(product)}>{product.name} {product.type}</a>
          </article>;
        })}
      </div>
    </div>
  </section>;
}

function DeliveryAndCare() {
  return <section className="service-section" aria-labelledby="service-title">
    <div className="wrap">
      <h2 id="service-title">Delivery and care</h2>
      <div className="service-grid">
        {services.map(({ id, icon, name, description }) => <a href={`/help/#${id}`} className="service-card" key={id}>
          <Icon name={icon}/><div><h3>{name}</h3><p>{description}</p></div><Icon name="arrow"/>
        </a>)}
      </div>
    </div>
  </section>;
}

function Home({ shopState }) {
  const departments = [
    { id: 'furniture', label: 'Shop furniture', image: 'furniture-3' },
    { id: 'dining', label: 'Shop dining', image: 'furniture-2' },
    { id: 'textiles', label: 'Shop soft furnishings', image: 'textiles-3' },
    { id: 'lighting', label: 'Shop lighting', image: 'lighting-2' },
  ];
  return <>
    <Hero/>
    <div className="campaign-strip"><a href={shop()}>Discover the collection <Icon name="arrow"/></a></div>
    <section className="featured wrap"><h2>Top picks</h2><ProductGrid list={featured} shopState={shopState} className="featured-grid"/></section>
    <section className="department-grid wrap" aria-label="Shop by department">
      {departments.map(({ id, label, image }) => <a href={shop(id)} key={id}>
        <img src={media(image)} alt="" loading="lazy" width="396" height="470"/><span>{label}</span>
      </a>)}
    </section>
    <Collection/>
    <section className="home-arrivals wrap" aria-labelledby="arrivals-title">
      <div className="section-heading"><h2 id="arrivals-title">New In</h2><a className="text-link" href={`${shop()}?new=1`}>Shop all new arrivals</a></div>
      <ProductGrid list={newArrivals} shopState={shopState}/>
    </section>
    <section className="home-journal wrap" aria-labelledby="journal-title">
      <div className="section-heading"><h2 id="journal-title">Design Journal</h2><a className="text-link" href="/journal/">View the journal</a></div>
      <JournalCards/>
    </section>
    <HomeReviews/>
    <section className="explore wrap"><h2>More to explore</h2><nav aria-label="Explore more collections">{[allCategory, ...links].map(({id, name}) => <a key={id} href={shop(id)}>{name}</a>)}</nav></section>
    <DeliveryAndCare/>
  </>;
}

function Breadcrumb({ steps }) {
  return <div className="breadcrumb"><nav className="wrap" aria-label="Breadcrumb"><a href="/">Home</a>{steps.map(([label, href]) => <React.Fragment key={label}><span aria-hidden="true">/</span>{href ? <a href={href}>{label}</a> : <span aria-current="page">{label}</span>}</React.Fragment>)}</nav></div>;
}

function Catalogue({ category, query, newOnly, shopState }) {
  const [sort, setSort] = useState('relevant');
  const [filters, setFilters] = useState({ category: '', colour: '', material: '', price: '', isNew: newOnly });
  const group = category.id === 'all' ? products : category.id === 'dining' ? dining : products.filter(p => p.category === category.id);
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const matches = group.filter(product => {
    const text = [product.name, product.type, product.colour, product.material, categories.find(c => c.id === product.category)?.name].join(' ').toLowerCase();
    return terms.every(term => text.includes(term));
  });
  const list = matches.filter(product =>
    (!filters.category || product.category === filters.category) &&
    (!filters.colour || product.colour === filters.colour) &&
    (!filters.material || product.material === filters.material) &&
    (!filters.isNew || product.isNew) &&
    (!filters.price || product.price <= Number(filters.price)),
  );
  if (sort === 'low') list.sort((a, b) => a.price - b.price);
  if (sort === 'high') list.sort((a, b) => b.price - a.price);
  if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
  const select = (key, label, options) => <select aria-label={label} value={filters[key]} onChange={e => setFilters({...filters, [key]: e.target.value})}><option value="">{label}</option>{options.map(([value, name]) => <option key={value} value={value}>{name}</option>)}</select>;
  const optionsFor = key => [...new Set(matches.map(p => p[key]))].sort().map(value => [value, value]);
  return <>
    <Breadcrumb steps={[[query ? 'Search' : category.name]]}/>
    <section className="catalogue wrap">
      <div className="catalogue-heading"><h1>{query ? `Search results for “${query}”` : category.name} <span aria-live="polite">({list.length})</span></h1>
      <label className="sort">Sort <select value={sort} onChange={e => setSort(e.target.value)}><option value="relevant">Most relevant</option><option value="low">Price low to high</option><option value="high">Price high to low</option><option value="name">Name A–Z</option></select></label></div>
      {!query && <p className="catalogue-description">{category.description}</p>}
      <nav aria-label="Product categories" className="catalogue-links">{[allCategory, ...links].map(({id, name}) => <a href={shop(id)} key={id} aria-current={category.id === id ? 'page' : undefined}>{name}</a>)}</nav>
      <div className="filter-bar">
        <label><input type="checkbox" checked={filters.isNew} onChange={e => setFilters({...filters, isNew: e.target.checked})}/> New in ({matches.filter(p => p.isNew).length})</label>
        {select('category', 'Category', categories.filter(c => matches.some(p => p.category === c.id)).map(({id, name}) => [id, name]))}
        {select('colour', 'Colour', optionsFor('colour'))}
        {select('material', 'Material', optionsFor('material'))}
        {select('price', 'Price', [[100, 'Up to £100'], [250, 'Up to £250'], [500, 'Up to £500'], [1000, 'Up to £1,000']])}
        <button onClick={() => setFilters({ category: '', colour: '', material: '', price: '', isNew: false })}>Clear filters</button>
      </div>
      {list.length ? <ProductGrid list={list} shopState={shopState}/> : <div className="empty"><h2>No products found</h2><p>Try another search or clear your filters.</p><a className="button" href={shop()}>Shop all</a></div>}
    </section>
  </>;
}

function Product({ product, shopState, add }) {
  const [quantity, setQuantity] = useState(1);
  const [zoomed, setZoomed] = useState(false);
  const dialog = useRef(null);
  const category = categories.find(c => c.id === product.category);
  const saved = shopState.favourites.includes(product.id);
  return <>
    <Breadcrumb steps={[[category.name, shop(category.id)], [product.name]]}/>
    <section className="detail wrap">
      <button className="detail-photo" aria-label={zoomed ? 'Zoom out on product image' : 'Zoom in on product image'} onClick={() => setZoomed(!zoomed)}><img className={zoomed ? 'zoomed' : ''} src={media(product.id)} alt={`${product.type} in ${product.colour}`}/></button>
      <div className="detail-info">
        {product.isNew && <span className="eyebrow">New in</span>}
        <h1>{product.name}</h1><p className="detail-type">{product.type}, {product.colour}</p><p className="detail-price">{money(product.price)}</p>
        <dl><div><dt>Colour</dt><dd>{product.colour}</dd></div><div><dt>Material</dt><dd>{product.material}</dd></div></dl>
        <div className="purchase">
          <select aria-label="Quantity" value={quantity} onChange={e => setQuantity(Number(e.target.value))}>{[1,2,3,4,5].map(n => <option key={n}>{n}</option>)}</select>
          <button className="button" onClick={() => { add(product.id, quantity); dialog.current.showModal(); }}>Add to bag</button>
          <button className={`icon-button detail-save ${saved ? 'saved' : ''}`} aria-label={saved ? 'Remove from favourites' : 'Save to favourites'} aria-pressed={saved} onClick={() => shopState.toggleFavourite(product.id)}><Icon name="heart"/></button>
        </div>
        <details open><summary>Product details</summary><p>{product.name} is a {product.type.toLowerCase()} in {product.colour.toLowerCase()}. The featured material is {product.material.toLowerCase()}.</p></details>
        <details><summary>Delivery and returns</summary><p>View delivery rates and returns information in our <a className="text-link" href="/help/">help centre</a>.</p></details>
      </div>
    </section>
    <section className="related wrap"><h2>You might also like</h2><ProductGrid list={products.filter(p => p.category === product.category && p.id !== product.id).slice(0,4)} shopState={shopState}/></section>
    <dialog ref={dialog} className="basket-dialog" aria-labelledby="added-title"><button className="icon-button close-dialog" aria-label="Close" onClick={() => dialog.current.close()}><Icon name="close"/></button><h2 id="added-title">Added to your bag</h2><p>{quantity} × {product.name} {product.type}</p><a className="button" href="/bag/">View bag</a><button className="text-link" onClick={() => dialog.current.close()}>Continue shopping</button></dialog>
  </>;
}

const delivery = 4.95;

function Bag({ lines, update }) {
  const subtotal = lines.reduce((total, {product, quantity}) => total + product.price * quantity, 0);
  return <>
    <Breadcrumb steps={[[ 'Shopping Bag' ]]}/>
    <section className="wrap page"><h1>Shopping bag</h1>
      {lines.length ? <div className="basket-layout">
        <div>{lines.map(({product, quantity}) => <article className="basket-line" key={product.id}>
          <a href={item(product)}><img src={media(product.id)} alt={product.name}/></a>
          <div><h2><a href={item(product)}>{product.name}</a></h2><p>{product.type}, {product.colour}</p>
          <div className="line-actions"><button aria-label={`Decrease ${product.name} quantity`} onClick={() => update(product.id, -1)} disabled={quantity <= 1}>−</button><span aria-live="polite">{quantity}</span><button aria-label={`Increase ${product.name} quantity`} onClick={() => update(product.id, 1)}>+</button><button className="text-link remove" onClick={() => update(product.id, -quantity)}>Remove</button></div></div>
          <strong>{money(quantity * product.price)}</strong>
        </article>)}</div>
        <aside className="summary"><h2>Order summary</h2><p><span>Subtotal</span><strong>{money(subtotal)}</strong></p><p><span>Standard delivery</span><span>{money(delivery)}</span></p><p className="summary-total"><span>Total</span><strong>{money(subtotal + delivery)}</strong></p><a className="button" href="/checkout/">Go to checkout</a></aside>
      </div> : <Empty title="Your bag is empty" description="Browse the collection to find something for home."/>}
    </section>
  </>;
}

function Empty({ title, description }) {
  return <div className="empty"><h2>{title}</h2><p>{description}</p><a className="button" href={shop()}>Shop all</a></div>;
}

function Checkout({ lines, clear, setOrders }) {
  const [confirmation, setConfirmation] = useState('');
  const subtotal = lines.reduce((total, {product, quantity}) => total + product.price * quantity, 0);
  function submit(e) {
    e.preventDefault();
    const reference = 'STL-' + crypto.randomUUID().slice(0, 8).toUpperCase();
    setOrders(orders => [{ reference, total: subtotal + delivery, count: lines.reduce((n, line) => n + line.quantity, 0) }, ...orders]);
    setConfirmation(reference);
    clear();
  }
  return <>
    <Breadcrumb steps={[[ 'Shopping Bag', '/bag/' ], [ 'Checkout' ]]}/>
    <section className="wrap page"><h1>Checkout</h1>
      {confirmation ? <div className="empty order-confirmation"><Icon name="check"/><h2 role="status">Demo order placed</h2><p>Your reference is <strong>{confirmation}</strong>.</p><a className="button" href={shop()}>Continue shopping</a></div> :
      lines.length ? <div className="basket-layout">
        <form className="checkout-form" onSubmit={submit}><p className="notice">Demo checkout. Use sample details. No payment or delivery will take place.</p><h2>Delivery details</h2>
          <label>Full name<input autoComplete="name" required/></label><label>Email address<input type="email" autoComplete="email" required/></label><label>Street address<input autoComplete="street-address" required/></label><div className="form-two"><label>Town or city<input autoComplete="address-level2" required/></label><label>Postcode<input autoComplete="postal-code" required/></label></div><button className="button">Place demo order</button>
        </form>
        <aside className="summary"><h2>Order summary</h2>{lines.map(({product, quantity}) => <p key={product.id}><span>{quantity} × {product.name}</span><span>{money(quantity * product.price)}</span></p>)}<p><span>Delivery</span><span>{money(delivery)}</span></p><p className="summary-total"><span>Total</span><strong>{money(subtotal + delivery)}</strong></p></aside>
      </div> : <Empty title="Your bag is empty" description="Add an item before checking out."/>}
    </section>
  </>;
}

function Account({ orders }) {
  return <><Breadcrumb steps={[[ 'My account' ]]}/><section className="wrap page"><h1>My account</h1><div className="account-panel"><h2>Demo orders</h2><p>Orders placed in the demo checkout are stored in this browser.</p>{orders.length ? <ul>{orders.map(order => <li key={order.reference}><strong>{order.reference}</strong><span>{order.count} {order.count === 1 ? 'item' : 'items'} · {money(order.total)}</span></li>)}</ul> : <p>You have no demo orders yet.</p>}<a className="button" href={shop()}>Shop all</a></div></section></>;
}

function Journal({ guide }) {
  if (!guide) return <><Breadcrumb steps={[[ 'Design Journal' ]]}/><section className="wrap page"><h1>Design Journal</h1><JournalCards heading="h2"/></section></>;
  return <>
    <Breadcrumb steps={[[ 'Design Journal', '/journal/' ], [guide.title]]}/>
    <article className="wrap page guide">
      <header><p className="eyebrow">{guide.topic}</p><h1>{guide.title}</h1><p>{guide.intro}</p></header>
      <img className={`guide-image journal-image--${guide.category}`} src={media(guide.image)} alt={guide.alt}/>
      <div className="guide-body">
        {guide.sections.map(([title, body]) => <section key={title}><h2>{title}</h2><p>{body}</p></section>)}
        <a className="button" href={shop(guide.category)}>{guide.shopLabel}</a>
      </div>
    </article>
  </>;
}

function Help() {
  useEffect(() => {
    document.getElementById(window.location.hash.slice(1))?.scrollIntoView();
  }, []);
  return <><Breadcrumb steps={[[ 'Help' ]]}/><section className="wrap page help-page"><h1>Help centre</h1><p className="notice">{brand} is a sample storefront. All prices and delivery terms are illustrative.</p>
    <h2 id="delivery">Delivery information</h2><p>The checkout illustrates standard UK delivery at {money(delivery)} per order.</p>
    <h2 id="returns">Returns</h2><p>Demo orders do not ship, so no returns are needed.</p>
    <h2 id="care">Furniture care</h2>
    <details><summary>Upholstery</summary><p>Use a soft vacuum attachment to remove dust. Blot spills promptly with a clean cloth and follow the fabric’s care label before applying any cleaner.</p></details>
    <details><summary>Wood and stone</summary><p>Dust with a soft cloth, use coasters under drinks and wipe up spills promptly. Check the finish’s care instructions before using a cleaning product.</p></details>
    <details><summary>Ceramics and glass</summary><p>Check the maker’s instructions before using a dishwasher. For decorative pieces, a soft, slightly damp cloth is usually enough to lift dust.</p></details>
    <h2 id="faq">Frequently asked questions</h2><details><summary>Where can I find my demo order?</summary><p>Open <a className="text-link" href="/account/">My account</a> in the browser you used to check out.</p></details>
    <h2 id="privacy">Privacy</h2><p>Your bag, favourites and demo order summaries are saved in your browser. Delivery details entered in checkout are not stored or submitted.</p>
  </section></>;
}

function App() {
  const main = useRef(null);
  useScrollReveal(main, '.section-heading, .featured h2, .department-grid > a, .collection-copy, .collection-image, .journal-card, .review-card, .service-card, .guide-image, .guide-body > section');
  const [favourites, setFavourites] = useStored('morrow-favourites', []);
  const [bag, setBag] = useStored('morrow-bag', {});
  const [orders, setOrders] = useStored('morrow-orders', []);
  const shopState = { favourites, toggleFavourite: id => setFavourites(ids => ids.includes(id) ? ids.filter(saved => saved !== id) : [...ids, id]) };
  const lines = Object.entries(bag).filter(([id, quantity]) => byId[id] && quantity > 0).map(([id, quantity]) => ({product: byId[id], quantity}));
  const total = lines.reduce((count, line) => count + line.quantity, 0);
  const update = (id, amount) => setBag(previous => {
    const quantity = (previous[id] || 0) + amount;
    const next = {...previous};
    if (quantity > 0) next[id] = quantity;
    else delete next[id];
    return next;
  });
  const [route, slug] = window.location.pathname.split('/').filter(Boolean);
  const category = route === 'shop' && (slug ? [allCategory, ...links].find(c => c.id === slug) : allCategory);
  const product = route === 'product' && products.find(p => p.slug === slug);
  const guide = route === 'journal' && guides.find(entry => entry.slug === slug);
  const savedList = favourites.map(id => byId[id]).filter(Boolean);
  const params = new URLSearchParams(window.location.search);
  const query = params.get('q')?.trim() || '';
  const newOnly = params.get('new') === '1';
  useEffect(() => {
    const label = product?.name || guide?.title || category?.name || ({journal: 'Design Journal', favourites: 'Favourites', bag: 'Shopping Bag', checkout: 'Checkout', inspiration: 'Inspiration', help: 'Help', account: 'My account'})[route];
    if (label) document.title = `${label} | ${brand}`;
  }, [route, category, product, guide]);
  let page = <section className="wrap page"><Empty title="Page not found" description="Explore the furniture and homeware collection."/></section>;
  if (!route) page = <Home shopState={shopState}/>;
  if (category) page = <Catalogue category={category} query={query} newOnly={newOnly} shopState={shopState}/>;
  if (product) page = <Product product={product} shopState={shopState} add={update}/>;
  if (route === 'favourites') page = <><Breadcrumb steps={[[ 'Favourites' ]]}/><section className="wrap page"><h1>Favourites</h1>{savedList.length ? <ProductGrid list={savedList} shopState={shopState}/> : <Empty title="Save your favourites" description="Tap the heart on any product to keep it here."/>}</section></>;
  if (route === 'bag') page = <Bag lines={lines} update={update}/>;
  if (route === 'checkout') page = <Checkout lines={lines} clear={() => setBag({})} setOrders={setOrders}/>;
  if (route === 'account') page = <Account orders={orders}/>;
  if (route === 'help') page = <Help/>;
  if (route === 'journal' && (!slug || guide)) page = <Journal guide={guide}/>;
  if (route === 'inspiration') page = <><Breadcrumb steps={[[ 'Inspiration' ]]}/><section className="wrap page"><h1>Inspiration</h1><Collection/></section></>;
  return <><Header total={total} current={category?.id}/><main ref={main} id="main">{page}</main><Footer/></>;
}

createRoot(document.getElementById('root')).render(<App/>);
