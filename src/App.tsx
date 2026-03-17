import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import { Layout } from './components/Layout';
import { Files } from './pages/Files';
import { Users } from './pages/Users';

const queryClient = new QueryClient();

function App() {
  return (
    <main>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <div className="min-h-screen w-screen flex items-center justify-center">
              <Routes>
                <Route path="/files" element={<Files />} />
                <Route path="/users" element={<Users />} />
                <Route path="/" element={<Home />} />
              </Routes>
            </div>
          </Layout>
        </QueryClientProvider>
      </BrowserRouter>
    </main>
  );
}
export default App;
