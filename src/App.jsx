import React, { useState, useEffect } from 'react'
import { 
  Search, 
  ShoppingBag, 
  User, 
  ArrowRight, 
  Plus, 
  Minus,
  Star, 
  X, 
  ArrowUpRight, 
  Sparkles, 
  Leaf, 
  FlaskConical, 
  HeartPulse, 
  Menu,
  Share2,
  Mail,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Info,
  Truck,
  RotateCcw,
  ShieldCheck,
  Zap,
  Dna
} from 'lucide-react'

// Custom Toast Component
const Toast = ({ message, onClose }) => (
  <div className="fixed bottom-6 right-4 left-4 md:left-auto md:right-8 z-[200] bg-primary text-on-primary px-10 py-4.5 rounded-2xl shadow-3xl animate-fade-in-up flex items-center justify-between gap-2 md:gap-4 backdrop-blur-3xl border border-white/20">
    <div className="flex items-center gap-3">
      <Sparkles className="w-5 h-5 shrink-0" />
      <span className="font-bold text-xs md:text-base leading-tight uppercase">{message}</span>
    </div>
    <button onClick={onClose} className="opacity-50 hover:opacity-100 transition-opacity"><X size={16} /></button>
  </div>
);

const Navbar = ({ onAction, cartCount, openCart }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#220213]/90 backdrop-blur-xl border-b border-white/10 py-1 transition-all">
      <div className="flex justify-between items-center px-4 md:px-8 py-3.5 max-w-7xl mx-auto relative text-left">
        <div className="flex items-center gap-3 md:gap-6">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-white p-1 hover:bg-white/10 rounded-full transition-all">
            <Menu className="w-6 h-6" />
          </button>
          <a className="text-xl md:text-2xl font-bold text-primary hover:scale-105 transition-transform" href="/" onClick={(e) => { e.preventDefault(); onAction('Home'); }}>
            R.N. Foods
          </a>
          <div className="hidden lg:flex items-center space-x-10">
            {['Shop All', 'Best Sellers', 'The Lab', 'Sustainability'].map(item => (
              <a key={item} className="text-white/60 hover:text-primary transition-all font-bold text-[10px] uppercase relative group" href="#" onClick={(e) => { e.preventDefault(); onAction(item); }}>
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2 md:space-x-5">
          <div className="relative hidden sm:block">
             <div className="bg-white/5 rounded-full px-5 py-2.5 flex items-center gap-3 group focus-within:ring-2 ring-primary/40 transition-all border border-white/5">
                <Search className="text-white/40 w-4 h-4" />
                <input className="bg-transparent border-none text-xs w-28 md:w-36 font-bold placeholder:text-white/20 outline-none text-white uppercase" placeholder="Find essence..." type="text" />
             </div>
          </div>
          <button onClick={() => onAction('Account')} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-all text-white">
            <User className="w-5 h-5" />
          </button>
          <button onClick={openCart} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-all text-white relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0 -right-0 bg-primary text-on-primary text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold animate-bounce shadow-xl ring-2 ring-[#220213]">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className={`lg:hidden bg-[#220213]/95 backdrop-blur-2xl transition-all duration-500 overflow-hidden border-b border-white/5 ${isMenuOpen ? 'max-h-[100vh] opacity-100 shadow-3xl' : 'max-h-0 opacity-0'}`}>
        <div className="px-5 py-6 md:py-12 flex flex-col gap-4 md:gap-6 font-bold text-2xl text-left uppercase text-white/50 h-screen mt-10">
          {['Shop All', 'Best Sellers', 'The Lab', 'Sustainability'].map((item, i) => (
            <a key={item} href="#" onClick={(e) => { e.preventDefault(); onAction(item); setIsMenuOpen(false); }} className={`hover:text-primary hover:translate-x-4 transition-all delay-[${i * 50}ms]`}>{item}</a>
          ))}
        </div>
      </div>
    </nav>
  )
}

const QuickViewModal = ({ product, isOpen, onClose, addToCart, setIsCartOpen, showToast }) => {
  if (!product) return null;

  return (
    <>
      <div className={`fixed inset-0 bg-black/80 backdrop-blur-xl z-[150] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose} />
      <div className={`fixed top-0 md:top-1/2 left-0 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full md:w-[95%] max-w-5xl h-full md:h-auto md:max-h-[90vh] bg-[#f8f8f8] md:rounded-[2.5rem] z-[160] shadow-4xl overflow-hidden transition-all duration-500 transform ${isOpen ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-full md:translate-y-[-45%] scale-100 md:scale-95 opacity-0 pointer-events-none'} flex flex-col`}>
        
        {/* Mobile Header (Meesho Style) */}
        <div className="md:hidden flex items-center justify-between p-3 md:p-4 bg-white border-b border-black/5 sticky top-0 z-50 h-14">
           <button onClick={onClose} className="p-3 hover:bg-black/5 rounded-full transition-colors active:scale-90 text-on-surface flex items-center justify-center"><ChevronLeft size={28} /></button>
           <h3 className="text-[10px] font-bold uppercase truncate px-4 flex-grow text-center">{product.name}</h3>
           <div className="flex gap-2 md:gap-4">
              <button onClick={() => showToast('Shared!')} className="p-2 hover:bg-black/5 rounded-full"><Share2 size={20} className="text-on-surface-variant" /></button>
              <button onClick={() => { onClose(); setIsCartOpen(true); }} className="p-2 hover:bg-black/5 rounded-full"><ShoppingBag size={20} className="text-on-surface-variant" /></button>
           </div>
        </div>

        <div className="flex-grow overflow-y-auto flex flex-col md:flex-row pb-20 md:pb-12 scrollbar-hide bg-[#f0f1f4] md:bg-white text-left">
          {/* Immersive Imagery */}
          <div className="w-full md:w-1/2 h-[450px] md:h-auto relative bg-white flex-none overflow-hidden">
            <img src={product.image || product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#220213]/20 to-transparent" />
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full flex items-center gap-2 border border-black/5 shadow-sm">
                <Leaf size={14} className="text-primary" />
                <span className="text-[10px] font-bold uppercase">Botanical Origin</span>
            </div>
            <button onClick={onClose} className="hidden md:flex absolute top-6 right-6 w-11 h-11 bg-white hover:bg-primary hover:text-white rounded-full items-center justify-center transition-all shadow-xl group"><X size={24} className="group-hover:rotate-90 transition-transform"/></button>
          </div>

          {/* High-Chroma Info (Meesho Density) */}
          <div className="w-full md:w-1/2 flex flex-col pt-3 md:p-6 space-y-2 md:space-y-3">
             
             {/* Product Brand Header */}
             <div className="bg-white p-6 md:p-0 md:bg-transparent shadow-sm md:shadow-none">
                <div className="flex justify-between items-start mb-2 md:mb-4">
                   <div className="space-y-1.5">
                      <p className="text-[10px] font-bold text-primary uppercase border-l-2 border-primary pl-3">The Earth Series</p>
                      <h2 className="text-3xl md:text-5xl font-bold text-on-surface uppercase leading-none">{product.name}</h2>
                   </div>
                   <button onClick={() => showToast('Shared!')} className="hidden md:block p-3 hover:bg-black/5 rounded-full transition-all"><Share2 size={20}/></button>
                </div>
                
                <div className="flex items-center gap-3 md:gap-5 mb-4 md:mb-4 md:mb-8">
                   <div className="flex flex-col">
                      <div className="flex items-baseline gap-2 md:gap-4">
                        <span className="text-4xl md:text-6xl font-bold text-[#220213]">${product.price}</span>
                        {product.oldPrice || (product.discount && (
                          <div className="flex items-center gap-3">
                             <span className="text-base md:text-2xl text-on-surface-variant line-through opacity-25 font-bold leading-none">${product.oldPrice || (parseFloat(product.price) * 1.25).toFixed(2)}</span>
                             <span className="bg-[#25a541]/10 text-[#25a541] px-3 py-1 rounded-lg font-bold text-[10px] md:text-sm uppercase">
                               {product.discount || 25}% OFF
                             </span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 mt-4 bg-tertiary-container/30 w-fit px-4 py-1.5 rounded-full border border-tertiary-fixed/10">
                         <Star size={16} className="fill-tertiary-fixed text-tertiary-fixed" />
                         <span className="text-xs font-bold text-on-surface uppercase">{product.rating} <span className="opacity-30 ml-2 font-bold">{product.reviews} Gathers</span></span>
                      </div>
                   </div>
                </div>

                <div className="flex items-center gap-2 bg-[#eaf7ed] px-4 py-2.5 rounded-2xl w-fit border border-[#25a541]/10 shadow-sm">
                   <Truck size={18} className="text-[#25a541]" />
                   <span className="text-[10px] font-bold uppercase text-[#25a541]">Ritual Delivery: AT NO COST</span>
                </div>
             </div>

             {/* Ritual Quantity Selection */}
             <div className="bg-white p-6 md:p-6 shadow-sm md:shadow-none text-left">
                <h4 className="text-[10px] font-bold text-on-surface-variant uppercase mb-2 md:mb-4">Ritual Volume</h4>
                <div className="flex flex-wrap gap-2 md:gap-4">
                   {['500g Trial', '1kg Essential', '2.5kg Pantry', '5kg Harvest'].map(v => (
                     <button key={v} className={`flex-1 min-w-[140px] py-4 rounded-xl font-bold text-[10px] uppercase border transition-all ${v.includes('1kg') ? 'border-primary bg-primary/5 text-primary shadow-xl ring-2 ring-primary/5' : 'border-black/5 text-on-surface/30 hover:border-black/20'}`}>
                       {v}
                     </button>
                   ))}
                </div>
             </div>

             {/* Botanical Specs (Meesho List Style) */}
             <div className="bg-white p-6 md:p-6 shadow-sm md:shadow-none text-left flex-grow">
                <div className="flex items-center justify-between mb-4 md:mb-4 md:mb-8 group cursor-pointer border-b border-black/5 pb-4">
                   <h4 className="text-xs font-bold uppercase text-primary">Botanical Composition</h4>
                   <ChevronRight size={24} className="text-on-surface-variant group-hover:translate-x-2 transition-transform" />
                </div>
                <div className="grid grid-cols-1 gap-3 md:gap-5">
                   {[
                     { l:"Provenance", v:"High-Alt Volcanic Soils", i: <Leaf size={16} className="text-primary"/> },
                     { l:"Cultivation", v:"Traditional Stone-Ground", i: <Zap size={16} className="text-[#ffb400]"/> },
                     { l:"Resonance", v:"High-Vibrancy Mineral Bond", i: <ShieldCheck size={16} className="text-secondary"/> },
                     { l:"Preservation", v:"Bio-Shield Eco-Intake", i: <HeartPulse size={16} className="text-primary-fixed"/> }
                   ].map(d => (
                     <div key={d.l} className="flex items-center gap-3 md:gap-6 text-xs font-bold border-b border-black/5 pb-4">
                        <div className="w-10 h-10 rounded-2xl bg-surface-container-low flex items-center justify-center shrink-0 shadow-inner">{d.i}</div>
                        <div className="flex flex-col">
                           <span className="text-[9px] text-on-surface-variant uppercase opacity-40 mb-1">{d.l}</span>
                           <span className="text-on-surface uppercase">{d.v}</span>
                        </div>
                     </div>
                   ))}
                </div>
             </div>

             {/* Clinical Trust Markers */}
             <div className="bg-white p-6 md:p-6 shadow-sm md:shadow-none grid grid-cols-2 gap-2 md:gap-4">
                <div className="p-3 md:p-6 bg-primary/5 rounded-3xl border border-primary/10 flex gap-2 md:gap-4 items-center group cursor-pointer hover:bg-primary/10 transition-all">
                   <RotateCcw size={24} className="text-primary group-hover:rotate-[-45deg] transition-transform" />
                   <div className="text-left">
                      <div className="text-[10px] font-bold uppercase leading-none mb-1.5">7 Day Grace</div>
                      <div className="text-[9px] font-bold text-on-surface-variant opacity-60 uppercase">Community Swap</div>
                   </div>
                </div>
                <div className="p-3 md:p-6 bg-secondary/5 rounded-3xl border border-secondary/10 flex gap-2 md:gap-4 items-center group cursor-pointer hover:bg-secondary/10 transition-all">
                   <ShieldCheck size={24} className="text-secondary group-hover:scale-110 transition-transform" />
                   <div className="text-left">
                      <div className="text-[10px] font-bold uppercase leading-none mb-1.5">Certified</div>
                      <div className="text-[9px] font-bold text-on-surface-variant opacity-60 uppercase">Genetic Purity</div>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Sticky Action Footer */}
        <div className="absolute bottom-0 left-0 w-full p-5 md:p-6 bg-white/95 backdrop-blur-3xl border-t border-black/5 flex gap-3 md:gap-5 z-40 shadow-4xl-up">
           <button 
             onClick={() => addToCart(product)}
             className="flex-1 py-5 md:py-7 border-2 border-primary text-primary font-bold rounded-3xl uppercase text-[10px] md:text-sm flex items-center justify-center gap-2 md:gap-4 hover:bg-primary/5 active:scale-95 transition-all shadow-xl"
           >
              Gather to Bag <ShoppingBag className="w-6 h-6" />
           </button>
           <button 
             onClick={() => { addToCart(product); alert('Initiating Secure Order Workflow...'); }}
             className="flex-[1.3] py-5 md:py-7 bg-primary text-on-primary font-bold rounded-3xl uppercase text-[10px] md:text-sm flex items-center justify-center gap-2 md:gap-4 shadow-3xl shadow-primary/40 hover:brightness-110 active:scale-95 transition-all text-center"
           >
              Secure Order <ArrowRight className="w-6 h-6" />
           </button>
        </div>
      </div>
    </>
  );
};

const CartDrawer = ({ isOpen, onClose, cart, updateQuantity, removeFromCart }) => {
  const total = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0).toFixed(2);

  return (
    <div className={`fixed inset-0 z-[210] transition-all duration-500 ${isOpen ? 'visible' : 'invisible'}`}>
      <div className={`absolute inset-0 bg-black/60 backdrop-blur-lg transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      <div className={`absolute right-0 top-0 h-full w-full sm:w-[450px] bg-white text-on-surface shadow-2xl transition-transform duration-500 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
        <div className="p-6 md:p-6 flex justify-between items-center border-b border-surface-container bg-white/50 backdrop-blur-xl">
          <div className="flex items-center gap-2 md:gap-4">
            <ShoppingBag className="w-7 h-7 text-primary" />
            <h2 className="text-2xl font-bold uppercase">Your Harvest</h2>
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold animate-pulse">
              {cart.reduce((sum, item) => sum + item.quantity, 0)} UNITS
            </span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-surface-container rounded-full transition-all active:scale-90"><X size={24} /></button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 md:p-6 scrollbar-hide space-y-3 md:space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-3 md:space-y-6 opacity-40">
              <Leaf size={100} strokeWidth={0.5} className="animate-bounce" />
              <p className="font-bold text-xl uppercase">No Grains Collected</p>
              <button onClick={onClose} className="text-primary font-bold uppercase text-xs border-b-2 border-primary pb-1">Start Gathering</button>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div key={idx} className="flex gap-3 md:gap-6 group animate-fade-in-up border-b border-black/5 pb-8 last:border-0 relative">
                <div className="w-24 h-24 md:w-28 md:h-28 bg-surface-container rounded-3xl overflow-hidden shrink-0 shadow-lg border border-primary/5">
                  <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={item.image || item.img} alt={item.name} />
                </div>
                <div className="flex-grow text-left flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-sm md:text-base leading-tight uppercase line-clamp-2 pr-6">{item.name}</h4>
                      <button onClick={() => removeFromCart(item.name)} className="text-on-surface-variant hover:text-red-500 p-1.5 transition-all active:scale-90 absolute right-0 top-1"><Trash2 size={16} /></button>
                    </div>
                    <p className="text-secondary font-bold text-xs md:text-sm uppercase opacity-60">${item.price}</p>
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center bg-surface-container-highest rounded-2xl p-1.5 border border-primary/5 ring-1 ring-black/5">
                      <button onClick={() => updateQuantity(item.name, -1)} className="w-9 h-9 flex items-center justify-center hover:bg-white rounded-xl transition-all active:scale-90"><Minus size={14} /></button>
                      <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.name, 1)} className="w-9 h-9 flex items-center justify-center hover:bg-white rounded-xl transition-all active:scale-90"><Plus size={14} /></button>
                    </div>
                    <p className="font-bold text-base md:text-lg text-on-surface">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-4 md:p-8 bg-surface-container-highest/30 border-t border-surface-container backdrop-blur-3xl shadow-4xl-up">
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <span className="font-bold text-xs md:text-sm uppercase opacity-40">Total Value</span>
              <span className="text-3xl md:text-4xl font-bold text-primary">${total}</span>
            </div>
            <button 
              onClick={() => alert('Proceeding to Multi-Channel Checkout...')}
              className="w-full bg-primary text-on-primary py-4 md:py-6 rounded-3xl font-bold text-base uppercase shadow-3xl shadow-primary/40 hover:brightness-110 transition-all active:scale-95 flex items-center justify-center gap-2 md:gap-4"
            >
              Checkout Harvest <ArrowRight size={24} />
            </button>
            <p className="text-center text-[10px] text-on-surface-variant mt-6 font-bold uppercase opacity-40">Inclusive of zero-waste logistical delivery</p>
          </div>
        )}
      </div>
    </div>
  );
};

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    if (isCartOpen || selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isCartOpen, selectedProduct]);

  const showToast = (message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const handleAction = (action) => {
    showToast(`${action} logic soon`);
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.name === product.name);
      if (existing) {
        return prev.map(item => 
          item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`Collected to harvest`);
  };

  const updateQuantity = (name, delta) => {
    setCart(prev => prev.map(item => {
      if (item.name === name) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (name) => {
    setCart(prev => prev.filter(item => item.name !== name));
    showToast(`Removed from harvest`);
  };

  return (
    <div className="bg-[#220213] font-body text-white antialiased min-h-screen selection:bg-primary selection:text-on-primary">
      <Navbar onAction={handleAction} cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} openCart={() => setIsCartOpen(true)} />

      <QuickViewModal 
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        addToCart={addToCart}
        setIsCartOpen={setIsCartOpen}
        showToast={showToast}
      />

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />

      <main className="pt-16 md:pt-6 md:pt-10">
        {/* Dark Mode Botanical Hero */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-12">
           <div className="relative h-[600px] md:h-[800px] rounded-[3rem] md:rounded-[5rem] overflow-hidden group shadow-4xl border border-white/5">
              <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtU3-_rhsTCksNFF99TWdHh_BhsfcVQleNqXQMrWA3u1iDyPN4XUwMLUBwBPS5E6sV6ID0dssNw448enMUP9rMV5uR_FAl3fvCKDwItR6EKDm1zZ-YrZmQc21OOXOz0dShsXAy7xJYCRr48c1QnnEH8qmaSQTXzkzq97IWP3cWY8YVVpPsEpS1BFA4F0St-vNcS2kvAinzRSgZ0B1EJB6QSXqLgqGO7K-SF-ty8Zu_RqY9jiSdwZ2k12tDZMw_rM3dHmV5b9hXFA9x" alt="Chroma Botanicals" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#220213]/95 via-[#220213]/30 to-transparent"></div>
              <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-24 max-w-4xl text-left">
                 <div className="inline-flex items-center gap-3 bg-white/10 px-6 py-2 rounded-full border border-white/20 mb-4 md:mb-4 md:mb-8 w-fit backdrop-blur-xl">
                    <Sparkles className="text-primary w-4 h-4" />
                    <span className="text-[10px] md:text-xs font-bold uppercase text-white">The Nebula Selection</span>
                 </div>
                 <h1 className="text-6xl md:text-9xl font-bold leading-[0.85] uppercase mb-4 md:mb-4 md:mb-8">
                    High <br /><span className="text-primary">Chroma.</span>
                 </h1>
                 <p className="text-white/60 text-base md:text-2xl font-bold max-w-lg mb-6 md:mb-4 md:mb-8 leading-relaxed uppercase">Pure botanical energy for the peak human experience. Ancient grains, modern precision. Vibrant cellular fuel.</p>
                 <div className="flex flex-col sm:flex-row gap-3 md:gap-6">
                    <button className="bg-primary text-white px-12 py-4 md:py-6 rounded-3xl font-bold text-base uppercase shadow-3xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all">Explore Harvest</button>
                    <button className="bg-white/10 backdrop-blur-xl border border-white/20 px-12 py-4 md:py-6 rounded-3xl font-bold text-base uppercase hover:bg-white/20 active:scale-95 transition-all">Process Specs</button>
                 </div>
              </div>
           </div>
        </section>

        {/* High-Contrast Grid */}
        <section className="max-w-7xl mx-auto px-4 md:px-12 py-12 md:py-8 md:py-12">
           <div className="flex flex-col md:row justify-between items-end mb-10 md:mb-4 md:mb-8 gap-4 md:gap-6 text-left">
              <div>
                 <h2 className="text-4xl md:text-7xl font-bold text-white leading-none uppercase mb-2 md:mb-4">Deep Archives</h2>
                 <p className="text-[10px] md:text-sm font-bold uppercase text-primary opacity-60">Verified Botanical Energy Structures</p>
              </div>
              <button className="text-primary font-bold uppercase text-xs md:text-sm flex items-center gap-3 hover:translate-x-2 transition-transform border-b-2 border-primary/20 pb-2">View Full Register <ArrowRight /></button>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-6">
              {[
                { name:"Nebula Quinoa", price:"32.00", oldPrice:"48.00", rating:"4.9", image:"https://lh3.googleusercontent.com/aida-public/AB6AXuDTU3-_rhsTCksNFF99TWdHh_BhsfcVQleNqXQMrWA3u1iDyPN4XUwMLUBwBPS5E6sV6ID0dssNw448enMUP9rMV5uR_FAl3fvCKDwItR6EKDm1zZ-YrZmQc21OOXOz0dShsXAy7xJYCRr48c1QnnEH8qmaSQTXzkzq97IWP3cWY8YVVpPsEpS1BFA4F0St-vNcS2kvAinzRSgZ0B1EJB6QSXqLgqGO7K-SF-ty8Zu_RqY9jiSdwZ2k12tDZMw_rM3dHmV5b9hXFA9x" },
                { name:"Basmati Noir", price:"26.50", rating:"5.0", image:"https://lh3.googleusercontent.com/aida-public/AB6AXuBGyOJfIwDyEBbMIFdx0wm9fsKgt3ma_9Q_cnTJeQ0NoAZqB_t5S2CMJpwcXavgUSyDEZtsmX3lb21ypEZ_Q3WVWv8TIMbxMv1BNuCYnIKSsdnUtwxYqCnVB5UXH7A2gSGQdLawWHvZqWhR0OLAQ3Zy7paW4ZNHVFdSMcAGNmhdlBwGSEM6lMMrb3I6D2cr8usVvpO7H_DsDniaCsSJZ7kug42N_ksYmu94kLOSvQ75DufBz2ChLL05lrAvBbF0sEWSjfwsTNrAh4Zk" },
                { name:"Solar Millet", price:"18.00", oldPrice:"22.00", rating:"4.8", image:"https://lh3.googleusercontent.com/aida-public/AB6AXuA2SEphSl0RAY0gzgJ9vMpP6h56PTgWCJI3IECvAFlL3l5L-AVGB1mZR5hz8qBHI06cb4DqkafD_dzpzvh7CVrQdizB7NA4nSP494eU_uhCH5O_GrRvQMe0gIQPxCssGXrTWEmZyIVoyfi69jiKVmdWqKNricmQUyAfQB7hpLqlkWPHRqZaETbrV1O3Gcn92vMFVINKMR_X1qoHLFB1KSMndFREWY2bExwiLXUwOqwUwaF7RifaAAE4pSorBLC9pZMTzUSzx1-Hd_yu" },
                { name:"Stardust Wheat", price:"24.00", rating:"4.7", image:"https://lh3.googleusercontent.com/aida-public/AB6AXuDfozOejP8HE02IBTGhDbgy83AnAIDQwfRQvXJuXXKOG7Trs0Puo5yhj5sQEZD6W8YrTkQdQn2OvZSVn2YupuSiqpZMXn65WqdIFOikZwq_qaLuZ2G4QIgeH8ix-KURp4c3PY3YiwcKKDWcYOnorsy98C52NCrnoyTrQKAHuOEhtxFKbj-Y96FgufishFFDU-2g8ccUeVjSB_IJ4MQLpvJd6beP6phrRYec9Uurw4L4m5AS-v0EYpOFP7lzk7BlgtIEytA4RV4n0seM" }
              ].map((p, idx) => (
                <div key={idx} onClick={() => setSelectedProduct(p)} className="group cursor-pointer">
                   <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-4 md:mb-4 md:mb-8 border border-white/5 bg-white/5 shadow-2xl transition-all duration-700 md:group-hover:-translate-y-4">
                      <img className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" src={p.image} alt={p.name} />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#220213]/40 to-transparent"></div>
                      <button 
                         onClick={(e) => { e.stopPropagation(); addToCart(p); }}
                         className="absolute bottom-6 right-6 w-16 h-16 bg-primary text-white rounded-[1.5rem] flex items-center justify-center shadow-3xl opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all hover:bg-white hover:text-primary active:scale-90"
                      >
                         <Plus size={32} />
                      </button>
                   </div>
                   <div className="space-y-2 md:space-y-4 px-2 text-left">
                      <h4 className="text-2xl font-bold uppercase group-hover:text-primary transition-colors leading-none">{p.name}</h4>
                      <div className="flex items-center justify-between">
                         <div className="flex items-baseline gap-2 md:gap-4">
                            <span className="text-2xl font-bold text-primary">${p.price}</span>
                            {p.oldPrice && <span className="text-sm text-white/20 line-through font-bold">${p.oldPrice}</span>}
                         </div>
                         <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 text-[10px] font-bold uppercase text-white/40">
                            <Star size={12} className="fill-current" /> {p.rating}
                         </div>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </section>
      </main>

      {/* Chroma Footer */}
      <footer className="bg-[#220213] pt-48 pb-20 md:pb-24 border-t border-white/5 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary rounded-full blur-[200px] animate-pulse"></div>
         </div>
         
         <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-24 text-left relative z-10">
            <div className="md:col-span-1 space-y-4 md:space-y-6">
               <div className="text-4xl font-bold uppercase text-primary">R.N. Foods</div>
               <p className="text-white/40 font-bold text-lg leading-relaxed uppercase">High-Chroma Botanical fuel for the next evolution of human vitality.</p>
               <div className="flex gap-3 md:gap-6">
                  <div className="w-14 h-14 bg-white/5 rounded-[1.25rem] border border-white/10 flex items-center justify-center text-primary-fixed hover:bg-primary hover:text-white transition-all cursor-pointer"><Share2 size={24}/></div>
                  <div className="w-14 h-14 bg-white/5 rounded-[1.25rem] border border-white/10 flex items-center justify-center text-primary-fixed hover:bg-primary hover:text-white transition-all cursor-pointer"><Mail size={24}/></div>
               </div>
            </div>
            <div>
               <h4 className="text-[10px] font-bold uppercase text-white/20 mb-6 md:mb-4 md:mb-8">The Chroma Lab</h4>
               <ul className="space-y-3 md:space-y-6">
                  {['Origins', 'Extraction Protocols', 'Chroma Logs', 'Batch Registry'].map(l => (
                    <li key={l}><a href="#" className="font-bold text-sm uppercase hover:text-primary transition-all hover:translate-x-2 inline-block">{l}</a></li>
                  ))}
               </ul>
            </div>
            <div>
               <h4 className="text-[10px] font-bold uppercase text-white/20 mb-6 md:mb-4 md:mb-8">Security</h4>
               <ul className="space-y-3 md:space-y-6">
                  {['Data Privacy', 'Purity Terms', 'Logistic Flow', 'Support Portal'].map(l => (
                    <li key={l}><a href="#" className="font-bold text-sm uppercase hover:text-primary transition-all hover:translate-x-2 inline-block">{l}</a></li>
                  ))}
               </ul>
            </div>
            <div className="space-y-4 md:space-y-6">
               <h4 className="text-[10px] font-bold uppercase text-white/20 mb-6 md:mb-4 md:mb-8">Chroma Sync</h4>
               <div className="bg-white/5 p-4 md:p-8 rounded-[2rem] border border-white/10 space-y-3 md:space-y-6 shadow-3xl">
                  <p className="text-xs font-bold text-white/40 uppercase leading-relaxed">Join the Chroma Sync for immediate access to high-potency batch releases.</p>
                  <div className="flex flex-col gap-2 md:gap-4">
                     <input className="bg-[#220213] border-2 border-white/5 rounded-2xl px-6 py-4 text-xs font-bold uppercase focus:border-primary outline-none" placeholder="SYNC EMAIL..." type="email" />
                     <button className="bg-primary text-white py-4 rounded-2xl font-bold uppercase hover:brightness-110 active:scale-95 transition-all">Activate Sync</button>
                  </div>
               </div>
            </div>
         </div>
         <div className="max-w-7xl mx-auto px-8 mt-48 pt-12 border-t border-white/5 flex flex-col md:row justify-between items-center gap-4 md:gap-6 text-[10px] font-bold uppercase text-white/10 text-center">
            <p>© 2024 R.N. Foods Scientific Division. High-Chroma Protected.</p>
            <div className="flex gap-4 md:gap-6">
               <span>ISO-27001</span>
               <span>GENETIC-GUARD</span>
            </div>
         </div>
      </footer>

      {/* Toasts */}
      <div className="fixed bottom-0 right-0 left-0 md:left-auto p-4 md:p-6 flex flex-col gap-2 md:gap-4 pointer-events-none z-[300]">
        {toasts.map(t => (
          <Toast key={t.id} message={t.msg} onClose={() => setToasts(prev => prev.filter(x => x.id !== t.id))} />
        ))}
      </div>
    </div>
  )
}

export default App
