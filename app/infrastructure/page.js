import { CheckCircle2, FlaskConical, Scale, Container, ShieldCheck, Warehouse } from 'lucide-react';
import styles from './infra.module.css';

export const metadata = {
  title: "Infrastructure & Quality | Clevora Agro",
  description: "Learn about the advanced laboratory testing and manufacturing infrastructure that ensures Clevora Agro products achieve premium quality.",
};

export default function Infrastructure() {
  const steps = [
    {
      num: '01',
      title: 'Sourcing Inspections',
      desc: 'All technical raw ingredients are imported from ISO-certified synthesis plants. Every arrival is checked for active ingredient percentages, moisture levels, and heavy-metal thresholds before entry to our dry warehouses.'
    },
    {
      num: '02',
      title: 'In-Process Blending Control',
      desc: 'Manufacturing lines use computerized batch-weighing systems to ensure exact elemental ratios. Sample aliquots are pulled mid-blend to test particle sizing (suspensibility) and solution pH stability.'
    },
    {
      num: '03',
      title: 'Pre-Dispatch Auditing',
      desc: 'Finished bags and bottles are marked with clear batch logs. Random final packages undergo stress-testing (temperature fluctuation cycles and drop tests) to guarantee standard-compliant field application.'
    }
  ];

  const params = [
    'Active Ingredient Purity',
    'pH & EC Stability',
    'Suspensibility Ratio',
    'Moisture Content (<0.5%)',
    'Chelation Efficiency',
    'Solubility Speed'
  ];

  return (
    <div className="animate-fade">
      {/* Page Banner */}
      <section className="page-banner">
        <h1>Infrastructure & Quality</h1>
        <p>Inside our state-of-the-art manufacturing plants and analytical quality laboratories in Rajkot.</p>
      </section>

      {/* Intro section */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.introGrid}>
            <div className={styles.introText}>
              <span className="badge badge-primary" style={{ marginBottom: '1rem' }}>Production Excellence</span>
              <h2>Premium Infrastructure for High-Yield Formulations</h2>
              <p>
                At Clevora Agro, we believe that crop protection and nutrition are sciences of exact margins. Even minor chemical imbalances can lead to root toxicity or foliar scorch. That is why we have invested in modern manufacturing machinery.
              </p>
              <p>
                Our manufacturing facilities house automated double-cone blenders, dust-free dry powder packing machinery, and dynamic liquid bottling lines. This level of automation keeps batch-to-batch variance under 0.1%, offering farmers predictable, high-potency inputs.
              </p>
            </div>
            <div className={styles.introImage}>
              <img
                src="https://images.unsplash.com/photo-1518152006812-edab29b069ac?q=80&w=800"
                alt="Automated agricultural production facility"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quality Process */}
      <section className={styles.qualityProcess}>
        <div className="container">
          <div className="sectionHeader">
            <span className="badge badge-gold" style={{ marginBottom: '1rem' }}>SOP Protocols</span>
            <h2>Our 3-Stage Quality Check System</h2>
            <p>From technical raw inputs to packed boxes, we maintain absolute testing logs.</p>
          </div>

          <div className={styles.processGrid}>
            {steps.map((s) => (
              <div key={s.num} className={styles.processCard}>
                <div className={styles.stepNumber}>{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytical Lab Section */}
      <section className={styles.labSection}>
        <div className="container">
          <div className={styles.labGrid}>
            <div className={styles.introImage}>
              <img
                src="https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800"
                alt="Scientific testing lab equipment"
              />
            </div>
            <div className={styles.labContent}>
              <span className="badge badge-primary" style={{ marginBottom: '1rem' }}>Analytical Labs</span>
              <h2>Strict Chemical Mapping & Calibration</h2>
              <p>
                Our chemical laboratories are staffed with dedicated chemists and agronomists. We utilize advanced chromatography and pH instrumentation to cross-check formulation structures.
              </p>
              <p>
                This ensures our water-soluble NPK fertilizers dissolve rapidly without leaving raw insoluble residue that can clog micro-drip emitters, and our bio-stimulants remain biologically stable.
              </p>

              <ul className={styles.labParams} style={{ marginTop: '2rem' }}>
                {params.map((p) => (
                  <li key={p}>
                    <CheckCircle2 size={16} />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
