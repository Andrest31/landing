import styles from './About.module.scss';

const stackGroups = [
  {
    title: 'Frontend',
    items: ['React', 'TypeScript', 'Next.js', 'Redux Toolkit', 'MobX'],
  },
  {
    title: 'UI',
    items: ['SCSS Modules', 'Tailwind', 'Material UI', 'Figma'],
  },
  {
    title: 'API & Data',
    items: ['REST API', 'PostgreSQL', 'JWT', 'Async states'],
  },
  {
    title: 'Tools',
    items: ['Git', 'Docker', 'GitHub Actions', 'Vite', 'Jupyter Notebook'],
  },
];

export function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <h2 className="sectionTitle">
          <span className="sectionTitleAccent">О себе</span>
        </h2>

        <div className={styles.grid}>
          <div>
            <p className="sectionLead">
              Я frontend-разработчик, который делает интерфейсы вокруг реальных
              пользовательских сценариев: формы, фильтры, таблицы, карты,
              дашборды, админки, интеграции с API и состояния ошибок.
            </p>

            <p className={styles.text}>
              Мне важно, чтобы приложение было не только визуально аккуратным,
              но и предсказуемым в работе: с понятной структурой проекта,
              обработкой асинхронных запросов, валидацией данных и нормальным
              пользовательским опытом.
            </p>
          </div>

          <div className={styles.stackGrid}>
            {stackGroups.map((group) => (
              <article className={styles.stackCard} key={group.title}>
                <h3>{group.title}</h3>
                <div className={styles.tags}>
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
