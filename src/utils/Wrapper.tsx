import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './queryClient';

const Wrapper = ({ children }: { children: React.ReactElement }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Wrapper;
