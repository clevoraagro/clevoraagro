import { Eye, Target, Sparkles, ShieldAlert, HeartHandshake, Compass, UserCheck } from 'lucide-react';
import styles from './about.module.css';

export const metadata = {
  title: "About Us | Evergrow Crop Science Pvt Ltd",
  description: "Learn about the mission, vision, core values, and executive leadership of Evergrow Crop Science Private Limited (CSPL) based in Rajkot, Gujarat.",
};

export default function About() {
  const directors = [
    {
      name: 'Atul Valjibhai Parsana',
      role: 'Managing Director',
      bio: 'Atul oversees the strategic direction, international vendor partnerships, and market scaling initiatives. He brings over two decades of agricultural distribution expertise.'
    },
    {
      name: 'Monikaben Rabadiya',
      role: 'Technical Director',
      bio: 'Monika directs the laboratory formulations, research pipelines, and quality assurance processes. She holds an advanced degree in Agronomy.'
    },
    {
      name: 'Jill Atulbhai Parsana',
      role: 'Operations Director',
      bio: 'Jill manages supply chain logistics, state-level distributor networks, and direct-to-farmer support initiatives, ensuring efficient batch delivery.'
    }
  ];

  const values = [
    {
      name: 'Integrity',
      desc: 'We guarantee transparency in our product formulations, ensuring farmers get exactly what is labeled.',
      icon: <ShieldAlert size={28} />
    },
    {
      name: 'Innovation',
      desc: 'Constantly engineering bio-stimulants and micronutrients that solve modern soil depletion problems.',
      icon: <Sparkles size={28} />
    },
    {
      name: 'Sustainability',
      desc: 'Developing solutions that leave no hazardous residues, preserving soil microbiology for generations.',
      icon: <Compass size={28} />
    },
    {
      name: 'Customer Support',
      desc: 'Helping farmers step-by-step with crop nutrition guides, ensuring high ROI for their agro inputs.',
      icon: <HeartHandshake size={28} />
    }
  ];

  return (
    <div className="animate-fade">
      {/* Page Banner */}
      <section className="page-banner">
        <h1>About Our Company</h1>
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
              <h2>Scientific Inputs for Zero-Impure Yields</h2>
              <p>
                Incorporated in February 2024 under the Companies Act of India, **Evergrow Crop Science Private Limited (CSPL)** has rapidly established itself as a trusted manufacturer and wholesaler of high-grade agro-nutrition inputs in Rajkot, Gujarat.
              </p>
              <p>
                Our core manufacturing philosophy is rooted in precision chemical mapping. We analyze soil deficiencies in regional crop belts and custom-formulate water-soluble NPK combinations, chelated secondary minerals, and bio-stimulants to correct targeted deficiencies.
              </p>
              <div className={styles.highlightCard}>
                Registered Corporate Entity: U46692GJ2024PTC149158 (Active Private Limited Company)
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
                To become India's leading provider of smart, eco-safe agricultural nutrients. We envision a future where high-yield farming works in absolute synergy with soil ecology, ensuring food security without environmental degradation.
              </p>
            </div>
            <div className={styles.vmCard}>
              <div className={styles.vmIcon}>
                <Target size={28} />
              </div>
              <h3>Our Mission</h3>
              <p>
                To engineer premium, cost-effective agricultural inputs. We accomplish this by utilizing advanced spray-drying technology, sourcing verified raw materials, and delivering localized, crop-specific consulting to farmers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className={styles.valuesSection}>
        <div className="container">
          <div className="sectionHeader">
            <span className="badge badge-gold" style={{ marginBottom: '1rem' }}>Core Pillars</span>
            <h2>The Values That Drive Us</h2>
            <p>Our daily operations and corporate culture are guided by these fundamental principles.</p>
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
          <div className="sectionHeader">
            <span className="badge badge-primary" style={{ marginBottom: '1rem' }}>Executive Leadership</span>
            <h2>Our Board of Directors</h2>
            <p>Meet the visionary leaders driving Evergrow Crop Science toward agricultural innovation.</p>
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
