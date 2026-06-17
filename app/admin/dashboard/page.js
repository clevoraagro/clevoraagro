'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LayoutDashboard, Inbox, Image, LogOut, Plus, Trash2, Edit, Save, X, Eye, Film, Tags, Settings } from 'lucide-react';
import styles from '../admin.module.css';

export default function AdminDashboard() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('products'); // 'products', 'categories', 'inquiries', 'gallery'

  // Data States
  const [products, setProducts] = useState([]);
  const [productFilter, setProductFilter] = useState('All');
  const [categories, setCategories] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [gallery, setGallery] = useState([]);

  // Form States
  const [productForm, setProductForm] = useState({
    id: null,
    name: '',
    category: 'Secondary Nutrients',
    description: '',
    image: '',
    packaging: '',
    usage: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);

  const [galleryForm, setGalleryForm] = useState({
    title: '',
    url: '',
    type: 'image'
  });
  const [showGalleryForm, setShowGalleryForm] = useState(false);
  const [uploadingProductImage, setUploadingProductImage] = useState(false);
  const [uploadingGalleryMedia, setUploadingGalleryMedia] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null, type: '', message: '' });
  const [showCategoryForm, setShowCategoryForm] = useState(false);

  const [settingsForm, setSettingsForm] = useState({
    currentPassword: '',
    newUsername: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [updatingSettings, setUpdatingSettings] = useState(false);

  // Authentication check and data fetch
  useEffect(() => {
    const checkAuthAndFetch = async () => {
      try {
        const res = await fetch('/api/inquiries');
        if (res.status === 401) {
          router.push('/admin');
          return;
        }
        
        const json = await res.json();
        if (json.success) {
          setAuthorized(true);
          setInquiries(json.data);
          
          // Fetch products & gallery
          const prodRes = await fetch('/api/products');
          const prodJson = await prodRes.json();
          if (prodJson.success) setProducts(prodJson.data);

          
          const catRes = await fetch('/api/categories');
          const catJson = await catRes.json();
          if (catJson.success) setCategories(catJson.raw);

          const galRes = await fetch('/api/gallery');
          const galJson = await galRes.json();
          if (galJson.success) setGallery(galJson.data);
        } else {
          router.push('/admin');
        }
      } catch (err) {
        router.push('/admin');
      } finally {
        setLoading(false);
      }
    };
    checkAuthAndFetch();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin');
    } catch (err) {
      alert('Failed to logout. Please try again.');
    }
  };

  
  
  const executeDelete = async () => {
    const { id, type } = deleteModal;
    try {
      if (type === 'category') {
        const res = await fetch('/api/categories/' + id, { method: 'DELETE' });
        const json = await res.json();
        if (json.success) setCategories(categories.filter((c) => c.id !== id));
        else alert(json.error || 'Failed to delete category');
      } else if (type === 'product') {
        const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
        const json = await res.json();
        if (json.success) setProducts(products.filter((p) => p.id !== id));
        else alert(json.error || 'Failed to delete product');
      } else if (type === 'gallery') {
        const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
        const json = await res.json();
        if (json.success) setGallery(gallery.filter((g) => g.id !== id));
        else alert(json.error || 'Failed to delete gallery item');
      } else if (type === 'inquiry') {
        const res = await fetch(`/api/inquiries/${id}`, { method: 'DELETE' });
        const json = await res.json();
        if (json.success) setInquiries(inquiries.filter((i) => i.id !== id));
        else alert(json.error || 'Failed to delete inquiry');
      }
    } catch (err) {
      alert('Error during deletion');
    }
    setDeleteModal({ isOpen: false, id: null, type: '', message: '' });
  };

  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    if (settingsForm.newPassword !== settingsForm.confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }
    
    setUpdatingSettings(true);
    try {
      const res = await fetch('/api/auth/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: settingsForm.currentPassword,
          newUsername: settingsForm.newUsername,
          newPassword: settingsForm.newPassword
        })
      });
      const json = await res.json();
      
      if (json.success) {
        alert("Admin credentials updated successfully! Please login again with your new credentials.");
        handleLogout();
      } else {
        alert(json.error || "Failed to update credentials.");
      }
    } catch (err) {
      alert("Error updating credentials.");
    } finally {
      setUpdatingSettings(false);
    }
  };

  // --- Categories CRUD ---
  
  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingCategoryId ? `/api/categories/${editingCategoryId}` : '/api/categories';
      const method = editingCategoryId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: categoryName })
      });
      const json = await res.json();
      if (json.success) {
        if (editingCategoryId) {
          setCategories(categories.map(c => c.id === editingCategoryId ? json.data : c));
        } else {
          setCategories([json.data, ...categories]);
        }
        setCategoryName('');
        setEditingCategoryId(null);
        setShowCategoryForm(false);
      } else {
        alert(json.error || 'Failed to save category');
      }
    } catch (err) {
      alert('Error saving category');
    }
  };

  const handleEditCategory = (cat) => {
    setCategoryName(cat.name);
    setEditingCategoryId(cat.id);
    setShowCategoryForm(true);
  };


  const handleDeleteCategory = (id) => setDeleteModal({ isOpen: true, id, type: 'category', message: 'Are you sure you want to delete this category?' });

  // --- Products CRUD Operations ---
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isEditing ? `/api/products/${productForm.id}` : '/api/products';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productForm)
      });
      const json = await res.json();

      if (json.success) {
        // Refresh product list
        const prodRes = await fetch('/api/products');
        const prodJson = await prodRes.json();
        if (prodJson.success) setProducts(prodJson.data);

        // Reset Form
        setProductForm({
          id: null,
          name: '',
          category: 'Secondary Nutrients',
          description: '',
          image: '',
          packaging: '',
          usage: ''
        });
        setIsEditing(false);
        setShowProductForm(false);
      } else {
        alert(json.error || 'Failed to save product');
      }
    } catch (err) {
      alert('Error saving product');
    }
  };

  const handleEditClick = (product) => {
    setProductForm(product);
    setIsEditing(true);
    setShowProductForm(true);
  };

  const handleDeleteProduct = (id) => setDeleteModal({ isOpen: true, id, type: 'product', message: 'Are you sure you want to delete this product? All details will be lost.' });

  // --- Gallery Operations ---
  const handleGallerySubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(galleryForm)
      });
      const json = await res.json();

      if (json.success) {
        setGallery([json.data, ...gallery]);
        setGalleryForm({ title: '', url: '', type: 'image' });
        setShowGalleryForm(false);
      } else {
        alert(json.error || 'Failed to save gallery item');
      }
    } catch (err) {
      alert('Error saving gallery item');
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid var(--primary-glow)',
            borderTopColor: 'var(--primary)',
            borderRadius: '50%',
            margin: '0 auto 1rem auto',
            animation: 'spin 1s linear infinite'
          }}></div>
          <p>Verifying secure session...</p>
        </div>
      </div>
    );
  }

  if (!authorized) return null;

  return (
    <div className={`${styles.dashboardWrapper} animate-fade`}>
      <div className="container">
        
        {/* Dashboard Header */}
        <div className={styles.header}>
          <div>
            <span className="badge badge-primary">Workspace</span>
            <h1 style={{ marginTop: '0.2rem' }}>Control Panel Dashboard</h1>
          </div>
          <button onClick={handleLogout} className="btn btn-secondary" style={{ color: 'var(--error)' }}>
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>

        {/* Tab Selection */}
        <div className={styles.navTabs}>
          <button
            className={`${styles.tabBtn} ${activeTab === 'products' ? styles.activeTabBtn : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <LayoutDashboard size={18} />
            <span>Manage Products</span>
          </button>
          
          <button
            className={`${styles.tabBtn} ${activeTab === 'categories' ? styles.activeTabBtn : ''}`}
            onClick={() => setActiveTab('categories')}
          >
            <Tags size={18} />
            <span>Manage Categories</span>
          </button>

<button
            className={`${styles.tabBtn} ${activeTab === 'inquiries' ? styles.activeTabBtn : ''}`}
            onClick={() => setActiveTab('inquiries')}
          >
            <Inbox size={18} />
            <span>Contact Inquiries ({inquiries.length})</span>
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'gallery' ? styles.activeTabBtn : ''}`}
            onClick={() => setActiveTab('gallery')}
          >
            <Image size={18} />
            <span>Manage Gallery</span>
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'settings' ? styles.activeTabBtn : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={18} />
            <span>Settings</span>
          </button>
        </div>

        {/* --- SETTINGS TAB VIEW --- */}
        {activeTab === 'settings' && (
          <div>
            <div className={styles.actionsBar}>
              <h2>Admin Account Settings</h2>
            </div>
            <div className={styles.adminFormCard}>
              <h2>Change Username & Password</h2>
              <p style={{ marginBottom: '1.5rem', color: 'var(--light-text)', fontSize: '0.9rem' }}>
                Update your login credentials here. You will be automatically logged out after a successful update and required to sign in again.
              </p>
              <form onSubmit={handleSettingsSubmit} style={{ maxWidth: '500px' }}>
                <div className="form-group">
                  <label className="form-label">Current Password</label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Enter current password"
                    value={settingsForm.currentPassword}
                    onChange={(e) => setSettingsForm({ ...settingsForm, currentPassword: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">New Username</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter new username"
                    value={settingsForm.newUsername}
                    onChange={(e) => setSettingsForm({ ...settingsForm, newUsername: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">New Password</label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Enter new password"
                    value={settingsForm.newPassword}
                    onChange={(e) => setSettingsForm({ ...settingsForm, newPassword: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Confirm New Password</label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Confirm new password"
                    value={settingsForm.confirmPassword}
                    onChange={(e) => setSettingsForm({ ...settingsForm, confirmPassword: e.target.value })}
                    required
                  />
                </div>
                <div className={styles.formActions}>
                  <button type="button" onClick={() => setSettingsForm({ currentPassword: '', newUsername: '', newPassword: '', confirmPassword: '' })} className="btn btn-secondary">Clear</button>
                  <button type="submit" className="btn btn-primary" disabled={updatingSettings}>
                    <Save size={16} /> 
                    <span>{updatingSettings ? 'Updating...' : 'Update Credentials'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* --- CATEGORIES TAB VIEW --- */}
        {activeTab === 'categories' && (
          <div>
            <div className={styles.actionsBar}>
              <h2>Product Categories ({categories.length})</h2>
              {!showCategoryForm && (
                <button onClick={() => setShowCategoryForm(true)} className="btn btn-primary">
                  <Plus size={16} />
                  <span>Add Category</span>
                </button>
              )}
            </div>

            {showCategoryForm && (
              <div className={styles.adminFormCard}>
                <h2>{editingCategoryId ? 'Edit Category' : 'Add New Category'}</h2>
                <form onSubmit={handleCategorySubmit}>
                  <div className="form-group">
                    <label className="form-label">Category Name</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g., Organic Fertilizers"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                      required
                    />
                  </div>
                  <div className={styles.formActions}>
                    <button type="button" onClick={() => { setShowCategoryForm(false); setCategoryName(''); setEditingCategoryId(null); }} className="btn btn-secondary">Cancel</button>
                    <button type="submit" className="btn btn-primary"><Save size={16} /> {editingCategoryId ? "Update Category" : "Save Category"}</button>
                  </div>
                </form>
              </div>
            )}

            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Category Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((c) => (
                    <tr key={c.id}>
                      <td style={{ width: '80px' }}>{c.id}</td>
                      <td><div className={styles.productName}>{c.name}</div></td>
                      <td style={{ width: '100px' }}>
                        <div className={styles.actionBtns}>
                          <button onClick={() => handleEditCategory(c)} className={`${styles.iconBtn} ${styles.editBtn}`} title="Edit">
                            <Edit size={14} />
                          </button>
                          <button onClick={() => handleDeleteCategory(c.id)} className={`${styles.iconBtn} ${styles.deleteBtn}`} title="Delete">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- PRODUCTS TAB VIEW --- */}
        {activeTab === 'products' && (
          <div>
            <div className={styles.actionsBar}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <h2 style={{ margin: 0 }}>Product Catalog ({products.length})</h2>
                <select 
                  value={productFilter} 
                  onChange={(e) => setProductFilter(e.target.value)}
                  className="form-input"
                  style={{ width: 'auto', marginBottom: 0, padding: '0.4rem 2rem 0.4rem 1rem', height: '36px' }}
                >
                  <option value="All">All Categories</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              {!showProductForm && (
                <button onClick={() => { setIsEditing(false); setShowProductForm(true); }} className="btn btn-primary" style={{ height: '36px' }}>
                  <Plus size={16} />
                  <span>Add Product</span>
                </button>
              )}
            </div>

            {/* Product Add/Edit Form */}
            {showProductForm && (
              <div className={styles.adminFormCard}>
                <h2>{isEditing ? 'Update Product Details' : 'Add New Product'}</h2>
                <form onSubmit={handleProductSubmit}>
                  <div className={styles.formGrid}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Product Name</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g., Clevora Agro Nitro-Mag"
                        value={productForm.name || ''}
                        onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Product Category</label>
                      <input
                        type="text"
                        list="category-options"
                        className="form-input"
                        placeholder="Select or type a new category"
                        value={productForm.category || ''}
                        onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                        required
                      />
                      <datalist id="category-options">
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.name} />
                        ))}
                      </datalist>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Product Description</label>
                    <textarea
                      rows="3"
                      className="form-input"
                      placeholder="Type details of compound benefits..."
                      value={productForm.description || ''}
                      onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    ></textarea>
                  </div>

                  <div className={styles.formGrid}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Packaging Available</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g., 1 Kg, 5 Kg, 25 Kg bags"
                        value={productForm.packaging || ''}
                        onChange={(e) => setProductForm({ ...productForm, packaging: e.target.value })}
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Recommended Dosage / Crops</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g., 2-3 g/L foliar spray"
                        value={productForm.usage || ''}
                        onChange={(e) => setProductForm({ ...productForm, usage: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Upload Product Image File</label>
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                      <input
                        type="file"
                        accept="image/*"
                        className="form-input"
                        style={{ padding: '0.4rem', flex: 1 }}
                        disabled={uploadingProductImage}
                        onChange={async (e) => {
                          const file = e.target.files[0];
                          if (!file) return;
                          setUploadingProductImage(true);
                          const formData = new FormData();
                          formData.append('file', file);
                          try {
                            const res = await fetch('/api/upload', {
                              method: 'POST',
                              body: formData
                            });
                            const json = await res.json();
                            if (json.success) {
                              setProductForm(prev => ({ ...prev, image: json.url }));
                            } else {
                              alert(json.error || 'Failed to upload image');
                            }
                          } catch (err) {
                            alert('Error uploading file');
                          } finally {
                            setUploadingProductImage(false);
                          }
                        }}
                      />
                      {productForm.image && (
                        <div style={{ position: 'relative' }}>
                          <img
                            src={productForm.image}
                            alt="Preview"
                            style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                          />
                          <button
                            type="button"
                            onClick={() => setProductForm(prev => ({ ...prev, image: '' }))}
                            style={{
                              position: 'absolute',
                              top: '-8px',
                              right: '-8px',
                              background: 'var(--error)',
                              color: '#fff',
                              border: 'none',
                              borderRadius: '50%',
                              width: '20px',
                              height: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              fontSize: '12px',
                              lineHeight: '18px',
                              fontWeight: 'bold'
                            }}
                          >
                            ×
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={styles.formActions}>
                    <button
                      type="button"
                      onClick={() => { setShowProductForm(false); setIsEditing(false); }}
                      className="btn btn-secondary"
                      disabled={uploadingProductImage}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={uploadingProductImage}>
                      <Save size={16} />
                      <span>{uploadingProductImage ? 'Uploading...' : (isEditing ? 'Save Changes' : 'Create Product')}</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Products Table List */}
            {(productFilter === 'All' ? products : products.filter(p => p.category === productFilter)).length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', background: '#fff', borderRadius: '8px' }}>
                <p>{products.length === 0 ? "No products registered yet. Click 'Add Product' above." : "No products found for this category filter."}</p>
              </div>
            ) : (
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Product Info</th>
                      <th>Packaging</th>
                      <th>Dosage</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    
                    {(productFilter === 'All' ? products : products.filter(p => p.category === productFilter)).map((p) => (

                      <tr key={p.id}>
                        <td style={{ width: '80px' }}>
                          <img
                            src={p.image || 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?q=80&w=120'}
                            alt={p.name}
                            style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
                          />
                        </td>
                        <td>
                          <div className={styles.productName}>{p.name}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--accent-gold-dark)', fontWeight: 700, textTransform: 'uppercase' }}>{p.category}</div>
                          <p style={{ fontSize: '0.85rem', color: 'var(--light-text)', marginTop: '0.3rem' }}>{p.description}</p>
                        </td>
                        <td>{p.packaging || '-'}</td>
                        <td>{p.usage || '-'}</td>
                        <td>
                          <div className={styles.actionBtns}>
                            <button onClick={() => handleEditClick(p)} className={`${styles.iconBtn} ${styles.editBtn}`} title="Edit">
                              <Edit size={14} />
                            </button>
                            <button onClick={() => handleDeleteProduct(p.id)} className={`${styles.iconBtn} ${styles.deleteBtn}`} title="Delete">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* --- INQUIRIES TAB VIEW --- */}
        {activeTab === 'inquiries' && (
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Contact Inquiries</h2>
            
            {inquiries.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '5rem 2rem', background: '#fff', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <p>No queries or messages have been received yet.</p>
              </div>
            ) : (
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Sender Info</th>
                      <th>Subject & Message</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiries.map((inq) => (
                      <tr key={inq.id}>
                        <td style={{ width: '220px' }}>
                          <div style={{ fontWeight: 700, color: 'var(--primary-deep)' }}>{inq.name}</div>
                          <div style={{ fontSize: '0.85rem', color: 'var(--light-text)' }}>{inq.email}</div>
                          <div style={{ fontSize: '0.85rem', color: 'var(--light-text)' }}>{inq.phone}</div>
                        </td>
                        <td>
                          <div className={styles.inquirySubject}>{inq.subject}</div>
                          <p className={styles.inquiryMessage} style={{ marginTop: '0.5rem' }}>{inq.message}</p>
                        </td>
                        <td style={{ width: '150px', fontSize: '0.85rem', color: 'var(--light-text)' }}>
                          {new Date(inq.createdAt).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </td>
                        <td style={{ width: '80px', textAlign: 'center' }}>
                          <button 
                            onClick={() => setDeleteModal({ isOpen: true, id: inq.id, type: 'inquiry', message: 'Are you sure you want to delete this inquiry?' })} 
                            className={`${styles.iconBtn} ${styles.deleteBtn}`} 
                            title="Delete Inquiry"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* --- GALLERY TAB VIEW --- */}
        {activeTab === 'gallery' && (
          <div>
            <div className={styles.actionsBar}>
              <h2>Gallery Assets ({gallery.length})</h2>
              {!showGalleryForm && (
                <button onClick={() => setShowGalleryForm(true)} className="btn btn-primary">
                  <Plus size={16} />
                  <span>Add Gallery Media</span>
                </button>
              )}
            </div>

            {/* Gallery Upload Link Form */}
            {showGalleryForm && (
              <div className={styles.adminFormCard}>
                <h2>Add Photo / Video</h2>
                <form onSubmit={handleGallerySubmit}>
                  <div className={styles.formGrid}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Asset Title</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g., Harvest Success in Gujarat"
                        value={galleryForm.title}
                        onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Media Type</label>
                      <select
                        className="form-select"
                        value={galleryForm.type}
                        onChange={(e) => setGalleryForm({ ...galleryForm, type: e.target.value })}
                      >
                        <option value="image">Photo (Image)</option>
                        <option value="video">Video</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Upload Gallery File</label>
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                      <input
                        type="file"
                        accept={galleryForm.type === 'image' ? 'image/*' : 'video/*'}
                        className="form-input"
                        style={{ padding: '0.4rem', flex: 1 }}
                        disabled={uploadingGalleryMedia}
                        onChange={async (e) => {
                          const file = e.target.files[0];
                          if (!file) return;
                          setUploadingGalleryMedia(true);
                          const formData = new FormData();
                          formData.append('file', file);
                          try {
                            const res = await fetch('/api/upload', {
                              method: 'POST',
                              body: formData
                            });
                            const json = await res.json();
                            if (json.success) {
                              setGalleryForm(prev => ({ ...prev, url: json.url }));
                            } else {
                              alert(json.error || 'Failed to upload file');
                            }
                          } catch (err) {
                            alert('Error uploading file');
                          } finally {
                            setUploadingGalleryMedia(false);
                          }
                        }}
                      />
                      {galleryForm.url && (
                        <div style={{ position: 'relative' }}>
                          {galleryForm.type === 'image' ? (
                            <img
                              src={galleryForm.url}
                              alt="Preview"
                              style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                            />
                          ) : (
                            <video
                              src={galleryForm.url}
                              style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                              muted
                            />
                          )}
                          <button
                            type="button"
                            onClick={() => setGalleryForm(prev => ({ ...prev, url: '' }))}
                            style={{
                              position: 'absolute',
                              top: '-8px',
                              right: '-8px',
                              background: 'var(--error)',
                              color: '#fff',
                              border: 'none',
                              borderRadius: '50%',
                              width: '20px',
                              height: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              fontSize: '12px',
                              lineHeight: '18px',
                              fontWeight: 'bold'
                            }}
                          >
                            ×
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={styles.formActions}>
                    <button
                      type="button"
                      onClick={() => setShowGalleryForm(false)}
                      className="btn btn-secondary"
                      disabled={uploadingGalleryMedia}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={!galleryForm.url || uploadingGalleryMedia}>
                      <Save size={16} />
                      <span>{uploadingGalleryMedia ? 'Uploading...' : 'Save Asset'}</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Gallery Item Grids */}
            {gallery.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', background: '#fff', borderRadius: '8px' }}>
                <p>No gallery items added yet.</p>
              </div>
            ) : (
              <div className={styles.galleryGrid}>
                {gallery.map((item) => (
                  <div
                    key={item.id}
                    className="glass-card"
                    style={{ padding: 0, overflow: 'hidden', height: '220px', position: 'relative' }}
                  >
                    {item.type === 'image' ? (
                      <img
                        src={item.url}
                        alt={item.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <video
                        src={item.url}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        muted
                        preload="metadata"
                      />
                    )}
                    <button
                      onClick={() => setDeleteModal({ isOpen: true, id: item.id, type: 'gallery', message: 'Are you sure you want to remove this media from the gallery?' })}
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'rgba(255, 255, 255, 0.9)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: 'var(--error)',
                        boxShadow: 'var(--shadow-sm)',
                        zIndex: 10
                      }}
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                        padding: '1rem',
                        color: '#fff',
                        width: '100%'
                      }}
                    >
                      <div style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                        {item.type === 'image' ? <Eye size={12} /> : <Film size={12} />}
                        <span style={{ textTransform: 'uppercase' }}>{item.type}</span>
                      </div>
                      <h4 style={{ color: '#fff', fontSize: '0.95rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%', margin: 0 }}>
                        {item.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {/* --- CUSTOM DELETE CONFIRMATION MODAL --- */}
        {deleteModal.isOpen && (
          <div style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
          }}>
            <div style={{
              background: '#fff', padding: '2rem', borderRadius: '12px',
              maxWidth: '400px', width: '90%', textAlign: 'center',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}>
              <div style={{
                background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444',
                width: '60px', height: '60px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1.5rem auto'
              }}>
                <Trash2 size={30} />
              </div>
              <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem', color: 'var(--text-dark)' }}>Confirm Deletion</h3>
              <p style={{ color: 'var(--light-text)', marginBottom: '2rem' }}>{deleteModal.message}</p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button 
                  onClick={() => setDeleteModal({ isOpen: false, id: null, type: '', message: '' })}
                  className="btn btn-secondary" style={{ flex: 1 }}
                >
                  Cancel
                </button>
                <button 
                  onClick={executeDelete}
                  className="btn btn-primary" style={{ background: '#ef4444', border: 'none', flex: 1 }}
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
