import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import MyMoney from './pages/MyMoney';
import SHG from './pages/SHG';
import LoansCredit from './pages/LoansCredit';
import GovtSchemes from './pages/GovtSchemes';
import LearnEarn from './pages/LearnEarn';
import Settings from './pages/Settings';
import Landing from './pages/Landing/Landing';
import Login from './pages/Login';
import { Toaster } from 'react-hot-toast';
import { useSupabase } from './context/SupabaseContext';
import { Landmark } from 'lucide-react';

const ProtectedRoute = () => {
  const { user, loading } = useSupabase();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '20px'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
            borderRadius: '10px',
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Landmark size={28} color="#ffffff" />
          </div>
          <span style={{ fontSize: '24px', fontWeight: 700, color: '#1e1b4b', letterSpacing: '0.5px' }}>FinSaathi</span>
        </div>
        <p style={{ fontSize: '14px', color: '#64748b', fontWeight: 500 }}>Connecting securely...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Dashboard/App Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="my-money" element={<MyMoney />} />
            <Route path="shg" element={<SHG />} />
            <Route path="loans" element={<LoansCredit />} />
            <Route path="schemes" element={<GovtSchemes />} />
            <Route path="learn" element={<LearnEarn />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
        
        {/* Fallback redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
