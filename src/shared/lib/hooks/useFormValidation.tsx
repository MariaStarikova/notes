import { useState } from 'react';

export interface ValidationRules {
  [fieldName: string]: {
    required?: boolean;
    minLength?: number;
    email?: boolean;
    match?: string;
    startsWith?: string;
  };
}

export function useFormValidation(rules: ValidationRules) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (formData: Record<string, string>) => {
    const newErrors: Record<string, string> = {};

    Object.keys(rules).forEach(fieldName => {
      const value = formData[fieldName] || '';
      const fieldRules = rules[fieldName];

      if (fieldRules.required && !value.trim()) {
        newErrors[fieldName] = 'Это поле обязательно';
        return;
      }

      if (!value.trim()) return;

      if (fieldRules.minLength && value.length < fieldRules.minLength) {
        newErrors[fieldName] = `Минимум ${fieldRules.minLength} символов`;
        return;
      }

      if (fieldRules.email && !/\S+@\S+\.\S+/.test(value)) {
        newErrors[fieldName] = 'Некорректный email';
        return;
      }

      if (fieldRules.match && value !== formData[fieldRules.match]) {
        newErrors[fieldName] = 'Пароли не совпадают';
        return;
      }

      if (fieldRules.startsWith && !value.startsWith(fieldRules.startsWith)) {
        newErrors[fieldName] = `Должно начинаться с ${fieldRules.startsWith}`;
        return;
      }
    });

    setErrors(newErrors);
    // return Object.keys(newErrors).length === 0;
    return newErrors;
  };

  const clearErrors = () => setErrors({});

  return {
    errors,
    validateForm,
    clearErrors
  };
}
