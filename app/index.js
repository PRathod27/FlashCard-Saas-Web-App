'use client'
import Head from 'next/head';
import styles from '@/app/Home.module.css'

export default function Home() {

  const handleSubmit = async() => {
    const checkoutSession = await fetch('/api/checkout_sessions', {
      method: "POST",
      headers: {
        origin: 'http://localhost:3000',
      }
  })

  const checkout_SessionJson = await checkoutSession.json()

  if(checkoutSession.status === 500) {
    console.error(checkoutSession.message)
    return 
  }
  const stripe = await getStripe()
  const {error} = await stripe.redicrectToCheckout({
    sessionId : checkout_SessionJson.id,
  })

  if(error) {
    console.warn(error.message)
  }
}

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.title}>Flashcard SaaS</h1>
          <p className={styles.description}>Revolutionize your learning with our AI-powered flashcards.</p>
          <a href="/generate" className={styles.ctaButton}>Get Started</a>
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
            <button className={styles.ctaButton}>Subscribe Now</button>
          </div>
          <div className={styles.priceCard}>
            <h3>Pro Plan</h3>
            <p>Ideal for teams</p>
            <span>$30/month</span>
            <button className={styles.ctaButton} onClick={handleSubmit}>Subscribe Now</button>
          </div>
        </section>
      </main>
    </div>
  );
}
