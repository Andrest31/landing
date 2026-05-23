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
              <a href="mailto:andrestvlad@gmail.com">andrestvlad@gmail.com</a>
              <a href="https://github.com/Andrest31" target="_blank">
                GitHub / Andrest31
              </a>
              <span>React / TypeScript / API</span>
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
