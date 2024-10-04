import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

const renderWithRouter = (ui: React.ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test Page', route);

  return {
    user: userEvent.setup(), // 사용자 상호작용 설정
    ...render(<BrowserRouter>{ui}</BrowserRouter>), // BrowserRouter로 감싸서 렌더링
  };
};

export default renderWithRouter;
