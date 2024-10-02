import { FormEvent, useState } from 'react';
import { FormData } from './Signin';
import useSignup from '../hooks/useSignup';

const initialFormData = {
  email: '',
  password: '',
  confirmPassword: '',
};

export default function SignupPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const { mutate } = useSignup();

  const handleChangeFormData = (type: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [type]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <div>
      <h1>회원가입 페이지</h1>
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
        <label htmlFor="confirmPassword">비밀번호 확인</label>
        <input
          type="password"
          value={formData.confirmPassword}
          onChange={e =>
            handleChangeFormData('confirmPassword', e.target.value)
          }
        />
        {formData.password !== formData.confirmPassword && (
          <p>비밀번호가 일치하지 않습니다.</p>
        )}
        <button
          disabled={
            !formData.email || !formData.password || !formData.confirmPassword
          }
        >
          로그인
        </button>
      </form>
    </div>
  );
}
