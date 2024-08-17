import Head from 'next/head';
import styles from '@/app/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.title}>Flashcard SaaS</h1>
          <p className={styles.description}>Revolutionize your learning with our AI-powered flashcards.</p>
          <a href="/checkout" className={styles.ctaButton}>Get Started</a>
        </section>

        <section className={styles.features}>
          <h2>Why Choose Us?</h2>
          <div className={styles.featureItem}>
            <h3>AI-Powered</h3>
            <p>Leverage the power of AI to generate flashcards automatically.</p>
          </div>
          <div className={styles.featureItem}>
            <h3>Seamless Integration</h3>
            <p>Connect easily with your existing tools and platforms.</p>
          </div>
          <div className={styles.featureItem}>
            <h3>Flexible Pricing</h3>
            <p>Choose a plan that fits your needs, whether you're an individual or a team.</p>
          </div>
        </section>

        <section className={styles.pricing}>
          <h2>Pricing</h2>
          <div className={styles.priceCard}>
            <h3>Basic Plan</h3>
            <p>Perfect for individuals</p>
            <span>$10/month</span>
            <a href="/checkout" className={styles.ctaButton}>Subscribe Now</a>
          </div>
          <div className={styles.priceCard}>
            <h3>Pro Plan</h3>
            <p>Ideal for teams</p>
            <span>$30/month</span>
            <a href="/checkout" className={styles.ctaButton}>Subscribe Now</a>
          </div>
        </section>
      </main>
    </div>
  );
}
