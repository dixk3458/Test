import '@testing-library/jest-dom';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import renderWithRouter from '../utils/renderWithRouter';
import SignupPage from '../pages/Signup';
import Wrapper from '../utils/Wrapper';
import nock from 'nock';

describe('Signup', () => {
  beforeEach(() => {
    nock.cleanAll(); // 이전 nock 설정을 초기화
  });

  test('회원가입 페이지가 렌더링된다.', () => {
    const { user } = renderWithRouter(
      <Wrapper>
        <SignupPage />
      </Wrapper>
    );

    const emailInput = screen.getByLabelText('이메일');
    const passwordInput = screen.getByLabelText('비밀번호');
    const confirmPasswordInput = screen.getByLabelText('비밀번호 확인');
    const submitButton = screen.getByTestId('submitButton');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('회원가입 성공', async () => {
    // alert를 모킹해서 실제 alert를 띄우는 대신 빈 함수로 대체
    // alert는 호출되지만 브라우저가alert 창을 띄우지 않고, 테스트가 계속 진행될 수 있도록 함
    //실제로 alert가 호출되었는지는 expect(window.alert).toHaveBeenCalledWith('회원가입에 성공했습니다.')와 같은 방법으로 확인할 수 있습니다.

    jest.spyOn(window, 'alert').mockImplementation(() => {});

    // Nock으로 가상 서버를 설정하여, 해당 요청 가로챔 그리고 응답해줌
    nock('http://localhost').get('/data/users.json').reply(200, []);

    // 렌더링하여 환경 설정
    renderWithRouter(
      <Wrapper>
        <SignupPage />
      </Wrapper>
    );

    const emailInput = screen.getByLabelText('이메일');
    const passwordInput = screen.getByLabelText('비밀번호');
    const confirmPasswordInput = screen.getByLabelText('비밀번호 확인');
    const submitButton = screen.getByTestId('submitButton');

    fireEvent.change(emailInput, { target: { value: 'test@naver.com' } });
    fireEvent.change(passwordInput, { target: { value: 'test' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'test' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(nock.isDone()).toBe(true);
    });

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('회원가입에 성공했습니다.');
    });

    // await waitFor(() => {
    //   expect(screen.getByText('로그인 페이지')).toBeInTheDocument();
    // });
  });

  test('회원가입 실패', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    // Nock을 통해 서버가 에러를 반환하도록 설정
    nock('http://localhost')
      .get('/data/users.json')
      .reply(200, [{ id: '3', email: 'test@naver.com', password: 'test' }]);

    // 렌더링하여 환경 설정
    renderWithRouter(
      <Wrapper>
        <SignupPage />
      </Wrapper>
    );

    const emailInput = screen.getByLabelText('이메일');
    const passwordInput = screen.getByLabelText('비밀번호');
    const confirmPasswordInput = screen.getByLabelText('비밀번호 확인');
    const submitButton = screen.getByTestId('submitButton');

    fireEvent.change(emailInput, { target: { value: 'test@naver.com' } });
    fireEvent.change(passwordInput, { target: { value: 'test' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'test' } });

    // 회원가입 시도
    fireEvent.click(submitButton);

    // 서버 요청 확인
    await waitFor(() => {
      expect(nock.isDone()).toBe(true);
    });

    // 실패한 경우에 alert가 호출되었는지 확인
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('회원가입에 실패했습니다.');
    });
  });

  test('로그인 버튼 비활성화', () => {
    renderWithRouter(
      <Wrapper>
        <SignupPage />
      </Wrapper>
    );
    const emailInput = screen.getByLabelText('이메일');
    const passwordInput = screen.getByLabelText('비밀번호');
    const confirmPasswordInput = screen.getByLabelText('비밀번호 확인');
    const submitButton = screen.getByTestId('submitButton');

    fireEvent.change(emailInput, { target: { value: 'test@namver.com' } });
    fireEvent.change(passwordInput, { target: { value: 'test' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'wrongTest' } });

    expect(submitButton).toBeDisabled();
  });
});
