import styles from './WorkProcess.module.scss';

const steps = [
  {
    title: 'Разбор задачи',
    text: 'Сначала фиксирую цель, пользователя, основной сценарий и ограничения.',
  },
  {
    title: 'UI-состояния',
    text: 'Проектирую не только красивый экран, но и loading, success, error, empty states.',
  },
  {
    title: 'API-контракт',
    text: 'Определяю, какие данные нужны интерфейсу, какие ошибки возможны и как их показать.',
  },
  {
    title: 'Реализация',
    text: 'Собираю компоненты, логику, валидацию, адаптивность и обработку действий.',
  },
  {
    title: 'Проверка',
    text: 'Прохожу сценарии вручную, проверяю edge cases, README и деплой.',
  },
];

export function WorkProcess() {
  return (
    <section className="section" id="process">
      <div className="container">
        <h2 className="sectionTitle">
          <span className="sectionTitleAccent">Как я работаю</span>
        </h2>

        <div className={styles.steps}>
          {steps.map((step, index) => (
            <article className={styles.step} key={step.title}>
              <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
