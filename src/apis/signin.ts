import { FormData } from '../pages/Signin';
import axiosInstance from './axios';

export interface ResponseUser {
  id: string;
  email: string;
  password: string;
}

const signin = async (formData: FormData) => {
  const response = await axiosInstance.get('/data/users.json');

  const users = response.data;

  const user = users.find(
    (user: ResponseUser) =>
      user.email === formData.email && user.password === formData.password
  );

  if (!user) {
    throw new Error('이메일 또는 비밀번호가 잘못되었습니다.');
  }

  return user;
};

export default signin;
