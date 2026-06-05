'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sprout, Menu, X, PhoneCall, ChevronDown } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menus when route changes
  useEffect(() => {
    setMenuOpen(false);
    setMobileDropdownOpen(false);
  }, [pathname]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    {
      name: 'Products',
      path: '/products',
      dropdown: [
        { name: 'Secondary Nutrients', path: '/products?category=Secondary%20Nutrients' },
        { name: 'Water Soluble Fertilizers', path: '/products?category=Water%20Soluble%20Fertilizers' },
        { name: 'Liquid Fertilizers', path: '/products?category=Liquid%20Fertilizers' },
        { name: 'Bio-Stimulants', path: '/products?category=Bio-Stimulants' }
      ]
    },
    { name: 'Infrastructure', path: '/infrastructure' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
    { name: 'Admin', path: '/admin' }
  ];

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <Sprout size={24} />
          </div>
          <span>EverGrow</span>
        </Link>

        <ul className={`${styles.navLinks} ${menuOpen ? styles.activeMenu : ''}`}>
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            const hasDropdown = !!item.dropdown;

            if (hasDropdown) {
              return (
                <li
                  key={item.name}
                  className={styles.navItem}
                  onMouseEnter={() => setMobileDropdownOpen(true)}
                  onMouseLeave={() => setMobileDropdownOpen(false)}
                >
                  <div
                    className={`${styles.navLink} ${styles.dropdownTrigger} ${isActive ? styles.activeLink : ''}`}
                    onClick={(e) => {
                      // On mobile screen, toggle the dropdown
                      if (window.innerWidth <= 968) {
                        e.preventDefault();
                        setMobileDropdownOpen(!mobileDropdownOpen);
                      }
                    }}
                  >
                    <span>{item.name}</span>
                    <ChevronDown size={14} className={styles.chevron} style={{ transform: mobileDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                  </div>

                  <ul className={`${styles.dropdown} ${mobileDropdownOpen ? styles.mobileDropdownActive : ''}`}>
                    {item.dropdown.map((sub) => (
                      <li key={sub.name} className={styles.dropdownItem}>
                        <Link href={sub.path} className={styles.dropdownLink}>
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            }

            return (
              <li key={item.name} className={styles.navItem}>
                <Link
                  href={item.path}
                  className={`${styles.navLink} ${isActive ? styles.activeLink : ''}`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
          <li className={styles.ctaBtn}>
            <Link href="/contact" className="btn btn-primary">
              <PhoneCall size={16} />
              <span>Enquire Now</span>
            </Link>
          </li>
        </ul>

        <button
          className={styles.menuBtn}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </nav>
  );
}
