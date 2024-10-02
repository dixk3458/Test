import { FormData } from '../pages/Signin';
import axiosInstance from './axios';
import { ResponseUser } from './signin';

const signup = async (formData: FormData) => {
  const response = await axiosInstance.get('/data/users.json');

  const users = response.data;

  const foundedUser = users.find(
    (user: ResponseUser) =>
      user.email === formData.email && user.password === formData.password
  );

  if (foundedUser) {
    throw new Error('회원가입에 실패했습니다.');
  }

  return true;
};

export default signup;
