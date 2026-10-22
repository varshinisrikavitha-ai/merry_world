import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowRight, Instagram, MapPin, Menu as MenuIcon, Phone, Search, X } from 'lucide-react'
import './styles.css'

const categories = [
  ['all', 'All Items'],
  ['chicken', 'Fried Chicken & Starters'],
  ['burgers', 'Burgers & Sandwiches'],
  ['ice-cream', 'Ice Cream & Sundaes'],
  ['desserts', 'Brownies & Waffles'],
  ['drinks', 'Shakes & Mojitos'],
]

const menuItems = [
  ['umbrella-chicken', 'Umbrella Fried Chicken', 'chicken', '2-piece option', 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=900&q=85'],
  ['crispy-chicken', 'Crispy Fried Chicken', 'chicken', 'Golden, crunchy and made for sharing.', 'https://images.unsplash.com/photo-1562967916-eb82221dfb92?auto=format&fit=crop&w=900&q=85'],
  ['chicken-strips', 'Chicken Strips', 'chicken', 'Crispy, tender strips for every craving.', 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=900&q=85'],
  ['momos', 'Momos', 'chicken', 'A delicious little bite to brighten your day.', 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=900&q=85'],
  ['chicken-burger', 'Chicken Burger', 'burgers', 'A hearty favourite layered with flavour.', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85'],
  ['veg-burger', 'Veg Burger', 'burgers', 'A feel-good classic for veggie lovers.', 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=900&q=85'],
  ['fries', 'French Fries', 'burgers', 'Crispy, golden and perfect to share.', 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85'],
  ['brownie-fudge', 'Choco Brownie Fudge', 'ice-cream', 'Warm chocolate goodness with a cool finish.', 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=85'],
  ['oreo-delight', 'Oreo Choco Delight', 'ice-cream', 'A creamy, chocolatey celebration.', 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=900&q=85'],
  ['banana-split', 'Banana Split', 'ice-cream', 'A timeless sundae made merry.', 'https://images.unsplash.com/photo-1560008581-09826d1de69e?auto=format&fit=crop&w=900&q=85'],
  ['sizzling-brownie', 'Sizzling Brownie with Ice Cream', 'desserts', 'A warm dessert moment worth savouring.', 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85'],
  ['waffles', 'Crispy Waffles', 'desserts', 'Crisp edges, soft centre, pure joy.', 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=900&q=85'],
  ['milkshake', 'Thick Milkshakes', 'drinks', 'Cool, creamy and made for happy sips.', 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=85'],
  ['mojito', 'Flavoured Mojitos', 'drinks', 'Bright, refreshing and full of sparkle.', 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=900&q=85'],
]

const featured = [menuItems[1], menuItems[4], menuItems[10], menuItems[8], menuItems[11], menuItems[12]]

function App() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const filteredItems = useMemo(() => menuItems.filter((item) => {
    const categoryMatch = activeCategory === 'all' || item[2] === activeCategory
    return categoryMatch && item[1].toLowerCase().includes(query.toLowerCase())
  }), [activeCategory, query])

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : ''
    const closeOnEscape = (event) => event.key === 'Escape' && setSelected(null)
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [selected])

  const scrollTo = (id) => {
    setMobileOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const submitContactForm = (event) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const message = `Hi Merry World, my name is ${form.get('name')}. Phone: ${form.get('phone')}. Email: ${form.get('email') || 'Not provided'}. Message: ${form.get('message')}`
    window.open(`https://wa.me/916383634630?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
    setFormSubmitted(true)
    event.currentTarget.reset()
  }

  return (
    <>
      <header className="site-header">
        <div className="nav-shell">
          <button className="brand" onClick={() => scrollTo('home')} aria-label="Merry World home">
            <img src="/merry-world-logo-lockup.png" alt="Merry World — Eat Good Feel Good" />
          </button>
          <button className="menu-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation">
            {mobileOpen ? <X /> : <MenuIcon />}
          </button>
          <nav className={mobileOpen ? 'main-nav open' : 'main-nav'}>
            {['home', 'about', 'menu', 'contact'].map((item) => (
              <button key={item} onClick={() => scrollTo(item)}>{item === 'home' ? 'Home' : item === 'about' ? 'About Us' : item[0].toUpperCase() + item.slice(1)}</button>
            ))}
            <button className="nav-cta" onClick={() => scrollTo('menu')}>Explore Menu <ArrowRight size={16} /></button>
          </nav>
        </div>
      </header>

      <main>
        <section id="home" className="hero section-pad">
          <div className="hero-copy">
            <p className="eyebrow"><span /> Komarapalayam's happy place</p>
            <h1>Good Food.<br /><em>Great Mood.</em><br />Merry World.</h1>
            <p className="hero-text">From crispy favourites to irresistible desserts, discover your happy place for every craving.</p>
            <div className="hero-actions">
              <button className="button primary" onClick={() => scrollTo('menu')}>Explore Our Menu <ArrowRight size={18} /></button>
              <button className="button text-button" onClick={() => scrollTo('contact')}>Visit Merry World <MapPin size={17} /></button>
            </div>
            <div className="hero-note"><span className="dot" /> Open for dine-in, takeaways & good times</div>
          </div>
          <div className="hero-art">
            <div className="hero-circle" />
            <img src={menuItems[10][4]} alt="Chocolate brownie dessert" />
            <div className="floating-card"><span>Made for</span><strong>happy<br />moments</strong></div>
          </div>
        </section>

        <section className="intro-strip"><p>CRISPY FAVOURITES</p><span>✦</span><p>CREAMY INDULGENCES</p><span>✦</span><p>REFRESHING SIPS</p><span>✦</span><p>GOOD MOODS</p></section>

        <section className="section-pad favourites">
          <div className="section-heading"><div><p className="eyebrow">A little something for everyone</p><h2>Signature <em>favourites</em></h2></div><button className="link-button" onClick={() => scrollTo('menu')}>View full menu <ArrowRight size={18} /></button></div>
          <div className="card-grid">{featured.map((item) => <FoodCard key={item[0]} item={item} onClick={() => setSelected(item)} />)}</div>
        </section>

        <section id="about" className="about section-pad">
          <div className="about-image"><img src={menuItems[4][4]} alt="Merry World burger" /><div className="stamp">Eat<br /><span>Good</span><br />Feel Good</div></div>
          <div className="about-copy"><p className="eyebrow">Why Merry World?</p><h2>Every craving has a <em>happy place.</em></h2><p>At Merry World, we bring together the comfort of crispy favourites and the joy of irresistible desserts — all in one welcoming spot.</p><div className="benefits"><div><b>01</b><span>Something savoury, something sweet, always something to smile about.</span></div><div><b>02</b><span>A relaxed corner to make memories with friends and family.</span></div><div><b>03</b><span>Your everyday cravings, served with a little extra merry.</span></div></div><button className="button dark" onClick={() => scrollTo('menu')}>Discover our menu <ArrowRight size={18} /></button></div>
        </section>

        <section id="menu" className="menu-section section-pad">
          <div className="section-heading menu-heading"><div><p className="eyebrow">Find your happy bite</p><h2>Explore the <em>menu</em></h2></div><div className="search-box"><Search size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search the menu..." aria-label="Search menu" /></div></div>
          <div className="category-row">{categories.map(([id, label]) => <button className={activeCategory === id ? 'category active' : 'category'} key={id} onClick={() => setActiveCategory(id)}>{label}</button>)}</div>
          <div className="menu-grid">{filteredItems.map((item) => <FoodCard key={item[0]} item={item} onClick={() => setSelected(item)} />)}</div>
          {!filteredItems.length && <p className="empty-state">No merry bites found. Try another search.</p>}
        </section>

        <section className="quote-section"><div><p className="eyebrow">The Merry World feeling</p><h2>Come hungry.<br /><em>Leave merry.</em></h2><p>Good food tastes even better when shared with your favourite people.</p><button className="button primary" onClick={() => scrollTo('contact')}>Plan your visit <ArrowRight size={18} /></button></div><div className="quote-image"><img src={menuItems[12][4]} alt="Merry World milkshake" /></div></section>

        <section id="contact" className="contact section-pad"><div className="contact-copy"><p className="eyebrow">Come say hello</p><h2>Make it a <em>merry day.</em></h2><p>Drop in for a quick bite, a sweet treat, or a long catch-up over something delicious.</p><a className="contact-line" href="tel:+916383634630"><Phone size={20} /> +91 63836 34630</a><a className="contact-line" href="https://maps.google.com/?q=Merry+World+Komarapalayam" target="_blank" rel="noreferrer"><MapPin size={20} /> 157 A1, Salem Main Road, Komarapalayam</a><a className="contact-line" href="https://www.instagram.com/_merry_world/" target="_blank" rel="noreferrer"><Instagram size={20} /> @_merry_world</a></div><div className="contact-panel"><p>Send an enquiry</p><h3>Let's talk.</h3><form className="contact-form" onSubmit={submitContactForm}><label>Name<input name="name" type="text" placeholder="Your name" required /></label><label>Phone number<input name="phone" type="tel" placeholder="+91 00000 00000" required /></label><label>Email <span>(optional)</span><input name="email" type="email" placeholder="you@example.com" /></label><label>Message<textarea name="message" rows="3" placeholder="How can we help?" required /></label><button className="button dark" type="submit">Send on WhatsApp <ArrowRight size={18} /></button>{formSubmitted && <p className="form-success" role="status">Thanks! WhatsApp is opening with your enquiry.</p>}</form></div></section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <img className="footer-logo" src="/merry-world-logo-lockup.png" alt="Merry World — Eat Good Feel Good" />
            <p className="footer-tagline">Eat Good. Feel Good.</p>
            <p className="footer-intro">A little corner in Komarapalayam for crispy favourites, sweet cravings and merry moments.</p>
            <div className="footer-socials">
              <a className="instagram-icon" href="https://www.instagram.com/_merry_world/" target="_blank" rel="noreferrer" aria-label="Merry World Instagram"><Instagram size={18} strokeWidth={1.8} /></a>
              <a className="whatsapp-icon" href="https://wa.me/916383634630" target="_blank" rel="noreferrer" aria-label="Merry World WhatsApp"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.1a9.9 9.9 0 0 0-8.55 14.96L2.1 21.9l4.98-1.34A9.9 9.9 0 1 0 12 2.1Z" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="M16.62 13.85c-.2-.1-1.2-.59-1.39-.66-.19-.07-.33-.1-.47.1-.14.2-.53.66-.65.79-.12.14-.24.15-.44.05-.2-.1-.84-.31-1.6-.98-.59-.53-.99-1.18-1.1-1.38-.12-.2-.01-.31.09-.41.09-.09.2-.24.3-.36.1-.12.13-.2.2-.34.07-.14.03-.26-.02-.36-.05-.1-.47-1.13-.64-1.55-.17-.41-.34-.35-.47-.36h-.4c-.14 0-.36.05-.55.26-.19.2-.72.7-.72 1.7s.73 1.97.83 2.1c.1.14 1.43 2.18 3.47 3.06.48.21.86.33 1.15.42.48.15.92.13 1.27.08.39-.06 1.2-.49 1.37-.96.17-.47.17-.87.12-.96-.05-.08-.18-.13-.38-.23Z" fill="currentColor" /></svg></a>
            </div>
          </div>
          <div className="footer-column">
            <p className="footer-label">Explore</p>
            <button onClick={() => scrollTo('home')}>Home</button>
            <button onClick={() => scrollTo('about')}>About Us</button>
            <button onClick={() => scrollTo('menu')}>Our Menu</button>
            <button onClick={() => scrollTo('contact')}>Contact</button>
          </div>
          <div className="footer-column footer-visit">
            <p className="footer-label">Find us</p>
            <a href="https://maps.google.com/?q=Merry+World+Komarapalayam" target="_blank" rel="noreferrer"><MapPin size={15} /> 157 A1, Salem Main Road,<br />Komarapalayam — 638183</a>
            <a href="tel:+916383634630"><Phone size={15} /> +91 63836 34630</a>
          </div>
          <div className="footer-column">
            <p className="footer-label">Make it merry</p>
            <p className="footer-note">Have a question or craving?</p>
            <a className="footer-cta" href="https://wa.me/916383634630?text=Hi%20Merry%20World%2C%20I%20would%20like%20to%20enquire." target="_blank" rel="noreferrer">Chat with us <ArrowRight size={16} /></a>
          </div>
        </div>
        <div className="footer-bottom"><span>© 2026 Merry World. All rights reserved.</span><span>Made for happy moments <b>✦</b></span></div>
      </footer>
      {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><div className="modal" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setSelected(null)} aria-label="Close"><X /></button><img src={selected[4]} alt={selected[1]} /><div className="modal-body"><p className="eyebrow">{categories.find((category) => category[0] === selected[2])?.[1]}</p><h2>{selected[1]}</h2><p>{selected[3]}</p><a className="button primary" href={`https://wa.me/916383634630?text=Hi%20Merry%20World%2C%20I%27d%20like%20to%20enquire%20about%20${encodeURIComponent(selected[1])}.`} target="_blank" rel="noreferrer">Enquire on WhatsApp <ArrowRight size={18} /></a></div></div></div>}
    </>
  )
}

function FoodCard({ item, onClick }) {
  const categoryLabel = categories.find(([id]) => id === item[2])?.[1] ?? 'Merry World favourites'
  return <button className="food-card" onClick={onClick}><div className="food-image"><img src={item[4]} alt={item[1]} /><span>View details <ArrowRight size={15} /></span></div><div className="food-info"><small className="food-category">{categoryLabel}</small><h3>{item[1]}</h3><p>{item[3]}</p></div></button>
}

export default App

createRoot(document.getElementById('root')).render(<App />)
