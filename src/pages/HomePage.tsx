import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Package, 
  ShoppingCart, 
  TruckIcon, 
  Users, 
  TrendingUp, 
  TrendingDown,
  AlertCircle,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
  bgColor: string;
  iconColor: string;
}

const StatCard = ({ title, value, icon, trend, trendUp, bgColor, iconColor }: StatCardProps) => (
  <Card className="hover:shadow-lg transition-all duration-200 border-0 overflow-hidden group">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
      <CardTitle className="text-sm font-semibold text-gray-600">{title}</CardTitle>
      <div className={`p-3 rounded-xl ${bgColor} group-hover:scale-110 transition-transform duration-200`}>
        <div className={iconColor}>{icon}</div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold text-gray-900">{value}</div>
      {trend && (
        <div className="flex items-center mt-2">
          {trendUp ? (
            <ArrowUpRight className="w-4 h-4 text-green-600 mr-1" />
          ) : (
            <ArrowDownRight className="w-4 h-4 text-red-600 mr-1" />
          )}
          <p className={`text-sm font-medium ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
            {trend}
          </p>
          <span className="text-sm text-gray-500 ml-1">dari bulan lalu</span>
        </div>
      )}
    </CardContent>
  </Card>
);

export default function HomePage() {
  const { user } = useAuth();

  const getCurrentTime = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Pagi';
    if (hour < 15) return 'Siang';
    if (hour < 18) return 'Sore';
    return 'Malam';
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-2xl p-8 text-white overflow-hidden shadow-xl">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <span className="text-2xl">👋</span>
            </div>
            <div>
              <p className="text-sm text-blue-100 font-medium">Selamat {getCurrentTime()},</p>
              <h1 className="text-3xl font-bold">{user?.fullName || 'User'}</h1>
            </div>
          </div>
          <p className="text-blue-50 text-lg max-w-2xl">
            Selamat datang di Kancra Warehouse Management System. Kelola inventaris dan operasi gudang Anda dengan efisien.
          </p>
          
          {/* Quick Stats */}
          <div className="flex gap-4 mt-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <p className="text-sm text-blue-100">Status Sistem</p>
              <p className="text-lg font-bold flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Aktif
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <p className="text-sm text-blue-100">Last Login</p>
              <p className="text-lg font-bold">
                {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Produk"
          value="1,234"
          icon={<Package className="w-6 h-6" />}
          trend="+12.5%"
          trendUp={true}
          bgColor="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Pesanan Aktif"
          value="85"
          icon={<ShoppingCart className="w-6 h-6" />}
          trend="+8.2%"
          trendUp={true}
          bgColor="bg-green-50"
          iconColor="text-green-600"
        />
        <StatCard
          title="Pengiriman"
          value="156"
          icon={<TruckIcon className="w-6 h-6" />}
          trend="-3.1%"
          trendUp={false}
          bgColor="bg-orange-50"
          iconColor="text-orange-600"
        />
        <StatCard
          title="Pelanggan"
          value="892"
          icon={<Users className="w-6 h-6" />}
          trend="+25.3%"
          trendUp={true}
          bgColor="bg-purple-50"
          iconColor="text-purple-600"
        />
      </div>

      {/* Recent Activities & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card className="border-0 shadow-md">
          <CardHeader className="border-b bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <CardTitle className="text-lg">Aktivitas Terbaru</CardTitle>
              </div>
              <span className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full">Real-time</span>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {[
                { 
                  action: 'Pesanan baru #ORD-2847 diterima', 
                  time: '5 menit yang lalu', 
                  type: 'order',
                  icon: <ShoppingCart className="w-4 h-4" />,
                  color: 'bg-blue-100 text-blue-600'
                },
                { 
                  action: 'Stok produk "Laptop ASUS" diperbarui', 
                  time: '15 menit yang lalu', 
                  type: 'stock',
                  icon: <Package className="w-4 h-4" />,
                  color: 'bg-green-100 text-green-600'
                },
                { 
                  action: 'Pengiriman #SHP-1923 dikonfirmasi', 
                  time: '1 jam yang lalu', 
                  type: 'shipping',
                  icon: <TruckIcon className="w-4 h-4" />,
                  color: 'bg-orange-100 text-orange-600'
                },
                { 
                  action: 'Pelanggan baru "PT Sentosa" terdaftar', 
                  time: '2 jam yang lalu', 
                  type: 'customer',
                  icon: <Users className="w-4 h-4" />,
                  color: 'bg-purple-100 text-purple-600'
                },
              ].map((activity, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0 hover:bg-gray-50 -mx-2 px-2 py-2 rounded-lg transition-colors"
                >
                  <div className={`p-2 rounded-lg ${activity.color}`}>
                    {activity.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{activity.action}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card className="border-0 shadow-md">
          <CardHeader className="border-b bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                <CardTitle className="text-lg">Peringatan & Notifikasi</CardTitle>
              </div>
              <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">4 Baru</span>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {[
                { 
                  message: 'Stok produk "ABC-123" rendah (10 unit tersisa)', 
                  severity: 'error',
                  icon: <XCircle className="w-4 h-4" />,
                  color: 'bg-red-100 text-red-600 border-red-200'
                },
                { 
                  message: '3 pesanan menunggu konfirmasi pembayaran', 
                  severity: 'warning',
                  icon: <AlertTriangle className="w-4 h-4" />,
                  color: 'bg-yellow-100 text-yellow-600 border-yellow-200'
                },
                { 
                  message: 'Pengiriman tertunda untuk 2 pesanan hari ini', 
                  severity: 'warning',
                  icon: <AlertTriangle className="w-4 h-4" />,
                  color: 'bg-orange-100 text-orange-600 border-orange-200'
                },
                { 
                  message: 'Laporan bulanan siap untuk diunduh', 
                  severity: 'success',
                  icon: <CheckCircle2 className="w-4 h-4" />,
                  color: 'bg-green-100 text-green-600 border-green-200'
                },
              ].map((alert, index) => (
                <div 
                  key={index} 
                  className={`flex items-start gap-3 p-3 rounded-lg border ${alert.color} hover:shadow-sm transition-shadow`}
                >
                  <div className="mt-0.5">
                    {alert.icon}
                  </div>
                  <p className="text-sm flex-1 font-medium">{alert.message}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
