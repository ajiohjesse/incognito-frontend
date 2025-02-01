import { BrowserRouter, Route, Routes } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePage from './pages/homepage';
import Layout from './pages/layout';
import Dashboard from './pages/dashboard';
import Conversation from './pages/conversation';
import Message from './pages/message';

const queryClient = new QueryClient({});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="u/messages" element={<Dashboard />} />

            <Route path=":username" element={<Message />} />
          </Route>
          <Route path="u/messages/:conversationId" element={<Conversation />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
