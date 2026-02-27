import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { Layout } from './components/Layout';

function App() {
  return (
    <main>
      <BrowserRouter>
        <Layout>
          <div className="min-h-screen w-screen flex items-center justify-center">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </Layout>
      </BrowserRouter>
    </main>
  );
}
export default App;
