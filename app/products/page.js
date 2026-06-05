'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, Package, Sprout, Info, X, Leaf } from 'lucide-react';
import styles from './products.module.css';

// Separate inner component to use search params safely inside Suspense
function ProductsCatalog() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Load initial state from query parameters
  const initialCategory = searchParams.get('category') || 'All';
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = ['All', 'Secondary Nutrients', 'Water Soluble Fertilizers', 'Liquid Fertilizers', 'Bio-Stimulants'];

  // Update selectedCategory state if searchParams change
  useEffect(() => {
    const cat = searchParams.get('category') || 'All';
    setSelectedCategory(cat);
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        let url = '/api/products';
        const params = [];
        if (selectedCategory && selectedCategory !== 'All') {
          params.push(`category=${encodeURIComponent(selectedCategory)}`);
        }
        if (searchQuery) {
          params.push(`search=${encodeURIComponent(searchQuery)}`);
        }
        if (params.length > 0) {
          url += `?${params.join('&')}`;
        }

        const res = await fetch(url);
        const json = await res.json();
        if (json.success) {
          setProducts(json.data);
        } else {
          setError(json.error || 'Failed to fetch products');
        }
      } catch (err) {
        setError('Connection error. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    // Debounce search input
    const delayDebounce = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [selectedCategory, searchQuery]);

  const handleCategoryChange = (category) => {
    // Update state and route query params
    setSelectedCategory(category);
    if (category === 'All') {
      router.push('/products');
    } else {
      router.push(`/products?category=${encodeURIComponent(category)}`);
    }
  };

  return (
    <div className="animate-fade">
      {/* Page Banner */}
      <section className="page-banner">
        <h1>Our Crop Nutrition Range</h1>
        <p>Premium grade fertilizers, secondary minerals, and bio-stimulants for high-yield farming.</p>
      </section>

      {/* Catalog Section */}
      <section className={styles.section}>
        <div className="container">
          
          {/* Search and Filter Controls */}
          <div className={styles.controls}>
            <div className={styles.searchWrapper}>
              <Search className={styles.searchIcon} size={18} />
              <input
                type="text"
                className="form-input styles.searchInput"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '2.8rem' }}
              />
            </div>

            <div className={styles.categoriesFilter}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`${styles.filterBtn} ${selectedCategory === cat ? styles.activeFilterBtn : ''}`}
                  onClick={() => handleCategoryChange(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Catalog Grid */}
          <div className={styles.productsGrid}>
            {loading ? (
              <div className={styles.loadingWrapper}>
                <div className={styles.loadingSpinner}></div>
                <p>Loading catalog products...</p>
              </div>
            ) : error ? (
              <div className={styles.errorWrapper}>
                <p style={{ color: 'var(--error)' }}>{error}</p>
              </div>
            ) : products.length === 0 ? (
              <div className={styles.emptyWrapper}>
                <p>No products found matching your criteria.</p>
              </div>
            ) : (
              products.map((product) => (
                <div
                  key={product.id}
                  className="glass-card styles.productCard"
                  style={{ padding: 0, overflow: 'hidden' }}
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className={styles.productImage}>
                    {product.image ? (
                      <img src={product.image} alt={product.name} />
                    ) : (
                      <Leaf size={48} />
                    )}
                  </div>
                  <div className={styles.productInfo}>
                    <div className={styles.productCategory}>{product.category}</div>
                    <h3>{product.name}</h3>
                    <p className={styles.productDesc}>{product.description || ''}</p>
                    <div className={styles.cardFooter}>
                      <span>View Details</span>
                      <Info size={16} />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Product Detail Modal Overlay */}
      {selectedProduct && (
        <div className={styles.modalOverlay} onClick={() => setSelectedProduct(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setSelectedProduct(null)}>
              <X size={20} />
            </button>
            <div className={styles.modalImage}>
              {selectedProduct.image ? (
                <img src={selectedProduct.image} alt={selectedProduct.name} />
              ) : (
                <Leaf size={64} />
              )}
            </div>
            <div className={styles.modalBody}>
              <div className={styles.productCategory}>{selectedProduct.category}</div>
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{selectedProduct.name}</h2>
              <p style={{ lineHeight: '1.6', color: 'var(--light-text)', marginBottom: '1.5rem' }}>
                {selectedProduct.description || ''}
              </p>

              <div className={styles.modalMeta}>
                {selectedProduct.packaging && (
                  <div className={styles.metaCol}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.3rem' }}>
                      <Package size={16} style={{ color: 'var(--accent-gold-dark)' }} />
                      <h4 style={{ margin: 0 }}>Packaging Available</h4>
                    </div>
                    <p>{selectedProduct.packaging}</p>
                  </div>
                )}
                {selectedProduct.usage && (
                  <div className={styles.metaCol}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.3rem' }}>
                      <Sprout size={16} style={{ color: 'var(--primary-light)' }} />
                      <h4 style={{ margin: 0 }}>Recommended Dosage</h4>
                    </div>
                    <p>{selectedProduct.usage}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Products() {
  return (
    <Suspense fallback={
      <div className="animate-fade" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
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
          <p>Loading product catalog...</p>
        </div>
      </div>
    }>
      <ProductsCatalog />
    </Suspense>
  );
}
