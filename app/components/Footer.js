import Link from 'next/link';
import { Sprout, MapPin, Phone, Mail, Clock, ArrowRight, Globe, MessageCircle, Camera, Briefcase } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          {/* Col 1: Brand Info */}
          <div className={styles.col}>
            <div className={styles.logo}>
              <div className={styles.logoIcon}>
                <Sprout size={22} />
              </div>
              <span>EverGrow</span>
            </div>
            <p className={styles.aboutText}>
              Evergrow Crop Science Private Limited is committed to redefining agricultural productivity through premium-grade crop nutrients, soluble fertilizers, and organic bio-stimulants.
            </p>
            <div className={styles.socials}>
              <a href="#" className={styles.socialIcon} aria-label="Website"><Globe size={18} /></a>
              <a href="#" className={styles.socialIcon} aria-label="Updates"><MessageCircle size={18} /></a>
              <a href="#" className={styles.socialIcon} aria-label="Photos"><Camera size={18} /></a>
              <a href="#" className={styles.socialIcon} aria-label="Business"><Briefcase size={18} /></a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className={styles.col}>
            <h3>Quick Links</h3>
            <ul className={styles.links}>
              <li><Link href="/"><ArrowRight size={14} /> Home</Link></li>
              <li><Link href="/about"><ArrowRight size={14} /> About Us</Link></li>
              <li><Link href="/infrastructure"><ArrowRight size={14} /> Infrastructure</Link></li>
              <li><Link href="/gallery"><ArrowRight size={14} /> Gallery</Link></li>
              <li><Link href="/contact"><ArrowRight size={14} /> Contact Us</Link></li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div className={styles.col}>
            <h3>Our Categories</h3>
            <ul className={styles.links}>
              <li><Link href="/products?category=Secondary+Nutrients"><ArrowRight size={14} /> Secondary Nutrients</Link></li>
              <li><Link href="/products?category=Water+Soluble+Fertilizers"><ArrowRight size={14} /> Water Soluble Fertilizers</Link></li>
              <li><Link href="/products?category=Liquid+Fertilizers"><ArrowRight size={14} /> Liquid Fertilizers</Link></li>
              <li><Link href="/products?category=Bio-Stimulants"><ArrowRight size={14} /> Bio-Stimulants</Link></li>
            </ul>
          </div>

          {/* Col 4: Address */}
          <div className={styles.col}>
            <h3>Get In Touch</h3>
            <ul className={styles.contactInfo}>
              <li>
                <MapPin size={20} />
                <span>Shop No. F-6, Vegetable Dept,<br />Marketing Yard, Rajkot - 360003,<br />Gujarat, India.</span>
              </li>
              <li>
                <Phone size={18} />
                <span>+91 63592 77733</span>
              </li>
              <li>
                <Mail size={18} />
                <span>evergrowcspl@gmail.com</span>
              </li>
              <li>
                <Clock size={18} />
                <span>Mon - Sat: 9:00 AM - 6:00 PM<br />Sunday: Closed</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {currentYear} Evergrow Crop Science Private Limited. All Rights Reserved.</p>
          <p>
            Designed with Premium Aesthetics | <Link href="/admin" className="text-gold-gradient" style={{ fontWeight: 600 }}>Admin Login</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
