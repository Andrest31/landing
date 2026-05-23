'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { navigationItems } from '@/data/navigation';
import styles from './Header.module.scss';

const extraScrollOffsets: Record<string, number> = {
  about: 60,
  ai: 120,
  contacts: 60,
};

function getSectionScrollTop(section: HTMLElement, sectionId: string) {
  const rootStyles = getComputedStyle(document.documentElement);
  const headerHeight = parseFloat(rootStyles.getPropertyValue('--header-height')) || 76;
  const baseOffset = headerHeight + 24;
  const extraOffset = extraScrollOffsets[sectionId] ?? 0;

  return section.getBoundingClientRect().top + window.scrollY - baseOffset + extraOffset;
}

export function Header() {
  const [activeSection, setActiveSection] = useState(navigationItems[0].id);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = navigationItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: '-18% 0px -62% 0px',
        threshold: [0.1, 0.25, 0.5, 0.75],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleNavigate = (sectionId: string) => {
    const section = document.getElementById(sectionId);

    if (!section) {
      return;
    }

    window.scrollTo({
      top: getSectionScrollTop(section, sectionId),
      behavior: 'smooth',
    });
  };

  return (
    <header className={clsx(styles.header, isScrolled && styles.headerScrolled)}>
      <div className={styles.inner}>
        <button
          className={styles.logo}
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Перейти в начало страницы"
        >
          <span className={styles.logoMark}>A</span>
          <span className={styles.logoText}>Andrest</span>
        </button>

        <nav className={styles.nav} aria-label="Основная навигация">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              className={clsx(
                styles.navItem,
                activeSection === item.id && styles.navItemActive,
              )}
              type="button"
              onClick={() => handleNavigate(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
