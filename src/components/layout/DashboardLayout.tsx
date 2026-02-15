import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { 
  Home, 
  Package, 
  ShoppingCart, 
  TruckIcon, 
  Users, 
  BarChart3, 
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MenuItem {
  name: string;
  icon: React.ReactNode;
  path: string;
}

const menuItems: MenuItem[] = [
  { name: 'Dashboard', icon: <Home className="w-5 h-5" />, path: '/' },
  { name: 'Products', icon: <Package className="w-5 h-5" />, path: '/products' },
  { name: 'Orders', icon: <ShoppingCart className="w-5 h-5" />, path: '/orders' },
  { name: 'Shipping', icon: <TruckIcon className="w-5 h-5" />, path: '/shipping' },
  { name: 'Customers', icon: <Users className="w-5 h-5" />, path: '/customers' },
  { name: 'Reports', icon: <BarChart3 className="w-5 h-5" />, path: '/reports' },
  { name: 'Settings', icon: <Settings className="w-5 h-5" />, path: '/settings' },
];

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleMenuClick = (path: string) => {
    navigate(path);
    setSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-gradient-to-b from-blue-600 to-blue-800 text-white transform transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 ${
          sidebarCollapsed ? 'lg:w-20' : 'lg:w-64'
        } w-64`}
      >
        <div className="flex flex-col h-full">
          {/* Logo & Toggle */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-blue-500">
            <div className={`flex items-center space-x-3 overflow-hidden transition-all duration-300 ${
              sidebarCollapsed ? 'lg:w-0 lg:opacity-0' : 'lg:w-auto lg:opacity-100'
            }`}>
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-xl font-bold whitespace-nowrap">Kancra WMS</span>
            </div>
            
            {/* Mobile close button */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-md hover:bg-blue-700"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Desktop collapse button */}
            <button
              onClick={toggleSidebar}
              className="hidden lg:block p-2 rounded-md hover:bg-blue-700 ml-auto"
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-5 h-5" />
              ) : (
                <ChevronLeft className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleMenuClick(item.path)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors text-left group ${
                  sidebarCollapsed ? 'lg:justify-center' : ''
                }`}
                title={sidebarCollapsed ? item.name : ''}
              >
                <div className="flex-shrink-0">{item.icon}</div>
                <span className={`font-medium transition-all duration-300 ${
                  sidebarCollapsed ? 'lg:w-0 lg:opacity-0 lg:hidden' : 'lg:block'
                }`}>
                  {item.name}
                </span>
              </button>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="px-4 py-4 border-t border-blue-500">
            <Button
              onClick={logout}
              variant="ghost"
              className={`w-full text-white hover:bg-blue-700 hover:text-white ${
                sidebarCollapsed ? 'lg:justify-center lg:px-2' : 'justify-start'
              }`}
              title={sidebarCollapsed ? 'Logout' : ''}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              <span className={`ml-3 transition-all duration-300 ${
                sidebarCollapsed ? 'lg:w-0 lg:opacity-0 lg:hidden' : 'lg:block'
              }`}>
                Logout
              </span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className={`transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
      }`}>
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md hover:bg-gray-100"
              >
                <Menu className="w-6 h-6" />
              </button>

              <div className="hidden md:block">
                <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome back, {user?.fullName || 'User'}</p>
              </div>
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold ring-2 ring-blue-200">
                  {user?.fullName?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-gray-700">{user?.fullName || 'User'}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role || 'Administrator'}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>

              {userMenuOpen && (
                <>
                  {/* Backdrop */}
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setUserMenuOpen(false)}
                  />
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">{user?.fullName}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        navigate('/settings');
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </button>
                    <div className="border-t border-gray-100 mt-1"></div>
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
