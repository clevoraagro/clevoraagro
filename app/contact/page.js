'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, AlertCircle, CheckCircle } from 'lucide-react';
import styles from './contact.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success'|'error', text: string }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    // Simple client side validation
    if (!formData.name || !formData.email || !formData.phone || !formData.subject || !formData.message) {
      setStatus({ type: 'error', text: 'Please fill in all the fields.' });
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const json = await res.json();
      if (json.success) {
        setStatus({ type: 'success', text: 'Thank you! Your inquiry has been submitted successfully. Our agronomy experts will reach out shortly.' });
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setStatus({ type: 'error', text: json.error || 'Something went wrong. Please try again.' });
      }
    } catch (err) {
      setStatus({ type: 'error', text: 'Connection failed. Please verify your internet and try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="animate-fade">
      {/* Page Banner */}
      <section className="page-banner">
        <h1>Contact Us</h1>
        <p>Get in touch with Clevora Agro for orders, distributorships, or nutrient queries.</p>
      </section>

      {/* Main Section */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.grid}>
            
            {/* Left Col: Contact Details */}
            <div className={styles.infoCol}>
              <h2>Reach Our Offices</h2>
              <p className={styles.infoText}>
                Whether you are a local distributor looking to stock our secondary nutrients, or a farmer seeking advice on crop dosing, we are here to support you.
              </p>

              <ul className={styles.contactList}>
                <li className={styles.contactItem}>
                  <div className={styles.iconWrapper}>
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h3>Office Address</h3>
                    <p>Head Office: TF-08 Shivam Trade Center, Nr. Khiskoli Circle, Atladara, Vadodara-390012</p>
                  </div>
                </li>
                <li className={styles.contactItem}>
                  <div className={styles.iconWrapper}>
                    <Phone size={22} />
                  </div>
                  <div>
                    <h3>Phone Support</h3>
                    <p>
                      Harsh Shah: <a href="tel:+919998692979" style={{ color: 'inherit', textDecoration: 'none' }}>+91 99986 92979</a><br />
                      Hiren Shah: <a href="tel:+918128983340" style={{ color: 'inherit', textDecoration: 'none' }}>+91 81289 83340</a>
                    </p>
                  </div>
                </li>
                <li className={styles.contactItem}>
                  <div className={styles.iconWrapper}>
                    <Mail size={22} />
                  </div>
                  <div>
                    <h3>Email Address</h3>
                    <p><a href="mailto:info@clevoraagro.com" style={{ color: 'inherit', textDecoration: 'none' }}>info@clevoraagro.com</a></p>
                  </div>
                </li>
                <li className={styles.contactItem}>
                  <div className={styles.iconWrapper}>
                    <Clock size={22} />
                  </div>
                  <div>
                    <h3>Working Hours</h3>
                    <p>Monday - Saturday: 09:00 AM - 06:00 PM<br />Sunday: Closed</p>
                  </div>
                </li>
              </ul>

              {/* Map Placeholder */}
              <div className={styles.mapPlaceholder}>
                <MapPin size={32} />
                <p>Atladara, Vadodara, Gujarat</p>
                <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>GPS Coordinate: 22.2882&deg; N, 73.1672&deg; E</span>
              </div>
            </div>

            {/* Right Col: Inquiry Form */}
            <div className={styles.formCol}>
              <h2>Send An Inquiry</h2>
              
              {status && (
                <div className={`${styles.alert} ${status.type === 'success' ? styles.alertSuccess : styles.alertError}`}>
                  {status.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                  <span>{status.text}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className={styles.formGrid}>
                <div>
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-input"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-input"
                    placeholder="Enter mobile number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.fullWidth}>
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.fullWidth}>
                  <label className="form-label">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    className="form-input"
                    placeholder="e.g., Distributorship Request, Order Inquiry"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.fullWidth}>
                  <label className="form-label">Your Message</label>
                  <textarea
                    name="message"
                    rows="5"
                    className="form-input"
                    placeholder="Type detail message..."
                    value={formData.message}
                    onChange={handleChange}
                    style={{ resize: 'vertical' }}
                    required
                  ></textarea>
                </div>
                <div className={styles.fullWidth} style={{ marginTop: '0.5rem' }}>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={submitting}>
                    <Send size={16} />
                    <span>{submitting ? 'Submitting...' : 'Submit Inquiry'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
