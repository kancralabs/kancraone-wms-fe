import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from '@/components/layout/DashboardLayout';
import LoginPage from '@/pages/LoginPage';
import HomePage from '@/pages/HomePage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<HomePage />} />
            <Route path="products" element={<div className="text-gray-600">Halaman Produk (Coming Soon)</div>} />
            <Route path="orders" element={<div className="text-gray-600">Halaman Pesanan (Coming Soon)</div>} />
            <Route path="shipping" element={<div className="text-gray-600">Halaman Pengiriman (Coming Soon)</div>} />
            <Route path="customers" element={<div className="text-gray-600">Halaman Pelanggan (Coming Soon)</div>} />
            <Route path="reports" element={<div className="text-gray-600">Halaman Laporan (Coming Soon)</div>} />
            <Route path="settings" element={<div className="text-gray-600">Halaman Pengaturan (Coming Soon)</div>} />
          </Route>

          {/* Redirect any unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
