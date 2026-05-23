import styles from './Hero.module.scss';

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.content}>
            <p className={styles.eyebrow}>Frontend / TypeScript / API / AI-assisted workflow</p>

            <h1 className={styles.title}>
              Разрабатываю интерфейсы, которые работают не только красиво,
              <span className="textGradient"> но и по-настоящему.</span>
            </h1>

            <p className={styles.description}>
              Я frontend-разработчик. Собираю React/TypeScript-приложения,
              проектирую пользовательские сценарии, работаю с API, состояниями
              загрузки, ошибками, производительностью и понятной структурой проекта.
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

          <div className={styles.visual} aria-label="Карточка разработчика">
            <div className={styles.visualHeader}>
              <span className={styles.statusDot} />
              <span>available for frontend tasks</span>
            </div>

            <div className={styles.codeCard}>
              <div className={styles.codeLine}>
                <span className={styles.codeKey}>developer</span>
                <span className={styles.codeValue}>Vladislav Andrest</span>
              </div>
              <div className={styles.codeLine}>
                <span className={styles.codeKey}>focus</span>
                <span className={styles.codeValue}>React / TypeScript / API</span>
              </div>
              <div className={styles.codeLine}>
                <span className={styles.codeKey}>workflow</span>
                <span className={styles.codeValue}>task → UI states → API → deploy</span>
              </div>
            </div>

            <div className={styles.metrics}>
              <div>
                <strong>4</strong>
                <span>проекта</span>
              </div>
              <div>
                <strong>100k+</strong>
                <span>записей в UI</span>
              </div>
              <div>
                <strong>AI</strong>
                <span>helper demo</span>
              </div>
            </div>

            <div className={styles.decorOne} />
            <div className={styles.decorTwo} />
          </div>
        </div>
      </div>
    </section>
  );
}
