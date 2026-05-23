import Link from 'next/link';
import styles from './not-found.module.scss';

export default function NotFound() {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <p className={styles.code}>404</p>
        <h1>Страница не найдена</h1>
        <p>
          Возможно, ссылка изменилась или раздел был перенесен. Вернитесь на главную
          страницу лендинга и продолжите просмотр проектов.
        </p>
        <Link href="/">Вернуться на главную</Link>
      </section>
    </main>
  );
}
