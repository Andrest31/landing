'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { projects } from '@/data/projects';
import type { Project } from '@/types/project';
import { ProjectModal } from './ProjectModal';
import styles from './Projects.module.scss';

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
