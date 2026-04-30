import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { 
  LayoutDashboard, ShoppingBag, Users, TrendingUp, Settings, 
  Plus, Search, Trash2, Edit3, X, Leaf, Package, Activity,
  ArrowUpRight, Database, Globe, Bell, Filter, Download, Clock, Phone, MapPin, Menu,
  ChevronRight, MoreVertical, Zap
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const AdminDashboard = ({ inventory = [], setInventory }) => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [scrolled, setScrolled] = useState(false);
  
  const [orders, setOrders] = useState([]);

  const [newPlant, setNewPlant] = useState({
    name: "", price: "", stock: "", category: "Plants",
    image: "", description: ""
  });

  const categories = [
    "Plants", "Gardening", "Seeds", "Bulbs", "Planters", 
    "Soil & Fertilizer", "Pebbles", "Accessories", "Gifts", 
    "Indoor", "Outdoor", "Offers"
  ];

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isMobile = windowWidth <= 768;

  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      if(setInventory) setInventory(res.data);
    } catch (err) { console.error("Database connection failed", err); }
  };

  const fetchOrders = () => {
    const savedOrders = JSON.parse(localStorage.getItem("nurseryOrders") || "[]");
    setOrders(savedOrders);
  };

  useEffect(() => {
    fetchItems();
    fetchOrders();
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, []);

  const chartData = useMemo(() => {
    if (!inventory.length) return [];
    return inventory.slice(0, 8).map(item => ({
      name: item.name ? item.name.substring(0, 8) : "N/A",
      stock: Number(item.countInStock) || 0,
      value: (Number(item.price) * (Number(item.countInStock) || 0)) / 100
    }));
  }, [inventory]);

  const stats = useMemo(() => ({
    totalValue: inventory.reduce((sum, item) => sum + (Number(item.price || 0) * (Number(item.countInStock || 0))), 0),
    lowStock: inventory.filter(item => (Number(item.countInStock) || 0) < 5).length,
    totalItems: inventory.length,
    pendingOrders: orders.length,
    avgPrice: inventory.length ? (inventory.reduce((sum, i) => sum + Number(i.price || 0), 0) / inventory.length).toFixed(0) : 0
  }), [inventory, orders]);

  const deletePlant = async (id) => {
    if(!window.confirm("Bhai, kya aap sure ho?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchItems();
    } catch (err) { alert("Delete error!"); }
  };

  const deleteOrder = (index) => {
    if(!window.confirm("Order clear kar dein?")) return;
    const updatedOrders = orders.filter((_, i) => i !== index);
    localStorage.setItem("nurseryOrders", JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { 
      name: newPlant.name.trim(),
      price: Number(newPlant.price), 
      countInStock: Number(newPlant.stock),
      category: newPlant.category,
      image: newPlant.image.trim(),
      description: newPlant.description.trim()
    };
    
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/products/${editingId}`, payload);
      } else {
        await axios.post("http://localhost:5000/api/products", payload);
      }
      setIsModalOpen(false);
      setEditingId(null);
      setNewPlant({ name: "", price: "", stock: "", category: "Plants", image: "", description: "" });
      fetchItems();
    } catch (err) { alert("Transaction Failed"); }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setNewPlant({
      name: item.name, price: item.price, stock: item.countInStock || item.stock,
      category: item.category, image: item.image, description: item.description
    });
    setIsModalOpen(true);
  };

  const filteredData = inventory.filter(item => {
    const matchesSearch = item.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = filterCategory === "All" || item.category === filterCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div style={styles.container}>
      {/* Mobile Header - Enhanced with Glassmorphism */}
      {isMobile && (
        <div style={{...styles.mobileHeader, backgroundColor: scrolled ? 'rgba(15, 23, 42, 0.9)' : '#0f172a', backdropFilter: 'blur(10px)'}}>
          <button onClick={() => setIsSidebarOpen(true)} style={styles.menuBtn}><Menu size={24} /></button>
          <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
            <Leaf size={20} color="#10b981" />
            <h2 style={{...styles.logoText, fontSize: '18px', letterSpacing: '-1px'}}>Nursery<span style={{color: '#10b981'}}>OS</span></h2>
          </div>
          <div style={styles.mobileProfileCircle}></div>
        </div>
      )}

      {/* Sidebar - Enhanced Visuals */}
      <aside style={{
        ...styles.sidebar,
        left: isMobile ? (isSidebarOpen ? '0' : '-300px') : '0',
        position: isMobile ? 'fixed' : 'sticky',
        boxShadow: isMobile ? '20px 0 50px rgba(0,0,0,0.5)' : 'none'
      }}>
        {isMobile && (
          <button onClick={() => setIsSidebarOpen(false)} style={styles.closeSidebar}>
            <X size={20} />
          </button>
        )}
        
        <div style={styles.logoArea}>
          <div style={styles.logoIcon}>
            <Leaf size={24} color="#10b981" fill="#10b981" />
            <div style={styles.logoGlow}></div>
          </div>
          <div>
             <h2 style={styles.logoText}>NURSERY<span style={{color: '#10b981'}}>OS</span></h2>
             <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                <div style={styles.onlineStatus}></div>
                <p style={styles.logoSubText}>V3.5.0 STABLE</p>
             </div>
          </div>
        </div>

        <nav style={styles.nav}>
          {[
            { id: "Dashboard", icon: LayoutDashboard },
            { id: "Inventory", icon: ShoppingBag },
            { id: "Orders", icon: Bell },
            { id: "Analytics", icon: TrendingUp },
            { id: "Settings", icon: Settings }
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => { setActiveTab(item.id); if(isMobile) setIsSidebarOpen(false); }}
              style={{
                ...styles.navItem,
                background: activeTab === item.id ? 'linear-gradient(90deg, rgba(16, 185, 129, 0.15) 0%, transparent 100%)' : 'transparent',
                color: activeTab === item.id ? "#10b981" : "#94a3b8",
                borderLeft: activeTab === item.id ? '3px solid #10b981' : '3px solid transparent'
              }}
            >
              <item.icon size={20} strokeWidth={activeTab === item.id ? 2.5 : 2} />
              <span style={{fontWeight: activeTab === item.id ? '800' : '600'}}>{item.id}</span>
              {item.id === "Orders" && orders.length > 0 && (
                <div style={styles.orderBadge}>{orders.length}</div>
              )}
            </button>
          ))}
        </nav>

        <div style={styles.sidebarFooter}>
            <div style={styles.systemHealth}>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
                    <span style={{fontSize: '10px', fontWeight: '800', color: '#64748b'}}>DB STATUS</span>
                    <span style={{fontSize: '10px', fontWeight: '800', color: '#10b981'}}>ACTIVE</span>
                </div>
                <div style={styles.healthBar}><div style={{...styles.healthFill, width: '92%'}}></div></div>
            </div>
        </div>
      </aside>

      {/* Main Content - Improved Layout */}
      <main style={{...styles.main, padding: isMobile ? '100px 20px 100px 20px' : '40px 60px'}}>
        <header style={{...styles.header, flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'stretch' : 'center'}}>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <h1 style={{...styles.mainTitle, fontSize: isMobile ? '32px' : '48px'}}>
                {activeTab} <span style={{color: '#10b981', fontStyle: 'normal'}}>•</span>
            </h1>
            <p style={{color: '#64748b', fontSize: '14px', fontWeight: '600', marginTop: '-5px'}}>
                Welcome back, Admin. System is running smoothly.
            </p>
          </div>
          
          <div style={{...styles.headerActions, marginTop: isMobile ? '20px' : '0'}}>
            <div style={{...styles.searchBox, flex: 1}}>
              <Search size={18} color="#10b981" />
              <input 
                placeholder="Search resources..." 
                style={styles.searchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {!isMobile && (
              <button onClick={() => { setIsModalOpen(true); setEditingId(null); }} style={styles.addButton}>
                <Plus size={20} strokeWidth={3} /> ADD NEW
              </button>
            )}
          </div>
        </header>

        {activeTab === "Dashboard" && (
          <div style={{display: 'flex', flexDirection: 'column', gap: '30px'}}>
            <div style={{...styles.grid, gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)'}}>
              <div style={styles.statCard}>
                <div style={{...styles.iconBox, background: 'rgba(16, 185, 129, 0.1)', color: '#10b981'}}><TrendingUp size={20}/></div>
                <p style={styles.statLabel}>Revenue</p>
                <h3 style={styles.statValue}>₹{stats.totalValue.toLocaleString()}</h3>
                <div style={styles.miniTrend}><ArrowUpRight size={12}/> +12%</div>
              </div>
              <div style={{...styles.statCard, border: orders.length > 0 ? '1px solid #10b981' : '1px solid transparent'}} onClick={() => setActiveTab("Orders")}>
                <div style={{...styles.iconBox, background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6'}}><Bell size={20}/></div>
                <p style={styles.statLabel}>Orders</p>
                <h3 style={styles.statValue}>{stats.pendingOrders}</h3>
                <div style={{...styles.miniTrend, color: '#3b82f6'}}>Live</div>
              </div>
              <div style={styles.statCard}>
                <div style={{...styles.iconBox, background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b'}}><Package size={20}/></div>
                <p style={styles.statLabel}>Items</p>
                <h3 style={styles.statValue}>{stats.totalItems}</h3>
                <div style={{...styles.miniTrend, color: '#f59e0b'}}>In Stock</div>
              </div>
              <div style={styles.statCard}>
                <div style={{...styles.iconBox, background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444'}}><Activity size={20}/></div>
                <p style={styles.statLabel}>Low Stock</p>
                <h3 style={styles.statValue}>{stats.lowStock}</h3>
                <div style={{...styles.miniTrend, color: '#ef4444'}}>Alert</div>
              </div>
            </div>

            <div style={styles.chartWrapper}>
                <div style={styles.chartHeader}>
                    <h4 style={{margin: 0, fontWeight: '800'}}>STOCK INVENTORY ANALYSIS</h4>
                    <div style={styles.chartLegend}>
                        <div style={styles.legendItem}><div style={{...styles.legendDot, background: '#10b981'}}></div>Stock</div>
                        <div style={styles.legendItem}><div style={{...styles.legendDot, background: '#3b82f6'}}></div>Value</div>
                    </div>
                </div>
                <div style={{height: isMobile ? '250px' : '380px', width: '100%'}}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorStock" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} hide={isMobile} />
                      <YAxis hide />
                      <Tooltip contentStyle={{borderRadius: '15px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)'}} />
                      <Area type="monotone" dataKey="stock" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorStock)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
            </div>
          </div>
        )}

        {activeTab === "Inventory" && (
          <div style={styles.tableCard}>
            <div style={styles.tableToolbar}>
                <div style={styles.categoryScroll}>
                   {["All", ...categories].map(cat => (
                     <button key={cat} onClick={() => setFilterCategory(cat)} style={{
                            ...styles.filterTab,
                            backgroundColor: filterCategory === cat ? '#10b981' : 'transparent',
                            color: filterCategory === cat ? '#fff' : '#64748b',
                            border: filterCategory === cat ? '1px solid #10b981' : '1px solid #e2e8f0',
                        }}>
                       {cat}
                     </button>
                   ))}
                </div>
            </div>
            
            <div style={{overflowX: 'auto'}}>
                <table style={{...styles.table, minWidth: '800px'}}>
                  <thead>
                    <tr style={styles.tableHeadRow}>
                      <th style={styles.th}>PRODUCT INFO</th>
                      <th style={styles.th}>CATEGORY</th>
                      <th style={styles.th}>PRICE</th>
                      <th style={styles.th}>STOCK LEVEL</th>
                      <th style={{...styles.th, textAlign: 'right'}}>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((item) => (
                      <tr key={item._id} className="table-row">
                        <td style={styles.td}>
                          <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                            <div style={styles.imgWrapper}>
                                <img src={item.image} style={styles.itemThumb} alt="" />
                            </div>
                            <div>
                              <p style={styles.itemName}>{item.name}</p>
                              <p style={styles.itemDesc}>ID: {item._id?.substring(0, 6)}</p>
                            </div>
                          </div>
                        </td>
                        <td style={styles.td}><span style={styles.catTag}>{item.category}</span></td>
                        <td style={{...styles.td, fontWeight: '800'}}>₹{item.price}</td>
                        <td style={styles.td}>
                            <div style={styles.stockCell}>
                                <div style={{...styles.stockIndicator, background: item.countInStock < 5 ? '#ef4444' : '#10b981'}}></div>
                                <span style={{fontWeight: '700'}}>{item.countInStock} Units</span>
                            </div>
                        </td>
                        <td style={{...styles.td, textAlign: 'right'}}>
                          <button onClick={() => handleEdit(item)} style={styles.actionBtn}><Edit3 size={18} /></button>
                          <button onClick={() => deletePlant(item._id)} style={{...styles.actionBtn, color: '#ef4444'}}><Trash2 size={18} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>
          </div>
        )}

        {activeTab === "Orders" && (
          <div style={styles.ordersGrid}>
            {orders.map((order, idx) => (
              <div key={idx} style={styles.orderCard}>
                <div style={styles.orderCardHeader}>
                  <div style={styles.orderType}><Zap size={12} fill="#f59e0b"/> PRIORITY</div>
                  <button onClick={() => deleteOrder(idx)} style={styles.orderDelete}><X size={14}/></button>
                </div>
                <h3 style={styles.orderCustomer}>{order.customerName || "Walk-in Customer"}</h3>
                <div style={styles.orderPhone}><Phone size={14}/> {order.phone}</div>
                
                <div style={styles.orderItemList}>
                   {order.items?.map((it, i) => (
                    <div key={i} style={styles.orderItem}>
                        <span>{it.name} <small>x{it.qty}</small></span>
                        <span>₹{it.price * it.qty}</span>
                    </div>
                   ))}
                </div>
                
                <div style={styles.orderFooter}>
                    <div style={styles.orderTotal}>
                        <span>Payable</span>
                        <h4 style={{margin:0, color: '#10b981'}}>₹{order.totalAmount}</h4>
                    </div>
                    <button onClick={() => window.open(`https://wa.me/91${order.phone}`, '_blank')} style={styles.whatsappBtn}>
                        WHATSAPP
                    </button>
                </div>
              </div>
            ))}
            {orders.length === 0 && (
                <div style={styles.emptyState}>
                    <Bell size={40} color="#cbd5e1" />
                    <p>No active orders in the queue.</p>
                </div>
            )}
          </div>
        )}
      </main>

      {/* Floating Action Button for Mobile */}
      {isMobile && (
        <button onClick={() => { setIsModalOpen(true); setEditingId(null); }} style={styles.fab}>
            <Plus size={28} color="#fff" />
        </button>
      )}

      {/* Glassmorphism Modal */}
      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={{...styles.modalContent, width: isMobile ? '95%' : '500px'}}>
             <div style={styles.modalHeader}>
                <h2 style={{margin: 0, fontSize: '24px', fontWeight: '900'}}>
                    {editingId ? 'EDIT' : 'NEW'} <span style={{color: '#10b981'}}>ASSET</span>
                </h2>
                <button onClick={() => setIsModalOpen(false)} style={styles.closeModal}><X size={20} /></button>
             </div>
             <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.inputWrap}>
                    <label style={styles.inputLabel}>Asset Name</label>
                    <input required style={styles.inputField} value={newPlant.name} onChange={(e) => setNewPlant({...newPlant, name: e.target.value})} />
                </div>
                <div style={{display: 'flex', gap: '15px'}}>
                    <div style={{...styles.inputWrap, flex: 1}}>
                        <label style={styles.inputLabel}>Price (₹)</label>
                        <input required type="number" style={styles.inputField} value={newPlant.price} onChange={(e) => setNewPlant({...newPlant, price: e.target.value})} />
                    </div>
                    <div style={{...styles.inputWrap, flex: 1}}>
                        <label style={styles.inputLabel}>Stock</label>
                        <input required type="number" style={styles.inputField} value={newPlant.stock} onChange={(e) => setNewPlant({...newPlant, stock: e.target.value})} />
                    </div>
                </div>
                <div style={styles.inputWrap}>
                    <label style={styles.inputLabel}>Category</label>
                    <select style={styles.inputField} value={newPlant.category} onChange={(e) => setNewPlant({...newPlant, category: e.target.value})}>
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>
                <div style={styles.inputWrap}>
                    <label style={styles.inputLabel}>Media URL</label>
                    <input required style={styles.inputField} value={newPlant.image} onChange={(e) => setNewPlant({...newPlant, image: e.target.value})} />
                </div>
                <button type="submit" style={styles.saveBtn}>DEPLOY CHANGES</button>
             </form>
          </div>
        </div>
      )}

      {/* Global CSS for Animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Plus Jakarta Sans', sans-serif; box-sizing: border-box; transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); }
        .table-row:hover { background: #f8fafc; }
        @keyframes pulseGlow { 0% { transform: scale(1); opacity: 0.5; } 50% { transform: scale(1.5); opacity: 0.2; } 100% { transform: scale(1); opacity: 0.5; } }
      `}</style>
    </div>
  );
};

const styles = {
  container: { display: 'flex', minHeight: '100vh', backgroundColor: '#fdfdfe', color: '#0f172a' },
  mobileHeader: { position: 'fixed', top: 0, left: 0, right: 0, height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', zIndex: 1000, borderBottom: '1px solid rgba(255,255,255,0.1)' },
  menuBtn: { background: 'none', border: 'none', color: '#fff' },
  mobileProfileCircle: { width: '35px', height: '35px', borderRadius: '50%', background: 'linear-gradient(45deg, #10b981, #3b82f6)' },
  sidebar: { width: '280px', backgroundColor: '#0f172a', padding: '40px 20px', display: 'flex', flexDirection: 'column', height: '100vh', top: 0, zIndex: 1100, transition: '0.4s cubic-bezier(0.4, 0, 0.2, 1)' },
  closeSidebar: { position: 'absolute', right: '15px', top: '15px', background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff', borderRadius: '10px', padding: '8px' },
  logoArea: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '50px', paddingLeft: '10px' },
  logoIcon: { position: 'relative', width: '45px', height: '45px', backgroundColor: 'rgba(16,185,129,0.1)', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  logoGlow: { position: 'absolute', width: '100%', height: '100%', background: '#10b981', borderRadius: '15px', filter: 'blur(15px)', opacity: 0.3, zIndex: -1 },
  logoText: { color: '#fff', fontSize: '20px', fontWeight: '900', margin: 0, letterSpacing: '1px' },
  logoSubText: { color: '#475569', fontSize: '10px', fontWeight: '800', margin: 0 },
  onlineStatus: { width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981' },
  nav: { display: 'flex', flexDirection: 'column', gap: '5px', flex: 1 },
  navItem: { display: 'flex', alignItems: 'center', gap: '15px', padding: '15px 20px', borderRadius: '12px', border: 'none', cursor: 'pointer', textAlign: 'left', fontSize: '14px', transition: '0.2s' },
  orderBadge: { backgroundColor: '#ef4444', color: '#fff', fontSize: '10px', padding: '2px 8px', borderRadius: '20px', fontWeight: '900', marginLeft: 'auto' },
  sidebarFooter: { marginTop: 'auto', padding: '20px 10px' },
  systemHealth: { background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '15px' },
  healthBar: { width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' },
  healthFill: { height: '100%', background: '#10b981' },
  main: { flex: 1, overflowY: 'auto' },
  header: { display: 'flex', justifyContent: 'space-between', marginBottom: '40px', gap: '20px' },
  mainTitle: { fontWeight: '900', letterSpacing: '-2px', margin: 0, color: '#0f172a', textTransform: 'uppercase' },
  headerActions: { display: 'flex', gap: '15px', alignItems: 'center' },
  searchBox: { display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#fff', padding: '0 20px', borderRadius: '18px', border: '1px solid #f1f5f9', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.03)' },
  searchInput: { border: 'none', padding: '16px 0', outline: 'none', fontWeight: '600', fontSize: '14px', width: '100%', background: 'transparent' },
  addButton: { backgroundColor: '#0f172a', color: '#fff', border: 'none', padding: '16px 30px', borderRadius: '18px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', whiteSpace: 'nowrap' },
  grid: { display: 'grid', gap: '20px' },
  statCard: { backgroundColor: '#fff', padding: '25px', borderRadius: '28px', border: '1px solid #f1f5f9', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', position: 'relative' },
  iconBox: { width: '45px', height: '45px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '15px' },
  statLabel: { color: '#64748b', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', marginBottom: '5px' },
  statValue: { fontSize: '28px', fontWeight: '900', margin: 0, letterSpacing: '-1px' },
  miniTrend: { position: 'absolute', top: '25px', right: '25px', fontSize: '11px', fontWeight: '800', color: '#10b981', display: 'flex', alignItems: 'center', gap: '3px' },
  chartWrapper: { background: '#fff', padding: '30px', borderRadius: '35px', border: '1px solid #f1f5f9' },
  chartHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' },
  chartLegend: { display: 'flex', gap: '20px' },
  legendItem: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: '800' },
  legendDot: { width: '8px', height: '8px', borderRadius: '50%' },
  tableCard: { background: '#fff', borderRadius: '35px', border: '1px solid #f1f5f9', overflow: 'hidden' },
  tableToolbar: { padding: '25px 30px', borderBottom: '1px solid #f1f5f9' },
  categoryScroll: { display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '5px' },
  filterTab: { padding: '10px 20px', borderRadius: '12px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { padding: '20px 30px', textAlign: 'left', fontSize: '11px', color: '#94a3b8', fontWeight: '800', textTransform: 'uppercase' },
  td: { padding: '20px 30px', borderBottom: '1px solid #f8fafc' },
  imgWrapper: { width: '55px', height: '55px', borderRadius: '18px', overflow: 'hidden', border: '2px solid #f1f5f9' },
  itemThumb: { width: '100%', height: '100%', objectFit: 'cover' },
  itemName: { margin: 0, fontWeight: '800', fontSize: '16px' },
  itemDesc: { margin: 0, fontSize: '11px', color: '#94a3b8' },
  catTag: { background: '#f1f5f9', padding: '6px 12px', borderRadius: '10px', fontSize: '10px', fontWeight: '800', color: '#64748b' },
  stockCell: { display: 'flex', alignItems: 'center', gap: '10px' },
  stockIndicator: { width: '8px', height: '8px', borderRadius: '50%' },
  actionBtn: { border: 'none', background: 'transparent', padding: '8px', cursor: 'pointer', color: '#cbd5e1' },
  fab: { position: 'fixed', bottom: '30px', right: '30px', width: '65px', height: '65px', borderRadius: '22px', backgroundColor: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 40px rgba(16, 185, 129, 0.4)', border: 'none', zIndex: 1000 },
  ordersGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' },
  orderCard: { background: '#fff', padding: '25px', borderRadius: '30px', border: '1px solid #f1f5f9', position: 'relative' },
  orderCardHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '15px' },
  orderType: { background: '#fffbeb', color: '#d97706', fontSize: '10px', fontWeight: '900', padding: '4px 10px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '5px' },
  orderDelete: { background: '#fef2f2', border: 'none', color: '#ef4444', borderRadius: '8px', padding: '5px' },
  orderCustomer: { margin: '0 0 5px 0', fontSize: '20px', fontWeight: '900' },
  orderPhone: { display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontSize: '14px', fontWeight: '700' },
  orderItemList: { background: '#f8fafc', padding: '15px', borderRadius: '20px', margin: '20px 0' },
  orderItem: { display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '5px 0', borderBottom: '1px dashed #e2e8f0' },
  orderFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  whatsappBtn: { background: '#075e54', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '15px', fontSize: '12px', fontWeight: '800' },
  modalOverlay: { position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 },
  modalContent: { background: '#fff', borderRadius: '40px', padding: '40px', boxShadow: '0 40px 80px rgba(0,0,0,0.2)' },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' },
  inputWrap: { marginBottom: '20px' },
  inputLabel: { display: 'block', fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px', paddingLeft: '10px' },
  inputField: { width: '100%', padding: '16px 20px', background: '#f8fafc', border: '2px solid #f1f5f9', borderRadius: '18px', outline: 'none', fontWeight: '700', fontSize: '15px' },
  saveBtn: { width: '100%', padding: '20px', background: '#0f172a', color: '#fff', border: 'none', borderRadius: '20px', fontWeight: '900', fontSize: '14px', marginTop: '10px' },
  emptyState: { gridColumn: '1/-1', textAlign: 'center', padding: '100px 0', color: '#94a3b8' }
};

export default AdminDashboard;