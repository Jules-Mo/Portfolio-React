import React from 'react';
import styles from './ProjectsStyles.module.css';
import Lery from '../../assets/Lery.png';
import Pong from '../../assets/Pong.png';
import ProjectCard from '../../common/ProjectCard';
import { useLanguage } from '../../common/LanguageContext.jsx';

function Projects() {
  const { language } = useLanguage();

  return (
    <section id="projects" className={styles.container}>
      <h1 className="sectionTitle">{language === 'fr' ? 'Mes projets' : 'Projects'}</h1>
      <div className={styles.projectsContainer}>
        <ProjectCard
          src={Lery}
          link="https://lery.cc/"
          h3="Lery Technologies"
          p={language === 'fr' ? 'Formation routière' : 'Road Training'}
        />
        <ProjectCard
          src={Pong}
          link="dossier_pong/index.html"
          h3="Pong"
          p={language === 'fr' ? 'Jeu de Pong' : 'Pong Game'}
        />
      </div>
    </section>
  );
}

export default Projects;