import { Link, useParams } from 'react-router-dom';

export default function Header() {
  const { id } = useParams<{ id: string }>();

  console.log(id);

  return (
    <header>
      <nav>
        <ul>
          {!id ? (
            <>
              <li>
                <Link to={'/signin'}>로그인</Link>
              </li>
              <li>
                <Link to={'/signup'}>회원가입</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <p>{`회원번호 : ${id}`}</p>
              </li>
              <li>
                <button>로그아웃</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
