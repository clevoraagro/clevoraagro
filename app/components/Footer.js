import Link from 'next/link';
import Image from 'next/image';
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
              <div className={styles.logoIcon} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginLeft: '-5px' }}>
                <Image src="/logo.png" alt="Clevora Agro Logo" width={180} height={70} style={{ height: '70px', width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)', transform: 'scale(1.4)', transformOrigin: 'left center' }} />
              </div>
            </div>
            <p className={styles.aboutText}>
              Clevora Agro is committed to redefining agricultural productivity through premium-grade crop nutrients, soluble fertilizers, and organic bio-stimulants.
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
                <span>
                  <a href="https://maps.google.com/?q=TF-08+Shivam+Trade+Center,+Nr.+Khiskoli+Circle,+Atladara,+Vadodara-390012" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                    Head Office: TF-08 Shivam Trade Center, Nr. Khiskoli Circle, Atladara, Vadodara-390012
                  </a>
                </span>
              </li>
              <li>
                <Phone size={18} />
                <span>
                  <a href="tel:+919316843628" style={{ color: 'inherit', textDecoration: 'none' }}>+91 93168 43628</a>
                </span>
              </li>
              <li>
                <Mail size={18} />
                <span><a href="mailto:info@clevoraagro.com" style={{ color: 'inherit', textDecoration: 'none' }}>info@clevoraagro.com</a></span>
              </li>
              <li>
                <Clock size={18} />
                <span>Mon - Sat: 9:00 AM - 6:00 PM<br />Sunday: Closed</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {currentYear} Clevora Agro. All Rights Reserved.</p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.75)' }}>Powered by</span>
            <a href="https://tejaskpaisoftware.com/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
              <span style={{ fontWeight: 600, color: 'var(--accent-gold)' }}>TejasKP AI Software</span>
              <img src="/tejaskp.png" alt="TejasKP Logo" width={26} height={26} style={{ verticalAlign: 'middle', borderRadius: '4px', objectFit: 'cover' }} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
