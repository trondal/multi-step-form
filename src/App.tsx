import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <main>
      <BrowserRouter>
        <div className="min-h-screen w-screen flex items-center justify-center">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </main>
  );
}
export default App;
