import { FormEvent, useState } from 'react';
import useSignin from '../hooks/useSignin';

export interface FormData {
  email: string;
  password: string;
  confirmPassword?: string;
}

const initialFormData = {
  email: '',
  password: '',
};

export default function SigninPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const { mutate } = useSignin();

  const handleChangeFormData = (type: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [type]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <div>
      <h1>로그인 페이지</h1>
      <form onSubmit={e => handleSubmit(e)}>
        <label htmlFor="email">이메일</label>
        <input
          type="text"
          value={formData.email}
          onChange={e => handleChangeFormData('email', e.target.value)}
        />
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          value={formData.password}
          onChange={e => handleChangeFormData('password', e.target.value)}
        />
        <button>로그인</button>
      </form>
    </div>
  );
}
