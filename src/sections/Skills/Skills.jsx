import React from 'react';
import styles from './SkillsStyles.module.css';
import checkMarkIconDark from '../../assets/checkmark-dark.svg';
import checkMarkIconLight from '../../assets/checkmark-light.svg';
import SkillList from '../../common/SkillList';
import { useTheme } from '../../common/ThemeContext';
import { useLanguage } from '../../common/LanguageContext.jsx';

function Skills() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const checkMarkIcon = theme === 'light' ? checkMarkIconLight : checkMarkIconDark;

  return (
    <section id="skills" className={`${styles.container} ${styles.skills}`}>
      <h1 className={`${styles.sectionTitle} ${styles.skills}`}>{language === 'fr' ? 'Mes Compétences' : 'My Skills'}</h1>
      <div className={`${styles.skillList} ${styles.skills}`}>
        <SkillList src={checkMarkIcon} skill="HTML 5" />
        <SkillList src={checkMarkIcon} skill="CSS 3" />
        <SkillList src={checkMarkIcon} skill="Javascript" />
        <SkillList src={checkMarkIcon} skill="Java" />
      </div>
      <hr />
      <div className={`${styles.skillList} ${styles.skills}`}>
        <SkillList src={checkMarkIcon} skill="Vite" />
        <SkillList src={checkMarkIcon} skill="React" />
        <SkillList src={checkMarkIcon} skill="Vue.JS" />
        <SkillList src={checkMarkIcon} skill="TS" />
        <SkillList src={checkMarkIcon} skill="JSX" />
      </div>
      <hr />
      <div className={`${styles.skillList} ${styles.skills}`}>
        <SkillList src={checkMarkIcon} skill="PHP" />
        <SkillList src={checkMarkIcon} skill="Laravel" />
        <SkillList src={checkMarkIcon} skill="SQL" />
        <SkillList src={checkMarkIcon} skill="Node.JS" />
        <SkillList src={checkMarkIcon} skill="PL/SQL" />
        <SkillList src={checkMarkIcon} skill="MariaDB" />
      </div>
    </section>
  );
}

export default Skills;