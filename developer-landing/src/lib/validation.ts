import type { ContactFormErrors, ContactFormValues } from '@/types/contact';

const EMAIL_REGEXP = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEXP = /^[+\d][\d\s()\-.]{6,22}$/;

export function normalizeContactValues(values: ContactFormValues): ContactFormValues {
  return {
    name: values.name.trim(),
    phone: values.phone.trim(),
    email: values.email.trim().toLowerCase(),
    comment: values.comment.trim(),
  };
}

export function validateContactValues(values: ContactFormValues): ContactFormErrors {
  const normalizedValues = normalizeContactValues(values);
  const errors: ContactFormErrors = {};

  if (normalizedValues.name.length < 2) {
    errors.name = 'Укажите имя минимум из 2 символов';
  }

  if (!PHONE_REGEXP.test(normalizedValues.phone)) {
    errors.phone = 'Укажите корректный телефон';
  }

  if (!EMAIL_REGEXP.test(normalizedValues.email)) {
    errors.email = 'Укажите корректный email';
  }

  if (normalizedValues.comment.length < 10) {
    errors.comment = 'Комментарий должен быть не короче 10 символов';
  }

  if (normalizedValues.comment.length > 2000) {
    errors.comment = 'Комментарий должен быть не длиннее 2000 символов';
  }

  return errors;
}

export function hasValidationErrors(errors: ContactFormErrors): boolean {
  return Object.keys(errors).length > 0;
}
