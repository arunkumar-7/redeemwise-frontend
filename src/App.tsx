import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { FlowProvider } from './context/FlowContext';
import { AppLayout } from './components/app/AppLayout';
import LandingPage from './pages/LandingPage';
import SearchPage from './pages/SearchPage';
import PointsPage from './pages/PointsPage';
import ResultsPage from './pages/ResultsPage';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';

/**
 * Phase 2: application routing. The Phase 1 landing page stays intact at `/`;
 * all application routes share FlowProvider + the AppLayout shell.
 */
export default function App() {
  return (
    <BrowserRouter>
      <FlowProvider>
        <Routes>
          {/* Phase 1 marketing site — unchanged composition */}
          <Route path="/" element={<LandingPage />} />

          {/* Application experience — shared shell with step indicator */}
          <Route element={<AppLayout />}>
            <Route path="/search" element={<SearchPage />} />
            <Route path="/points" element={<PointsPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>

          {/* Catch-all 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </FlowProvider>
    </BrowserRouter>
  );
}
