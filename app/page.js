'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sprout, ShieldCheck, Zap, Award, Users2, Building2, Layers, HelpingHand, Leaf } from 'lucide-react';
import styles from './page.module.css';
import dynamic from 'next/dynamic';

const Reveal = dynamic(() => import('./components/Reveal'), { ssr: false });

export default function Home() {
  const router = useRouter();

  const handleCategoryClick = (category) => {
    router.push(`/products?category=${encodeURIComponent(category)}`);
  };

  const categories = [
    {
      name: 'Micronutrients',
      desc: 'Precision-formulated nutrients that correct deficiencies, strengthen plant metabolism, and support superior crop quality.',
      icon: <Layers size={32} />
    },
    {
      name: 'Specialty Fertilizers',
      desc: 'High-performance nutrient blends engineered to deliver balanced nutrition for vigorous growth and increased yields.',
      icon: <Zap size={32} />
    },
    {
      name: 'Liquid Fertilizers',
      desc: 'Fast-absorbing liquid formulations designed for efficient nutrient delivery through foliar and fertigation applications.',
      icon: <Sprout size={32} />
    },
    {
      name: 'Bio-Stimulants',
      desc: 'Innovative plant enhancers that promote root development, improve stress resistance, and unlock greater crop potential.',
      icon: <Leaf size={32} />
    }
  ];

  return (
    <div className="animate-fade">
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <span className={styles.heroTagline}>Enriching Fields, Harvesting Success</span>
            <h1 className={styles.heroTitle}>Advanced Solutions for Modern Agriculture</h1>
            <p className={styles.heroDesc}>
              Supporting farmers across India with premium crop nutrition, protection, and growth solutions developed to enhance productivity, strengthen plant health, and promote sustainable farming practices.
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
      <Reveal delay={0.1}>
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
      </Reveal>

      {/* About Teaser */}
      <Reveal delay={0.2}>
      <section className={styles.aboutTeaser}>
        <div className="container">
          <div className={styles.aboutGrid}>
            <div className={styles.teaserContent}>
              <span className="badge badge-primary" style={{ marginBottom: '1rem' }}>Who We Are</span>
              <h2>Driving Innovation in Sustainable Agriculture</h2>
              <p>
                Devoted to developing advanced crop nutrition and plant health solutions, we combine scientific research with practical farming needs. Based in India, our mission is to deliver reliable products that improve crop performance and support long-term agricultural growth.
              </p>
              <p>
                Our formulations help strengthen plant development, enhance stress tolerance, and maximize productivity while promoting responsible and sustainable farming practices.
              </p>
              <ul className={styles.bullets}>
                <li><ShieldCheck size={18} /> High-quality ingredients sourced from trusted suppliers</li>
                <li><ShieldCheck size={18} /> Farmer-focused solutions backed by technical expertise</li>
                <li><ShieldCheck size={18} /> Strict quality control and consistency in every batch</li>
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
      </Reveal>

      {/* Categories Grid */}
      <Reveal delay={0.1}>
      <section className={styles.categoriesSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="badge badge-gold" style={{ marginBottom: '1rem' }}>What We Offer</span>
            <h2>Smart Nutrition for Stronger Harvests</h2>
            <p>Discover our comprehensive range of advanced agricultural solutions carefully developed to improve plant health, enhance nutrient efficiency, and maximize crop productivity across every stage of growth.</p>
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
      </Reveal>

      {/* Core Values / Features */}
      <Reveal delay={0.2}>
      <section className={styles.featuresSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="badge badge-primary" style={{ marginBottom: '1rem' }}>Why We Stand Apart</span>
            <h2>Excellence in Every Solution</h2>
            <p>We combine scientific innovation, consistent quality, and dedicated support to help farmers achieve healthier crops, stronger yields, and sustainable growth.</p>
          </div>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <Award className={styles.featureIcon} size={36} />
              <h3>Superior Quality</h3>
              <p>Every product is manufactured using carefully selected raw materials and stringent quality control standards to ensure reliable performance.</p>
            </div>
            <div className={styles.featureCard}>
              <Users2 className={styles.featureIcon} size={36} />
              <h3>Customer-Centric Approach</h3>
              <p>We work closely with farmers and partners to provide practical guidance, tailored recommendations, and dependable service.</p>
            </div>
            <div className={styles.featureCard}>
              <Building2 className={styles.featureIcon} size={36} />
              <h3>Advanced Manufacturing</h3>
              <p>Our modern production facilities and efficient processes enable us to deliver high-quality agricultural solutions with consistency and precision.</p>
            </div>
          </div>
        </div>
      </section>
      </Reveal>

      {/* CTA Section */}
      <Reveal delay={0.1}>
      <section className={styles.ctaSection}>
        <div className="container">
          <h2>Ready to Grow Beyond Expectations?</h2>
          <p>Connect with our agricultural specialists and discover customized crop nutrition solutions designed to maximize productivity, improve crop health, and deliver better harvest outcomes.</p>
          <Link href="/contact" className="btn btn-gold">
            <HelpingHand size={18} /> Get In Touch Now
          </Link>
        </div>
      </section>
      </Reveal>
    </div>
  );
}
