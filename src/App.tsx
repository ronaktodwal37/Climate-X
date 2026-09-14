import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
// import { HomePage } from '@/pages/HomePage';
// import { AboutPage } from '@/pages/AboutPage';
// import { DashboardPage } from '@/pages/DashboardPage';
// import { DigitalTwinPage } from '@/pages/DigitalTwinPage';
// import { ScenarioSimulatorPage } from '@/pages/ScenarioSimulatorPage';
// import { ClimateRiskPage } from '@/pages/ClimateRiskPage';
// import { AIAdvisorPage } from '@/pages/AIAdvisorPage';
// import { DataSourcesPage } from '@/pages/DataSourcesPage';
// import { ContactPage } from '@/pages/ContactPage';
// import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route element={<Layout />}> */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/digital-twin" element={<DigitalTwinPage />} />
          <Route path="/simulator" element={<ScenarioSimulatorPage />} />
          <Route path="/risk" element={<ClimateRiskPage />} />
          <Route path="/advisor" element={<AIAdvisorPage />} />
          <Route path="/data" element={<DataSourcesPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
