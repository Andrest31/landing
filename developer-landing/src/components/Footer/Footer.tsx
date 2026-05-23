import styles from './Footer.module.scss';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span>Владислав Андрест</span>
        <span>Frontend Developer / React / TypeScript</span>
      </div>
    </footer>
  );
}
