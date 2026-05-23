import Image from 'next/image';

import styles from './Hero.module.scss';

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.content}>
            <p className={styles.eyebrow}>Frontend-Engineer / TypeScript / React / LLM-integrations</p>

            <h1 className={styles.title}>
              Разрабатываю  <br/> не только красиво,
              <span className="textGradient"> но и по-настоящему.</span>
            </h1>

            <p className={styles.description}>
              Я frontend-разработчик. Собираю React/TypeScript-приложения,
              проектирую пользовательские сценарии, работаю с API, состояниями
              загрузки, ошибками, производительностью, тестированием и понятной структурой проекта.
            </p>

            <div className={styles.actions}>
              <a href="#projects" className={styles.primaryAction}>
                Смотреть проекты
              </a>
              <a href="#contacts" className={styles.secondaryAction}>
                Написать мне
              </a>
            </div>
          </div>

          <div className={styles.visual} aria-label="Фото разработчика">
            <Image
              className={styles.photo}
              src="/hero-photo.png"
              alt="Фото Владислава Андреста"
              width={620}
              height={748}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
