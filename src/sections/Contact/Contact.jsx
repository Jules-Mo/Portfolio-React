import React from 'react';
import styles from './ContactStyles.module.css';
import { useLanguage } from '../../common/LanguageContext.jsx';

function Contact() {
  const { language } = useLanguage();

  return (
    <section id="contact" className={styles.container}>
      <h1 className="sectionTitle">{language === 'fr' ? 'Me contacter' : 'Contact Me'}</h1>
      <form action="https://formspree.io/f/xbjnnglw" method="post">
        <div className="formGroup">
          <label htmlFor="name" hidden>
            {language === 'fr' ? 'Nom' : 'Name'}
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder={language === 'fr' ? 'Votre Nom' : 'Your Name'}
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="email" hidden>
            {language === 'fr' ? 'Email' : 'Email'}
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder={language === 'fr' ? 'Votre Mail' : 'Your Email'}
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="message" hidden>
            {language === 'fr' ? 'Message' : 'Message'}
          </label>
          <textarea
            name="message"
            id="message"
            placeholder={language === 'fr' ? 'Votre Message' : 'Your Message'}
            required></textarea>
        </div>
        <input className="hover btn" type="submit" value={language === 'fr' ? 'Envoyer' : 'Send'} />
      </form>
    </section>
  );
}

export default Contact;