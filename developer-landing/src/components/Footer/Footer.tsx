import styles from './Footer.module.scss';

const footerLinks = [
  {
    href: 'https://github.com/Andrest31',
    label: 'GitHub',
  },
  {
    href: 'mailto:andrestvlad@gmail.com',
    label: 'Email',
  },
  {
    href: '#projects',
    label: 'Projects',
  },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div>
          <span className={styles.name}>Владислав Андрест</span>
          <span className={styles.role}>Frontend Developer / React / TypeScript</span>
        </div>

        <nav className={styles.links} aria-label="Ссылки в подвале">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
