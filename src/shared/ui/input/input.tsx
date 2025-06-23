import { useRef, useState } from 'react';
import './input.scss';

interface InputProps {
  name: string;
  variant: 'default' | 'filled' | 'unstyled';
  label: string;
  description: string;
  error?: string;
  type?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  required?: boolean;
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  radius: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  radio?: boolean;
}

export function Input(props: InputProps) {
  const {
    name,
    variant,
    label,
    description,
    error,
    type,
    placeholder,
    icon,
    required,
    size,
    radius,
    radio
  } = props;

  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const isNickField = name === 'nick';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    if (isNickField) {
      if (!newValue.startsWith('@')) {
        newValue = '@' + newValue;
      }
      setValue(newValue);
      e.target.value = newValue;
    } else {
      setValue(newValue);
    }
  };

  const getVariantClass = () => {
    return variant || '';
  };

  const getError = () => {
    return error ? 'error' : '';
  };

  const getPlaceholder = () => {
    if (isNickField) {
      return `@${placeholder || 'nickname'}`;
    }
    return placeholder || 'Input placeholder';
  };

  if (radio) {
    return (
      <div className="input__container">
        <h2 className="input__title">
          {label}
          {required && <span style={{ color: 'red' }}> *</span>}
        </h2>
        <p className="input__description">{description}</p>
        <div className="gender-select">
          <label className={`gender-option ${gender === 'male' ? 'selected' : ''}`}>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={gender === 'male'}
              onChange={() => setGender('male')}
            />
            Мужской
          </label>

          <label className={`gender-option ${gender === 'female' ? 'selected' : ''}`}>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={gender === 'female'}
              onChange={() => setGender('female')}
            />
            Женский
          </label>
        </div>
      </div>
    );
  }

  return (
    <div className="input__container">
      <h2 className="input__title">
        {label}
        {required && <span style={{ color: 'red' }}> *</span>}
      </h2>
      <p className="input__description">{description}</p>
      <div className={`input-wrapper ${isNickField ? 'nick-input' : ''}`}>
        <input
          ref={inputRef}
          className={`input ${getVariantClass()} ${getError()} radius-${radius} size-${size} ${
            isNickField && icon ? 'with-icon' : ''
          }`}
          name={name}
          type={type}
          placeholder={getPlaceholder()}
          onChange={handleInputChange}
          value={value}
        ></input>
      </div>
      {error ? (
        <span className="input__error">{error}</span>
      ) : (
        <span className="input__white">A</span>
      )}
    </div>
  );
}
