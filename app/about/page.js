import { Eye, Target, Sparkles, ShieldAlert, HeartHandshake, Compass, UserCheck } from 'lucide-react';
import styles from './about.module.css';

export const metadata = {
  title: "About Us | Clevora Agro",
  description: "Learn about the mission, vision, core values, and executive leadership of Clevora Agro based in Vadodara, Gujarat.",
};

export default function About() {
  const directors = [
    {
      name: 'Atul Valjibhai Parsana',
      role: 'Managing Director',
      bio: 'Leads the company\'s strategic growth, business development, and market expansion while fostering strong industry partnerships.'
    },
    {
      name: 'Monikaben Rabadiya',
      role: 'Technical Director',
      bio: 'Oversees product development, research initiatives, and quality assurance to ensure consistent performance and innovation.'
    },
    {
      name: 'Jill Atulbhai Parsana',
      role: 'Operations Director',
      bio: 'Manages manufacturing operations, supply chain efficiency, and customer support systems to ensure seamless product delivery.'
    }
  ];

  const values = [
    {
      name: 'Quality',
      desc: 'We maintain high standards in sourcing, manufacturing, and quality control to deliver reliable agricultural solutions.',
      icon: <ShieldAlert size={28} />
    },
    {
      name: 'Innovation',
      desc: 'We continuously develop advanced crop nutrition and plant health products to meet evolving farming challenges.',
      icon: <Sparkles size={28} />
    },
    {
      name: 'Sustainability',
      desc: 'Our focus is on responsible agricultural practices that support long-term soil fertility and environmental well-being.',
      icon: <Compass size={28} />
    },
    {
      name: 'Farmer First',
      desc: 'We work closely with growers, providing practical solutions and technical guidance to help maximize farm productivity.',
      icon: <HeartHandshake size={28} />
    }
  ];

  return (
    <div className="animate-fade">
      {/* Page Banner */}
      <section className="page-banner">
        <h1>Discover Our Journey</h1>
        <p>Pioneering scientific crop nutrition to deliver sustainable agricultural growth across India.</p>
      </section>

      {/* Profile Section */}
      <section className={styles.contentSection}>
        <div className="container">
          <div className={styles.profileGrid}>
            <div className={styles.imageWrapper}>
              <img
                src="https://images.unsplash.com/photo-1628352081506-83c43123ed6d?q=80&w=800"
                alt="Agricultural lab research"
              />
            </div>
            <div className={styles.profileText}>
              <span className="badge badge-primary" style={{ marginBottom: '1rem' }}>Corporate Profile</span>
              <h2>Advanced Agricultural Solutions for Modern Farming</h2>
              <p>
                Established with a vision to support progressive agriculture, our company has emerged as a trusted manufacturer and supplier of premium crop nutrition and plant health products. Based in India, we are committed to delivering innovative agricultural inputs that help farmers achieve consistent and sustainable results.
              </p>
              <p>
                Our development approach is driven by research and field performance. By understanding crop requirements and soil conditions, we formulate specialized fertilizers, micronutrients, and growth enhancers designed to improve nutrient efficiency and overall crop productivity.
              </p>
              <div className={styles.highlightCard}>
                Registered Corporate Entity: Active Private Limited Company under the Companies Act of India
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className={styles.visionMission}>
        <div className="container">
          <div className={styles.vmGrid}>
            <div className={styles.vmCard}>
              <div className={styles.vmIcon}>
                <Eye size={28} />
              </div>
              <h3>Our Vision</h3>
              <p>
                To be a trusted leader in agricultural innovation by providing sustainable crop nutrition solutions that enhance farm productivity while preserving soil health. We envision a future where profitable farming and environmental responsibility grow together.
              </p>
            </div>
            <div className={styles.vmCard}>
              <div className={styles.vmIcon}>
                <Target size={28} />
              </div>
              <h3>Our Mission</h3>
              <p>
                To develop high-quality, value-driven agricultural products through continuous research, advanced manufacturing practices, and reliable raw materials. We are committed to empowering farmers with effective crop solutions and expert support tailored to local farming needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className={styles.valuesSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="badge badge-gold" style={{ marginBottom: '1rem' }}>Core Values</span>
            <h2>The Principles Behind Our Success</h2>
            <p>Our commitment to excellence is built on a strong foundation of values that guide every decision, product, and customer relationship.</p>
          </div>
          <div className={styles.valuesGrid}>
            {values.map((v) => (
              <div key={v.name} className={styles.valueCard}>
                <div className={styles.valueIcon}>
                  {v.icon}
                </div>
                <h3>{v.name}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Directors Section */}
      <section className={styles.directorsSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className="badge badge-primary" style={{ marginBottom: '1rem' }}>Leadership Team</span>
            <h2>Visionaries Driving Growth and Innovation</h2>
            <p>Meet the dedicated professionals leading our organization with expertise, integrity, and a passion for advancing agriculture.</p>
          </div>
          <div className={styles.directorsGrid}>
            {directors.map((dir) => (
              <div key={dir.name} className={styles.directorCard}>
                <div className={styles.directorAvatar}>
                  <div className={styles.avatarCircle}>
                    <UserCheck size={38} />
                  </div>
                </div>
                <div className={styles.directorInfo}>
                  <h3>{dir.name}</h3>
                  <div className={styles.directorRole}>{dir.role}</div>
                  <p className={styles.directorBio}>{dir.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
