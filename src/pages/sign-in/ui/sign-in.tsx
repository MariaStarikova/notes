import { useNavigate } from 'react-router-dom';
import { Form, type FormField } from '@/shared/ui/form';
import type { ValidationRules } from '@/shared/lib/hooks/useFormValidation';
import { useAuth } from '@/app/auth/context/auth-context';
// import './Signin.scss';

const mockSigninInputs: FormField[] = [
  {
    name: 'email',
    variant: 'filled',
    label: 'Email',
    description: 'Введите email',
    type: 'email',
    placeholder: 'email',
    required: true,
    size: 'md',
    radius: 'md'
  },
  {
    name: 'password',
    variant: 'filled',
    label: 'Password',
    description: 'Введите пароль',
    type: 'password',
    placeholder: 'password',
    required: true,
    size: 'md',
    radius: 'md'
  }
];

const signinValidationRules: ValidationRules = {
  email: {
    required: true,
    email: true
  },
  password: {
    required: true,
    minLength: 6
  }
};

export function Signin() {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSigninSubmit = (data: Record<string, string>) => {
    console.log('Форма входа отправлена! Данные для вхада:', data);

    const user = {
      email: data.email,
      password: data.password
    };

    auth?.signin(user, () => {
      console.log('Пользователь вошёл');
      navigate('/');
    });
  };

  return (
    <div className="signin">
      <Form
        title="Signin form"
        fields={mockSigninInputs}
        validationRules={signinValidationRules}
        onSubmit={handleSigninSubmit}
        submitButtonText="Войти"
        className="signin__form"
      />
    </div>
  );
}
