import styles from './Footer.module.scss';



export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div>
          <span className={styles.name}>Владислав Андрест</span>
          <span className={styles.role}>Frontend Developer / React / TypeScript</span>
        </div>
      </div>
    </footer>
  );
}
