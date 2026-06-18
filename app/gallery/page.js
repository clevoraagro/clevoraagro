'use client';

import { useState, useEffect } from 'react';
import NextImage from 'next/image';
import { Image, Video, Maximize2, X } from 'lucide-react';
import styles from './gallery.module.css';

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [lightboxItem, setLightboxItem] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch('/api/gallery');
        const json = await res.json();
        if (json.success) {
          setItems(json.data);
        } else {
          setError(json.error || 'Failed to load gallery items');
        }
      } catch (err) {
        setError('Network error. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const filteredItems = items.filter((item) => {
    if (activeTab === 'all') return true;
    return item.type === activeTab;
  });

  return (
    <div className="animate-fade">
      {/* Page Banner */}
      <section className="page-banner">
        <h1>Media Gallery</h1>
        <p>A visual documentation of our quality testing labs, sorting units, and verified crop trials.</p>
      </section>

      {/* Gallery Section */}
      <section className={styles.section}>
        <div className="container">
          
          {/* Tabs */}
          <div className={styles.galleryFilter}>
            <button
              className={`${styles.tabBtn} ${activeTab === 'all' ? styles.activeTabBtn : ''}`}
              onClick={() => setActiveTab('all')}
            >
              Show All
            </button>
            <button
              className={`${styles.tabBtn} ${activeTab === 'image' ? styles.activeTabBtn : ''}`}
              onClick={() => setActiveTab('image')}
            >
              Photos
            </button>
            <button
              className={`${styles.tabBtn} ${activeTab === 'video' ? styles.activeTabBtn : ''}`}
              onClick={() => setActiveTab('video')}
            >
              Videos
            </button>
          </div>

          {/* Grid */}
          <div className={styles.grid}>
            {loading ? (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem 0' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  border: '3px solid var(--primary-glow)',
                  borderTopColor: 'var(--primary)',
                  borderRadius: '50%',
                  margin: '0 auto 1rem auto',
                  animation: 'spin 1s linear infinite'
                }}></div>
                <p>Loading media catalog...</p>
              </div>
            ) : error ? (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', color: 'var(--error)' }}>
                <p>{error}</p>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className={styles.emptyState}>
                <p>No media files found under this category.</p>
              </div>
            ) : (
              filteredItems.map((item) => (
                <div
                  key={item.id}
                  className={styles.itemCard}
                  onClick={() => setLightboxItem(item)}
                >
                  <NextImage src={item.url} alt={item.title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className={styles.overlay}>
                    <div className={styles.mediaType}>
                      {item.type === 'image' ? <Image size={14} style={{ display: 'inline', marginRight: '4px' }} /> : <Video size={14} style={{ display: 'inline', marginRight: '4px' }} />}
                      {item.type}
                    </div>
                    <h3>{item.title}</h3>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Lightbox Overlay */}
      {lightboxItem && (
        <div className={styles.lightbox} onClick={() => setLightboxItem(null)}>
          <button className={styles.lightboxClose} onClick={() => setLightboxItem(null)}>
            <X size={24} />
          </button>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <NextImage src={lightboxItem.url} alt={lightboxItem.title} fill style={{ objectFit: 'contain' }} sizes="(max-width: 768px) 100vw, 90vw" />
            <h3>{lightboxItem.title}</h3>
          </div>
        </div>
      )}
    </div>
  );
}
