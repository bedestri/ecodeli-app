import React, { useState, useEffect, useRef, useContext, createContext, useCallback, useMemo } from "react";

// ─── LOGO SVG COMPONENT (faithful to original) ───────────────────────────────
const EcodeliLogo = ({ size = 44, dark = false }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="aR" cx="35%" cy="28%" r="70%">
        <stop offset="0%" stopColor="#d93820"/>
        <stop offset="100%" stopColor="#9e1a09"/>
      </radialGradient>
      <linearGradient id="lG1" x1="30%" y1="10%" x2="70%" y2="90%">
        <stop offset="0%" stopColor="#96cc3c"/>
        <stop offset="100%" stopColor="#4e8c10"/>
      </linearGradient>
      <linearGradient id="lG2" x1="30%" y1="10%" x2="70%" y2="90%">
        <stop offset="0%" stopColor="#8ec436"/>
        <stop offset="100%" stopColor="#4a8810"/>
      </linearGradient>
      <linearGradient id="lG3" x1="30%" y1="10%" x2="70%" y2="90%">
        <stop offset="0%" stopColor="#96cc3c"/>
        <stop offset="100%" stopColor="#4e8c10"/>
      </linearGradient>
    </defs>
    {/* Apple body */}
    <path d="M 44 22 C 44 16 50 13 55 16 C 58 10 65 10 68 16 C 73 13 78 17 76 23 C 84 27 87 40 84 53 C 81 67 72 77 60 79 C 48 77 38 66 36 52 C 33 38 36 26 44 22 Z" fill="url(#aR)"/>
    {/* Apple top notch */}
    <path d="M 60 20 C 57 14 57 8 61 7 C 65 6 66 11 62 20 Z" fill={dark ? "#f7f6f3" : "#0a0a0a"} opacity="0.55"/>
    {/* Apple stem */}
    <path d="M 56 18 C 54 10 50 5 46 7 C 43 9 44 14 48 15 C 52 16 55 17 56 18 Z" fill="#5a9a18"/>
    {/* White specular dot */}
    <circle cx="47" cy="34" r="5.5" fill="white" opacity="0.78"/>
    {/* Large leaf */}
    <path d="M 64 66 C 66 54 70 38 76 22 C 80 12 85 6 88 8 C 91 16 88 32 84 46 C 80 58 73 68 66 72 Z" fill="url(#lG1)"/>
    {/* Mid leaf */}
    <path d="M 74 72 C 80 62 88 50 96 38 C 100 32 104 26 104 22 C 100 24 94 34 88 46 C 82 58 76 70 74 74 Z" fill="url(#lG2)"/>
    {/* Small bottom leaf */}
    <path d="M 68 80 C 76 74 88 68 100 64 C 106 62 110 60 110 56 C 104 58 92 64 82 70 C 74 76 68 82 68 82 Z" fill="url(#lG3)"/>
    {/* Shadow gap between apple and leaves */}
    <path d="M 62 70 C 63 58 65 40 68 24 C 66 22 63 38 61 54 C 59 66 60 72 62 70 Z" fill={dark ? "#f7f6f3" : "#000"} opacity="0.3"/>
  </svg>
);

// ─── Fonts & CSS ──────────────────────────────────────────────────────────────
const FontLink = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg: #f7f6f3;
      --surface: #ffffff;
      --surface2: #f0efe9;
      --border: #e8e6df;
      --text-primary: #1a1a18;
      --text-secondary: #6b6b65;
      --text-tertiary: #a8a89e;
      --brand: #2d6a4f;
      --brand-light: #52b788;
      --brand-pale: #d8f3dc;
      --accent: #c84b31;
      --accent-pale: #fde8e3;
      --gold: #c8960a;
      --radius: 16px;
      --shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04);
      --shadow-md: 0 4px 16px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.04);
      --font: 'DM Sans', system-ui, sans-serif;
      --font-brand: 'Montserrat', sans-serif;
    }
    html, body { font-family: var(--font); background: var(--bg); color: var(--text-primary); height: 100%; -webkit-font-smoothing: antialiased; }
    #root { height: 100%; }
    button { cursor: pointer; font-family: inherit; border: none; background: none; }
    input, textarea, select { font-family: inherit; }
    @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
    @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:0.5;} }
    @keyframes spin { to { transform:rotate(360deg); } }
    @keyframes slideUp { from{opacity:0;transform:translateY(100%);} to{opacity:1;transform:translateY(0);} }
    @keyframes shake { 0%,100%{transform:translateX(0);} 20%,60%{transform:translateX(-6px);} 40%,80%{transform:translateX(6px);} }
    .anim-fade-up { animation: fadeUp 0.35s ease both; }
    .anim-fade-in { animation: fadeIn 0.25s ease both; }
    .stagger-1{animation-delay:.04s} .stagger-2{animation-delay:.08s} .stagger-3{animation-delay:.12s} .stagger-4{animation-delay:.18s} .stagger-5{animation-delay:.24s}
    .scroll-hide { scrollbar-width:none; } .scroll-hide::-webkit-scrollbar { display:none; }
    ::-webkit-scrollbar { width:4px; } ::-webkit-scrollbar-thumb { background:var(--border); border-radius:4px; }
  `}</style>
);

// ─── Mock Data ────────────────────────────────────────────────────────────────
const STORES = [
  { id:"1", name:"Mercado Verde",      category:"Supermercado", rating:4.8, delivery_time:"25-35 min", min_order:20, address:"R. das Flores, 120",   hours:"7h–21h",  color:"#2d6a4f", emoji:"🛒" },
  { id:"2", name:"Padaria Artesanal",  category:"Padaria",      rating:4.9, delivery_time:"15-25 min", min_order:15, address:"Av. Central, 45",       hours:"6h–20h",  color:"#c84b31", emoji:"🥐" },
  { id:"3", name:"Hortifruti Natural", category:"Hortifruti",   rating:4.7, delivery_time:"20-30 min", min_order:10, address:"R. Verde, 88",           hours:"7h–19h",  color:"#52b788", emoji:"🥦" },
  { id:"4", name:"Açougue Premium",    category:"Açougue",      rating:4.6, delivery_time:"30-45 min", min_order:30, address:"R. do Mercado, 210",    hours:"8h–18h",  color:"#8b4513", emoji:"🥩" },
  { id:"5", name:"Restaurante Sabor",  category:"Restaurante",  rating:4.8, delivery_time:"35-50 min", min_order:25, address:"Av. Principal, 300",    hours:"11h–22h", color:"#d4a017", emoji:"🍽️" },
];

const PRODUCTS = {
  "1": [
    { id:"m1", name:"Arroz Integral 5kg",     original_price:28.90, discount_price:18.90, expiry_date:"2026-04-20", category:"Mercearia",  emoji:"🌾", discount:35 },
    { id:"m2", name:"Ovos Caipira 12un",       original_price:16.90, discount_price:10.90, expiry_date:"2026-03-15", category:"Mercearia",  emoji:"🥚", discount:36 },
    { id:"m3", name:"Manteiga sem Sal 200g",   original_price:12.50, discount_price:7.90,  expiry_date:"2026-03-20", category:"Laticínios", emoji:"🧈", discount:37 },
    { id:"m4", name:"Leite Integral 1L",       original_price:6.50,  discount_price:4.20,  expiry_date:"2026-03-18", category:"Laticínios", emoji:"🥛", discount:35 },
    { id:"m5", name:"Iogurte Natural 500ml",   original_price:8.90,  discount_price:4.45,  expiry_date:"2026-03-15", category:"Laticínios", emoji:"🍶", discount:50 },
    { id:"m6", name:"Banana Nanica 1kg",       original_price:7.99,  discount_price:3.99,  expiry_date:"2026-03-12", category:"Frutas",     emoji:"🍌", discount:50 },
  ],
  "2": [
    { id:"p1", name:"Croissant Artesanal",     original_price:8.00,  discount_price:4.50,  expiry_date:"2026-03-09", category:"Doces",    emoji:"🥐", discount:44 },
    { id:"p2", name:"Pão de Queijo 6un",       original_price:12.00, discount_price:7.50,  expiry_date:"2026-03-10", category:"Salgados", emoji:"🫓", discount:38 },
    { id:"p3", name:"Bolo de Chocolate",       original_price:35.00, discount_price:22.00, expiry_date:"2026-03-12", category:"Doces",    emoji:"🎂", discount:37 },
    { id:"p4", name:"Pão Francês 10un",        original_price:5.50,  discount_price:2.75,  expiry_date:"2026-03-09", category:"Pães",     emoji:"🍞", discount:50 },
  ],
  "3": [
    { id:"h1", name:"Manga Palmer 1kg",        original_price:12.00, discount_price:6.00,  expiry_date:"2026-03-14", category:"Frutas",  emoji:"🥭", discount:50 },
    { id:"h2", name:"Brócolis Orgânico",       original_price:7.50,  discount_price:3.50,  expiry_date:"2026-03-09", category:"Legumes", emoji:"🥦", discount:53 },
    { id:"h3", name:"Cenoura Baby 500g",       original_price:6.00,  discount_price:3.00,  expiry_date:"2026-03-11", category:"Legumes", emoji:"🥕", discount:50 },
    { id:"h4", name:"Maçã Fuji 1kg",           original_price:10.00, discount_price:5.50,  expiry_date:"2026-03-13", category:"Frutas",  emoji:"🍎", discount:45 },
  ],
  "4": [
    { id:"a1", name:"Picanha Angus 1kg",       original_price:89.90, discount_price:59.90, expiry_date:"2026-03-10", category:"Bovino",    emoji:"🥩", discount:33 },
    { id:"a2", name:"Frango Peito 1kg",        original_price:22.90, discount_price:14.90, expiry_date:"2026-03-09", category:"Frango",    emoji:"🍗", discount:35 },
    { id:"a3", name:"Linguiça Artesanal",      original_price:28.00, discount_price:18.00, expiry_date:"2026-03-12", category:"Embutidos", emoji:"🌭", discount:36 },
    { id:"a4", name:"Carne Moída 500g",        original_price:18.00, discount_price:11.00, expiry_date:"2026-03-10", category:"Bovino",    emoji:"🫙", discount:39 },
  ],
  "5": [
    { id:"r1", name:"Prato Executivo",         original_price:35.00, discount_price:24.90, expiry_date:"2026-03-09", category:"Pratos",     emoji:"🍛", discount:29 },
    { id:"r2", name:"Suco Detox 500ml",        original_price:18.00, discount_price:11.00, expiry_date:"2026-03-08", category:"Bebidas",    emoji:"🥤", discount:39 },
    { id:"r3", name:"Salada Bowl",             original_price:28.00, discount_price:18.50, expiry_date:"2026-03-09", category:"Pratos",     emoji:"🥗", discount:34 },
    { id:"r4", name:"Açaí Bowl 400ml",         original_price:24.00, discount_price:15.00, expiry_date:"2026-03-09", category:"Sobremesas", emoji:"🫐", discount:38 },
  ],
};

const STATUS_CFG = {
  pending:    { label:"Aguardando",  color:"#d4a017", bg:"#fef9e7" },
  confirmed:  { label:"Confirmado",  color:"#2d6a4f", bg:"#d8f3dc" },
  preparing:  { label:"Preparando",  color:"#c84b31", bg:"#fde8e3" },
  delivering: { label:"A caminho",   color:"#1a6eb0", bg:"#dceefb" },
  delivered:  { label:"Entregue",    color:"#2d6a4f", bg:"#d8f3dc" },
  cancelled:  { label:"Cancelado",   color:"#888",    bg:"#f0f0f0" },
};

const CATEGORIES = ["Todos","Supermercado","Padaria","Hortifruti","Açougue","Restaurante"];
const BANNERS = [
  { title:"Produtos próximos do vencimento", subtitle:"Até 60% OFF · Salve o alimento, economize dinheiro", tag:"♻️ Anti-desperdício" },
  { title:"Entrega grátis hoje",              subtitle:"Pedidos acima de R$35 em qualquer loja",              tag:"🚀 Promoção" },
  { title:"Novos parceiros",                  subtitle:"5 novas lojas na sua região esta semana",              tag:"✨ Novo" },
];
const DELIVERY_OPTIONS = [
  { id:"pickup",   label:"Retirada na loja",   desc:"Busque você mesmo",       price:0,     emoji:"🏪" },
  { id:"standard", label:"Entrega padrão",     desc:"Chegará em 30-50 min",    price:5.90,  emoji:"🚲" },
  { id:"express",  label:"Entrega expressa",   desc:"Chegará em 15-25 min",    price:12.90, emoji:"⚡" },
];
const PAYMENT_OPTIONS = [
  { id:"pix",  label:"PIX",               desc:"Aprovação imediata",      emoji:"⚡" },
  { id:"card", label:"Cartão de crédito", desc:"Em até 12x sem juros",    emoji:"💳" },
  { id:"cash", label:"Dinheiro",          desc:"Pague na entrega",        emoji:"💵" },
];
const SAVED_ADDRESSES = [
  { id:"a1", label:"Casa",     address:"R. das Flores, 45, Apto 12 — Vila Verde" },
  { id:"a2", label:"Trabalho", address:"Av. Paulista, 1200, 8º andar — Centro" },
];

// Pre-computed map: product id → store (avoids O(n²) lookups throughout the app)
const PRODUCT_STORE_MAP = Object.fromEntries(
  Object.entries(PRODUCTS).flatMap(([storeId, prods]) =>
    prods.map(p => [p.id, STORES.find(s => s.id === storeId)])
  )
);

// ─── Contexts ─────────────────────────────────────────────────────────────────
const CartCtx = createContext(null);
const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [couponCode, setCouponCode] = useState(null);
  const [discount, setDiscount] = useState(0);
  const addItem = useCallback((item) => {
    let conflict = null;
    setItems(prev => {
      if (prev.length > 0 && prev[0].store_id !== item.store_id) {
        conflict = prev[0].store_name;
        return prev;
      }
      const ex = prev.find(i => i.product_id === item.product_id);
      if (ex) return prev.map(i => i.product_id === item.product_id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...item, id: Math.random().toString(36), quantity: 1 }];
    });
    return conflict;
  }, []);
  const replaceCart = useCallback((item) => {
    setItems([{ ...item, id: Math.random().toString(36), quantity: 1 }]);
    setCouponCode(null); setDiscount(0);
  }, []);
  const removeItem = useCallback((id) => setItems(prev => prev.filter(i => i.product_id !== id)), []);
  const updateQty = useCallback((id, qty) => {
    if (qty <= 0) setItems(prev => prev.filter(i => i.product_id !== id));
    else setItems(prev => prev.map(i => i.product_id === id ? { ...i, quantity: qty } : i));
  }, []);
  const clearCart = useCallback(() => { setItems([]); setCouponCode(null); setDiscount(0); }, []);
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const itemCount = items.reduce((s, i) => s + i.quantity, 0);
  const applyCoupon = (code) => {
    const valid = ["ECODELI10","ECO20","SMARTFOOD"].includes(code.toUpperCase());
    if (valid) { setCouponCode(code.toUpperCase()); setDiscount(total * 0.1); return true; }
    return false;
  };
  const removeCoupon = () => { setCouponCode(null); setDiscount(0); };
  return <CartCtx.Provider value={{ items, addItem, replaceCart, removeItem, updateQty, clearCart, total, itemCount, couponCode, discount, applyCoupon, removeCoupon }}>{children}</CartCtx.Provider>;
};
const useCart = () => useContext(CartCtx);

const NavCtx = createContext(null);
const NavProvider = ({ children }) => {
  const [page, setPage] = useState("home");
  const [params, setParams] = useState({});
  const [history, setHistory] = useState([]);
  const navigate = (p, par = {}) => { setHistory(h => [...h, { page, params }]); setPage(p); setParams(par); window.scrollTo(0,0); };
  const goBack = () => {
    const prev = history[history.length - 1];
    if (prev) { setPage(prev.page); setParams(prev.params); setHistory(h => h.slice(0,-1)); }
    else navigate("home");
  };
  return <NavCtx.Provider value={{ page, params, navigate, goBack }}>{children}</NavCtx.Provider>;
};
const useNav = () => useContext(NavCtx);

const ToastCtx = createContext(null);
const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const show = (msg, type="success") => {
    const id = Math.random().toString(36);
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
  };
  return (
    <ToastCtx.Provider value={{ show }}>
      {children}
      <div style={{ position:"fixed", bottom:84, left:"50%", transform:"translateX(-50%)", zIndex:9999, display:"flex", flexDirection:"column", gap:8, width:320, maxWidth:"92vw", pointerEvents:"none" }}>
        {toasts.map(t => (
          <div key={t.id} style={{ background: t.type==="error" ? "#c84b31" : t.type==="warn" ? "#d4a017" : "#1a1a18", color:"#fff", padding:"12px 18px", borderRadius:12, fontSize:13.5, fontWeight:600, boxShadow:"0 8px 32px rgba(0,0,0,0.25)", animation:"slideUp 0.3s ease" }}>{t.msg}</div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
};
const useToast = () => useContext(ToastCtx);

// ─── User / Auth Context ──────────────────────────────────────────────────────
const UserCtx = createContext(null);
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([
    { id:"o1", order_number:"#2847", store_id:"1", store_name:"Mercado Verde",     date:"Hoje, 14:32",  status:"delivering", total:47.80, items:[{name:"Arroz Integral 5kg",qty:1,price:18.90},{name:"Ovos Caipira 12un",qty:1,price:10.90},{name:"Leite Integral 1L",qty:2,price:8.40}] },
    { id:"o2", order_number:"#2831", store_id:"2", store_name:"Padaria Artesanal", date:"Ontem, 9:15",  status:"delivered",  total:29.00, items:[{name:"Croissant Artesanal",qty:3,price:13.50},{name:"Pão de Queijo 6un",qty:2,price:15.00}] },
    { id:"o3", order_number:"#2820", store_id:"3", store_name:"Hortifruti Natural",date:"05/03, 11:40", status:"delivered",  total:22.50, items:[{name:"Manga Palmer 1kg",qty:1,price:6.00},{name:"Brócolis Orgânico",qty:2,price:7.00},{name:"Cenoura Baby 500g",qty:2,price:6.00}] },
  ]);
  const [addresses, setAddresses] = useState(SAVED_ADDRESSES);
  const [favorites, setFavorites] = useState([]);
  const addOrder = (order) => setOrders(prev => [order, ...prev]);
  const toggleFav = (storeId) => setFavorites(prev => prev.includes(storeId) ? prev.filter(x => x !== storeId) : [...prev, storeId]);
  const addAddress = (addr) => setAddresses(prev => [...prev, { ...addr, id: Math.random().toString(36) }]);
  const removeAddress = (id) => setAddresses(prev => prev.filter(a => a.id !== id));
  return <UserCtx.Provider value={{ user, setUser, orders, addOrder, addresses, addAddress, removeAddress, favorites, toggleFav }}>{children}</UserCtx.Provider>;
};
const useUser = () => useContext(UserCtx);

// ─── CEP Lookup Hook (shared by Checkout, Profile, StoreDashboard) ────────────
const useCEPLookup = () => {
  const [cepLoading, setCepLoading] = useState(false);
  const [cepError, setCepError] = useState("");
  const abortRef = useRef(null);

  const formatCep = (v) => v.replace(/\D/g,"").slice(0,8).replace(/^(\d{5})(\d)/,"$1-$2");

  const fetchCep = useCallback(async (raw, onSuccess) => {
    const digits = raw.replace(/\D/g,"");
    if (digits.length !== 8) return;
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setCepLoading(true); setCepError("");
    try {
      const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`, { signal: controller.signal });
      const d = await res.json();
      if (d.erro) { setCepError("CEP não encontrado"); setCepLoading(false); return; }
      onSuccess(d);
    } catch (e) {
      if (e.name !== "AbortError") setCepError("Erro ao buscar CEP");
    }
    setCepLoading(false);
  }, []);

  const clearCepError = () => setCepError("");

  return { cepLoading, cepError, formatCep, fetchCep, clearCepError };
};

// ─── Shared UI Components ──────────────────────────────────────────────────────
const Btn = ({ children, onClick, variant="primary", size="md", style:s={}, disabled, type="button" }) => {
  const base = { display:"inline-flex", alignItems:"center", justifyContent:"center", gap:7, fontFamily:"var(--font)", fontWeight:700, letterSpacing:"-0.01em", border:"none", cursor:disabled?"not-allowed":"pointer", transition:"all 0.15s ease", borderRadius:13, whiteSpace:"nowrap", opacity:disabled?0.5:1 };
  const sizes = { sm:{padding:"6px 13px",fontSize:13}, md:{padding:"10px 20px",fontSize:14}, lg:{padding:"13px 24px",fontSize:15} };
  const variants = {
    primary:  { background:"var(--brand)",   color:"#fff" },
    secondary:{ background:"var(--surface)", color:"var(--text-primary)", border:"1.5px solid var(--border)" },
    ghost:    { background:"transparent",    color:"var(--text-secondary)" },
    danger:   { background:"var(--accent)",  color:"#fff" },
    outline:  { background:"transparent",    color:"var(--brand)", border:"1.5px solid var(--brand)" },
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled}
      style={{ ...base, ...sizes[size], ...variants[variant], ...s }}
      onMouseEnter={e => { if(!disabled) e.currentTarget.style.filter="brightness(1.08)"; }}
      onMouseLeave={e => { e.currentTarget.style.filter=""; }}
    >{children}</button>
  );
};

