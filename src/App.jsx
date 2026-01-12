import Home from './pages/Home';
import ProtectedRoute from './auth/ProtectedRoute';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import DashboardPaciente from './pages/paciente/DashboardPaciente';
import DashboardMedico from './pages/medico/DashboardMedico';
import DashboardAdmin from './pages/admin/DashboardAdmin';
import AppLayout from './layout/AppLayout';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/paciente"
              element={
                <ProtectedRoute>
                  <DashboardPaciente />
                </ProtectedRoute>
              }
            />

            <Route
              path="/medico"
              element={
                <ProtectedRoute>
                  <DashboardMedico />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <DashboardAdmin />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
