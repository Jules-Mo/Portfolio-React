import React from 'react';
import styles from './MeStyles.module.css';
import meImg from '../../assets/jules.png';
import sun from '../../assets/sun.svg';
import moon from '../../assets/moon.svg';
import fr from '../../assets/fr.svg';
import uk from '../../assets/uk.svg';
import githubLight from '../../assets/github-light.svg';
import githubDark from '../../assets/github-dark.svg';
import linkedinLight from '../../assets/linkedin-light.svg';
import linkedinDark from '../../assets/linkedin-dark.svg';
import CV from '../../assets/motreff.jules.pdf';
import { useTheme } from '../../common/ThemeContext';
import { useLanguage } from '../../common/LanguageContext.jsx';

function Me() {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();

  const themeIcon = theme === 'light' ? sun : moon;
  const githubIcon = theme === 'light' ? githubLight : githubDark;
  const linkedinIcon = theme === 'light' ? linkedinLight : linkedinDark;

  return (
    <section id="me" className={`${styles.container} theme-transition`}>
      <div className={styles.iconContainer}>
        <img
          className={styles.colorMode}
          src={themeIcon}
          alt="Color mode icon"
          onClick={toggleTheme}
        />
        <img
          src={language === 'en' ? uk : fr}
          alt="Language switch icon"
          onClick={toggleLanguage}
          className={styles.languageIcon}
        />
      </div>
      <img
        src={meImg}
        className={`${styles.me} ${styles.fadeIn}`}
        alt="pdp Jules"
      />
      <div className={`${styles.info} ${styles.fadeIn}`}>
        <h1>
          Jules
          <br />
          Motreff
        </h1>
        <h2>{language === 'fr' ? 'Développeur Fullstack' : 'Fullstack Developer'}</h2>
        <span>
          <a href="https://github.com/Jules-Mo" target="_blank" rel="noopener noreferrer">
            <img src={githubIcon} alt="Github icon" />
          </a>
          <a href="https://www.linkedin.com/in/julesmotreff/" target="_blank" rel="noopener noreferrer">
            <img src={linkedinIcon} alt="Linkedin icon" />
          </a>
        </span>
        <p className={styles.description}>
          {language === 'fr'
            ? 'Développeur Fullstack à la recherche d\'une entreprise dans la poursuite de son apprentissage.'
            : 'Fullstack developer looking for a company to continue his learning journey.'}
        </p>
        <a href={CV} download>
          <button className="hover">{language === 'fr' ? 'Mon CV' : 'Resume'}</button>
        </a>
      </div>
    </section>
  );
}

export default Me;