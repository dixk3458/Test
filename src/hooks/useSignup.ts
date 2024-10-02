import { useMutation } from '@tanstack/react-query';
import signup from '../apis/signup';
import { useNavigate } from 'react-router-dom';

export default function useSignup() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signup,
    onSuccess: () => {
      alert('회원가입에 성공했습니다.');
      navigate('/signin');
    },
    onError: (error: Error) => {
      alert(error.message);
    },
  });
}
