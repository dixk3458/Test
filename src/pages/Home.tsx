import { useNavigate, useParams } from 'react-router-dom';

export default function HomePage() {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  if (!id) {
    navigate('/signin');
  }

  return (
    <div>
      <h1>Home</h1>
      <p>{`회원번호 : ${id}`}</p>
    </div>
  );
}
