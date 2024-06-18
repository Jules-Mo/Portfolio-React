import React, { useEffect } from 'react';
import './App.css';
import Contact from './sections/Contact/Contact';
import Footer from './sections/Footer/Footer';
import Me from './sections/Me/Me';
import Projects from './sections/Projects/Projects';
import Skills from './sections/Skills/Skills';
import { useTheme } from './common/ThemeContext';

function App() {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    document.body.classList.add('theme-transition');
    const timeout = setTimeout(() => {
      document.body.classList.remove('theme-transition');
    }, 300);

    return () => clearTimeout(timeout);
  }, [theme]);

  return (
    <div className={`theme-transition ${theme === 'dark' ? 'dark' : 'light'}`}>
      <Me />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;