import type React from 'react';
import { useFormValidation, type ValidationRules } from '@/shared/lib/hooks/useFormValidation';
import { Input } from '@/shared/ui/input';
import './form.scss';

type InputVariant = 'default' | 'filled' | 'unstyled';
type InputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type InputRadius = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface FormField {
  name: string;
  variant: InputVariant;
  label: string;
  description: string;
  type?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  required?: boolean;
  size: InputSize;
  radius: InputRadius;
  radio?: boolean;
}

interface FormProps {
  title: string;
  fields: FormField[];
  validationRules: ValidationRules;
  onSubmit: (data: Record<string, string>) => void;
  submitButtonText: string;
  className?: string;
}

export function Form({
  title,
  fields,
  validationRules,
  onSubmit,
  submitButtonText,
  className = ''
}: FormProps) {
  const { errors, validateForm } = useFormValidation(validationRules);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData: Record<string, string> = {};

    fields.forEach(field => {
      const input = form.elements.namedItem(field.name) as HTMLInputElement;
      formData[field.name] = input.value.trim();
    });

    const newErrors = validateForm(formData);

    if (Object.keys(newErrors).length === 0) {
      console.log('Форма валидна, отправляем данные');
      onSubmit(formData);
    } else {
      console.log('Форма содержит ошибки:', newErrors);
    }
  };

  const getClassForm = () => {
    if (title === 'Signup form') {
      return 'signup__title';
    } else {
      return '';
    }
  };

  return (
    <form className={`form ${className}`} onSubmit={handleSubmit} noValidate>
      <h1 className={`form__title ${getClassForm()}`}>{title}</h1>
      {fields.map((field, index) => (
        <Input key={index} {...field} error={errors[field.name]} />
      ))}
      <button type="submit" className="form__button">
        {submitButtonText}
      </button>
    </form>
  );
}
