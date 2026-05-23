'use client';

import { FormEvent, useState } from 'react';
import type {
  ContactApiResponse,
  ContactFormErrors,
  ContactFormValues,
} from '@/types/contact';
import {
  hasValidationErrors,
  normalizeContactValues,
  validateContactValues,
} from '@/lib/validation';
import styles from './ContactForm.module.scss';

const initialValues: ContactFormValues = {
  name: '',
  phone: '',
  email: '',
  comment: '',
};

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

type ContactItem = {
  href: string;
  label: string;
  icon: 'email' | 'github' | 'telegram';
  isExternal?: boolean;
};

const contactItems: ContactItem[] = [
  {
    href: 'mailto:andrestvlad@gmail.com',
    label: 'andrestvlad@gmail.com',
    icon: 'email',
  },
  {
    href: 'https://github.com/Andrest31',
    label: 'Andrest31',
    icon: 'github',
    isExternal: true,
  },
  {
    href: 'https://t.me/HochuChipsov31',
    label: '@HochuChipsov31',
    icon: 'telegram',
    isExternal: true,
  },
];

function ContactIcon({ icon }: { icon: ContactItem['icon'] }) {
  switch (icon) {
    case 'email':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4.75 6.75H19.25V17.25H4.75V6.75Z" />
          <path d="M5.25 7.25L12 12.75L18.75 7.25" />
        </svg>
      );
    case 'github':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9.25 19.25C5.75 18.2 3.5 15.35 3.5 11.85C3.5 7.35 7.22 3.75 12 3.75C16.78 3.75 20.5 7.35 20.5 11.85C20.5 15.35 18.25 18.2 14.75 19.25" />
          <path d="M9.5 18.75V16.75C9.5 15.95 9.95 15.45 10.45 15.2C8.65 14.85 6.95 13.95 6.95 11.45C6.95 10.4 7.35 9.55 8 8.9C7.9 8.55 7.65 7.55 8.15 6.35C8.15 6.35 9.1 6.1 10.45 7.15C10.95 7 11.48 6.92 12 6.92C12.52 6.92 13.05 7 13.55 7.15C14.9 6.1 15.85 6.35 15.85 6.35C16.35 7.55 16.1 8.55 16 8.9C16.65 9.55 17.05 10.4 17.05 11.45C17.05 13.95 15.35 14.85 13.55 15.2C14.05 15.45 14.5 15.95 14.5 16.75V18.75" />
          <path d="M9.5 17.25C7.85 17.75 6.6 17.25 5.9 15.75" />
        </svg>
      );
    case 'telegram':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.25 4.75L3.75 11.25L10.25 13.5L16.75 8.5L12.25 15.25L18.25 19.25L20.25 4.75Z" />
          <path d="M10.25 13.5L11.25 18L12.25 15.25" />
        </svg>
      );
    default:
      return null;
  }
}

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [message, setMessage] = useState('');

  const isLoading = status === 'loading';

  const handleChange = (field: keyof ContactFormValues, value: string) => {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [field]: undefined,
      }));
    }

    if (status !== 'idle') {
      setStatus('idle');
      setMessage('');
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedValues = normalizeContactValues(values);
    const validationErrors = validateContactValues(normalizedValues);

    setErrors(validationErrors);

    if (hasValidationErrors(validationErrors)) {
      setStatus('error');
      setMessage('Проверьте поля формы перед отправкой.');
      return;
    }

    try {
      setStatus('loading');
      setMessage('');

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(normalizedValues),
      });

      const data = (await response.json()) as ContactApiResponse;

      if (!response.ok || !data.ok) {
        setStatus('error');
        setErrors(data.ok ? {} : data.errors ?? {});
        setMessage(data.ok ? 'Не удалось отправить сообщение.' : data.message);
        return;
      }

      setStatus('success');
      setValues(initialValues);
      setMessage(data.message);
    } catch {
      setStatus('error');
      setMessage('Сеть недоступна или сервер не отвечает. Попробуйте позже.');
    }
  };

  return (
    <section className="section" id="contacts">
      <div className="container">
        <div className={styles.grid}>
          <div>
            <h2 className="sectionTitle">
              <span className="sectionTitleAccent">Контакты</span>
            </h2>

            <p className="sectionLead">
              Форма отправляет сообщение владельцу сайта и копию пользователю.
              На клиенте и сервере есть валидация, а интерфейс показывает
              loading, success и error состояния.
            </p>

            <div className={styles.contactCards}>
              {contactItems.map((contact) => (
                <a
                  key={contact.href}
                  href={contact.href}
                  target={contact.isExternal ? '_blank' : undefined}
                  rel={contact.isExternal ? 'noreferrer' : undefined}
                >
                  <span className={styles.contactIcon}>
                    <ContactIcon icon={contact.icon} />
                  </span>
                  <span>{contact.label}</span>
                </a>
              ))}
            </div>
          </div>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.field}>
              <label htmlFor="name">Имя</label>
              <input
                id="name"
                name="name"
                value={values.name}
                onChange={(event) => handleChange('name', event.target.value)}
                placeholder="Как к вам обращаться"
                disabled={isLoading}
                aria-invalid={Boolean(errors.name)}
              />
              {errors.name && <span className={styles.fieldError}>{errors.name}</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="phone">Телефон</label>
              <input
                id="phone"
                name="phone"
                value={values.phone}
                onChange={(event) => handleChange('phone', event.target.value)}
                placeholder="+7 999 000-00-00"
                disabled={isLoading}
                aria-invalid={Boolean(errors.phone)}
              />
              {errors.phone && <span className={styles.fieldError}>{errors.phone}</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                value={values.email}
                onChange={(event) => handleChange('email', event.target.value)}
                placeholder="name@example.com"
                type="email"
                disabled={isLoading}
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="comment">Комментарий</label>
              <textarea
                id="comment"
                name="comment"
                value={values.comment}
                onChange={(event) => handleChange('comment', event.target.value)}
                placeholder="Коротко опишите задачу или вопрос"
                rows={5}
                disabled={isLoading}
                aria-invalid={Boolean(errors.comment)}
              />
              {errors.comment && <span className={styles.fieldError}>{errors.comment}</span>}
            </div>

            {message && (
              <p className={status === 'success' ? styles.successMessage : styles.errorMessage}>
                {message}
              </p>
            )}

            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Отправляем...' : 'Отправить сообщение'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
