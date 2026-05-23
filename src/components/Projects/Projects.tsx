'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { projects } from '@/data/projects';
import type { Project } from '@/types/project';
import { ProjectModal } from './ProjectModal';
import styles from './Projects.module.scss';

function ProjectIcon({ projectId }: { projectId: Project['id'] }) {
  switch (projectId) {
    case 'fin-panel':
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M14 45L26 33L34 39L50 21" />
          <path d="M42 21H50V29" />
          <rect x="12" y="14" width="40" height="36" rx="10" />
        </svg>
      );
    case 'friendly':
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M23 25C23 21.134 19.866 18 16 18C12.134 18 9 21.134 9 25C9 31 16 35 16 35C16 35 23 31 23 25Z" />
          <path d="M55 25C55 21.134 51.866 18 48 18C44.134 18 41 21.134 41 25C41 31 48 35 48 35C48 35 55 31 55 25Z" />
          <path d="M32 50C32 50 18 41.8 18 31.5C18 26.806 21.806 23 26.5 23C29.04 23 31.319 24.113 32.876 25.877C34.433 24.113 36.712 23 39.252 23C43.946 23 47.752 26.806 47.752 31.5C47.752 41.8 32 50 32 50Z" />
        </svg>
      );
    case 'citizen':
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <rect x="12" y="14" width="40" height="36" rx="10" />
          <path d="M22 39V33" />
          <path d="M32 39V25" />
          <path d="M42 39V29" />
          <path d="M20 23H44" />
        </svg>
      );
    case 'lidar':
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M14 46L24 32L32 40L40 28L50 46" />
          <path d="M32 15V24" />
          <path d="M24 18C27 21 37 21 40 18" />
          <path d="M20 12C25 17 39 17 44 12" />
        </svg>
      );
    default:
      return null;
  }
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section className="section" id="projects">
      <div className="container">
        <div className={styles.heading}>
          <h2 className="sectionTitle">
            <span className="sectionTitleAccent">Проекты</span>
          </h2>

          <p className="sectionLead">
            Четыре проекта, через которые видно мой опыт: продуктовая разработка,
            API-интеграции, производительность, сложные интерфейсы и предметная область.
          </p>
        </div>

        <div className={styles.grid}>
          {projects.map((project) => (
            <button
              className={clsx(styles.card, styles[project.accent])}
              key={project.id}
              type="button"
              onClick={() => setSelectedProject(project)}
            >
              <span className={styles.type}>{project.type}</span>

              <span className={styles.iconDecor} aria-hidden="true">
                <ProjectIcon projectId={project.id} />
              </span>

              <div>
                <h3>{project.title}</h3>
                <p className={styles.subtitle}>{project.subtitle}</p>
              </div>

              <p className={styles.description}>{project.description}</p>

              <div className={styles.stack}>
                {project.stack.slice(0, 5).map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>

              <span className={styles.openLabel}>Открыть кейс →</span>
            </button>
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
}
