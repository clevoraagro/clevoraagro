'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sprout, ShieldCheck, Zap, Award, Users2, Building2, Layers, HelpingHand, Leaf } from 'lucide-react';
import styles from './page.module.css';

export default function Home() {
  const router = useRouter();

  const handleCategoryClick = (category) => {
    router.push(`/products?category=${encodeURIComponent(category)}`);
  };

  const categories = [
    {
      name: 'Secondary Nutrients',
      desc: 'Vital elements like Calcium, Magnesium, and Sulphur to build strong cell walls and chlorophyll.',
      icon: <Layers size={32} />
    },
    {
      name: 'Water Soluble Fertilizers',
      desc: '100% soluble balanced NPK formulations designed for rapid plant uptake and drip irrigation systems.',
      icon: <Zap size={32} />
    },
    {
      name: 'Liquid Fertilizers',
      desc: 'Highly concentrated liquid formulations containing chelated micronutrients for quick foliar absorption.',
      icon: <Sprout size={32} />
    },
    {
      name: 'Bio-Stimulants',
      desc: 'Seaweed extracts and organic humic formulations designed to enhance root structure and relieve abiotic stress.',
      icon: <Leaf size={32} />
    }
  ];

  return (
    <div className="animate-fade">
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <span className={styles.heroTagline}>Nurturing Soil, Growing Futures</span>
            <h1 className={styles.heroTitle}>Scientifically Formulated Crop Nutrition</h1>
            <p className={styles.heroDesc}>
              Providing farmers across India with high-quality crop protection, fertilizers, and stimulants designed to maximize crop yield, improve soil health, and ensure sustainable agriculture.
            </p>
            <div className={styles.heroButtons}>
              <Link href="/products" className="btn btn-primary">
                Explore Products
              </Link>
              <Link href="/contact" className="btn btn-secondary">
                Get Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className="container">
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>1000+</div>
              <div className={styles.statLabel}>Farmers Satisfied</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>50+</div>
              <div className={styles.statLabel}>Distributor Network</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>4+</div>
              <div className={styles.statLabel}>Product Categories</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>100%</div>
              <div className={styles.statLabel}>Quality Tested</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Teaser */}
      <section className={styles.aboutTeaser}>
        <div className="container">
          <div className={styles.aboutGrid}>
            <div className={styles.teaserContent}>
              <span className="badge badge-primary" style={{ marginBottom: '1rem' }}>Who We Are</span>
              <h2>Pioneers in Eco-Friendly Agro Inputs</h2>
              <p>
                Evergrow Crop Science Private Limited (CSPL) is dedicated to manufacturing next-generation crop nutrients and bio-stimulants. Established in Rajkot, Gujarat, we focus on delivering scientifically verified solutions that elevate plant physiology.
              </p>
              <p>
                Our solutions help plants resist disease, endure extreme weather conditions, and realize their full genetic yield potential, while keeping chemical residues at absolute minimums.
              </p>
              <ul className={styles.bullets}>
                <li><ShieldCheck size={18} /> Premium raw materials sourced from certified global vendors</li>
                <li><ShieldCheck size={18} /> Direct-to-farm consultative approach for maximum efficacy</li>
                <li><ShieldCheck size={18} /> Rigorous laboratory batch-testing for purity</li>
              </ul>
              <Link href="/about" className="btn btn-primary">
                Learn More About Us
              </Link>
            </div>
            <div className={styles.teaserImage}>
              <img
                src="https://images.unsplash.com/photo-1593113630400-ea4288922497?q=80&w=800"
                alt="Modern sustainable agriculture field"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className={styles.categoriesSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="badge badge-gold" style={{ marginBottom: '1rem' }}>Our Products</span>
            <h2>Tailored Solutions for Every Growth Stage</h2>
            <p>Select a product category to explore our range of high-efficiency fertilizers and soil conditioning agents.</p>
          </div>
          <div className={styles.categoryGrid}>
            {categories.map((cat) => (
              <div
                key={cat.name}
                className={styles.categoryCard}
                onClick={() => handleCategoryClick(cat.name)}
              >
                <div className={styles.categoryIcon}>
                  {cat.icon}
                </div>
                <h3>{cat.name}</h3>
                <p>{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values / Features */}
      <section className={styles.featuresSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="badge badge-primary" style={{ marginBottom: '1rem' }}>Why Choose Us</span>
            <h2>Delivering Excellence, Ensuring Growth</h2>
            <p>We combine advanced agricultural science with premium customer service to yield results you can see.</p>
          </div>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <Award className={styles.featureIcon} size={36} />
              <h3>Premium Quality</h3>
              <p>All batches undergo systematic quality checkpoints at every step—from raw extraction to transit packaging.</p>
            </div>
            <div className={styles.featureCard}>
              <Users2 className={styles.featureIcon} size={36} />
              <h3>Farmer First</h3>
              <p>Our agronomists coordinate directly with distributors and local farmers to provide customized crop charts.</p>
            </div>
            <div className={styles.featureCard}>
              <Building2 className={styles.featureIcon} size={36} />
              <h3>Modern Infrastructure</h3>
              <p>Equipped with computerized spray-drying, blending, and automated bottling lines at our Rajkot base.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className="container">
          <h2>Ready to Elevate Your Harvest?</h2>
          <p>Contact our customer care or agricultural experts to get personalized nutrient application charts for your crop variety.</p>
          <Link href="/contact" className="btn btn-gold">
            <HelpingHand size={18} /> Get In Touch Now
          </Link>
        </div>
      </section>
    </div>
  );
}