const TextInput = ({ label, placeholder, value, onChange, type="text", icon, error, style:s={} }) => (
  <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
    {label && <label style={{ fontSize:12, fontWeight:600, color:"var(--text-secondary)", letterSpacing:"0.04em", textTransform:"uppercase" }}>{label}</label>}
    <div style={{ position:"relative" }}>
      {icon && <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", fontSize:15, pointerEvents:"none" }}>{icon}</span>}
      <input type={type} placeholder={placeholder} value={value} onChange={onChange}
        style={{ width:"100%", padding: icon ? "11px 14px 11px 38px" : "11px 14px", background:"var(--surface)", border:`1.5px solid ${error ? "var(--accent)" : "var(--border)"}`, borderRadius:12, fontSize:14, color:"var(--text-primary)", outline:"none", transition:"border-color 0.15s", ...s }}
        onFocus={e => e.target.style.borderColor="var(--brand)"}
        onBlur={e => e.target.style.borderColor = error ? "var(--accent)" : "var(--border)"}
      />
    </div>
    {error && <span style={{ fontSize:12, color:"var(--accent)" }}>{error}</span>}
  </div>
);

const Badge = ({ children, color="var(--brand)", bg="var(--brand-pale)" }) => (
  <span style={{ display:"inline-flex", alignItems:"center", padding:"3px 9px", borderRadius:99, fontSize:11, fontWeight:700, color, background:bg, letterSpacing:"0.01em", flexShrink:0 }}>{children}</span>
);

const Card = ({ children, style:s={}, onClick, className="" }) => (
  <div onClick={onClick} className={className}
    style={{ background:"var(--surface)", borderRadius:"var(--radius)", border:"1px solid var(--border)", boxShadow:"var(--shadow)", overflow:"hidden", cursor:onClick?"pointer":"default", transition:onClick?"box-shadow 0.15s,transform 0.15s":"none", ...s }}
    onMouseEnter={onClick ? e => { e.currentTarget.style.boxShadow="var(--shadow-md)"; e.currentTarget.style.transform="translateY(-1px)"; } : undefined}
    onMouseLeave={onClick ? e => { e.currentTarget.style.boxShadow="var(--shadow)"; e.currentTarget.style.transform="translateY(0)"; } : undefined}
  >{children}</div>
);

const Spinner = ({ size=24 }) => (
  <div style={{ width:size, height:size, border:`3px solid rgba(255,255,255,0.3)`, borderTopColor:"#fff", borderRadius:"50%", animation:"spin 0.7s linear infinite", flexShrink:0 }} />
);

const Modal = ({ title, children, onClose }) => (
  <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", zIndex:1000, display:"flex", alignItems:"flex-end", justifyContent:"center", padding:"0 0 0 0" }} onClick={onClose}>
    <div onClick={e => e.stopPropagation()} style={{ background:"var(--surface)", borderRadius:"20px 20px 0 0", width:"100%", maxWidth:480, maxHeight:"80vh", overflowY:"auto", padding:"20px 20px 40px", animation:"slideUp 0.3s ease" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
        <h2 style={{ fontSize:17, fontWeight:700 }}>{title}</h2>
        <button onClick={onClose} style={{ fontSize:20, color:"var(--text-tertiary)", width:32, height:32, display:"flex", alignItems:"center", justifyContent:"center", borderRadius:8, background:"var(--surface2)" }}>×</button>
      </div>
      {children}
    </div>
  </div>
);

const BackBtn = ({ onBack }) => (
  <button onClick={onBack} style={{ display:"flex", alignItems:"center", gap:6, color:"var(--text-secondary)", fontSize:14, fontWeight:600, padding:"4px 0" }}>
    <span style={{ fontSize:20, lineHeight:1 }}>←</span> Voltar
  </button>
);

// ─── AUTH PAGE ────────────────────────────────────────────────────────────────
const AuthPage = () => {
  const { setUser } = useUser();
  const toast = useToast();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name:"", email:"", password:"", confirm:"" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [forgot, setForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  const validate = () => {
    const e = {};
    if (mode==="register" && !form.name.trim()) e.name = "Nome obrigatório";
    if (!form.email.includes("@")) e.email = "Email inválido";
    if (form.password.length < 6) e.password = "Mínimo 6 caracteres";
    if (mode==="register" && form.password !== form.confirm) e.confirm = "Senhas não coincidem";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handle = () => {
    if (!validate()) { toast.show("Corrija os campos indicados", "error"); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setUser({ email: form.email, name: form.name || form.email.split("@")[0] });
      toast.show(mode==="login" ? "Bem-vindo de volta! 👋" : "Conta criada com sucesso! 🎉");
    }, 1200);
  };

  const handleForgot = () => {
    if (!forgotEmail.includes("@")) { toast.show("Digite um email válido", "error"); return; }
    toast.show(`📧 Enviamos um link para ${forgotEmail}`);
    setForgot(false);
  };

  if (forgot) return (
    <div style={{ minHeight:"100vh", background:"#000", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:24 }}>
      <div style={{ width:"100%", maxWidth:360 }} className="anim-fade-up">
        <button onClick={()=>setForgot(false)} style={{ color:"#8dc63f", fontSize:14, fontWeight:600, marginBottom:24, display:"flex", alignItems:"center", gap:6, background:"none", border:"none", cursor:"pointer" }}>← Voltar ao login</button>
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <EcodeliLogo size={64} />
          <h1 style={{ fontFamily:"var(--font-brand)", fontSize:26, fontWeight:800, color:"#fff", letterSpacing:"0.06em", marginTop:12 }}>ECODELI</h1>
        </div>
        <Card style={{ padding:24, background:"#111", border:"1px solid #222" }}>
          <h2 style={{ fontSize:17, fontWeight:700, color:"#fff", marginBottom:8 }}>Recuperar senha</h2>
          <p style={{ fontSize:13, color:"#888", marginBottom:16 }}>Enviaremos um link de redefinição para seu email.</p>
          <TextInput placeholder="seu@email.com" value={forgotEmail} onChange={e=>setForgotEmail(e.target.value)} type="email" icon="✉️" style={{ background:"#1a1a1a", border:"1px solid #333", color:"#fff" }}/>
          <Btn onClick={handleForgot} size="lg" style={{ width:"100%", marginTop:14 }}>Enviar link →</Btn>
        </Card>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", background:"#000", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:24 }}>
      <div style={{ width:"100%", maxWidth:360 }}>
        {/* Logo */}
        <div style={{ textAlign:"center", marginBottom:36 }} className="anim-fade-up">
          <EcodeliLogo size={80} />
          <h1 style={{ fontFamily:"var(--font-brand)", fontSize:32, fontWeight:800, color:"#fff", letterSpacing:"0.1em", marginTop:12, lineHeight:1 }}>ECODELI</h1>
          <p style={{ fontSize:12, fontWeight:700, letterSpacing:"0.4em", color:"#8dc63f", marginTop:6, textTransform:"uppercase" }}>Smart Food</p>
          <p style={{ color:"#666", fontSize:13, marginTop:10 }}>Alimentos com desconto, zero desperdício</p>
        </div>

        {/* Mode tabs */}
        <div style={{ display:"flex", background:"#111", borderRadius:14, padding:4, marginBottom:20, border:"1px solid #222" }} className="anim-fade-up stagger-1">
          {[["login","Entrar"],["register","Cadastrar"]].map(([m,l]) => (
            <button key={m} onClick={()=>{setMode(m);setErrors({});}} style={{ flex:1, padding:"10px 0", borderRadius:11, fontSize:14, fontWeight:700, fontFamily:"var(--font)", background:mode===m?"#fff":"transparent", color:mode===m?"#111":"#666", boxShadow:mode===m?"0 2px 8px rgba(0,0,0,0.2)":"none", transition:"all 0.2s" }}>{l}</button>
          ))}
        </div>

        <Card style={{ padding:22, background:"#0d0d0d", border:"1px solid #1e1e1e" }} className="anim-fade-up stagger-2">
          <div style={{ display:"flex", flexDirection:"column", gap:13 }}>
            {mode==="register" && (
              <TextInput label="Nome" placeholder="Seu nome completo" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} icon="👤" error={errors.name} style={{ background:"#161616", border:"1px solid #2a2a2a", color:"#fff" }}/>
            )}
            <TextInput label="Email" placeholder="seu@email.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} type="email" icon="✉️" error={errors.email} style={{ background:"#161616", border:"1px solid #2a2a2a", color:"#fff" }}/>
            <TextInput label="Senha" placeholder="••••••••" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} type="password" icon="🔒" error={errors.password} style={{ background:"#161616", border:"1px solid #2a2a2a", color:"#fff" }}/>
            {mode==="register" && (
              <TextInput label="Confirmar senha" placeholder="••••••••" value={form.confirm} onChange={e=>setForm({...form,confirm:e.target.value})} type="password" icon="🔒" error={errors.confirm} style={{ background:"#161616", border:"1px solid #2a2a2a", color:"#fff" }}/>
            )}
            {mode==="login" && (
              <button onClick={()=>setForgot(true)} style={{ fontSize:12, color:"#8dc63f", fontWeight:600, textAlign:"right", background:"none", border:"none", cursor:"pointer", fontFamily:"var(--font)" }}>Esqueceu a senha?</button>
            )}
            <Btn onClick={handle} size="lg" disabled={loading} style={{ width:"100%", marginTop:4 }}>
              {loading ? <Spinner/> : mode==="login" ? "Entrar →" : "Criar conta →"}
            </Btn>
          </div>
        </Card>
        {/* Quick login buttons */}
        <div style={{ marginTop:20 }} className="anim-fade-up stagger-3">
          <p style={{ textAlign:"center", fontSize:11, color:"#444", marginBottom:10, textTransform:"uppercase", letterSpacing:"0.08em", fontWeight:600 }}>Acesso rápido</p>
          <div style={{ display:"flex", gap:8 }}>
            <button onClick={()=>{ setUser({ email:"usuario@ecodeli.com", name:"João Silva", role:"client" }); toast.show("Bem-vindo, João! 👋"); }}
              style={{ flex:1, padding:"11px 6px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:12, cursor:"pointer", fontFamily:"var(--font)", transition:"all 0.15s" }}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.1)"}
              onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.06)"}>
              <div style={{ fontSize:20, marginBottom:4 }}>👤</div>
              <div style={{ fontSize:11, fontWeight:700, color:"#fff" }}>Cliente</div>
              <div style={{ fontSize:10, color:"#555", marginTop:1 }}>demo</div>
            </button>
            <button onClick={()=>{ setUser({ email:"mercado@ecodeli.com", name:"Mercado Verde", role:"store", storeId:"1" }); toast.show("Olá, Mercado Verde! 🛒"); }}
              style={{ flex:1, padding:"11px 6px", background:"rgba(96,165,250,0.08)", border:"1px solid rgba(96,165,250,0.2)", borderRadius:12, cursor:"pointer", fontFamily:"var(--font)", transition:"all 0.15s" }}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(96,165,250,0.15)"}
              onMouseLeave={e=>e.currentTarget.style.background="rgba(96,165,250,0.08)"}>
              <div style={{ fontSize:20, marginBottom:4 }}>🛒</div>
              <div style={{ fontSize:11, fontWeight:700, color:"#60a5fa" }}>Loja</div>
              <div style={{ fontSize:10, color:"#555", marginTop:1 }}>mercado</div>
            </button>
            <button onClick={()=>{ setUser({ email:"admin@ecodeli.com", name:"Admin", role:"admin", isAdmin:true }); toast.show("Bem-vindo, Admin! ⚙️"); }}
              style={{ flex:1, padding:"11px 6px", background:"rgba(141,198,63,0.08)", border:"1px solid rgba(141,198,63,0.2)", borderRadius:12, cursor:"pointer", fontFamily:"var(--font)", transition:"all 0.15s" }}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(141,198,63,0.15)"}
              onMouseLeave={e=>e.currentTarget.style.background="rgba(141,198,63,0.08)"}>
              <div style={{ fontSize:20, marginBottom:4 }}>⚙️</div>
              <div style={{ fontSize:11, fontWeight:700, color:"#8dc63f" }}>Admin</div>
              <div style={{ fontSize:10, color:"#555", marginTop:1 }}>painel</div>
            </button>
          </div>
        </div>

        <p style={{ textAlign:"center", fontSize:12, color:"#333", marginTop:16 }}>
          Ao continuar você concorda com os <span style={{ color:"#8dc63f", fontWeight:600, cursor:"pointer" }}>Termos de Uso</span>
        </p>
      </div>
    </div>
  );
};

// ─── HOME PAGE ─────────────────────────────────────────────────────────────────
const HomePage = () => {
  const { navigate } = useNav();
  const { itemCount } = useCart();
  const { user, favorites, toggleFav, orders } = useUser();
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("Todos");
  const [bannerIdx, setBannerIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setBannerIdx(i => (i+1) % BANNERS.length), 4000);
    return () => clearInterval(t);
  }, []);

  const filtered = STORES.filter(s =>
    (cat==="Todos" || s.category===cat) &&
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const allDeals = useMemo(() =>
    Object.values(PRODUCTS).flat().sort((a,b) => b.discount - a.discount).slice(0,10),
  []);

  const activeOrders = useMemo(() =>
    orders.filter(o => ["pending","confirmed","preparing","delivering"].includes(o.status)),
  [orders]);

  // Search across products too
  const searchTrimmed = search.trim().toLowerCase();
  const productResults = searchTrimmed.length >= 2
    ? Object.values(PRODUCTS).flat().filter(p => p.name.toLowerCase().includes(searchTrimmed))
    : [];
  const storeResults = searchTrimmed.length >= 2
    ? STORES.filter(s => s.name.toLowerCase().includes(searchTrimmed) || s.category.toLowerCase().includes(searchTrimmed))
    : [];

  return (
    <div style={{ minHeight:"100vh", background:"var(--bg)", paddingBottom:88 }}>
      {/* Hero header */}
      <div style={{ background:"linear-gradient(145deg, #080f09 0%, #0f1f12 50%, #1a3520 100%)", padding:"50px 18px 24px" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:18 }} className="anim-fade-up">
          <div style={{ display:"flex", alignItems:"center", gap:11 }}>
            <EcodeliLogo size={38} />
            <div>
              <div style={{ fontFamily:"var(--font-brand)", fontSize:17, fontWeight:800, color:"#fff", letterSpacing:"0.08em", lineHeight:1 }}>ECODELI</div>
              <div style={{ fontSize:9, color:"#8dc63f", letterSpacing:"0.3em", textTransform:"uppercase", fontWeight:700, marginTop:2 }}>Smart Food</div>
            </div>
          </div>
          <div style={{ display:"flex", gap:10, alignItems:"center" }}>
            <button onClick={() => navigate("cart")} style={{ position:"relative", width:40, height:40, background:"rgba(255,255,255,0.1)", borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", border:"1px solid rgba(255,255,255,0.1)", cursor:"pointer", backdropFilter:"blur(8px)" }}>
              <span style={{ fontSize:19 }}>🛒</span>
              {itemCount > 0 && <span style={{ position:"absolute", top:-5, right:-5, width:19, height:19, background:"#c84b31", borderRadius:99, fontSize:10, fontWeight:800, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", border:"2px solid #080f09" }}>{itemCount}</span>}
            </button>
          </div>
        </div>
        <div style={{ marginBottom:0 }} className="anim-fade-up stagger-1">
          <div style={{ position:"relative" }}>
            <span style={{ position:"absolute", left:13, top:"50%", transform:"translateY(-50%)", fontSize:15 }}>🔍</span>
            <input placeholder="Buscar lojas ou produtos..." value={search} onChange={e=>setSearch(e.target.value)}
              onKeyDown={e=>{ if(e.key==="Escape") setSearch(""); }}
              style={{ width:"100%", padding:"12px 16px 12px 40px", background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:14, fontSize:14, color:"#fff", fontFamily:"var(--font)", outline:"none", backdropFilter:"blur(8px)" }}
            />
            {search && (
              <button onClick={()=>setSearch("")} style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"rgba(255,255,255,0.15)", border:"none", borderRadius:99, width:20, height:20, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"#fff", fontSize:12, fontWeight:700 }}>✕</button>
            )}
          </div>
          {/* Search results dropdown */}
          {searchTrimmed.length >= 2 && (
            <div style={{ background:"rgba(15,31,18,0.97)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:14, marginTop:6, overflow:"hidden", backdropFilter:"blur(16px)", boxShadow:"0 8px 32px rgba(0,0,0,0.4)" }} className="anim-fade-in">
              {productResults.length === 0 && storeResults.length === 0 ? (
                <div style={{ padding:"18px 16px", textAlign:"center", color:"rgba(255,255,255,0.4)", fontSize:13 }}>Nenhum resultado para "{search}"</div>
              ) : (
                <>
                  {storeResults.length > 0 && (
                    <div>
                      <div style={{ padding:"8px 14px 4px", fontSize:10, fontWeight:700, color:"rgba(255,255,255,0.35)", textTransform:"uppercase", letterSpacing:"0.08em" }}>Lojas</div>
                      {storeResults.map(s => (
                        <button key={s.id} onClick={()=>{ navigate("store",{store:s}); setSearch(""); }}
                          style={{ display:"flex", alignItems:"center", gap:11, width:"100%", padding:"10px 14px", background:"none", border:"none", cursor:"pointer", fontFamily:"var(--font)", borderBottom:"1px solid rgba(255,255,255,0.05)" }}
                          onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.07)"}
                          onMouseLeave={e=>e.currentTarget.style.background="none"}>
                          <span style={{ fontSize:20 }}>{s.emoji}</span>
                          <div style={{ textAlign:"left" }}>
                            <p style={{ fontSize:13, fontWeight:700, color:"#fff" }}>{s.name}</p>
                            <p style={{ fontSize:11, color:"rgba(255,255,255,0.4)" }}>{s.category} · ★ {s.rating}</p>
                          </div>
                          <span style={{ marginLeft:"auto", fontSize:16, color:"rgba(255,255,255,0.3)" }}>›</span>
                        </button>
                      ))}
                    </div>
                  )}
                  {productResults.length > 0 && (
                    <div>
                      <div style={{ padding:"8px 14px 4px", fontSize:10, fontWeight:700, color:"rgba(255,255,255,0.35)", textTransform:"uppercase", letterSpacing:"0.08em" }}>Produtos</div>
                      {productResults.slice(0,6).map(p => {
                        const store = PRODUCT_STORE_MAP[p.id];
                        return (
                          <button key={p.id} onClick={()=>{ if(store) navigate("store",{store}); setSearch(""); }}
                            style={{ display:"flex", alignItems:"center", gap:11, width:"100%", padding:"10px 14px", background:"none", border:"none", cursor:"pointer", fontFamily:"var(--font)", borderBottom:"1px solid rgba(255,255,255,0.05)" }}
                            onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.07)"}
                            onMouseLeave={e=>e.currentTarget.style.background="none"}>
                            <span style={{ fontSize:22, width:32, textAlign:"center" }}>{p.emoji}</span>
                            <div style={{ flex:1, textAlign:"left" }}>
                              <p style={{ fontSize:13, fontWeight:600, color:"#fff" }}>{p.name}</p>
                              <p style={{ fontSize:11, color:"rgba(255,255,255,0.4)" }}>{store?.name} · {p.category}</p>
                            </div>
                            <div style={{ textAlign:"right", flexShrink:0 }}>
                              <div style={{ fontSize:13, fontWeight:800, color:"#8dc63f" }}>R${p.discount_price.toFixed(2)}</div>
                              <div style={{ fontSize:10, color:"#c84b31", fontWeight:700 }}>-{p.discount}%</div>
                            </div>
                          </button>
                        );
                      })}
                      {productResults.length > 6 && (
                        <button onClick={()=>{ navigate("all-deals"); setSearch(""); }}
                          style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6, width:"100%", padding:"11px 14px", background:"rgba(141,198,63,0.08)", border:"none", cursor:"pointer", fontFamily:"var(--font)", fontSize:13, fontWeight:700, color:"#8dc63f" }}>
                          Ver todos os {productResults.length} resultados →
                        </button>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <div style={{ padding:"0 16px" }}>
        {/* Active order quick-access strip */}
        {activeOrders.length > 0 && (
          <button onClick={()=>navigate("orders")} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", width:"100%", marginTop:12, padding:"11px 14px", background:"var(--brand-pale)", border:"1.5px solid var(--brand-light)", borderRadius:14, fontFamily:"var(--font)", cursor:"pointer" }}>
            <div style={{ display:"flex", alignItems:"center", gap:9 }}>
              <span style={{ fontSize:18 }}>🚴</span>
              <div style={{ textAlign:"left" }}>
                <p style={{ fontSize:13, fontWeight:700, color:"var(--brand)" }}>Pedido em andamento</p>
                <p style={{ fontSize:11, color:"var(--brand)", opacity:0.7 }}>{activeOrders.length} pedido{activeOrders.length!==1?"s":""} ativo{activeOrders.length!==1?"s":""}</p>
              </div>
            </div>
            <span style={{ fontSize:20, color:"var(--brand)" }}>›</span>
          </button>
        )}
        {/* Rotating Banner */}
        <div style={{ marginTop:14, marginBottom:14 }} className="anim-fade-up stagger-1">
          <Card onClick={()=>navigate("all-deals")} style={{ background:"linear-gradient(135deg, #1a3520, #2d6a4f)", border:"none", padding:"16px 18px", cursor:"pointer" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
              <div style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.6)", letterSpacing:"0.08em", marginBottom:6 }}>{BANNERS[bannerIdx].tag}</div>
              <span style={{ fontSize:22, color:"rgba(255,255,255,0.5)", lineHeight:1 }}>›</span>
            </div>
            <div style={{ fontSize:16, fontWeight:700, color:"#fff", lineHeight:1.3 }}>{BANNERS[bannerIdx].title}</div>
            <div style={{ fontSize:12, color:"rgba(255,255,255,0.65)", marginTop:4 }}>{BANNERS[bannerIdx].subtitle}</div>
            <div style={{ display:"flex", gap:6, marginTop:12 }}>
              {BANNERS.map((_,i) => <div key={i} onClick={()=>setBannerIdx(i)} style={{ width:i===bannerIdx?20:6, height:6, borderRadius:99, background:i===bannerIdx?"#fff":"rgba(255,255,255,0.35)", transition:"all 0.3s", cursor:"pointer" }}/>)}
            </div>
          </Card>
        </div>

        {/* Category filter */}
        <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:4, marginBottom:18 }} className="scroll-hide anim-fade-up s2">
          {CATEGORIES.map(c => (
            <button key={c} onClick={()=>setCat(c)} style={{ padding:"7px 15px", borderRadius:99, fontSize:13, fontWeight:700, whiteSpace:"nowrap", fontFamily:"var(--font)", background:cat===c?"var(--brand)":"var(--surface)", color:cat===c?"#fff":"var(--text-secondary)", border:cat===c?"1.5px solid var(--brand)":"1.5px solid var(--border)", transition:"all 0.15s", flexShrink:0 }}>{c}</button>
          ))}
        </div>

        {/* Top Deals horizontal strip */}
        <div style={{ marginBottom:22 }} className="anim-fade-up stagger-2">
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
            <h2 style={{ fontSize:16, fontWeight:700, letterSpacing:"-0.02em" }}>🔥 Melhores ofertas</h2>
            <button onClick={()=>navigate("all-deals")} style={{ display:"flex", alignItems:"center", gap:3, fontSize:12, fontWeight:700, color:"var(--brand)", background:"none", border:"none", cursor:"pointer", fontFamily:"var(--font)" }}>Ver todas <span style={{ fontSize:16 }}>›</span></button>
          </div>
          <div style={{ display:"flex", gap:10, overflowX:"auto", paddingBottom:6 }} className="scroll-hide">
            {allDeals.map((p,i) => {
              const store = PRODUCT_STORE_MAP[p.id];
              return (
                <div key={p.id} onClick={() => store && navigate("store", { store })}
                  style={{ minWidth:120, background:"var(--surface)", borderRadius:14, border:"1px solid var(--border)", overflow:"hidden", flexShrink:0, cursor:"pointer" }}
                  className={`anim-fade-up stagger-${Math.min(i+1,5)}`}>
                  <div style={{ height:76, background:`hsl(${i*43%360},30%,93%)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:34, position:"relative" }}>
                    {p.emoji}
                    <span style={{ position:"absolute", top:6, left:6, background:"var(--accent)", color:"#fff", fontSize:10, fontWeight:800, padding:"2px 7px", borderRadius:99 }}>-{p.discount}%</span>
                  </div>
                  <div style={{ padding:"8px 10px 10px" }}>
                    <p style={{ fontSize:11.5, fontWeight:600, lineHeight:1.25, marginBottom:4, color:"var(--text-primary)" }}>{p.name}</p>
                    <div style={{ fontSize:13, fontWeight:800, color:"var(--brand)" }}>R${p.discount_price.toFixed(2)}</div>
                    <div style={{ fontSize:10, color:"var(--text-tertiary)", textDecoration:"line-through" }}>R${p.original_price.toFixed(2)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stores list */}
        <div className="anim-fade-up stagger-3">
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
            <h2 style={{ fontSize:16, fontWeight:700, letterSpacing:"-0.02em" }}>Lojas próximas</h2>
            <span style={{ fontSize:12, color:"var(--text-tertiary)", fontWeight:600 }}>{filtered.length} loja{filtered.length!==1?"s":""} ›</span>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {filtered.map((store,i) => (
              <Card key={store.id} onClick={() => navigate("store", { store })} className={`anim-fade-up stagger-${Math.min(i+1,5)}`}>
                <div style={{ display:"flex", gap:13, padding:14, alignItems:"center" }}>
                  <div style={{ width:62, height:62, background:`${store.color}18`, borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", fontSize:30, flexShrink:0 }}>
                    {store.emoji}
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:4 }}>
                      <h3 style={{ fontSize:15, fontWeight:700, letterSpacing:"-0.02em" }}>{store.name}</h3>
                      <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                        <button onClick={e=>{e.stopPropagation();toggleFav(store.id);}} style={{ fontSize:16, padding:2, lineHeight:1 }}>
                          {favorites.includes(store.id) ? "❤️" : "🤍"}
                        </button>
                        <span style={{ fontSize:20, color:"var(--text-tertiary)", lineHeight:1 }}>›</span>
                      </div>
                    </div>
                    <Badge color={store.color} bg={`${store.color}18`}>{store.category}</Badge>
                    <div style={{ display:"flex", gap:10, marginTop:7, fontSize:12, color:"var(--text-secondary)", flexWrap:"wrap" }}>
                      <span>⏱ {store.delivery_time}</span>
                      <span>🛍 Min R${store.min_order}</span>
                      <span style={{ color:"var(--gold)", fontWeight:700 }}>★ {store.rating}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            {filtered.length===0 && (
              <div style={{ textAlign:"center", padding:"44px 0", color:"var(--text-tertiary)" }}>
                <div style={{ fontSize:40, marginBottom:10 }}>🔍</div>
                <p style={{ fontWeight:600 }}>Nenhuma loja encontrada</p>
                <p style={{ fontSize:13, marginTop:4 }}>Tente outra busca ou categoria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── ALL DEALS PAGE ───────────────────────────────────────────────────────────
const AllDealsPage = () => {
  const { goBack, navigate } = useNav();
  const [cat, setCat] = useState("Todos");
  const [sort, setSort] = useState("discount");

  const allDeals = Object.values(PRODUCTS).flat();
  const storeOf = (p) => PRODUCT_STORE_MAP[p.id];

  const allCats = ["Todos", ...new Set(allDeals.map(p => p.category))];
  const filtered = (cat==="Todos" ? allDeals : allDeals.filter(p => p.category===cat))
    .sort((a,b) => sort==="discount" ? b.discount - a.discount : new Date(a.expiry_date) - new Date(b.expiry_date));

  return (
    <div style={{ minHeight:"100vh", background:"var(--bg)", paddingBottom:88 }}>
      <div style={{ background:"linear-gradient(145deg,#080f09,#0f1f12,#1a3520)", padding:"50px 18px 18px" }}>
        <BackBtn onBack={goBack}/>
        <h1 style={{ fontSize:24, fontWeight:800, color:"#fff", letterSpacing:"-0.02em", marginTop:10 }}>🔥 Todas as ofertas</h1>
        <p style={{ fontSize:13, color:"rgba(255,255,255,0.5)", marginTop:4 }}>{filtered.length} produtos com desconto</p>

        {/* Sort */}
        <div style={{ display:"flex", gap:8, marginTop:14 }}>
          {[["discount","Maior desconto"],["expiry","Vence primeiro"]].map(([v,l]) => (
            <button key={v} onClick={()=>setSort(v)} style={{ padding:"7px 14px", borderRadius:99, fontSize:12, fontWeight:700, fontFamily:"var(--font)", background:sort===v?"#8dc63f":"rgba(255,255,255,0.08)", color:sort===v?"#000":"rgba(255,255,255,0.6)", border:"none", cursor:"pointer", transition:"all 0.15s" }}>{l}</button>
          ))}
        </div>
      </div>

      {/* Category pills */}
      <div style={{ display:"flex", gap:8, overflowX:"auto", padding:"12px 16px 4px" }} className="scroll-hide">
        {allCats.map(c => (
          <button key={c} onClick={()=>setCat(c)} style={{ padding:"6px 14px", borderRadius:99, fontSize:12, fontWeight:700, whiteSpace:"nowrap", fontFamily:"var(--font)", background:cat===c?"var(--brand)":"var(--surface)", color:cat===c?"#fff":"var(--text-secondary)", border:cat===c?"1.5px solid var(--brand)":"1.5px solid var(--border)", transition:"all 0.15s", flexShrink:0 }}>{c}</button>
        ))}
      </div>

      <div style={{ padding:"10px 16px 0", display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
        {filtered.length === 0 && (
          <div style={{ gridColumn:"1/-1", textAlign:"center", padding:"44px 0", color:"var(--text-tertiary)" }}>
            <div style={{ fontSize:40, marginBottom:10 }}>🔍</div>
            <p style={{ fontWeight:600 }}>Nenhuma oferta nesta categoria</p>
            <p style={{ fontSize:13, marginTop:4 }}>Tente outro filtro ou ordenação</p>
          </div>
        )}
        {filtered.map((p,i) => {
          const store = storeOf(p);
          const days = Math.ceil((new Date(p.expiry_date) - new Date()) / 86400000);
          const urgent = days <= 3;
          return (
            <Card key={p.id} onClick={()=>store && navigate("store",{store})} className={`anim-fade-up stagger-${Math.min(i+1,5)}`}>
              <div style={{ position:"relative" }}>
                <div style={{ height:90, background:`hsl(${i*43%360},28%,93%)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:40 }}>{p.emoji}</div>
                <span style={{ position:"absolute", top:7, left:7, background:"var(--accent)", color:"#fff", fontSize:10, fontWeight:800, padding:"2px 7px", borderRadius:99 }}>-{p.discount}%</span>
                {urgent && <span style={{ position:"absolute", top:7, right:7, background:"#f59e0b", color:"#fff", fontSize:9, fontWeight:800, padding:"2px 6px", borderRadius:99 }}>⚠️ {days}d</span>}
              </div>
              <div style={{ padding:"9px 11px 11px" }}>
                <p style={{ fontSize:12, fontWeight:600, lineHeight:1.3, marginBottom:2 }}>{p.name}</p>
                <p style={{ fontSize:10, color:"var(--text-tertiary)", marginBottom:4 }}>📍 {store?.name}</p>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <div>
                    <div style={{ fontSize:10, color:"var(--text-tertiary)", textDecoration:"line-through" }}>R${p.original_price.toFixed(2)}</div>
                    <div style={{ fontSize:14, fontWeight:800, color:"var(--brand)" }}>R${p.discount_price.toFixed(2)}</div>
                  </div>
                  <span style={{ fontSize:13, color:"var(--text-tertiary)" }}>›</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

// ─── STORE PAGE ────────────────────────────────────────────────────────────────
const StorePage = () => {
  const { params, goBack, navigate } = useNav();
  const { addItem, replaceCart, items } = useCart();
  const { favorites, toggleFav } = useUser();
  const toast = useToast();
  const [cat, setCat] = useState("Todos");
  const [reorderModal, setReorderModal] = useState(false);
  const [conflictItem, setConflictItem] = useState(null);
  const { orders } = useUser();

  const store = params.store;
  if (!store) return null;
  const products = PRODUCTS[store.id] || [];
  const allCats = ["Todos", ...new Set(products.map(p => p.category))];
  const filtered = cat==="Todos" ? products : products.filter(p => p.category===cat);
  const isFav = favorites.includes(store.id);
  const storeOrders = orders.filter(o => o.store_id===store.id);

  const handleAdd = (p) => {
    const newItem = { product_id:p.id, name:p.name, price:p.discount_price, original_price:p.original_price, store_id:store.id, store_name:store.name, emoji:p.emoji };
    const conflict = addItem(newItem);
    if (conflict) { setConflictItem(newItem); return; }
    const cartItem = items.find(i => i.product_id===p.id);
    toast.show(`${p.emoji} ${p.name}${cartItem ? " +1" : " adicionado ao carrinho!"}`);
  };

  const handleReorder = (order) => {
    order.items.forEach(item => {
      const product = products.find(p => p.id===(item.product_id||null)) || products.find(p => p.name===item.name);
      if (product) addItem({ product_id:product.id, name:product.name, price:product.discount_price, original_price:product.original_price, store_id:store.id, store_name:store.name, emoji:product.emoji });
    });
    toast.show("🔄 Itens do pedido adicionados ao carrinho!");
    setReorderModal(false);
    navigate("cart");
  };

  return (
    <div style={{ minHeight:"100vh", background:"var(--bg)", paddingBottom:88 }}>
      {/* Store hero */}
      <div style={{ height:180, background:`linear-gradient(145deg, ${store.color}22, ${store.color}55)`, position:"relative", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <div style={{ fontSize:80, filter:"drop-shadow(0 4px 12px rgba(0,0,0,0.15))" }}>{store.emoji}</div>
        <div style={{ position:"absolute", top:48, left:14, right:14, display:"flex", justifyContent:"space-between" }}>
          <button onClick={goBack} style={{ width:36, height:36, background:"rgba(255,255,255,0.92)", borderRadius:11, display:"flex", alignItems:"center", justifyContent:"center", border:"none", cursor:"pointer", boxShadow:"var(--shadow)", fontSize:17 }}>←</button>
          <div style={{ display:"flex", gap:8 }}>
            <button onClick={()=>setReorderModal(true)} style={{ height:36, padding:"0 14px", background:"rgba(255,255,255,0.92)", borderRadius:11, display:"flex", alignItems:"center", gap:5, border:"none", cursor:"pointer", boxShadow:"var(--shadow)", fontSize:12, fontWeight:700, fontFamily:"var(--font)", color:"var(--text-primary)" }}>
              🔄 Recompra <span style={{fontSize:13}}>›</span>
            </button>
            <button onClick={()=>toggleFav(store.id)} style={{ width:36, height:36, background:"rgba(255,255,255,0.92)", borderRadius:11, display:"flex", alignItems:"center", justifyContent:"center", border:"none", cursor:"pointer", boxShadow:"var(--shadow)", fontSize:17 }}>
              {isFav ? "❤️" : "🤍"}
            </button>
          </div>
        </div>
      </div>

      <div style={{ padding:"0 16px" }}>
        {/* Store info */}
        <div style={{ marginTop:14, marginBottom:14 }} className="anim-fade-up">
          <h1 style={{ fontSize:22, fontWeight:800, letterSpacing:"-0.03em" }}>{store.name}</h1>
          <div style={{ display:"flex", gap:10, marginTop:6, flexWrap:"wrap", alignItems:"center" }}>
            <Badge color={store.color} bg={`${store.color}15`}>{store.category}</Badge>
            <span style={{ fontSize:12, color:"var(--gold)", fontWeight:700 }}>★ {store.rating}</span>
            <span style={{ fontSize:12, color:"var(--text-secondary)" }}>⏱ {store.delivery_time}</span>
            <span style={{ fontSize:12, color:"var(--text-secondary)" }}>🛍 Min R${store.min_order}</span>
          </div>
          {store.address && <p style={{ fontSize:12, color:"var(--text-tertiary)", marginTop:6 }}>📍 {store.address} · 🕐 {store.hours}</p>}
        </div>

        {/* Categories */}
        <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:4, marginBottom:14 }} className="scroll-hide">
          {allCats.map(c => (
            <button key={c} onClick={()=>setCat(c)} style={{ padding:"6px 14px", borderRadius:99, fontSize:13, fontWeight:700, whiteSpace:"nowrap", fontFamily:"var(--font)", background:cat===c?store.color:"var(--surface)", color:cat===c?"#fff":"var(--text-secondary)", border:cat===c?`1.5px solid ${store.color}`:"1.5px solid var(--border)", transition:"all 0.15s", flexShrink:0 }}>{c}</button>
          ))}
        </div>

        {/* Products grid */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          {filtered.length === 0 && (
            <div style={{ gridColumn:"1/-1", textAlign:"center", padding:"36px 0", color:"var(--text-tertiary)" }}>
              <div style={{ fontSize:36, marginBottom:8 }}>📦</div>
              <p style={{ fontWeight:600 }}>Nenhum produto nesta categoria</p>
            </div>
          )}
          {filtered.map((p,i) => {
            const inCart = items.find(x => x.product_id===p.id);
            return (
              <Card key={p.id} className={`anim-fade-up stagger-${Math.min(i+1,5)}`}>
                <div style={{ position:"relative" }}>
                  <div style={{ height:96, background:`hsl(${i*47%360},28%,93%)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:42 }}>{p.emoji}</div>
                  <span style={{ position:"absolute", top:8, left:8, background:"var(--accent)", color:"#fff", fontSize:10, fontWeight:800, padding:"2px 7px", borderRadius:99 }}>-{p.discount}%</span>
                  {inCart && <span style={{ position:"absolute", top:8, right:8, background:"var(--brand)", color:"#fff", fontSize:10, fontWeight:800, padding:"2px 7px", borderRadius:99 }}>×{inCart.quantity}</span>}
                </div>
                <div style={{ padding:"9px 11px 11px" }}>
                  <p style={{ fontSize:12.5, fontWeight:600, lineHeight:1.3, marginBottom:3 }}>{p.name}</p>
                  {p.expiry_date && <p style={{ fontSize:10, color:"var(--text-tertiary)", marginBottom:5 }}>📅 Val: {new Date(p.expiry_date).toLocaleDateString("pt-BR")}</p>}
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <div>
                      <div style={{ fontSize:10, color:"var(--text-tertiary)", textDecoration:"line-through" }}>R${p.original_price.toFixed(2)}</div>
                      <div style={{ fontSize:15, fontWeight:800, color:"var(--brand)" }}>R${p.discount_price.toFixed(2)}</div>
                    </div>
                    <button onClick={()=>handleAdd(p)} style={{ width:32, height:32, background:"var(--brand)", border:"none", borderRadius:10, color:"#fff", fontSize:18, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, transition:"transform 0.1s", flexShrink:0 }}
                      onMouseDown={e=>e.currentTarget.style.transform="scale(0.92)"}
                      onMouseUp={e=>e.currentTarget.style.transform="scale(1)"}
                    >+</button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Conflict modal — different store */}
      {conflictItem && (
        <Modal title="🛒 Trocar loja?" onClose={()=>setConflictItem(null)}>
          <p style={{ fontSize:14, color:"var(--text-secondary)", marginBottom:18, lineHeight:1.5 }}>
            Seu carrinho tem itens de <strong>{items[0]?.store_name}</strong>.<br/>
            Para adicionar produtos de <strong>{store.name}</strong>, o carrinho atual será esvaziado.
          </p>
          <div style={{ display:"flex", gap:10 }}>
            <Btn onClick={()=>setConflictItem(null)} variant="secondary" size="lg" style={{ flex:1 }}>Cancelar</Btn>
            <Btn onClick={()=>{ replaceCart(conflictItem); setConflictItem(null); toast.show(`${conflictItem.emoji} ${conflictItem.name} adicionado!`); }} variant="danger" size="lg" style={{ flex:1 }}>Esvaziar e trocar</Btn>
          </div>
        </Modal>
      )}

      {/* Reorder modal */}
      {reorderModal && (
        <Modal title="🔄 Recompra rápida" onClose={()=>setReorderModal(false)}>
          {storeOrders.length===0 ? (
            <div style={{ textAlign:"center", padding:"24px 0", color:"var(--text-tertiary)" }}>
              <p style={{ fontSize:36, marginBottom:8 }}>📋</p>
              <p>Nenhum pedido anterior nesta loja</p>
            </div>
          ) : storeOrders.map(order => (
            <div key={order.id} style={{ border:"1px solid var(--border)", borderRadius:14, padding:14, marginBottom:10 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                <div>
                  <p style={{ fontSize:14, fontWeight:700 }}>{order.order_number}</p>
                  <p style={{ fontSize:12, color:"var(--text-tertiary)" }}>{order.date} · R${order.total.toFixed(2)}</p>
                </div>
                <Btn onClick={()=>handleReorder(order)} size="sm">Pedir de novo</Btn>
              </div>
              <p style={{ fontSize:12, color:"var(--text-secondary)" }}>{order.items.map(i=>`${i.name}`).join(", ")}</p>
            </div>
          ))}
        </Modal>
      )}
    </div>
  );
};

// ─── CART PAGE ─────────────────────────────────────────────────────────────────
const CartPage = () => {
  const { navigate, goBack } = useNav();
  const { items, updateQty, removeItem, total, couponCode, discount, applyCoupon, removeCoupon } = useCart();
  const [couponInput, setCouponInput] = useState(couponCode || "");
  const toast = useToast();

  const handleApply = () => {
    if (!couponInput.trim()) { removeCoupon(); toast.show("Cupom removido", "warn"); return; }
    const ok = applyCoupon(couponInput.trim());
    if (ok) toast.show("🎉 Cupom aplicado! Você ganhou 10% off");
    else toast.show("Cupom inválido. Tente: ECODELI10", "error");
  };

  if (items.length===0) return (
    <div style={{ minHeight:"100vh", background:"var(--bg)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:32, paddingBottom:88 }}>
      <div style={{ fontSize:64, marginBottom:14 }}>🛒</div>
      <h2 style={{ fontSize:22, fontWeight:800, marginBottom:8 }}>Carrinho vazio</h2>
      <p style={{ color:"var(--text-secondary)", marginBottom:24, textAlign:"center" }}>Adicione produtos de uma loja para começar</p>
      <Btn onClick={()=>navigate("home")} size="lg">Explorar lojas →</Btn>
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", background:"var(--bg)", paddingBottom:200 }}>
      <div style={{ background:"var(--surface)", padding:"50px 18px 16px", borderBottom:"1px solid var(--border)" }}>
        <BackBtn onBack={goBack}/>
        <h1 style={{ fontSize:26, fontWeight:800, letterSpacing:"-0.03em", marginTop:8 }}>Carrinho 🛒</h1>
        <p style={{ fontSize:13, color:"var(--text-secondary)", marginTop:2 }}>{items.length} item{items.length!==1?"s":""} · {items[0]?.store_name}</p>
      </div>

      <div style={{ padding:"14px 16px 0" }}>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {items.map((item,i) => (
            <Card key={item.id} className={`anim-fade-up stagger-${Math.min(i+1,5)}`}>
              <div style={{ display:"flex", gap:12, padding:14, alignItems:"center" }}>
                <div style={{ width:54, height:54, background:"var(--surface2)", borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, flexShrink:0 }}>
                  {item.emoji || "📦"}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ fontSize:14, fontWeight:600, lineHeight:1.3 }}>{item.name}</p>
                  <p style={{ fontSize:13, color:"var(--text-tertiary)", marginTop:1 }}>R${item.price.toFixed(2)} cada</p>
                  <p style={{ fontSize:14, fontWeight:800, color:"var(--brand)", marginTop:2 }}>R${(item.price*item.quantity).toFixed(2)}</p>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:9, flexShrink:0 }}>
                  <button onClick={()=>updateQty(item.product_id,item.quantity-1)} style={{ width:30, height:30, borderRadius:8, border:"1.5px solid var(--border)", background:"var(--surface)", color:"var(--text-secondary)", fontSize:14, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", transition:"all 0.1s" }}>
                    {item.quantity===1 ? "🗑" : "−"}
                  </button>
                  <span style={{ fontSize:15, fontWeight:800, minWidth:18, textAlign:"center" }}>{item.quantity}</span>
                  <button onClick={()=>updateQty(item.product_id,item.quantity+1)} style={{ width:30, height:30, borderRadius:8, border:"none", background:"var(--brand)", color:"#fff", fontSize:16, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>+</button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Coupon */}
        <div style={{ marginTop:14, display:"flex", gap:8 }}>
          <div style={{ flex:1 }}>
            <TextInput placeholder="🎟 Código do cupom" value={couponInput} onChange={e=>setCouponInput(e.target.value)}/>
          </div>
          <Btn onClick={handleApply} variant="secondary">Aplicar</Btn>
        </div>
        {couponCode && <p style={{ fontSize:12, color:"var(--brand)", fontWeight:700, marginTop:6 }}>✅ Cupom "{couponCode}" ativo · você economizou R${discount.toFixed(2)}</p>}
        <p style={{ fontSize:11, color:"var(--text-tertiary)", marginTop:4 }}>Cupons válidos: ECODELI10, ECO20, SMARTFOOD</p>
      </div>

      {/* Fixed bottom */}
      <div style={{ position:"fixed", bottom:68, left:0, right:0, background:"var(--surface)", borderTop:"1px solid var(--border)", padding:"14px 18px", boxShadow:"0 -4px 20px rgba(0,0,0,0.07)" }}>
        <div style={{ maxWidth:480, margin:"0 auto" }}>
          <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, color:"var(--text-secondary)", marginBottom:5 }}><span>Subtotal</span><span>R${total.toFixed(2)}</span></div>
          {discount>0 && <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, color:"var(--brand)", marginBottom:5 }}><span>Desconto</span><span>−R${discount.toFixed(2)}</span></div>}
          <div style={{ display:"flex", justifyContent:"space-between", fontWeight:800, fontSize:17, marginBottom:12, paddingTop:8, borderTop:"1px solid var(--border)" }}>
            <span>Total</span><span>R${(total-discount).toFixed(2)}</span>
          </div>
          <Btn onClick={()=>navigate("checkout")} size="lg" style={{ width:"100%" }}>Finalizar Pedido →</Btn>
        </div>
      </div>
    </div>
  );
};

// ─── CHECKOUT PAGE ──────────────────────────────────────────────────────────────
const CheckoutPage = () => {
  const { navigate, goBack } = useNav();
  const { total, discount, clearCart, itemCount, items: cartItems } = useCart();
  const { addOrder, addresses } = useUser();
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [delivery, setDelivery] = useState("standard");
  const [addressSel, setAddressSel] = useState(addresses[0]?.id || "new");
  const [newAddress, setNewAddress] = useState({ cep:"", street:"", number:"", complement:"", neighborhood:"", city:"", state:"" });
  const { cepLoading, cepError, formatCep, fetchCep } = useCEPLookup();
  const [payment, setPayment] = useState("pix");
  const [loading, setLoading] = useState(false);

  const deliveryCost = DELIVERY_OPTIONS.find(d=>d.id===delivery)?.price || 0;
  const finalTotal = total - discount + deliveryCost;

  const handleConfirm = () => {
    setLoading(true);
    // Captura store e itens ANTES de limpar o carrinho
    const storeId = cartItems[0]?.store_id || "1";
    const storeName = cartItems[0]?.store_name || "Loja";
    const orderItems = cartItems.map(i => ({ product_id: i.product_id, name: i.name, qty: i.quantity, price: i.price * i.quantity }));
    setTimeout(() => {
      const order = {
        id: Math.random().toString(36),
        order_number: `#${Math.floor(2800+Math.random()*500)}`,
        store_id: storeId,
        store_name: storeName,
        date: "Agora mesmo",
        status: "pending",
        total: finalTotal,
        items: orderItems,
      };
      addOrder(order);
      clearCart();
      setLoading(false);
      navigate("order-success", { order });
    }, 1800);
  };

  const steps = ["Entrega","Pagamento","Revisão"];

  return (
    <div style={{ minHeight:"100vh", background:"var(--bg)", paddingBottom:88 }}>
      <div style={{ background:"var(--surface)", padding:"50px 18px 16px", borderBottom:"1px solid var(--border)" }}>
        <BackBtn onBack={goBack}/>
        <h1 style={{ fontSize:26, fontWeight:800, letterSpacing:"-0.03em", marginTop:8 }}>Checkout</h1>
        {/* Step indicator */}
        <div style={{ display:"flex", alignItems:"center", marginTop:16, gap:0 }}>
          {steps.map((s,i) => (
            <div key={s} style={{ display:"flex", alignItems:"center", flex:1 }}>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", flex:1 }}>
                <div style={{ width:28, height:28, borderRadius:99, background:step>i+1?"var(--brand)":step===i+1?"var(--brand)":"var(--surface2)", border:"2px solid", borderColor:step>=i+1?"var(--brand)":"var(--border)", color:step>=i+1?"#fff":"var(--text-tertiary)", fontSize:12, fontWeight:800, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  {step>i+1 ? "✓" : i+1}
                </div>
                <span style={{ fontSize:10, fontWeight:700, color:step>=i+1?"var(--brand)":"var(--text-tertiary)", marginTop:4, letterSpacing:"0.02em" }}>{s}</span>
              </div>
              {i<2 && <div style={{ height:2, flex:1, background:step>i+1?"var(--brand)":"var(--border)", margin:"0 4px", marginBottom:18, transition:"background 0.3s" }}/>}
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding:"16px 16px" }}>
        {/* STEP 1 — Delivery */}
        {step===1 && (
          <div className="anim-fade-in">
            <h2 style={{ fontSize:15, fontWeight:700, marginBottom:12 }}>Tipo de entrega</h2>
            <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:18 }}>
              {DELIVERY_OPTIONS.map(opt => (
                <button key={opt.id} onClick={()=>setDelivery(opt.id)} style={{ display:"flex", gap:12, alignItems:"center", padding:"13px 15px", background:delivery===opt.id?"var(--brand-pale)":"var(--surface)", border:delivery===opt.id?"1.5px solid var(--brand)":"1.5px solid var(--border)", borderRadius:14, cursor:"pointer", textAlign:"left", transition:"all 0.15s", fontFamily:"var(--font)" }}>
                  <span style={{ fontSize:22 }}>{opt.emoji}</span>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:14, fontWeight:700, color:"var(--text-primary)" }}>{opt.label}</div>
                    <div style={{ fontSize:12, color:"var(--text-secondary)" }}>{opt.desc}</div>
                  </div>
                  <span style={{ fontSize:14, fontWeight:800, color:opt.price===0?"var(--brand)":"var(--text-primary)" }}>{opt.price===0?"Grátis":`R$${opt.price.toFixed(2)}`}</span>
                  {delivery===opt.id && <span style={{ color:"var(--brand)", fontWeight:800, fontSize:16 }}>✓</span>}
                </button>
              ))}
            </div>

            {delivery!=="pickup" && (
              <>
                <h2 style={{ fontSize:15, fontWeight:700, marginBottom:12 }}>Endereço de entrega</h2>
                {addresses.map(addr => (
                  <button key={addr.id} onClick={()=>setAddressSel(addr.id)} style={{ display:"flex", gap:10, alignItems:"center", width:"100%", padding:"12px 14px", background:addressSel===addr.id?"var(--brand-pale)":"var(--surface)", border:addressSel===addr.id?"1.5px solid var(--brand)":"1.5px solid var(--border)", borderRadius:12, cursor:"pointer", textAlign:"left", marginBottom:8, fontFamily:"var(--font)", transition:"all 0.15s" }}>
                    <span style={{ fontSize:20 }}>📍</span>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:13, fontWeight:700, color:"var(--text-primary)" }}>{addr.label}</div>
                      <div style={{ fontSize:12, color:"var(--text-secondary)" }}>{addr.address}</div>
                    </div>
                    {addressSel===addr.id && <span style={{ color:"var(--brand)", fontWeight:800 }}>✓</span>}
                  </button>
                ))}
                <button onClick={()=>setAddressSel("new")} style={{ display:"flex", gap:10, alignItems:"center", width:"100%", padding:"12px 14px", background:addressSel==="new"?"var(--brand-pale)":"var(--surface)", border:addressSel==="new"?"1.5px solid var(--brand)":"1.5px solid var(--border)", borderRadius:12, cursor:"pointer", textAlign:"left", marginBottom:12, fontFamily:"var(--font)", transition:"all 0.15s" }}>
                  <span style={{ fontSize:20 }}>➕</span>
                  <span style={{ fontSize:13, fontWeight:700, color:"var(--text-primary)" }}>Novo endereço</span>
                </button>
                {addressSel==="new" && (
                  <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:16 }} className="anim-fade-in">
                    {/* CEP com busca automática */}
                    <div>
                      <div style={{ position:"relative" }}>
                        <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", fontSize:15, pointerEvents:"none" }}>📮</span>
                        <input
                          placeholder="CEP (00000-000)"
                          value={newAddress.cep}
                          onChange={e => {
                            const fmt = formatCep(e.target.value);
                            setNewAddress(a => ({ ...a, cep: fmt }));
                            if (fmt.replace(/\D/g,"").length === 8) fetchCep(fmt, d => setNewAddress(a => ({ ...a, street: d.logradouro||a.street, neighborhood: d.bairro||a.neighborhood, city: d.localidade||a.city, state: d.uf||a.state })));
                          }}
                          maxLength={9}
                          style={{ width:"100%", padding:"11px 14px 11px 38px", background:"var(--surface)", border:`1.5px solid ${cepError?"var(--accent)":"var(--border)"}`, borderRadius:12, fontSize:14, color:"var(--text-primary)", fontFamily:"var(--font)", outline:"none" }}
                          onFocus={e=>e.target.style.borderColor="var(--brand)"}
                          onBlur={e=>e.target.style.borderColor=cepError?"var(--accent)":"var(--border)"}
                        />
                        {cepLoading && <div style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", width:16, height:16, border:"2px solid var(--border)", borderTopColor:"var(--brand)", borderRadius:"50%", animation:"spin 0.7s linear infinite" }}/>}
                        {!cepLoading && newAddress.city && <span style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", fontSize:14, color:"var(--brand)" }}>✓</span>}
                      </div>
                      {cepError && <p style={{ fontSize:11, color:"var(--accent)", marginTop:4 }}>{cepError}</p>}
                      {newAddress.city && !cepError && <p style={{ fontSize:11, color:"var(--brand)", marginTop:4, fontWeight:600 }}>📍 {newAddress.city}{newAddress.state ? ` — ${newAddress.state}` : ""}</p>}
                    </div>
                    {/* Rua (preenchida pelo ViaCEP, editável) */}
                    <TextInput placeholder="Rua / Avenida" value={newAddress.street} onChange={e=>setNewAddress(a=>({...a,street:e.target.value}))} icon="🛣"/>
                    {/* Número + Complemento */}
                    <div style={{ display:"flex", gap:8 }}>
                      <div style={{ flex:1 }}>
                        <TextInput placeholder="Número *" value={newAddress.number} onChange={e=>setNewAddress(a=>({...a,number:e.target.value}))} icon="🔢"/>
                      </div>
                      <div style={{ flex:2 }}>
                        <TextInput placeholder="Complemento (Apto, Bloco…)" value={newAddress.complement} onChange={e=>setNewAddress(a=>({...a,complement:e.target.value}))} icon="🏢"/>
                      </div>
                    </div>
                    {/* Bairro */}
                    <TextInput placeholder="Bairro" value={newAddress.neighborhood} onChange={e=>setNewAddress(a=>({...a,neighborhood:e.target.value}))} icon="📍"/>
                  </div>
                )}
              </>
            )}
            <Btn onClick={()=>setStep(2)} size="lg" style={{ width:"100%" }}>Continuar →</Btn>
          </div>
        )}

        {/* STEP 2 — Payment */}
        {step===2 && (
          <div className="anim-fade-in">
            <h2 style={{ fontSize:15, fontWeight:700, marginBottom:12 }}>Forma de pagamento</h2>
            <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:22 }}>
              {PAYMENT_OPTIONS.map(opt => (
                <button key={opt.id} onClick={()=>setPayment(opt.id)} style={{ display:"flex", gap:12, alignItems:"center", padding:"13px 15px", background:payment===opt.id?"var(--brand-pale)":"var(--surface)", border:payment===opt.id?"1.5px solid var(--brand)":"1.5px solid var(--border)", borderRadius:14, cursor:"pointer", textAlign:"left", fontFamily:"var(--font)", transition:"all 0.15s" }}>
                  <span style={{ fontSize:24 }}>{opt.emoji}</span>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:14, fontWeight:700, color:"var(--text-primary)" }}>{opt.label}</div>
                    <div style={{ fontSize:12, color:"var(--text-secondary)" }}>{opt.desc}</div>
                  </div>
                  {payment===opt.id && <span style={{ color:"var(--brand)", fontWeight:800 }}>✓</span>}
                </button>
              ))}
            </div>
            <div style={{ background:"var(--accent-pale)", borderRadius:12, padding:"12px 14px", marginBottom:18, fontSize:13, color:"var(--accent)", fontWeight:600 }}>
              ⚠️ O processamento de pagamento real não está habilitado nesta versão de demonstração.
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <Btn onClick={()=>setStep(1)} variant="secondary" size="lg" style={{ flex:1 }}>← Voltar</Btn>
              <Btn onClick={()=>setStep(3)} size="lg" style={{ flex:2 }}>Revisar →</Btn>
            </div>
          </div>
        )}

        {/* STEP 3 — Review */}
        {step===3 && (
          <div className="anim-fade-in">
            <h2 style={{ fontSize:15, fontWeight:700, marginBottom:12 }}>Resumo do pedido</h2>
            <Card style={{ padding:16, marginBottom:12 }}>
              {[
                { label:"Subtotal", val:`R$${total.toFixed(2)}` },
                discount>0 && { label:"Desconto (cupom)", val:`−R$${discount.toFixed(2)}`, color:"var(--brand)" },
                { label:`Entrega (${DELIVERY_OPTIONS.find(d=>d.id===delivery)?.label})`, val:deliveryCost===0?"Grátis":`R$${deliveryCost.toFixed(2)}` },
              ].filter(Boolean).map(row => (
                <div key={row.label} style={{ display:"flex", justifyContent:"space-between", marginBottom:9, fontSize:14, color:row.color||"var(--text-secondary)" }}>
                  <span>{row.label}</span><span style={{ fontWeight:600 }}>{row.val}</span>
                </div>
              ))}
              <div style={{ borderTop:"1px solid var(--border)", paddingTop:10, display:"flex", justifyContent:"space-between", fontWeight:800, fontSize:18 }}>
                <span>Total</span><span style={{ color:"var(--brand)" }}>R${finalTotal.toFixed(2)}</span>
              </div>
            </Card>
            <Card style={{ padding:14, marginBottom:18 }}>
              <div style={{ fontSize:13, color:"var(--text-secondary)", display:"flex", flexDirection:"column", gap:7 }}>
                <div>🚚 {DELIVERY_OPTIONS.find(d=>d.id===delivery)?.label}</div>
                <div>💳 {PAYMENT_OPTIONS.find(p=>p.id===payment)?.label}</div>
                <div>📍 {addressSel==="new" ? (newAddress.street||"Endereço a definir") : addresses.find(a=>a.id===addressSel)?.address}</div>
                <div>🛒 {itemCount} item{itemCount!==1?"s":""}</div>
              </div>
            </Card>
            <div style={{ display:"flex", gap:10 }}>
              <Btn onClick={()=>setStep(2)} variant="secondary" size="lg" style={{ flex:1 }}>← Voltar</Btn>
              <Btn onClick={handleConfirm} size="lg" style={{ flex:2 }} disabled={loading}>
                {loading ? <><Spinner size={18}/> Processando...</> : "Confirmar Pedido ✓"}
              </Btn>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── ORDER SUCCESS ─────────────────────────────────────────────────────────────
const OrderSuccessPage = () => {
  const { params, navigate } = useNav();
  const order = params.order;
  return (
    <div style={{ minHeight:"100vh", background:"var(--bg)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:32, textAlign:"center" }}>
      <div style={{ width:96, height:96, background:"var(--brand-pale)", borderRadius:99, display:"flex", alignItems:"center", justifyContent:"center", fontSize:52, marginBottom:20, animation:"fadeUp 0.6s ease" }}>✅</div>
      <h1 style={{ fontSize:28, fontWeight:800, letterSpacing:"-0.03em", marginBottom:8 }}>Pedido confirmado!</h1>
      <p style={{ color:"var(--text-secondary)", fontSize:15, marginBottom:4 }}>Pedido {order?.order_number} recebido com sucesso</p>
      <p style={{ color:"var(--text-tertiary)", fontSize:13, marginBottom:32 }}>Você receberá atualizações em tempo real</p>
      <div style={{ display:"flex", flexDirection:"column", gap:10, width:"100%", maxWidth:280 }}>
        <Btn onClick={()=>navigate("orders")} size="lg" style={{ width:"100%" }}>Acompanhar pedido →</Btn>
        <Btn onClick={()=>navigate("home")} variant="secondary" size="lg" style={{ width:"100%" }}>Continuar comprando</Btn>
      </div>
    </div>
  );
};

// ─── ORDERS PAGE ───────────────────────────────────────────────────────────────
const OrdersPage = () => {
  const { navigate } = useNav();
  const { orders } = useUser();
  const [tab, setTab] = useState("active");
  const active = orders.filter(o => ["pending","confirmed","preparing","delivering"].includes(o.status));
  const past = orders.filter(o => ["delivered","cancelled"].includes(o.status));
  const displayed = tab==="active" ? active : past;

  return (
    <div style={{ minHeight:"100vh", background:"var(--bg)", paddingBottom:88 }}>
      <div style={{ background:"var(--surface)", padding:"50px 18px 16px", borderBottom:"1px solid var(--border)" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
          <h1 style={{ fontSize:26, fontWeight:800, letterSpacing:"-0.03em" }}>Meus Pedidos</h1>
          <span style={{ fontSize:12, color:"var(--text-tertiary)", fontWeight:600, paddingBottom:2 }}>{orders.length} no total</span>
        </div>
        <div style={{ display:"flex", gap:8, marginTop:14 }}>
          {[["active",`Em andamento (${active.length})`],["past",`Anteriores (${past.length})`]].map(([t,l]) => (
            <button key={t} onClick={()=>setTab(t)} style={{ padding:"8px 16px", borderRadius:99, fontSize:13, fontWeight:700, fontFamily:"var(--font)", background:tab===t?"var(--brand)":"var(--surface2)", color:tab===t?"#fff":"var(--text-secondary)", border:"none", cursor:"pointer", transition:"all 0.15s" }}>{l}</button>
          ))}
        </div>
      </div>

      <div style={{ padding:"14px 16px" }}>
        {displayed.length===0 ? (
          <div style={{ textAlign:"center", padding:"44px 0", color:"var(--text-tertiary)" }}>
            <div style={{ fontSize:48, marginBottom:12 }}>📋</div>
            <p style={{ fontWeight:700, fontSize:15 }}>Nenhum pedido {tab==="active"?"em andamento":"anterior"}</p>
            {tab==="active" && <Btn onClick={()=>navigate("home")} style={{ marginTop:16 }}>Explorar lojas →</Btn>}
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {displayed.map((order,i) => {
              const st = STATUS_CFG[order.status];
              return (
                <Card key={order.id} onClick={()=>navigate("order-detail",{order})} className={`anim-fade-up stagger-${Math.min(i+1,5)}`}>
                  <div style={{ padding:16 }}>
                    <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:8 }}>
                      <div>
                        <p style={{ fontSize:15, fontWeight:700 }}>{order.store_name}</p>
                        <p style={{ fontSize:12, color:"var(--text-tertiary)", marginTop:2 }}>{order.order_number} · {order.date}</p>
                      </div>
                      <Badge color={st.color} bg={st.bg}>{st.label}</Badge>
                    </div>
                    <div style={{ borderTop:"1px solid var(--border)", paddingTop:10, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <p style={{ fontSize:13, color:"var(--text-secondary)" }}>{order.items?.length||0} itens</p>
                      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <p style={{ fontSize:16, fontWeight:800 }}>R${order.total.toFixed(2)}</p>
                        <span style={{ fontSize:20, color:"var(--text-tertiary)" }}>›</span>
                      </div>
                    </div>
                    {order.status==="delivering" && (
                      <div style={{ marginTop:10 }}>
                        <div style={{ height:4, background:"var(--surface2)", borderRadius:99, overflow:"hidden" }}>
                          <div style={{ height:"100%", width:"75%", background:"linear-gradient(90deg,var(--brand),var(--brand-light))", borderRadius:99, animation:"pulse 2s ease-in-out infinite" }}/>
                        </div>
                        <p style={{ fontSize:11, color:"var(--brand)", fontWeight:700, marginTop:4 }}>🚴 Entregador a caminho · ~15 min</p>
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── ORDER DETAIL ──────────────────────────────────────────────────────────────
const OrderDetailPage = () => {
  const { params, goBack, navigate } = useNav();
  const { addItem } = useCart();
  const { user } = useUser();
  const toast = useToast();
  const [localOrder, setLocalOrder] = useState(params.order);
  const [cancelModal, setCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  if (!localOrder) return null;
  const isStore = user?.role === "store";
  const st = STATUS_CFG[localOrder.status];
  const steps = ["pending","confirmed","preparing","delivering","delivered"];
  const stepIdx = steps.indexOf(localOrder.status);
  const STATUS_NEXT = { pending:"confirmed", confirmed:"preparing", preparing:"delivering", delivering:"delivered" };
  const nextStatus = STATUS_NEXT[localOrder.status];
  const canCancel = ["pending","confirmed","preparing"].includes(localOrder.status);

  const CANCEL_REASONS_STORE = [
    "Produto em falta no estoque",
    "Loja fechada no momento",
    "Problema com o pedido",
    "Endereço de entrega inválido",
    "Outro motivo",
  ];
  const CANCEL_REASONS_CLIENT = [
    "Mudei de ideia",
    "Fiz o pedido errado",
    "Demora muito",
    "Outro motivo",
  ];
  const cancelReasons = isStore ? CANCEL_REASONS_STORE : CANCEL_REASONS_CLIENT;

  const handleAdvanceStatus = () => {
    if (!nextStatus) return;
    setLocalOrder(o => ({ ...o, status: nextStatus }));
    toast.show(`✅ Pedido → ${STATUS_CFG[nextStatus].label}`);
  };

  const handleCancel = () => {
    if (!cancelReason) { toast.show("Selecione um motivo", "error"); return; }
    setLocalOrder(o => ({ ...o, status: "cancelled", cancelReason }));
    setCancelModal(false);
    toast.show("Pedido cancelado", "error");
  };

  const handleReorder = () => {
    const store = STORES.find(s => s.id===localOrder.store_id);
    if (!store) { toast.show("Loja não encontrada", "error"); return; }
    const storeProducts = PRODUCTS[store.id] || [];
    const items = localOrder.items || [];
    if (items.length === 0) {
      // Sem itens detalhados — navega direto pra loja
      navigate("store", { store });
      toast.show(`🛒 Abrindo ${store.name}…`);
      return;
    }
    let added = 0;
    items.forEach(item => {
      const p = storeProducts.find(x => x.id===(item.product_id||null)) || storeProducts.find(x => x.name===item.name);
      if (p) { addItem({ product_id:p.id, name:p.name, price:p.discount_price, original_price:p.original_price, store_id:store.id, store_name:store.name, emoji:p.emoji }); added++; }
    });
    if (added > 0) { toast.show(`🔄 ${added} item${added!==1?"s":""} adicionado${added!==1?"s":""} ao carrinho!`); navigate("cart"); }
    else { navigate("store", { store }); toast.show(`🛒 Produto indisponível — abrindo ${store.name}`); }
  };

  return (
    <div style={{ minHeight:"100vh", background:"var(--bg)", paddingBottom:100 }}>
      <div style={{ background:"var(--surface)", padding:"50px 18px 16px", borderBottom:"1px solid var(--border)" }}>
        <BackBtn onBack={goBack}/>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginTop:10 }}>
          <div>
            <h1 style={{ fontSize:22, fontWeight:800, letterSpacing:"-0.03em" }}>{localOrder.store_name}</h1>
            <p style={{ fontSize:13, color:"var(--text-secondary)", marginTop:3 }}>{localOrder.order_number} · {localOrder.date}</p>
          </div>
          <Badge color={st.color} bg={st.bg}>{st.label}</Badge>
        </div>
      </div>

      <div style={{ padding:"14px 16px" }}>
        {/* Lojista: painel de controle do pedido */}
        {isStore && localOrder.status !== "cancelled" && localOrder.status !== "delivered" && (
          <Card style={{ padding:16, marginBottom:12, border:"1.5px solid var(--brand-light)", background:"var(--brand-pale)" }} className="anim-fade-up">
            <h3 style={{ fontSize:12, fontWeight:700, color:"var(--brand)", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:12 }}>🏪 Gerenciar pedido</h3>
            <div style={{ display:"flex", gap:10 }}>
              {nextStatus && (
                <button onClick={handleAdvanceStatus} style={{ flex:2, padding:"12px 0", background:"var(--brand)", border:"none", borderRadius:12, color:"#fff", fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"var(--font)", display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
                  ✅ Avançar → {STATUS_CFG[nextStatus].label}
                </button>
              )}
              {canCancel && (
                <button onClick={()=>setCancelModal(true)} style={{ flex:1, padding:"12px 0", background:"var(--accent-pale)", border:"1.5px solid #f4c6bc", borderRadius:12, color:"var(--accent)", fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"var(--font)" }}>
                  🚫 Cancelar
                </button>
              )}
            </div>
          </Card>
        )}

        {/* Cancelled banner */}
        {localOrder.status === "cancelled" && (
          <div style={{ background:"#fde8e3", border:"1.5px solid #f4c6bc", borderRadius:14, padding:"13px 16px", marginBottom:12, display:"flex", gap:10, alignItems:"center" }}>
            <span style={{ fontSize:22 }}>🚫</span>
            <div>
              <p style={{ fontSize:14, fontWeight:700, color:"var(--accent)" }}>Pedido cancelado</p>
              {localOrder.cancelReason && <p style={{ fontSize:12, color:"var(--accent)", opacity:0.8, marginTop:2 }}>Motivo: {localOrder.cancelReason}</p>}
            </div>
          </div>
        )}

        {/* Timeline */}
        <Card style={{ padding:16, marginBottom:12 }}>
          <h3 style={{ fontSize:12, fontWeight:700, color:"var(--text-tertiary)", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:14 }}>Acompanhar pedido</h3>
          {localOrder.status === "cancelled" ? (
            <div style={{ display:"flex", gap:12, alignItems:"center" }}>
              <div style={{ width:20, height:20, borderRadius:99, background:"#888", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ color:"#fff", fontSize:11, fontWeight:800 }}>✕</span>
              </div>
              <p style={{ fontSize:13, fontWeight:700, color:"var(--text-secondary)" }}>Pedido cancelado</p>
            </div>
          ) : steps.map((s,i) => {
            const labels = { pending:"Aguardando confirmação", confirmed:"Pedido confirmado", preparing:"Em preparo", delivering:"A caminho", delivered:"Entregue! 🎉" };
            const done = i<=stepIdx;
            const active = i===stepIdx;
            return (
              <div key={s} style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", width:20, flexShrink:0 }}>
                  <div style={{ width:20, height:20, borderRadius:99, background:done?"var(--brand)":"var(--surface2)", border:active?"2px solid var(--brand)":"2px solid transparent", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.3s" }}>
                    {done && <span style={{ color:"#fff", fontSize:10, fontWeight:800 }}>✓</span>}
                  </div>
                  {i<steps.length-1 && <div style={{ width:2, height:26, background:done?"var(--brand)":"var(--border)", marginTop:2, transition:"background 0.3s" }}/>}
                </div>
                <div style={{ paddingBottom:12 }}>
                  <p style={{ fontSize:13, fontWeight:active?700:600, color:done?"var(--text-primary)":"var(--text-tertiary)" }}>{labels[s]}</p>
                  {active && s==="delivering" && <p style={{ fontSize:11, color:"var(--brand)", marginTop:2 }}>Previsão: ~15 minutos</p>}
                </div>
              </div>
            );
          })}
        </Card>

        {/* Items */}
        <Card style={{ padding:16, marginBottom:12 }}>
          <h3 style={{ fontSize:12, fontWeight:700, color:"var(--text-tertiary)", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:12 }}>Itens do pedido</h3>
          {localOrder.items?.length > 0 ? localOrder.items.map(item => (
            <div key={item.name} style={{ display:"flex", justifyContent:"space-between", marginBottom:9, fontSize:14 }}>
              <span style={{ color:"var(--text-secondary)" }}>{item.qty||1}× {item.name}</span>
              <span style={{ fontWeight:700 }}>R${(item.price||0).toFixed(2)}</span>
            </div>
          )) : (
            <p style={{ fontSize:13, color:"var(--text-tertiary)" }}>Detalhes dos itens não disponíveis</p>
          )}
          <div style={{ borderTop:"1px solid var(--border)", paddingTop:10, display:"flex", justifyContent:"space-between", fontWeight:800, fontSize:17 }}>
            <span>Total</span><span>R${localOrder.total.toFixed(2)}</span>
          </div>
        </Card>

        {/* Client actions */}
        {!isStore && (
          <div style={{ display:"flex", gap:10 }}>
            <Btn onClick={handleReorder} size="lg" style={{ flex:1 }}>🔄 Pedir de novo</Btn>
            {localOrder.status==="delivered" && <Btn onClick={()=>toast.show("Avaliação enviada! ⭐")} variant="secondary" size="lg" style={{ flex:1 }}>⭐ Avaliar</Btn>}
            {canCancel && <Btn onClick={()=>setCancelModal(true)} variant="danger" size="lg" style={{ flex:1 }}>Cancelar</Btn>}
          </div>
        )}

        {/* Store: reorder not applicable, but show contact client */}
        {isStore && localOrder.status === "delivered" && (
          <Btn onClick={()=>toast.show("📧 Mensagem enviada ao cliente!")} variant="secondary" size="lg" style={{ width:"100%" }}>📨 Mensagem ao cliente</Btn>
        )}
      </div>

      {/* Cancel modal */}
      {cancelModal && (
        <Modal title="🚫 Cancelar pedido" onClose={()=>setCancelModal(false)}>
          <p style={{ fontSize:13, color:"var(--text-secondary)", marginBottom:14, lineHeight:1.5 }}>
            {isStore ? "Selecione o motivo do cancelamento. O cliente será notificado." : "Por que deseja cancelar este pedido?"}
          </p>
          <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:18 }}>
            {cancelReasons.map(r => (
              <button key={r} onClick={()=>setCancelReason(r)}
                style={{ display:"flex", alignItems:"center", gap:10, padding:"11px 14px", background:cancelReason===r?"var(--accent-pale)":"var(--surface2)", border:cancelReason===r?"1.5px solid var(--accent)":"1.5px solid var(--border)", borderRadius:12, cursor:"pointer", textAlign:"left", fontFamily:"var(--font)", transition:"all 0.15s" }}>
                <div style={{ width:18, height:18, borderRadius:99, border:`2px solid ${cancelReason===r?"var(--accent)":"var(--border)"}`, background:cancelReason===r?"var(--accent)":"transparent", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  {cancelReason===r && <div style={{ width:8, height:8, borderRadius:99, background:"#fff" }}/>}
                </div>
                <span style={{ fontSize:13, fontWeight:600, color:"var(--text-primary)" }}>{r}</span>
              </button>
            ))}
          </div>
          <div style={{ display:"flex", gap:10 }}>
            <Btn onClick={()=>setCancelModal(false)} variant="secondary" size="lg" style={{ flex:1 }}>Voltar</Btn>
            <Btn onClick={handleCancel} variant="danger" size="lg" style={{ flex:1 }} disabled={!cancelReason}>Confirmar</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ─── PROFILE PAGE ──────────────────────────────────────────────────────────────
const ProfilePage = () => {
  const { user, setUser, orders, addresses, addAddress, removeAddress, favorites } = useUser();
  const { navigate } = useNav();
  const toast = useToast();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name||"", phone:"", email:user?.email||"" });
  const [showAddAddr, setShowAddAddr] = useState(false);
  const [newAddr, setNewAddr] = useState({ label:"", cep:"", street:"", number:"", complement:"", neighborhood:"", city:"" });
  const { cepLoading: addrCepLoading, cepError: addrCepError, formatCep: formatCepProfile, fetchCep: fetchCepProfile, clearCepError: clearAddrCepError } = useCEPLookup();
  const [activeSection, setActiveSection] = useState(null);

  const handleSave = () => {
    if (!form.name.trim()) { toast.show("Nome obrigatório","error"); return; }
    setUser({ ...user, name:form.name, email:form.email });
    setEditing(false);
    toast.show("✅ Perfil atualizado!");
  };

  const handleAddAddr = () => {
    if (!newAddr.label || !newAddr.street || !newAddr.number) { toast.show("Preencha rótulo, rua e número","error"); return; }
    const parts = [
      `${newAddr.street}, ${newAddr.number}`,
      newAddr.complement,
      newAddr.neighborhood,
      newAddr.city,
      newAddr.cep,
    ].filter(Boolean);
    addAddress({ label: newAddr.label, address: parts.join(" — "), cep: newAddr.cep });
    setNewAddr({ label:"", cep:"", street:"", number:"", complement:"", neighborhood:"", city:"" });
    setShowAddAddr(false);
    toast.show("📍 Endereço adicionado!");
  };

  const totalSaved = orders.reduce((s,o) => {
    const store = STORES.find(st => st.id===o.store_id);
    return s + (store ? o.total*0.35 : 0);
  }, 0);

  return (
    <div style={{ minHeight:"100vh", background:"var(--bg)", paddingBottom:88 }}>
      {/* Hero */}
      <div style={{ background:"linear-gradient(145deg,#080f09,#0f1f12,#1a3520)", padding:"50px 18px 28px" }}>
        <div style={{ display:"flex", gap:14, alignItems:"center" }} className="anim-fade-up">
          <div style={{ width:62, height:62, background:"rgba(255,255,255,0.1)", borderRadius:99, display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, border:"2px solid rgba(141,198,63,0.4)", flexShrink:0 }}>👤</div>
          <div>
            <h2 style={{ fontSize:20, fontWeight:800, color:"#fff" }}>{user?.name||"Usuário"}</h2>
            <p style={{ fontSize:13, color:"rgba(255,255,255,0.5)", marginTop:2 }}>{user?.email}</p>
            <Badge color="#8dc63f" bg="rgba(141,198,63,0.15)" style={{ marginTop:6 }}>🌿 Eco-saver</Badge>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginTop:20 }} className="anim-fade-up stagger-1">
          {[
            [`${orders.length}`, "Pedidos"],
            [`R$${totalSaved.toFixed(0)}`, "Economizado"],
            [`${favorites.length}`, "Favoritos"],
          ].map(([v,l]) => (
            <div key={l} style={{ background:"rgba(255,255,255,0.08)", borderRadius:14, padding:"12px 10px", textAlign:"center", border:"1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ fontSize:18, fontWeight:800, color:"#8dc63f" }}>{v}</div>
              <div style={{ fontSize:10, color:"rgba(255,255,255,0.4)", marginTop:2, fontWeight:600, letterSpacing:"0.04em" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding:"14px 16px" }}>
        {/* Quick actions row */}
        <div style={{ display:"flex", gap:8, marginBottom:12 }} className="anim-fade-up">
          <button onClick={()=>navigate("orders")} style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"11px 13px", background:"var(--surface)", border:"1px solid var(--border)", borderRadius:13, fontFamily:"var(--font)", cursor:"pointer" }}>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ fontSize:18 }}>📋</span>
              <div style={{ textAlign:"left" }}>
                <p style={{ fontSize:12, fontWeight:700 }}>Meus pedidos</p>
                <p style={{ fontSize:10, color:"var(--text-tertiary)" }}>{orders.length} pedido{orders.length!==1?"s":""}</p>
              </div>
            </div>
            <span style={{ fontSize:18, color:"var(--text-tertiary)" }}>›</span>
          </button>
          <button onClick={()=>navigate("all-deals")} style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"11px 13px", background:"var(--surface)", border:"1px solid var(--border)", borderRadius:13, fontFamily:"var(--font)", cursor:"pointer" }}>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ fontSize:18 }}>🔥</span>
              <div style={{ textAlign:"left" }}>
                <p style={{ fontSize:12, fontWeight:700 }}>Ofertas</p>
                <p style={{ fontSize:10, color:"var(--text-tertiary)" }}>ver tudo</p>
              </div>
            </div>
            <span style={{ fontSize:18, color:"var(--text-tertiary)" }}>›</span>
          </button>
        </div>

        {/* Edit profile */}
        {editing ? (
          <Card style={{ padding:16, marginBottom:12 }} className="anim-fade-in">
            <h3 style={{ fontSize:15, fontWeight:700, marginBottom:12 }}>Editar perfil</h3>
            <div style={{ display:"flex", flexDirection:"column", gap:11 }}>
              <TextInput label="Nome" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Seu nome" icon="👤"/>
              <TextInput label="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="seu@email.com" icon="✉️" type="email"/>
              <TextInput label="Telefone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="(11) 99999-9999" icon="📱"/>
              <div style={{ display:"flex", gap:8, marginTop:4 }}>
                <Btn onClick={()=>setEditing(false)} variant="secondary" size="md" style={{ flex:1 }}>Cancelar</Btn>
                <Btn onClick={handleSave} size="md" style={{ flex:1 }}>Salvar ✓</Btn>
              </div>
            </div>
          </Card>
        ) : (
          <Card onClick={()=>setEditing(true)} style={{ padding:16, marginBottom:10, display:"flex", gap:12, alignItems:"center", cursor:"pointer" }} className="anim-fade-up stagger-1">
            <span style={{ fontSize:20 }}>✏️</span>
            <div style={{ flex:1 }}>
              <p style={{ fontSize:14, fontWeight:700 }}>Editar dados pessoais</p>
              <p style={{ fontSize:12, color:"var(--text-tertiary)" }}>Nome, email, telefone</p>
            </div>
            <span style={{ color:"var(--text-tertiary)", fontSize:20 }}>›</span>
          </Card>
        )}

        {/* Addresses section */}
        <Card style={{ marginBottom:10 }} className="anim-fade-up stagger-2">
          <button onClick={()=>setActiveSection(activeSection==="addr"?null:"addr")} style={{ display:"flex", gap:12, alignItems:"center", width:"100%", padding:16, fontFamily:"var(--font)" }}>
            <span style={{ fontSize:20 }}>📍</span>
            <div style={{ flex:1, textAlign:"left" }}>
              <p style={{ fontSize:14, fontWeight:700 }}>Endereços salvos</p>
              <p style={{ fontSize:12, color:"var(--text-tertiary)" }}>{addresses.length} endereço{addresses.length!==1?"s":""}</p>
            </div>
            <span style={{ color:"var(--text-tertiary)", fontSize:18, transition:"transform 0.2s", transform:activeSection==="addr"?"rotate(90deg)":"none" }}>›</span>
          </button>
          {activeSection==="addr" && (
            <div style={{ borderTop:"1px solid var(--border)", padding:"12px 16px 16px" }} className="anim-fade-in">
              {addresses.map(addr => (
                <div key={addr.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 0", borderBottom:"1px solid var(--border)" }}>
                  <div style={{ flex:1 }}>
                    <p style={{ fontSize:13, fontWeight:700 }}>{addr.label}</p>
                    <p style={{ fontSize:12, color:"var(--text-secondary)" }}>{addr.address}</p>
                  </div>
                  <button onClick={()=>{removeAddress(addr.id);toast.show("Endereço removido","warn");}} style={{ fontSize:18, color:"var(--accent)", padding:4 }}>🗑</button>
                </div>
              ))}
              {showAddAddr ? (
                <div style={{ marginTop:12, display:"flex", flexDirection:"column", gap:9 }} className="anim-fade-in">
                  <TextInput placeholder="Rótulo (ex: Casa, Trabalho)" value={newAddr.label} onChange={e=>setNewAddr({...newAddr,label:e.target.value})} icon="🏷"/>
                  {/* CEP com busca automática */}
                  <div>
                    <div style={{ position:"relative" }}>
                      <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", fontSize:15, pointerEvents:"none" }}>📮</span>
                      <input
                        placeholder="CEP (00000-000)"
                        value={newAddr.cep}
                        onChange={e => {
                          const fmt = formatCepProfile(e.target.value);
                          setNewAddr(a => ({ ...a, cep: fmt }));
                          clearAddrCepError();
                          if (fmt.replace(/\D/g,"").length === 8) fetchCepProfile(fmt, d => setNewAddr(a => ({ ...a, street: d.logradouro||a.street, neighborhood: d.bairro||a.neighborhood, city: d.localidade||a.city })));
                        }}
                        maxLength={9}
                        style={{ width:"100%", padding:"11px 14px 11px 38px", background:"var(--surface)", border:`1.5px solid ${addrCepError?"var(--accent)":"var(--border)"}`, borderRadius:12, fontSize:14, color:"var(--text-primary)", fontFamily:"var(--font)", outline:"none" }}
                        onFocus={e=>e.target.style.borderColor="var(--brand)"}
                        onBlur={e=>e.target.style.borderColor=addrCepError?"var(--accent)":"var(--border)"}
                      />
                      {addrCepLoading && <div style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", width:16, height:16, border:"2px solid var(--border)", borderTopColor:"var(--brand)", borderRadius:"50%", animation:"spin 0.7s linear infinite" }}/>}
                      {!addrCepLoading && newAddr.city && <span style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", fontSize:14, color:"var(--brand)" }}>✓</span>}
                    </div>
                    {addrCepError && <p style={{ fontSize:11, color:"var(--accent)", marginTop:4 }}>{addrCepError}</p>}
                    {newAddr.city && !addrCepError && <p style={{ fontSize:11, color:"var(--brand)", marginTop:4, fontWeight:600 }}>📍 {newAddr.city}</p>}
                  </div>
                  <TextInput placeholder="Rua / Avenida *" value={newAddr.street} onChange={e=>setNewAddr({...newAddr,street:e.target.value})} icon="🛣"/>
                  <div style={{ display:"flex", gap:8 }}>
                    <div style={{ flex:1 }}>
                      <TextInput placeholder="Número *" value={newAddr.number} onChange={e=>setNewAddr({...newAddr,number:e.target.value})} icon="🔢"/>
                    </div>
                    <div style={{ flex:2 }}>
                      <TextInput placeholder="Complemento (Apto, Bloco...)" value={newAddr.complement} onChange={e=>setNewAddr({...newAddr,complement:e.target.value})} icon="🏢"/>
                    </div>
                  </div>
                  <TextInput placeholder="Bairro" value={newAddr.neighborhood} onChange={e=>setNewAddr({...newAddr,neighborhood:e.target.value})} icon="📍"/>
                  <p style={{ fontSize:11, color:"var(--text-tertiary)", marginTop:-4 }}>* Campos obrigatórios</p>
                  <div style={{ display:"flex", gap:8 }}>
                    <Btn onClick={()=>{ setShowAddAddr(false); setAddrCepError(""); }} variant="secondary" size="sm" style={{ flex:1 }}>Cancelar</Btn>
                    <Btn onClick={handleAddAddr} size="sm" style={{ flex:1 }}>Salvar</Btn>
                  </div>
                </div>
              ) : (
                <button onClick={()=>setShowAddAddr(true)} style={{ marginTop:10, fontSize:13, color:"var(--brand)", fontWeight:700, display:"flex", alignItems:"center", gap:5, background:"none", border:"none", cursor:"pointer", fontFamily:"var(--font)" }}>➕ Adicionar endereço</button>
              )}
            </div>
          )}
        </Card>

        {/* Other menu items */}
        {[
          { emoji:"💳", label:"Formas de pagamento", desc:"Cartões e métodos", action:()=>toast.show("⚠️ Módulo de pagamento desabilitado nesta demo","warn") },
          { emoji:"🔔", label:"Notificações", desc:"Pedidos, promoções e mais", action:()=>toast.show("🔔 Notificações ativadas!") },
          { emoji:"🌿", label:"Impacto ambiental", desc:"Sua retrospectiva eco · veja quanto salvou", action:()=>navigate("eco-impact") },
          { emoji:"🎧", label:"Suporte", desc:"Central de ajuda e contato", action:()=>toast.show("📧 Contato: suporte@ecodeli.com") },
          { emoji:"⭐", label:"Avaliar o app", desc:"Deixe sua opinião", action:()=>toast.show("Obrigado pelo feedback! ⭐⭐⭐⭐⭐") },
        ].map(({ emoji, label, desc, action },i) => (
          <Card key={label} onClick={action} style={{ padding:"13px 16px", display:"flex", gap:12, alignItems:"center", cursor:"pointer", marginBottom:8 }} className={`fu s${Math.min(i+3,5)}`}>
            <span style={{ fontSize:20, width:28, textAlign:"center" }}>{emoji}</span>
            <div style={{ flex:1 }}>
              <p style={{ fontSize:14, fontWeight:700 }}>{label}</p>
              <p style={{ fontSize:12, color:"var(--text-tertiary)" }}>{desc}</p>
            </div>
            <span style={{ color:"var(--text-tertiary)", fontSize:18 }}>›</span>
          </Card>
        ))}

        {/* Footer */}
        <div style={{ textAlign:"center", margin:"20px 0 14px" }}>
          <EcodeliLogo size={36} />
          <p style={{ fontSize:9, color:"var(--text-tertiary)", textTransform:"uppercase", letterSpacing:"0.14em", fontWeight:700, marginTop:8 }}>Ecodeli · Smart Food · v2.0</p>
        </div>

        <Btn onClick={()=>{ setUser(null); toast.show("Até logo! 👋"); }} variant="secondary" size="lg" style={{ width:"100%", color:"var(--accent)", borderColor:"#f4c6bc" }}>
          🚪 Sair da conta
        </Btn>
      </div>
    </div>
  );
};

// ─── STORE DASHBOARD PAGE ─────────────────────────────────────────────────────
const StoreDashboardPage = () => {
  const { navigate } = useNav();
  const { user, orders } = useUser();
  const toast = useToast();
  const store = STORES.find(s => s.id === user?.storeId) || STORES[0];
  const products = PRODUCTS[store.id] || [];
  const storeOrders = orders.filter(o => o.store_id === store.id);
  const [activeTab, setActiveTab] = useState("overview");
  const sdInitRef = useRef(false);
  const [orderList, setOrderList] = useState([]);
  useEffect(() => { if (!sdInitRef.current) { setOrderList(storeOrders); sdInitRef.current = true; } }, []);

  // Quick action modal states
  const [promoModal, setPromoModal] = useState(false);
  const [hoursModal, setHoursModal] = useState(false);
  const [addressModal, setAddressModal] = useState(false);
  const [photoModal, setPhotoModal] = useState(false);

  // Product management states
  const [localProducts, setLocalProducts] = useState(products);
  const [editingProduct, setEditingProduct] = useState(null); // product obj being edited
  const [deleteTarget, setDeleteTarget] = useState(null);     // product obj to confirm delete
  const [newProductModal, setNewProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ name:"", emoji:"📦", category:"", original_price:"", discount_price:"", discount:"", expiry_date:"" });

  // Promo form
  const [promoForm, setPromoForm] = useState({ product:"", discount:"", validUntil:"" });
  // Hours form
  const [hoursForm, setHoursForm] = useState({ open: store.hours.split("–")[0] || "7h", close: store.hours.split("–")[1] || "21h", days:"Seg–Dom" });
  // Address form
  const [addrForm, setAddrForm] = useState({ street: store.address || "", cep:"", complement:"" });
  const { cepLoading: addrCepLoading, fetchCep: fetchCepStore } = useCEPLookup();

  const revenue = orderList.reduce((s,o) => s + o.total, 0);
  const activeOrds = orderList.filter(o => ["pending","confirmed","preparing","delivering"].includes(o.status));
  const STATUS_NEXT = { pending:"confirmed", confirmed:"preparing", preparing:"delivering", delivering:"delivered" };

  const updateStatus = (id, newStatus) => {
    setOrderList(prev => prev.map(o => o.id===id ? {...o, status:newStatus} : o));
    toast.show("Status atualizado!");
  };

  return (
    <div style={{ minHeight:"100vh", background:"#f7f6f3", paddingBottom:88 }}>
      {/* Header */}
      <div style={{ background:`linear-gradient(135deg, ${store.color}dd, ${store.color})`, padding:"48px 18px 20px" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:48, height:48, background:"rgba(255,255,255,0.2)", borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", fontSize:26 }}>{store.emoji}</div>
            <div>
              <div style={{ fontSize:17, fontWeight:800, color:"#fff", lineHeight:1 }}>{store.name}</div>
              <div style={{ fontSize:11, color:"rgba(255,255,255,0.65)", marginTop:2 }}>Painel da loja · {store.hours}</div>
            </div>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.6)", fontWeight:600 }}>★ {store.rating}</div>
            <div style={{ fontSize:10, color:"rgba(255,255,255,0.45)", marginTop:1 }}>{store.delivery_time}</div>
          </div>
        </div>

        {/* KPIs */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
          {[
            { label:"Receita", value:`R$${revenue.toFixed(0)}`, icon:"💰" },
            { label:"Pedidos ativos", value:activeOrds.length, icon:"🔥" },
            { label:"Produtos", value:products.length, icon:"📦" },
          ].map(k => (
            <div key={k.label} style={{ background:"rgba(255,255,255,0.18)", borderRadius:12, padding:"10px 10px", textAlign:"center", backdropFilter:"blur(8px)" }}>
              <div style={{ fontSize:16 }}>{k.icon}</div>
              <div style={{ fontSize:17, fontWeight:800, color:"#fff", lineHeight:1.1, marginTop:3 }}>{k.value}</div>
              <div style={{ fontSize:9, color:"rgba(255,255,255,0.65)", marginTop:2, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.04em" }}>{k.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display:"flex", borderBottom:"1px solid var(--border)", background:"var(--surface)" }}>
        {[["overview","📊 Resumo"],["orders","📦 Pedidos"],["products","🛒 Produtos"]].map(([t,l]) => (
          <button key={t} onClick={()=>setActiveTab(t)} style={{ flex:1, padding:"13px 4px", fontSize:12, fontWeight:700, fontFamily:"var(--font)", color:activeTab===t?store.color:"var(--text-tertiary)", background:"none", border:"none", borderBottom:activeTab===t?`2px solid ${store.color}`:"2px solid transparent", cursor:"pointer", transition:"all 0.15s" }}>{l}</button>
        ))}
      </div>

      <div style={{ padding:"14px 16px" }}>

        {/* OVERVIEW */}
        {activeTab==="overview" && (
          <div className="anim-fade-in">
            <h3 style={{ fontSize:12, fontWeight:700, color:"var(--text-tertiary)", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:10 }}>Produtos próximos do vencimento</h3>
            {products.sort((a,b) => new Date(a.expiry_date) - new Date(b.expiry_date)).map(p => {
              const days = Math.ceil((new Date(p.expiry_date) - new Date()) / 86400000);
              const urgent = days <= 3;
              return (
                <div key={p.id} style={{ background:"var(--surface)", borderRadius:12, padding:"11px 13px", marginBottom:7, border:`1px solid ${urgent?"#fca5a5":"var(--border)"}`, display:"flex", gap:10, alignItems:"center" }}>
                  <span style={{ fontSize:22 }}>{p.emoji}</span>
                  <div style={{ flex:1 }}>
                    <p style={{ fontSize:13, fontWeight:600 }}>{p.name}</p>
                    <p style={{ fontSize:11, color:urgent?"#c84b31":"var(--text-tertiary)", fontWeight:urgent?700:400 }}>
                      {urgent ? `⚠️ Vence em ${days} dia${days!==1?"s":""}!` : `📅 ${new Date(p.expiry_date).toLocaleDateString("pt-BR")}`}
                    </p>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontSize:13, fontWeight:800, color:"var(--brand)" }}>R${p.discount_price.toFixed(2)}</div>
                    <div style={{ fontSize:10, color:"var(--accent)", fontWeight:700 }}>-{p.discount}%</div>
                  </div>
                </div>
              );
            })}

            <h3 style={{ fontSize:12, fontWeight:700, color:"var(--text-tertiary)", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:10, marginTop:18 }}>Ações rápidas</h3>
            {[
              { icon:"📢", label:"Criar promoção", desc:"Adicionar desconto especial", action:()=>setPromoModal(true) },
              { icon:"📸", label:"Atualizar fotos", desc:"Enviar novas imagens", action:()=>setPhotoModal(true) },
              { icon:"🕐", label:"Alterar horário", desc:`Atual: ${store.hours}`, action:()=>setHoursModal(true) },
              { icon:"📍", label:"Endereço", desc:store.address, action:()=>setAddressModal(true) },
            ].map(item => (
              <div key={item.label} onClick={item.action} style={{ background:"var(--surface)", borderRadius:12, padding:"12px 14px", marginBottom:8, border:"1px solid var(--border)", display:"flex", gap:12, alignItems:"center", cursor:"pointer" }}>
                <span style={{ fontSize:20 }}>{item.icon}</span>
                <div style={{ flex:1 }}>
                  <p style={{ fontSize:13, fontWeight:700 }}>{item.label}</p>
                  <p style={{ fontSize:11, color:"var(--text-tertiary)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", maxWidth:220 }}>{item.desc}</p>
                </div>
                <span style={{ color:"var(--text-tertiary)", fontSize:16 }}>›</span>
              </div>
            ))}
          </div>
        )}

        {/* ORDERS */}
        {activeTab==="orders" && (
          <div className="anim-fade-in">
            <h3 style={{ fontSize:12, fontWeight:700, color:"var(--text-tertiary)", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:10 }}>Pedidos da loja</h3>
            {orderList.length === 0 ? (
              <div style={{ textAlign:"center", padding:"40px 0", color:"var(--text-tertiary)" }}>
                <div style={{ fontSize:40, marginBottom:8 }}>📋</div>
                <p style={{ fontWeight:600 }}>Nenhum pedido ainda</p>
              </div>
            ) : orderList.map(order => {
              const st = STATUS_CFG[order.status];
              const next = STATUS_NEXT[order.status];
              return (
                <div key={order.id} style={{ background:"var(--surface)", borderRadius:14, padding:"13px 14px", marginBottom:8, border:"1px solid var(--border)" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                    <div>
                      <p style={{ fontSize:14, fontWeight:700 }}>{order.order_number}</p>
                      <p style={{ fontSize:11, color:"var(--text-tertiary)", marginTop:1 }}>{order.date} · {order.items?.length||0} itens</p>
                    </div>
                    <span style={{ padding:"3px 9px", borderRadius:99, fontSize:11, fontWeight:700, color:st.color, background:st.bg }}>{st.label}</span>
                  </div>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <span style={{ fontSize:15, fontWeight:800, color:"var(--brand)" }}>R${order.total.toFixed(2)}</span>
                    <div style={{ display:"flex", gap:8 }}>
                      {next && (
                        <button onClick={()=>updateStatus(order.id, next)}
                          style={{ padding:"6px 12px", background:"var(--brand-pale)", border:"1px solid var(--brand-light)", borderRadius:8, color:"var(--brand)", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"var(--font)" }}>
                          → {STATUS_CFG[next].label}
                        </button>
                      )}
                      {!next && order.status!=="cancelled" && (
                        <button onClick={()=>updateStatus(order.id,"cancelled")}
                          style={{ padding:"6px 12px", background:"var(--accent-pale)", border:"1px solid #f4c6bc", borderRadius:8, color:"var(--accent)", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"var(--font)" }}>
                          Cancelar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* PRODUCTS */}
        {activeTab==="products" && (
          <div className="anim-fade-in">
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
              <h3 style={{ fontSize:12, fontWeight:700, color:"var(--text-tertiary)", textTransform:"uppercase", letterSpacing:"0.07em" }}>Meus produtos ({localProducts.length})</h3>
              <button onClick={()=>setNewProductModal(true)} style={{ padding:"6px 12px", background:"var(--brand)", borderRadius:8, color:"#fff", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"var(--font)", border:"none" }}>+ Novo</button>
            </div>
            {localProducts.map(p => (
              <div key={p.id} style={{ background:"var(--surface)", borderRadius:12, padding:"12px 13px", marginBottom:8, border:"1px solid var(--border)", display:"flex", gap:10, alignItems:"center" }}>
                <span style={{ fontSize:24 }}>{p.emoji}</span>
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ fontSize:13, fontWeight:600, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{p.name}</p>
                  <p style={{ fontSize:11, color:"var(--text-tertiary)" }}>Val: {new Date(p.expiry_date).toLocaleDateString("pt-BR")} · {p.category}</p>
                </div>
                <div style={{ textAlign:"right", flexShrink:0 }}>
                  <div style={{ fontSize:13, fontWeight:800, color:"var(--brand)" }}>R${p.discount_price.toFixed(2)}</div>
                  <div style={{ fontSize:10, color:"var(--accent)", fontWeight:700 }}>-{p.discount}%</div>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:4, flexShrink:0 }}>
                  <button onClick={()=>setEditingProduct({...p})} style={{ padding:"6px 8px", background:"var(--surface2)", border:"1px solid var(--border)", borderRadius:8, fontSize:13, cursor:"pointer" }}>✏️</button>
                  <button onClick={()=>setDeleteTarget(p)} style={{ padding:"6px 8px", background:"var(--accent-pale)", border:"1px solid #f4c6bc", borderRadius:8, fontSize:13, cursor:"pointer" }}>🗑</button>
                </div>
              </div>
            ))}
            {localProducts.length === 0 && (
              <div style={{ textAlign:"center", padding:"32px 0", color:"var(--text-tertiary)" }}>
                <div style={{ fontSize:40, marginBottom:8 }}>📦</div>
                <p style={{ fontWeight:600 }}>Nenhum produto cadastrado</p>
                <button onClick={()=>setNewProductModal(true)} style={{ marginTop:12, padding:"8px 18px", background:"var(--brand)", borderRadius:10, color:"#fff", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"var(--font)", border:"none" }}>+ Adicionar primeiro produto</button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── MODAL: Editar produto ── */}
      {editingProduct && (
        <Modal title="✏️ Editar produto" onClose={()=>setEditingProduct(null)}>
          <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:16 }}>
            <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:4 }}>
              <div style={{ width:56, height:56, background:"var(--surface2)", borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", fontSize:30, flexShrink:0 }}>{editingProduct.emoji}</div>
              <TextInput label="Nome do produto" value={editingProduct.name} onChange={e=>setEditingProduct(p=>({...p,name:e.target.value}))} placeholder="Nome do produto" icon="📦"/>
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <div style={{ flex:1 }}>
                <label style={{ fontSize:12, fontWeight:600, color:"var(--text-secondary)", textTransform:"uppercase", letterSpacing:"0.04em", display:"block", marginBottom:5 }}>Preço original</label>
                <div style={{ position:"relative" }}>
                  <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", fontSize:12, color:"var(--text-tertiary)", pointerEvents:"none", fontWeight:700 }}>R$</span>
                  <input type="number" step="0.01" value={editingProduct.original_price} onChange={e=>setEditingProduct(p=>({...p,original_price:parseFloat(e.target.value)||0}))}
                    style={{ width:"100%", padding:"11px 14px 11px 32px", background:"var(--surface)", border:"1.5px solid var(--border)", borderRadius:12, fontSize:14, color:"var(--text-primary)", fontFamily:"var(--font)", outline:"none" }}/>
                </div>
              </div>
              <div style={{ flex:1 }}>
                <label style={{ fontSize:12, fontWeight:600, color:"var(--text-secondary)", textTransform:"uppercase", letterSpacing:"0.04em", display:"block", marginBottom:5 }}>Preço c/ desconto</label>
                <div style={{ position:"relative" }}>
                  <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", fontSize:12, color:"var(--brand)", pointerEvents:"none", fontWeight:700 }}>R$</span>
                  <input type="number" step="0.01" value={editingProduct.discount_price} onChange={e=>{ const dp=parseFloat(e.target.value)||0; const disc=editingProduct.original_price>0?Math.round((1-dp/editingProduct.original_price)*100):0; setEditingProduct(p=>({...p,discount_price:dp,discount:disc})); }}
                    style={{ width:"100%", padding:"11px 14px 11px 32px", background:"var(--surface)", border:"1.5px solid var(--brand)", borderRadius:12, fontSize:14, color:"var(--brand)", fontFamily:"var(--font)", outline:"none", fontWeight:700 }}/>
                </div>
              </div>
            </div>
            {editingProduct.original_price > 0 && editingProduct.discount_price > 0 && (
              <div style={{ background:"var(--brand-pale)", borderRadius:10, padding:"8px 12px", fontSize:13, color:"var(--brand)", fontWeight:700, textAlign:"center" }}>
                Desconto calculado: -{editingProduct.discount}%
              </div>
            )}
            <TextInput label="Categoria" value={editingProduct.category} onChange={e=>setEditingProduct(p=>({...p,category:e.target.value}))} placeholder="Ex: Frutas, Laticínios…" icon="🏷"/>
            <div>
              <label style={{ fontSize:12, fontWeight:600, color:"var(--text-secondary)", textTransform:"uppercase", letterSpacing:"0.04em", display:"block", marginBottom:5 }}>Data de validade</label>
              <input type="date" value={editingProduct.expiry_date} onChange={e=>setEditingProduct(p=>({...p,expiry_date:e.target.value}))}
                style={{ width:"100%", padding:"11px 14px", background:"var(--surface)", border:"1.5px solid var(--border)", borderRadius:12, fontSize:14, color:"var(--text-primary)", fontFamily:"var(--font)", outline:"none" }}/>
            </div>
          </div>
          <div style={{ display:"flex", gap:10 }}>
            <Btn onClick={()=>setEditingProduct(null)} variant="secondary" size="lg" style={{ flex:1 }}>Cancelar</Btn>
            <Btn onClick={()=>{ setLocalProducts(prev=>prev.map(p=>p.id===editingProduct.id?editingProduct:p)); setEditingProduct(null); toast.show(`✅ ${editingProduct.name} atualizado!`); }} size="lg" style={{ flex:2 }}>Salvar alterações</Btn>
          </div>
        </Modal>
      )}

      {/* ── MODAL: Confirmar exclusão ── */}
      {deleteTarget && (
        <Modal title="🗑 Remover produto" onClose={()=>setDeleteTarget(null)}>
          <div style={{ textAlign:"center", padding:"8px 0 20px" }}>
            <div style={{ fontSize:52, marginBottom:12 }}>{deleteTarget.emoji}</div>
            <p style={{ fontSize:16, fontWeight:700, marginBottom:6 }}>{deleteTarget.name}</p>
            <p style={{ fontSize:13, color:"var(--text-secondary)", lineHeight:1.5 }}>
              Tem certeza que deseja remover este produto?<br/>Esta ação não pode ser desfeita.
            </p>
          </div>
          <div style={{ display:"flex", gap:10 }}>
            <Btn onClick={()=>setDeleteTarget(null)} variant="secondary" size="lg" style={{ flex:1 }}>Cancelar</Btn>
            <Btn onClick={()=>{ setLocalProducts(prev=>prev.filter(p=>p.id!==deleteTarget.id)); toast.show(`🗑 ${deleteTarget.name} removido`,"warn"); setDeleteTarget(null); }} variant="danger" size="lg" style={{ flex:1 }}>Remover</Btn>
          </div>
        </Modal>
      )}

      {/* ── MODAL: Novo produto ── */}
      {newProductModal && (
        <Modal title="➕ Novo produto" onClose={()=>setNewProductModal(false)}>
          <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:16 }}>
            <div style={{ display:"flex", gap:8, alignItems:"center" }}>
              <div>
                <label style={{ fontSize:12, fontWeight:600, color:"var(--text-secondary)", textTransform:"uppercase", letterSpacing:"0.04em", display:"block", marginBottom:5 }}>Emoji</label>
                <input value={newProduct.emoji} onChange={e=>setNewProduct(p=>({...p,emoji:e.target.value}))} maxLength={2}
                  style={{ width:52, height:44, textAlign:"center", fontSize:22, background:"var(--surface2)", border:"1.5px solid var(--border)", borderRadius:12, fontFamily:"var(--font)", outline:"none" }}/>
              </div>
              <div style={{ flex:1 }}>
                <TextInput label="Nome *" value={newProduct.name} onChange={e=>setNewProduct(p=>({...p,name:e.target.value}))} placeholder="Nome do produto" icon="📦"/>
              </div>
            </div>
            <TextInput label="Categoria" value={newProduct.category} onChange={e=>setNewProduct(p=>({...p,category:e.target.value}))} placeholder="Ex: Frutas, Laticínios…" icon="🏷"/>
            <div style={{ display:"flex", gap:8 }}>
              <div style={{ flex:1 }}>
                <label style={{ fontSize:12, fontWeight:600, color:"var(--text-secondary)", textTransform:"uppercase", letterSpacing:"0.04em", display:"block", marginBottom:5 }}>Preço original *</label>
                <div style={{ position:"relative" }}>
                  <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", fontSize:12, color:"var(--text-tertiary)", fontWeight:700, pointerEvents:"none" }}>R$</span>
                  <input type="number" step="0.01" placeholder="0.00" value={newProduct.original_price} onChange={e=>setNewProduct(p=>({...p,original_price:e.target.value}))}
                    style={{ width:"100%", padding:"11px 14px 11px 32px", background:"var(--surface)", border:"1.5px solid var(--border)", borderRadius:12, fontSize:14, fontFamily:"var(--font)", outline:"none" }}/>
                </div>
              </div>
              <div style={{ flex:1 }}>
                <label style={{ fontSize:12, fontWeight:600, color:"var(--text-secondary)", textTransform:"uppercase", letterSpacing:"0.04em", display:"block", marginBottom:5 }}>Preço c/ desc. *</label>
                <div style={{ position:"relative" }}>
                  <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", fontSize:12, color:"var(--brand)", fontWeight:700, pointerEvents:"none" }}>R$</span>
                  <input type="number" step="0.01" placeholder="0.00" value={newProduct.discount_price} onChange={e=>{ const dp=parseFloat(e.target.value)||0; const op=parseFloat(newProduct.original_price)||0; const disc=op>0?Math.round((1-dp/op)*100):0; setNewProduct(p=>({...p,discount_price:e.target.value,discount:disc})); }}
                    style={{ width:"100%", padding:"11px 14px 11px 32px", background:"var(--surface)", border:"1.5px solid var(--brand)", borderRadius:12, fontSize:14, fontFamily:"var(--font)", outline:"none", color:"var(--brand)", fontWeight:700 }}/>
                </div>
              </div>
            </div>
            {newProduct.discount > 0 && (
              <div style={{ background:"var(--brand-pale)", borderRadius:10, padding:"8px 12px", fontSize:13, color:"var(--brand)", fontWeight:700, textAlign:"center" }}>
                -{newProduct.discount}% de desconto
              </div>
            )}
            <div>
              <label style={{ fontSize:12, fontWeight:600, color:"var(--text-secondary)", textTransform:"uppercase", letterSpacing:"0.04em", display:"block", marginBottom:5 }}>Data de validade *</label>
              <input type="date" value={newProduct.expiry_date} onChange={e=>setNewProduct(p=>({...p,expiry_date:e.target.value}))}
                style={{ width:"100%", padding:"11px 14px", background:"var(--surface)", border:"1.5px solid var(--border)", borderRadius:12, fontSize:14, color:"var(--text-primary)", fontFamily:"var(--font)", outline:"none" }}/>
            </div>
          </div>
          <div style={{ display:"flex", gap:10 }}>
            <Btn onClick={()=>setNewProductModal(false)} variant="secondary" size="lg" style={{ flex:1 }}>Cancelar</Btn>
            <Btn onClick={()=>{
              if (!newProduct.name || !newProduct.original_price || !newProduct.discount_price || !newProduct.expiry_date) { toast.show("Preencha todos os campos obrigatórios","error"); return; }
              const p = { ...newProduct, id:`new-${Math.random().toString(36).slice(2)}`, original_price:parseFloat(newProduct.original_price), discount_price:parseFloat(newProduct.discount_price) };
              setLocalProducts(prev=>[...prev, p]);
              toast.show(`✅ ${p.name} adicionado!`);
              setNewProductModal(false);
              setNewProduct({ name:"", emoji:"📦", category:"", original_price:"", discount_price:"", discount:"", expiry_date:"" });
            }} size="lg" style={{ flex:2 }}>Adicionar produto</Btn>
          </div>
        </Modal>
      )}
      {promoModal && (
        <Modal title="📢 Criar promoção" onClose={()=>setPromoModal(false)}>
          <p style={{ fontSize:13, color:"var(--text-secondary)", marginBottom:14 }}>Crie um desconto especial para um produto próximo do vencimento.</p>
          <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:18 }}>
            <div>
              <label style={{ fontSize:12, fontWeight:600, color:"var(--text-secondary)", textTransform:"uppercase", letterSpacing:"0.04em", display:"block", marginBottom:5 }}>Produto</label>
              <select value={promoForm.product} onChange={e=>setPromoForm(f=>({...f,product:e.target.value}))}
                style={{ width:"100%", padding:"11px 14px", background:"var(--surface)", border:"1.5px solid var(--border)", borderRadius:12, fontSize:14, color:"var(--text-primary)", fontFamily:"var(--font)", outline:"none" }}>
                <option value="">Selecione um produto…</option>
                {localProducts.map(p => <option key={p.id} value={p.id}>{p.emoji} {p.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize:12, fontWeight:600, color:"var(--text-secondary)", textTransform:"uppercase", letterSpacing:"0.04em", display:"block", marginBottom:5 }}>Desconto adicional</label>
              <div style={{ display:"flex", gap:8 }}>
                {[10,15,20,30,50].map(v => (
                  <button key={v} onClick={()=>setPromoForm(f=>({...f,discount:String(v)}))}
                    style={{ flex:1, padding:"9px 0", borderRadius:10, border:`1.5px solid ${promoForm.discount===String(v)?"var(--brand)":"var(--border)"}`, background:promoForm.discount===String(v)?"var(--brand-pale)":"var(--surface)", color:promoForm.discount===String(v)?"var(--brand)":"var(--text-secondary)", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"var(--font)" }}>
                    {v}%
                  </button>
                ))}
              </div>
            </div>
            <TextInput label="Válido até" type="date" value={promoForm.validUntil} onChange={e=>setPromoForm(f=>({...f,validUntil:e.target.value}))} icon="📅"/>
          </div>
          {promoForm.product && promoForm.discount && (
            <div style={{ background:"var(--brand-pale)", borderRadius:12, padding:"11px 14px", marginBottom:14, fontSize:13, color:"var(--brand)", fontWeight:600 }}>
              ✅ {localProducts.find(p=>p.id===promoForm.product)?.emoji} {localProducts.find(p=>p.id===promoForm.product)?.name} com -{promoForm.discount}% extra
            </div>
          )}
          <div style={{ display:"flex", gap:10 }}>
            <Btn onClick={()=>setPromoModal(false)} variant="secondary" size="lg" style={{ flex:1 }}>Cancelar</Btn>
            <Btn onClick={()=>{ if(!promoForm.product||!promoForm.discount){toast.show("Preencha produto e desconto","error");return;} toast.show(`📢 Promoção de -${promoForm.discount}% criada!`); setPromoModal(false); setPromoForm({product:"",discount:"",validUntil:""}); }} size="lg" style={{ flex:2 }}>Publicar promoção</Btn>
          </div>
        </Modal>
      )}

      {/* ── MODAL: Atualizar fotos ── */}
      {photoModal && (
        <Modal title="📸 Atualizar fotos" onClose={()=>setPhotoModal(false)}>
          <p style={{ fontSize:13, color:"var(--text-secondary)", marginBottom:14 }}>Escolha o que deseja atualizar na sua vitrine.</p>
          <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:18 }}>
            {[
              { icon:"🏪", label:"Foto de capa da loja", desc:"Imagem principal exibida no feed" },
              { icon:"🖼", label:"Logo da loja", desc:"Ícone exibido nas buscas" },
              { icon:"📦", label:"Fotos dos produtos", desc:"Adicionar ou trocar imagens dos itens" },
            ].map(item => (
              <button key={item.label} onClick={()=>{ toast.show(`📸 ${item.label} — abrindo galeria…`); setPhotoModal(false); }}
                style={{ display:"flex", gap:12, alignItems:"center", padding:"12px 14px", background:"var(--surface2)", border:"1px solid var(--border)", borderRadius:12, cursor:"pointer", textAlign:"left", fontFamily:"var(--font)", transition:"all 0.15s" }}
                onMouseEnter={e=>e.currentTarget.style.background="var(--brand-pale)"}
                onMouseLeave={e=>e.currentTarget.style.background="var(--surface2)"}>
                <span style={{ fontSize:24 }}>{item.icon}</span>
                <div style={{ flex:1 }}>
                  <p style={{ fontSize:13, fontWeight:700, color:"var(--text-primary)" }}>{item.label}</p>
                  <p style={{ fontSize:11, color:"var(--text-tertiary)" }}>{item.desc}</p>
                </div>
                <span style={{ fontSize:16, color:"var(--text-tertiary)" }}>›</span>
              </button>
            ))}
          </div>
          <Btn onClick={()=>setPhotoModal(false)} variant="secondary" size="lg" style={{ width:"100%" }}>Fechar</Btn>
        </Modal>
      )}

      {/* ── MODAL: Alterar horário ── */}
      {hoursModal && (
        <Modal title="🕐 Alterar horário" onClose={()=>setHoursModal(false)}>
          <p style={{ fontSize:13, color:"var(--text-secondary)", marginBottom:14 }}>Horário atual: <strong>{store.hours}</strong></p>
          <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:16 }}>
            <div style={{ display:"flex", gap:10 }}>
              <div style={{ flex:1 }}>
                <label style={{ fontSize:12, fontWeight:600, color:"var(--text-secondary)", textTransform:"uppercase", letterSpacing:"0.04em", display:"block", marginBottom:5 }}>Abre</label>
                <input type="time" value={hoursForm.open.replace("h",":00")} onChange={e=>setHoursForm(f=>({...f,open:e.target.value.replace(":","h").replace(/h\d+/,"h")}))}
                  style={{ width:"100%", padding:"11px 14px", background:"var(--surface)", border:"1.5px solid var(--border)", borderRadius:12, fontSize:14, color:"var(--text-primary)", fontFamily:"var(--font)", outline:"none" }}/>
              </div>
              <div style={{ flex:1 }}>
                <label style={{ fontSize:12, fontWeight:600, color:"var(--text-secondary)", textTransform:"uppercase", letterSpacing:"0.04em", display:"block", marginBottom:5 }}>Fecha</label>
                <input type="time" value={hoursForm.close.replace("h",":00")} onChange={e=>setHoursForm(f=>({...f,close:e.target.value.replace(":","h").replace(/h\d+/,"h")}))}
                  style={{ width:"100%", padding:"11px 14px", background:"var(--surface)", border:"1.5px solid var(--border)", borderRadius:12, fontSize:14, color:"var(--text-primary)", fontFamily:"var(--font)", outline:"none" }}/>
              </div>
            </div>
            <div>
              <label style={{ fontSize:12, fontWeight:600, color:"var(--text-secondary)", textTransform:"uppercase", letterSpacing:"0.04em", display:"block", marginBottom:5 }}>Dias de funcionamento</label>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                {["Seg–Sex","Seg–Sáb","Seg–Dom","Ter–Dom","Sáb–Dom"].map(d => (
                  <button key={d} onClick={()=>setHoursForm(f=>({...f,days:d}))}
                    style={{ padding:"7px 12px", borderRadius:99, fontSize:12, fontWeight:700, background:hoursForm.days===d?"var(--brand)":"var(--surface2)", color:hoursForm.days===d?"#fff":"var(--text-secondary)", border:hoursForm.days===d?"1.5px solid var(--brand)":"1.5px solid var(--border)", cursor:"pointer", fontFamily:"var(--font)", transition:"all 0.15s" }}>
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div style={{ background:"var(--brand-pale)", borderRadius:12, padding:"11px 14px", marginBottom:14, fontSize:13, color:"var(--brand)", fontWeight:600 }}>
            🕐 Novo horário: {hoursForm.days} · {hoursForm.open}–{hoursForm.close}
          </div>
          <div style={{ display:"flex", gap:10 }}>
            <Btn onClick={()=>setHoursModal(false)} variant="secondary" size="lg" style={{ flex:1 }}>Cancelar</Btn>
            <Btn onClick={()=>{ toast.show(`🕐 Horário atualizado: ${hoursForm.open}–${hoursForm.close}`); setHoursModal(false); }} size="lg" style={{ flex:2 }}>Salvar horário</Btn>
          </div>
        </Modal>
      )}

      {/* ── MODAL: Endereço ── */}
      {addressModal && (
        <Modal title="📍 Endereço da loja" onClose={()=>setAddressModal(false)}>
          <p style={{ fontSize:13, color:"var(--text-secondary)", marginBottom:14 }}>Atual: <strong>{store.address}</strong></p>
          <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:16 }}>
            <div>
              <label style={{ fontSize:12, fontWeight:600, color:"var(--text-secondary)", textTransform:"uppercase", letterSpacing:"0.04em", display:"block", marginBottom:5 }}>CEP</label>
              <div style={{ position:"relative" }}>
                <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", fontSize:15, pointerEvents:"none" }}>📮</span>
                <input placeholder="00000-000" value={addrForm.cep}
                  onChange={e=>{ const v=e.target.value.replace(/\D/g,"").slice(0,8).replace(/^(\d{5})(\d)/,"$1-$2"); setAddrForm(f=>({...f,cep:v})); if(v.replace(/\D/g,"").length===8) fetchCepStore(v, d => setAddrForm(a => ({ ...a, street: `${d.logradouro}, ${d.bairro} — ${d.localidade}/${d.uf}` }))); }}
                  maxLength={9}
                  style={{ width:"100%", padding:"11px 14px 11px 38px", background:"var(--surface)", border:"1.5px solid var(--border)", borderRadius:12, fontSize:14, color:"var(--text-primary)", fontFamily:"var(--font)", outline:"none" }}/>
                {addrCepLoading && <div style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", width:16, height:16, border:"2px solid var(--border)", borderTopColor:"var(--brand)", borderRadius:"50%", animation:"spin 0.7s linear infinite" }}/>}
              </div>
            </div>
            <TextInput label="Rua / Endereço completo" value={addrForm.street} onChange={e=>setAddrForm(f=>({...f,street:e.target.value}))} icon="🛣" placeholder="Rua das Flores, 120 — Bairro Verde"/>
            <TextInput label="Complemento" value={addrForm.complement} onChange={e=>setAddrForm(f=>({...f,complement:e.target.value}))} icon="🏢" placeholder="Loja 2, Sala 5…"/>
          </div>
          <div style={{ display:"flex", gap:10 }}>
            <Btn onClick={()=>setAddressModal(false)} variant="secondary" size="lg" style={{ flex:1 }}>Cancelar</Btn>
            <Btn onClick={()=>{ if(!addrForm.street){toast.show("Preencha o endereço","error");return;} toast.show("📍 Endereço atualizado!"); setAddressModal(false); }} size="lg" style={{ flex:2 }}>Salvar endereço</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ─── ADMIN PAGE ───────────────────────────────────────────────────────────────
const AdminPage = () => {
  const { navigate } = useNav();
  const { orders } = useUser();
  const toast = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const initRef = useRef(false);
  const [orderList, setOrderList] = useState([]);
  useEffect(() => { if (!initRef.current) { setOrderList(orders); initRef.current = true; } }, []);

  // Store management state
  const [storeStatuses, setStoreStatuses] = useState(
    Object.fromEntries(STORES.map(s => [s.id, "active"])) // active | paused | suspended
  );
  const [notifyTarget, setNotifyTarget] = useState(null); // store obj
  const [notifyMsg, setNotifyMsg] = useState("");
  const NOTIFY_TEMPLATES = [
    "Adicione mais produtos próximos do vencimento",
    "Atualize os preços dos seus produtos",
    "Sua loja está com poucos produtos cadastrados",
    "Prazo para renovação do contrato se aproximando",
    "Parabéns! Sua loja atingiu 4.8 ⭐ de avaliação",
  ];

  const totalRevenue = orderList.reduce((s,o) => s + o.total, 0);
  const activeOrders = orderList.filter(o => ["pending","confirmed","preparing","delivering"].includes(o.status));
  const allProducts = Object.values(PRODUCTS).flat();
  const avgDiscount = (allProducts.reduce((s,p) => s + p.discount, 0) / allProducts.length).toFixed(1);

  const updateStatus = (id, newStatus) => {
    setOrderList(prev => prev.map(o => o.id===id ? {...o, status:newStatus} : o));
    toast.show("Status atualizado!");
  };

  const toggleStoreStatus = (storeId, newStatus, storeName) => {
    setStoreStatuses(prev => ({ ...prev, [storeId]: newStatus }));
    const msgs = { active:`✅ ${storeName} ativada!`, paused:`⏸️ ${storeName} pausada`, suspended:`🚫 ${storeName} suspensa` };
    const types = { active:"success", paused:"warn", suspended:"error" };
    toast.show(msgs[newStatus], types[newStatus]);
  };

  const STATUS_NEXT = { pending:"confirmed", confirmed:"preparing", preparing:"delivering", delivering:"delivered" };

  return (
    <div style={{ minHeight:"100vh", background:"#0a0f0b", paddingBottom:20 }}>
      {/* Header */}
      <div style={{ background:"linear-gradient(135deg,#080f09,#0f1f12)", padding:"48px 18px 18px", borderBottom:"1px solid #1a2e1e" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <button onClick={()=>navigate("home")} style={{ width:34, height:34, background:"rgba(255,255,255,0.08)", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", border:"1px solid rgba(255,255,255,0.1)", color:"#fff", fontSize:16, cursor:"pointer" }}>←</button>
            <div>
              <div style={{ fontFamily:"var(--font-brand)", fontSize:15, fontWeight:800, color:"#8dc63f", letterSpacing:"0.1em" }}>ECODELI ADMIN</div>
              <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)", marginTop:1 }}>Painel de controle</div>
            </div>
          </div>
          <div style={{ width:36, height:36, background:"rgba(141,198,63,0.15)", borderRadius:99, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, border:"1px solid rgba(141,198,63,0.3)" }}>⚙️</div>
        </div>

        {/* KPI cards */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          {[
            { label:"Receita total",    value:`R$${totalRevenue.toFixed(0)}`,     icon:"💰", color:"#8dc63f" },
            { label:"Pedidos ativos",   value:activeOrders.length,               icon:"🔥", color:"#f59e0b" },
            { label:"Total pedidos",    value:orderList.length,                  icon:"📋", color:"#60a5fa" },
            { label:"Desconto médio",   value:`${avgDiscount}%`,                 icon:"🏷", color:"#c84b31" },
          ].map(kpi => (
            <div key={kpi.label} style={{ background:"rgba(255,255,255,0.05)", borderRadius:14, padding:"13px 14px", border:"1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ fontSize:20, marginBottom:5 }}>{kpi.icon}</div>
              <div style={{ fontSize:20, fontWeight:800, color:kpi.color, lineHeight:1 }}>{kpi.value}</div>
              <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)", marginTop:3, fontWeight:600 }}>{kpi.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display:"flex", gap:0, borderBottom:"1px solid #1a2e1e", background:"#0d130e" }}>
        {[["overview","📊 Visão geral"],["orders","📦 Pedidos"],["stores","🏪 Lojas"],["products","🛒 Produtos"]].map(([t,l]) => (
          <button key={t} onClick={()=>setActiveTab(t)} style={{ flex:1, padding:"12px 4px", fontSize:11, fontWeight:700, fontFamily:"var(--font)", color:activeTab===t?"#8dc63f":"rgba(255,255,255,0.35)", background:"none", border:"none", borderBottom:activeTab===t?"2px solid #8dc63f":"2px solid transparent", cursor:"pointer", transition:"all 0.15s", whiteSpace:"nowrap" }}>{l}</button>
        ))}
      </div>

      <div style={{ padding:"14px 16px" }}>

        {/* OVERVIEW TAB */}
        {activeTab==="overview" && (
          <div className="anim-fade-in">
            <h3 style={{ fontSize:13, fontWeight:700, color:"rgba(255,255,255,0.5)", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:12 }}>Lojas por categoria</h3>
            {STORES.map(store => {
              const storeProducts = PRODUCTS[store.id] || [];
              const storeRevenue = orderList.filter(o=>o.store_id===store.id).reduce((s,o)=>s+o.total,0);
              return (
                <div key={store.id} style={{ background:"rgba(255,255,255,0.04)", borderRadius:14, padding:"13px 14px", marginBottom:8, border:"1px solid rgba(255,255,255,0.06)", display:"flex", gap:12, alignItems:"center" }}>
                  <div style={{ fontSize:26 }}>{store.emoji}</div>
                  <div style={{ flex:1 }}>
                    <p style={{ fontSize:14, fontWeight:700, color:"#fff" }}>{store.name}</p>
                    <p style={{ fontSize:11, color:"rgba(255,255,255,0.4)", marginTop:2 }}>{storeProducts.length} produtos · ★ {store.rating}</p>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontSize:14, fontWeight:800, color:"#8dc63f" }}>R${storeRevenue.toFixed(0)}</div>
                    <div style={{ fontSize:10, color:"rgba(255,255,255,0.35)" }}>receita</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ORDERS TAB */}
        {activeTab==="orders" && (
          <div className="anim-fade-in">
            <h3 style={{ fontSize:13, fontWeight:700, color:"rgba(255,255,255,0.5)", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:12 }}>Todos os pedidos</h3>
            {orderList.map(order => {
              const st = STATUS_CFG[order.status];
              const next = STATUS_NEXT[order.status];
              return (
                <div key={order.id} style={{ background:"rgba(255,255,255,0.04)", borderRadius:14, padding:"13px 14px", marginBottom:8, border:"1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                    <div>
                      <p style={{ fontSize:14, fontWeight:700, color:"#fff" }}>{order.store_name}</p>
                      <p style={{ fontSize:11, color:"rgba(255,255,255,0.4)", marginTop:1 }}>{order.order_number} · {order.date}</p>
                    </div>
                    <span style={{ padding:"3px 9px", borderRadius:99, fontSize:11, fontWeight:700, color:st.color, background:`${st.color}22` }}>{st.label}</span>
                  </div>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <span style={{ fontSize:15, fontWeight:800, color:"#8dc63f" }}>R${order.total.toFixed(2)}</span>
                    {next && (
                      <button onClick={()=>updateStatus(order.id, next)}
                        style={{ padding:"6px 12px", background:"rgba(141,198,63,0.15)", border:"1px solid rgba(141,198,63,0.3)", borderRadius:8, color:"#8dc63f", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"var(--font)" }}>
                        → {STATUS_CFG[next].label}
                      </button>
                    )}
                    {!next && order.status!=="cancelled" && (
                      <button onClick={()=>updateStatus(order.id,"cancelled")}
                        style={{ padding:"6px 12px", background:"rgba(200,75,49,0.1)", border:"1px solid rgba(200,75,49,0.3)", borderRadius:8, color:"#c84b31", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"var(--font)" }}>
                        Cancelar
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* STORES TAB */}
        {activeTab==="stores" && (
          <div className="anim-fade-in">
            <h3 style={{ fontSize:13, fontWeight:700, color:"rgba(255,255,255,0.5)", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:12 }}>Lojas parceiras</h3>
            {STORES.map(store => {
              const status = storeStatuses[store.id];
              const statusCfg = {
                active:    { label:"Ativa",    color:"#8dc63f", bg:"rgba(141,198,63,0.15)",   border:"rgba(141,198,63,0.3)" },
                paused:    { label:"Pausada",  color:"#f59e0b", bg:"rgba(245,158,11,0.12)",   border:"rgba(245,158,11,0.3)" },
                suspended: { label:"Suspensa", color:"#c84b31", bg:"rgba(200,75,49,0.12)",    border:"rgba(200,75,49,0.3)" },
              }[status];
              return (
                <div key={store.id} style={{ background:"rgba(255,255,255,0.04)", borderRadius:14, padding:"14px", marginBottom:8, border:`1px solid ${statusCfg.border}` }}>
                  <div style={{ display:"flex", gap:12, alignItems:"center", marginBottom:10 }}>
                    <div style={{ width:44, height:44, background:`${store.color}22`, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{store.emoji}</div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:2 }}>
                        <p style={{ fontSize:14, fontWeight:700, color:"#fff" }}>{store.name}</p>
                        <span style={{ padding:"2px 8px", borderRadius:99, fontSize:10, fontWeight:800, color:statusCfg.color, background:statusCfg.bg }}>{statusCfg.label}</span>
                      </div>
                      <p style={{ fontSize:11, color:"rgba(255,255,255,0.4)" }}>📍 {store.address} · {store.hours}</p>
                    </div>
                    <span style={{ fontSize:12, fontWeight:800, color:"#f59e0b", flexShrink:0 }}>★ {store.rating}</span>
                  </div>
                  <div style={{ display:"flex", gap:8 }}>
                    <button
                      onClick={()=>toggleStoreStatus(store.id, "active", store.name)}
                      style={{ flex:1, padding:"8px 0", background:status==="active"?"rgba(141,198,63,0.25)":"rgba(141,198,63,0.08)", border:`1px solid ${status==="active"?"rgba(141,198,63,0.5)":"rgba(141,198,63,0.2)"}`, borderRadius:8, color:"#8dc63f", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"var(--font)", transition:"all 0.15s" }}>
                      {status==="active" ? "✓ Ativa" : "Ativar"}
                    </button>
                    <button
                      onClick={()=>toggleStoreStatus(store.id, "paused", store.name)}
                      style={{ flex:1, padding:"8px 0", background:status==="paused"?"rgba(245,158,11,0.2)":"rgba(255,255,255,0.04)", border:`1px solid ${status==="paused"?"rgba(245,158,11,0.4)":"rgba(255,255,255,0.08)"}`, borderRadius:8, color:status==="paused"?"#f59e0b":"rgba(255,255,255,0.4)", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"var(--font)", transition:"all 0.15s" }}>
                      {status==="paused" ? "⏸ Pausada" : "Pausar"}
                    </button>
                    <button
                      onClick={()=>{ setNotifyTarget(store); setNotifyMsg(""); }}
                      style={{ flex:1, padding:"8px 0", background:"rgba(96,165,250,0.08)", border:"1px solid rgba(96,165,250,0.2)", borderRadius:8, color:"#60a5fa", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"var(--font)", transition:"all 0.15s" }}>
                      📨 Notif.
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* PRODUCTS TAB */}
        {activeTab==="products" && (
          <div className="anim-fade-in">
            <h3 style={{ fontSize:13, fontWeight:700, color:"rgba(255,255,255,0.5)", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:12 }}>Produtos com maior desconto</h3>
            {Object.values(PRODUCTS).flat().sort((a,b)=>b.discount-a.discount).map(p => {
              const store = PRODUCT_STORE_MAP[p.id];
              return (
                <div key={p.id} style={{ background:"rgba(255,255,255,0.04)", borderRadius:12, padding:"11px 13px", marginBottom:7, border:"1px solid rgba(255,255,255,0.05)", display:"flex", gap:10, alignItems:"center" }}>
                  <span style={{ fontSize:24 }}>{p.emoji}</span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <p style={{ fontSize:13, fontWeight:600, color:"#fff", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{p.name}</p>
                    <p style={{ fontSize:11, color:"rgba(255,255,255,0.35)", marginTop:1 }}>{store?.name} · Val: {new Date(p.expiry_date).toLocaleDateString("pt-BR")}</p>
                  </div>
                  <div style={{ textAlign:"right", flexShrink:0 }}>
                    <div style={{ fontSize:13, fontWeight:800, color:"#8dc63f" }}>R${p.discount_price.toFixed(2)}</div>
                    <div style={{ fontSize:10, color:"#c84b31", fontWeight:700 }}>-{p.discount}%</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── MODAL: Notificar loja ── */}
      {notifyTarget && (
        <Modal title={`📨 Notificar ${notifyTarget.name}`} onClose={()=>setNotifyTarget(null)}>
          <p style={{ fontSize:13, color:"var(--text-secondary)", marginBottom:12 }}>Escolha um modelo ou escreva uma mensagem personalizada.</p>
          <div style={{ display:"flex", flexDirection:"column", gap:7, marginBottom:14 }}>
            {NOTIFY_TEMPLATES.map(t => (
              <button key={t} onClick={()=>setNotifyMsg(t)}
                style={{ padding:"10px 13px", background:notifyMsg===t?"var(--brand-pale)":"var(--surface2)", border:notifyMsg===t?"1.5px solid var(--brand)":"1.5px solid var(--border)", borderRadius:11, cursor:"pointer", textAlign:"left", fontSize:13, fontWeight:600, color:notifyMsg===t?"var(--brand)":"var(--text-primary)", fontFamily:"var(--font)", transition:"all 0.15s" }}>
                {t}
              </button>
            ))}
          </div>
          <div>
            <label style={{ fontSize:12, fontWeight:600, color:"var(--text-secondary)", textTransform:"uppercase", letterSpacing:"0.04em", display:"block", marginBottom:5 }}>Mensagem personalizada</label>
            <textarea value={notifyMsg} onChange={e=>setNotifyMsg(e.target.value)} placeholder="Escreva sua mensagem aqui…" rows={3}
              style={{ width:"100%", padding:"11px 14px", background:"var(--surface)", border:"1.5px solid var(--border)", borderRadius:12, fontSize:14, color:"var(--text-primary)", fontFamily:"var(--font)", outline:"none", resize:"vertical" }}
              onFocus={e=>e.target.style.borderColor="var(--brand)"}
              onBlur={e=>e.target.style.borderColor="var(--border)"}/>
          </div>
          <div style={{ display:"flex", gap:10, marginTop:14 }}>
            <Btn onClick={()=>setNotifyTarget(null)} variant="secondary" size="lg" style={{ flex:1 }}>Cancelar</Btn>
            <Btn onClick={()=>{ if(!notifyMsg.trim()){toast.show("Escreva uma mensagem","error");return;} toast.show(`📨 Notificação enviada para ${notifyTarget.name}!`); setNotifyTarget(null); setNotifyMsg(""); }} size="lg" style={{ flex:2 }}>Enviar notificação</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};
const BottomNav = () => {
  const { page, navigate } = useNav();
  const { itemCount } = useCart();
  const { user } = useUser();
  const isStore = user?.role === "store";
  const tabs = isStore ? [
    { id:"store-dashboard", emoji:"🏪", label:"Minha Loja" },
    { id:"orders",          emoji:"📋", label:"Pedidos" },
    { id:"profile",         emoji:"👤", label:"Perfil" },
  ] : [
    { id:"home",    emoji:"🏠", label:"Início" },
    { id:"search",  emoji:"🔍", label:"Buscar" },
    { id:"orders",  emoji:"📋", label:"Pedidos" },
    { id:"cart",    emoji:"🛒", label:"Carrinho", badge:itemCount },
    { id:"profile", emoji:"👤", label:"Perfil" },
    { id:"admin",   emoji:"⚙️", label:"Admin",   admin:true },
  ].filter(t => !t.admin || user?.isAdmin);
  const isActive = id => page===id || page.startsWith(id+"-");

  return (
    <nav style={{ position:"fixed", bottom:0, left:0, right:0, background:"rgba(255,255,255,0.95)", borderTop:"1px solid var(--border)", zIndex:100, backdropFilter:"blur(16px)" }}>
      <div style={{ display:"flex", maxWidth:480, margin:"0 auto" }}>
        {tabs.map(({ id, emoji, label, badge }) => {
          const active = isActive(id);
          return (
            <button key={id} onClick={()=>navigate(id)} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:3, padding:"9px 8px 11px", border:"none", background:id==="admin"?"rgba(141,198,63,0.06)":"none", cursor:"pointer", color:active?(id==="admin"?"#8dc63f":"var(--brand)"):"var(--text-tertiary)", fontFamily:"var(--font)", position:"relative", transition:"color 0.15s" }}>
              {active && <div style={{ position:"absolute", top:0, left:"20%", right:"20%", height:2, background:id==="admin"?"#8dc63f":"var(--brand)", borderRadius:"0 0 4px 4px" }}/>}
              <span style={{ fontSize:22, lineHeight:1 }}>{emoji}</span>
              <span style={{ fontSize:10, fontWeight:active?700:500, letterSpacing:"0.02em" }}>{label}</span>
              {badge>0 && <span style={{ position:"absolute", top:5, right:"50%", marginRight:-22, width:18, height:18, background:"var(--accent)", borderRadius:99, fontSize:10, fontWeight:800, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", border:"2px solid #fff" }}>{badge}</span>}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

// ─── ECO IMPACT PAGE ──────────────────────────────────────────────────────────
const EcoImpactPage = () => {
  const { goBack } = useNav();
  const { orders } = useUser();
  const [slide, setSlide] = useState(0);

  // Calcular métricas reais com base nos pedidos
  const totalItems = orders.reduce((s,o) => s + (o.items?.reduce((a,i)=>a+(i.qty||1),0)||0), 0);
  // Peso médio por item varia por categoria do pedido
  const kgPerOrder = { "1":0.9, "2":0.3, "3":1.2, "4":1.5, "5":0.4 };
  const totalKg = parseFloat(orders.reduce((s,o) => s + (kgPerOrder[o.store_id]||0.6) * Math.max(1, o.items?.reduce((a,i)=>a+(i.qty||1),0)||1), 0).toFixed(1));
  const totalCO2 = parseFloat((totalKg * 2.3).toFixed(1));
  const totalSaved = orders.reduce((s,o) => {
    const store = STORES.find(st => st.id===o.store_id);
    return s + (store ? o.total * 0.45 : 0);
  }, 0);
  const avgDiscount = 41;
  const treesEq = Math.max(1, Math.round(totalCO2 / 21));
  const mealsEq = Math.round(totalKg * 3.2);
  const waterEq = Math.round(totalKg * 840);

  const slides = [
    {
      bg: "linear-gradient(160deg,#0d2b10,#1a5c20,#2d8a3a)",
      accent: "#6ee87a",
      icon: "🌱",
      title: "Seu impacto\nno planeta",
      subtitle: "Obrigado por fazer parte\nda solução, não do problema",
      stat: null,
      cta: "Ver números →",
    },
    {
      bg: "linear-gradient(160deg,#0a1f2e,#0e3d5c,#1a6b8a)",
      accent: "#5dd3f5",
      icon: "🥗",
      title: `${totalKg} kg`,
      titleSub: "de alimento salvos",
      subtitle: `Equivalente a ${mealsEq} refeições completas que não foram desperdiçadas`,
      stat: { value: mealsEq, label: "refeições salvas", icon: "🍽️" },
      cta: "Próximo →",
    },
    {
      bg: "linear-gradient(160deg,#1a0a2e,#3a1060,#5a1a8a)",
      accent: "#c084fc",
      icon: "☁️",
      title: `${totalCO2} kg`,
      titleSub: "de CO₂ evitados",
      subtitle: `Como tirar ${treesEq} árvore${treesEq!==1?"s":""} adulta${treesEq!==1?"s":""} da rua por um mês`,
      stat: { value: `${treesEq}`, label: "árvores equivalente", icon: "🌳" },
      cta: "Próximo →",
    },
    {
      bg: "linear-gradient(160deg,#1a1200,#3d2d00,#6b4f00)",
      accent: "#fbbf24",
      icon: "💧",
      title: `${waterEq.toLocaleString("pt-BR")} L`,
      titleSub: "de água economizados",
      subtitle: "Produzir alimento desperdiçado gasta água demais. Você ajudou a poupar.",
      stat: { value: `${Math.round(waterEq/200)}`, label: "banhos equivalentes", icon: "🚿" },
      cta: "Próximo →",
    },
    {
      bg: "linear-gradient(160deg,#0f1a0a,#1e3d10,#2d6a4f)",
      accent: "#86efac",
      icon: "💰",
      title: `R$${totalSaved.toFixed(0)}`,
      titleSub: "economizados no total",
      subtitle: `Com desconto médio de ${avgDiscount}% nos seus ${orders.length} pedidos`,
      stat: { value: `${avgDiscount}%`, label: "desconto médio", icon: "🏷️" },
      cta: "Próximo →",
    },
    {
      bg: "linear-gradient(160deg,#0d2010,#1a4020,#2d6a3a)",
      accent: "#4ade80",
      icon: "🏆",
      title: "Eco-Saver\nNível 2",
      subtitle: `Você já é um herói do anti-desperdício!\nContinue assim e suba para o Nível 3 com mais ${Math.max(0, 5-orders.length)} pedidos.`,
      badge: `Top ${orders.length >= 5 ? "5%" : "20%"} dos usuários`,
      stat: null,
      cta: "Fechar",
    },
  ];

  const current = slides[slide];
  const isLast = slide === slides.length - 1;

  return (
    <div style={{ minHeight:"100vh", background:current.bg, transition:"background 0.6s ease", display:"flex", flexDirection:"column", position:"relative", overflow:"hidden" }}>
      {/* Background decorative circles */}
      <div style={{ position:"absolute", top:-80, right:-80, width:280, height:280, borderRadius:"50%", background:"rgba(255,255,255,0.04)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", bottom:-60, left:-60, width:220, height:220, borderRadius:"50%", background:"rgba(255,255,255,0.03)", pointerEvents:"none" }}/>

      {/* Header */}
      <div style={{ padding:"52px 20px 0", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <button onClick={goBack} style={{ width:36, height:36, background:"rgba(255,255,255,0.12)", borderRadius:11, display:"flex", alignItems:"center", justifyContent:"center", border:"1px solid rgba(255,255,255,0.15)", color:"#fff", fontSize:17, cursor:"pointer" }}>←</button>
        <div style={{ display:"flex", gap:6 }}>
          {slides.map((_,i) => (
            <div key={i} onClick={()=>setSlide(i)} style={{ height:4, width:i===slide?24:8, borderRadius:99, background:i<=slide?current.accent:"rgba(255,255,255,0.2)", transition:"all 0.4s", cursor:"pointer" }}/>
          ))}
        </div>
        <div style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.4)", letterSpacing:"0.06em" }}>{slide+1}/{slides.length}</div>
      </div>

      {/* Content */}
      <div key={slide} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"24px 28px 20px", textAlign:"center", animation:"fadeUp 0.5s ease" }}>

        {/* Icon */}
        <div style={{ fontSize:72, marginBottom:20, filter:"drop-shadow(0 4px 20px rgba(0,0,0,0.3))", lineHeight:1 }}>{current.icon}</div>

        {/* Title */}
        <div style={{ marginBottom:16 }}>
          <div style={{ fontFamily:"var(--font-brand)", fontSize: current.title.includes("\n") ? 30 : current.title.length > 8 ? 36 : 52, fontWeight:800, color:"#fff", lineHeight:1.1, letterSpacing:"-0.02em", whiteSpace:"pre-line" }}>
            {current.title}
          </div>
          {current.titleSub && (
            <div style={{ fontSize:15, color:current.accent, fontWeight:700, marginTop:6, letterSpacing:"0.01em" }}>{current.titleSub}</div>
          )}
        </div>

        {/* Stat card */}
        {current.stat && (
          <div style={{ background:"rgba(255,255,255,0.1)", backdropFilter:"blur(12px)", borderRadius:20, padding:"16px 28px", marginBottom:20, border:"1px solid rgba(255,255,255,0.15)" }}>
            <div style={{ fontSize:32, marginBottom:4 }}>{current.stat.icon}</div>
            <div style={{ fontFamily:"var(--font-brand)", fontSize:36, fontWeight:800, color:current.accent, lineHeight:1 }}>{current.stat.value}</div>
            <div style={{ fontSize:13, color:"rgba(255,255,255,0.6)", fontWeight:600, marginTop:4 }}>{current.stat.label}</div>
          </div>
        )}

        {/* Badge (last slide) */}
        {current.badge && (
          <div style={{ background:"rgba(255,255,255,0.12)", border:`1px solid ${current.accent}44`, borderRadius:99, padding:"8px 20px", marginBottom:20, display:"inline-flex", alignItems:"center", gap:8 }}>
            <span style={{ fontSize:16 }}>⭐</span>
            <span style={{ fontSize:13, fontWeight:700, color:current.accent }}>{current.badge}</span>
          </div>
        )}

        {/* Subtitle */}
        <p style={{ fontSize:15, color:"rgba(255,255,255,0.65)", lineHeight:1.6, maxWidth:280, whiteSpace:"pre-line" }}>{current.subtitle}</p>
      </div>

      {/* CTA */}
      <div style={{ padding:"0 28px 48px" }}>
        <button onClick={()=>{ if(isLast) goBack(); else setSlide(s=>s+1); }}
          style={{ width:"100%", padding:"15px 0", background:current.accent, borderRadius:16, border:"none", fontSize:16, fontWeight:800, color:"#111", cursor:"pointer", fontFamily:"var(--font)", letterSpacing:"-0.01em", transition:"all 0.2s", boxShadow:`0 4px 20px ${current.accent}44` }}
          onMouseEnter={e=>e.currentTarget.style.filter="brightness(1.08)"}
          onMouseLeave={e=>e.currentTarget.style.filter=""}>
          {current.cta}
        </button>
        {!isLast && (
          <button onClick={goBack} style={{ width:"100%", marginTop:10, padding:"10px 0", background:"none", border:"none", fontSize:13, color:"rgba(255,255,255,0.35)", cursor:"pointer", fontFamily:"var(--font)", fontWeight:600 }}>Pular</button>
        )}
      </div>
    </div>
  );
};

// ─── SEARCH PAGE ──────────────────────────────────────────────────────────────
const SearchPage = () => {
  const { navigate } = useNav();
  const { addItem, items: cartItems } = useCart();
  const toast = useToast();
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Todos");
  const inputRef = useRef(null);

  useEffect(() => { setTimeout(() => inputRef.current?.focus(), 100); }, []);

  const allProducts = Object.entries(PRODUCTS).flatMap(([storeId, prods]) =>
    prods.map(p => ({ ...p, store: STORES.find(s => s.id===storeId) }))
  );

  const filters = ["Todos", "Maior desconto", "Vence hoje", "Frutas", "Laticínios", "Pães", "Legumes", "Carnes", "Pratos"];

  const q = query.trim().toLowerCase();
  const today = new Date().toISOString().split("T")[0];

  const results = allProducts.filter(p => {
    const matchQ = !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.store.name.toLowerCase().includes(q);
    if (!matchQ) return false;
    if (activeFilter === "Maior desconto") return p.discount >= 40;
    if (activeFilter === "Vence hoje") return p.expiry_date === today;
    if (activeFilter !== "Todos") return p.category === activeFilter || p.name.toLowerCase().includes(activeFilter.toLowerCase());
    return true;
  }).sort((a,b) => b.discount - a.discount);

  const recentSearches = ["Brócolis", "Arroz integral", "Croissant", "Manga"];
  const trending = allProducts.sort((a,b) => b.discount - a.discount).slice(0,4);

  const handleAdd = (p) => {
    const conflict = addItem({ product_id:p.id, name:p.name, price:p.discount_price, original_price:p.original_price, store_id:p.store.id, store_name:p.store.name, emoji:p.emoji });
    if (conflict) { toast.show(`🛒 Esvazie o carrinho de ${conflict} primeiro`, "warn"); return; }
    toast.show(`${p.emoji} ${p.name} adicionado!`);
  };

  return (
    <div style={{ minHeight:"100vh", background:"var(--bg)", paddingBottom:88 }}>
      {/* Search header */}
      <div style={{ background:"linear-gradient(145deg,#080f09,#0f1f12)", padding:"50px 16px 16px" }}>
        <div style={{ position:"relative" }}>
          <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", fontSize:16, pointerEvents:"none" }}>🔍</span>
          <input
            ref={inputRef}
            placeholder="Buscar produtos, lojas, categorias…"
            value={query}
            onChange={e=>setQuery(e.target.value)}
            style={{ width:"100%", padding:"13px 42px 13px 44px", background:"rgba(255,255,255,0.1)", border:"1.5px solid rgba(255,255,255,0.12)", borderRadius:14, fontSize:14, color:"#fff", fontFamily:"var(--font)", outline:"none", backdropFilter:"blur(8px)" }}
          />
          {query && (
            <button onClick={()=>setQuery("")} style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", fontSize:18, color:"rgba(255,255,255,0.5)", background:"none", border:"none", cursor:"pointer", lineHeight:1 }}>×</button>
          )}
        </div>
        {/* Filters */}
        <div style={{ display:"flex", gap:8, overflowX:"auto", marginTop:12, paddingBottom:2 }} className="scroll-hide">
          {filters.map(f => (
            <button key={f} onClick={()=>setActiveFilter(f)} style={{ padding:"6px 13px", borderRadius:99, fontSize:12, fontWeight:700, whiteSpace:"nowrap", fontFamily:"var(--font)", background:activeFilter===f?"#8dc63f":"rgba(255,255,255,0.08)", color:activeFilter===f?"#111":"rgba(255,255,255,0.6)", border:"none", cursor:"pointer", flexShrink:0, transition:"all 0.15s" }}>{f}</button>
          ))}
        </div>
      </div>

      <div style={{ padding:"14px 16px 0" }}>
        {/* No query: show recent + trending */}
        {!q && activeFilter === "Todos" ? (
          <>
            <div style={{ marginBottom:20 }}>
              <h3 style={{ fontSize:12, fontWeight:700, color:"var(--text-tertiary)", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:10 }}>Buscas recentes</h3>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                {recentSearches.map(s => (
                  <button key={s} onClick={()=>setQuery(s)} style={{ padding:"7px 14px", background:"var(--surface)", border:"1px solid var(--border)", borderRadius:99, fontSize:13, fontWeight:600, color:"var(--text-secondary)", fontFamily:"var(--font)", cursor:"pointer", display:"flex", alignItems:"center", gap:6 }}>
                    <span style={{ fontSize:12, opacity:0.5 }}>🕐</span>{s}
                  </button>
                ))}
              </div>
            </div>
            <h3 style={{ fontSize:12, fontWeight:700, color:"var(--text-tertiary)", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:10 }}>🔥 Em destaque</h3>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              {trending.map((p,i) => (
                <Card key={p.id} onClick={()=>navigate("store",{store:p.store})} className={`anim-fade-up stagger-${i+1}`}>
                  <div style={{ position:"relative" }}>
                    <div style={{ height:80, background:`hsl(${i*60},28%,92%)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:36 }}>{p.emoji}</div>
                    <span style={{ position:"absolute", top:6, left:6, background:"var(--accent)", color:"#fff", fontSize:10, fontWeight:800, padding:"2px 7px", borderRadius:99 }}>-{p.discount}%</span>
                  </div>
                  <div style={{ padding:"8px 10px 10px" }}>
                    <p style={{ fontSize:12, fontWeight:600, marginBottom:2 }}>{p.name}</p>
                    <p style={{ fontSize:10, color:"var(--text-tertiary)", marginBottom:4 }}>📍 {p.store.name}</p>
                    <div style={{ fontSize:14, fontWeight:800, color:"var(--brand)" }}>R${p.discount_price.toFixed(2)}</div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Results header */}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
              <p style={{ fontSize:13, fontWeight:700, color:"var(--text-secondary)" }}>
                {results.length > 0 ? `${results.length} resultado${results.length!==1?"s":""}` : "Nenhum resultado"}
                {q ? ` para "${query}"` : ""}
              </p>
              {results.length > 0 && <span style={{ fontSize:11, color:"var(--text-tertiary)" }}>por desconto ↓</span>}
            </div>

            {results.length === 0 ? (
              <div style={{ textAlign:"center", padding:"48px 0", color:"var(--text-tertiary)" }}>
                <div style={{ fontSize:48, marginBottom:12 }}>🔍</div>
                <p style={{ fontWeight:700, fontSize:15, marginBottom:6 }}>Nenhum resultado</p>
                <p style={{ fontSize:13 }}>Tente outro termo ou categoria</p>
              </div>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {results.map((p,i) => {
                  const inCart = cartItems.find(c=>c.product_id===p.id);
                  const days = Math.ceil((new Date(p.expiry_date)-new Date())/86400000);
                  return (
                    <Card key={p.id} className={`anim-fade-up stagger-${Math.min(i+1,5)}`}>
                      <div style={{ display:"flex", gap:12, padding:12, alignItems:"center" }}>
                        <div onClick={()=>navigate("store",{store:p.store})} style={{ width:60, height:60, background:`hsl(${i*43%360},28%,93%)`, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, flexShrink:0, cursor:"pointer", position:"relative" }}>
                          {p.emoji}
                          <span style={{ position:"absolute", top:-4, left:-4, background:"var(--accent)", color:"#fff", fontSize:9, fontWeight:800, padding:"2px 5px", borderRadius:99 }}>-{p.discount}%</span>
                        </div>
                        <div style={{ flex:1, minWidth:0 }} onClick={()=>navigate("store",{store:p.store})}>
                          <p style={{ fontSize:13.5, fontWeight:700, marginBottom:2 }}>{p.name}</p>
                          <p style={{ fontSize:11, color:"var(--text-tertiary)", marginBottom:3 }}>📍 {p.store.name} · {p.category}</p>
                          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                            <span style={{ fontSize:15, fontWeight:800, color:"var(--brand)" }}>R${p.discount_price.toFixed(2)}</span>
                            <span style={{ fontSize:11, color:"var(--text-tertiary)", textDecoration:"line-through" }}>R${p.original_price.toFixed(2)}</span>
                            {days<=3 && <span style={{ fontSize:10, fontWeight:700, color:"#f59e0b" }}>⚠️ {days}d</span>}
                          </div>
                        </div>
                        <button onClick={()=>handleAdd(p)} style={{ width:34, height:34, background:inCart?"var(--brand-pale)":"var(--brand)", border:inCart?"1.5px solid var(--brand)":"none", borderRadius:10, color:inCart?"var(--brand)":"#fff", fontSize:18, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"transform 0.1s" }}
                          onMouseDown={e=>e.currentTarget.style.transform="scale(0.9)"}
                          onMouseUp={e=>e.currentTarget.style.transform="scale(1)"}>
                          {inCart ? `×${inCart.quantity}` : "+"}
                        </button>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// ─── ROUTER ────────────────────────────────────────────────────────────────────
const Router = () => {
  const { page, navigate } = useNav();
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;
    if (user.isAdmin && page==="home") navigate("admin");
    if (user.role==="store" && page==="home") navigate("store-dashboard");
  }, [user]);

  const hasMounted = useRef({});
  if (!user) return <AuthPage/>;
  const noBottomNav = ["checkout","order-success"].includes(page);
  // Pages that must persist state (not unmount on tab switch)
  const persistPages = ["admin","store-dashboard"];
  persistPages.forEach(p => { if (page===p) hasMounted.current[p]=true; });
  return (
    <div style={{ maxWidth:480, margin:"0 auto", minHeight:"100vh", position:"relative" }}>
      {page==="home"         && <HomePage/>}
      {page==="search"       && <SearchPage/>}
      {page==="store"        && <StorePage/>}
      {page==="all-deals"     && <AllDealsPage/>}
      {page==="cart"         && <CartPage/>}
      {page==="checkout"     && <CheckoutPage/>}
      {page==="order-success"&& <OrderSuccessPage/>}
      {page==="orders"       && <OrdersPage/>}
      {page==="order-detail" && <OrderDetailPage/>}
      {page==="profile"      && <ProfilePage/>}
      {page==="eco-impact"   && <EcoImpactPage/>}
      {/* Persist state pages - keep mounted, hide with display:none */}
      {hasMounted.current["admin"] && (
        <div style={{ display: page==="admin" ? "block" : "none" }}><AdminPage key="admin-persist"/></div>
      )}
      {!hasMounted.current["admin"] && page==="admin" && <AdminPage key="admin-first"/>}
      {hasMounted.current["store-dashboard"] && (
        <div style={{ display: page==="store-dashboard" ? "block" : "none" }}><StoreDashboardPage key="store-persist"/></div>
      )}
      {!hasMounted.current["store-dashboard"] && page==="store-dashboard" && <StoreDashboardPage key="store-first"/>}
      {!noBottomNav && <BottomNav/>}
    </div>
  );
};

// ─── APP ROOT ──────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <FontLink/>
      <UserProvider>
        <ToastProvider>
          <NavProvider>
            <CartProvider>
              <Router/>
            </CartProvider>
          </NavProvider>
        </ToastProvider>
      </UserProvider>
    </>
  );
}
