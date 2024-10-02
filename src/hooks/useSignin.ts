import { useMutation } from '@tanstack/react-query';
import signin, { ResponseUser } from '../apis/signin';
import { useNavigate } from 'react-router-dom';

export default function useSignin() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signin,
    onSuccess: (data: ResponseUser) => {
      alert('로그인에 성공했습니다.');
      navigate(`/home/${data.id}`);
    },
    onError: (error: Error) => {
      alert(error.message); // 이메일 또는 비밀번호를 확인해주세요.
    },
  });
}
