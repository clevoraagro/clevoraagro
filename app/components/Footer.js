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
                <span>Head Office: TF-08 Shivam Trade Center, Nr. Khiskoli Circle, Atladara, Vadodara-390012</span>
              </li>
              <li>
                <Phone size={18} />
                <span>
                  Harsh Shah: <a href="tel:+919998692979" style={{ color: 'inherit', textDecoration: 'none' }}>+91 99986 92979</a><br />
                  Hiren Shah: <a href="tel:+918128983340" style={{ color: 'inherit', textDecoration: 'none' }}>+91 81289 83340</a>
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
            <span style={{ fontWeight: 600, color: 'var(--accent-gold)' }}>TejasKP AI Software</span>
            <svg width="26" height="26" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ verticalAlign: 'middle', borderRadius: '4px' }}>
              <rect width="40" height="40" rx="4" fill="#000000" stroke="#d35400" strokeWidth="1.5" />
              <path d="M5 5H35V35H5V5Z" stroke="#e67e22" strokeWidth="0.8" strokeDasharray="3 2" />
              <circle cx="20" cy="17" r="5" stroke="#f39c12" strokeWidth="1.5" />
              <circle cx="20" cy="17" r="2" fill="#f1c40f" />
              <path d="M20 7V12" stroke="#f39c12" strokeWidth="1" />
              <path d="M20 22V27" stroke="#f39c12" strokeWidth="1" />
              <path d="M10 17H15" stroke="#f39c12" strokeWidth="1" />
              <path d="M25 17H30" stroke="#f39c12" strokeWidth="1" />
              <path d="M13 10L16.5 13.5" stroke="#f39c12" strokeWidth="1" />
              <path d="M27 24L23.5 20.5" stroke="#f39c12" strokeWidth="1" />
              <path d="M27 10L23.5 13.5" stroke="#f39c12" strokeWidth="1" />
              <path d="M13 24L16.5 20.5" stroke="#f39c12" strokeWidth="1" />
              <text x="20" y="31" fill="#f1c40f" fontSize="4.2" fontFamily="monospace" fontWeight="bold" textAnchor="middle">TEJASKP</text>
              <text x="20" y="36" fill="#f1c40f" fontSize="3.6" fontFamily="monospace" fontWeight="bold" textAnchor="middle">AI SOFTWARE</text>
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
}
