'use client';

import { useEffect } from 'react';
import type { Project } from '@/types/project';
import styles from './Projects.module.scss';

type ProjectModalProps = {
  project: Project;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    document.body.classList.add('modal-open');

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <div className={styles.modalOverlay} role="presentation" onMouseDown={onClose}>
      <article
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${project.id}-title`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className={styles.modalTop}>
          <div>
            <span className={styles.modalType}>{project.type}</span>
            <h3 id={`${project.id}-title`}>{project.title}</h3>
            <p>{project.subtitle}</p>
          </div>

          <button className={styles.closeButton} type="button" onClick={onClose}>
            Закрыть
          </button>
        </div>

        <div className={styles.modalBody}>
          <section className={styles.modalSection}>
            <h4>Предметная область</h4>
            <p>{project.domain}</p>
          </section>

          <section className={styles.modalSection}>
            <h4>Моя роль</h4>
            <p>{project.role}</p>
          </section>

          <section className={styles.modalSection}>
            <h4>Реализация</h4>
            <ul>
              {project.implementation.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className={styles.modalSection}>
            <h4>Интерфейс</h4>
            <div>
              <div className={styles.preview}>
                <div className={styles.previewLabel}>Video / GIF preview placeholder</div>
                <div className={styles.previewGrid}>
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>

              <ul>
                {project.interfaceNotes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className={styles.modalSection}>
            <h4>Результат</h4>
            <ul>
              {project.result.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className={styles.modalSection}>
            <h4>Стек</h4>
            <div className={styles.modalStack}>
              {project.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </section>

          {project.links?.github && (
            <a className={styles.githubLink} href={project.links.github} target="_blank">
              Открыть GitHub
            </a>
          )}
        </div>
      </article>
    </div>
  );
}
