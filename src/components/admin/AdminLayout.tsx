import React from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { useAdminAuth } from './AdminAuth';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  LayoutDashboard, 
  Image, 
  Newspaper, 
  Users, 
  Building2, 
  BarChart3, 
  Settings,
  LogOut,
  Home,
  TreePine,
  Droplets,
  Wheat,
  Coffee,
  Bath,
  Grid3X3,
  Target,
  Heart,
  HandHeart,
  User,
  Loader
} from 'lucide-react';

const AdminLayout = () => {
  const { user, logout, loading } = useAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login', { replace: true });
  };

  const businessSectorPages = [
    // { path: '/admin/real-estate', label: 'Real Estate', icon: Home }, // disabled
    { path: '/admin/avocado-fresh', label: 'ATICADO Fresh', icon: TreePine },
    { path: '/admin/avocado-oil', label: 'ATICADO Oil', icon: Droplets },
    { path: '/admin/cereal-crops', label: 'Cereal Crops', icon: Wheat },
    { path: '/admin/coffee', label: 'Ethiopian Coffee', icon: Coffee },
    { path: '/admin/bathroom-solutions', label: 'Bathroom Solutions', icon: Bath },
    { path: '/admin/ceramic-tiles', label: 'Ceramic Tiles', icon: Grid3X3 },
  ];

  const contentPages = [
    { path: '/admin/vision-mission', label: 'Vision & Mission', icon: Target },
    { path: '/admin/csr', label: 'CSR Content', icon: Heart },
    { path: '/admin/partners', label: 'Partners', icon: HandHeart },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-2 text-aticom-navy">
          <Loader className="h-5 w-5 animate-spin" />
          Loading admin panel...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-aticom-navy">ATICOM Admin</h1>
          {user && (
            <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
              <User className="h-4 w-4" />
              {user.email}
            </div>
          )}
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/admin/dashboard"
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              isActive('/admin/dashboard')
                ? 'bg-aticom-blue text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <LayoutDashboard className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/admin/hero-slides"
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              isActive('/admin/hero-slides')
                ? 'bg-aticom-blue text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Image className="h-4 w-4" />
            <span>Hero Slides</span>
          </Link>

          <Link
            to="/admin/hero-cards"
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              isActive('/admin/hero-cards')
                ? 'bg-aticom-blue text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Grid3X3 className="h-4 w-4" />
            <span>Hero Cards</span>
          </Link>

          <Link
            to="/admin/news"
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              isActive('/admin/news')
                ? 'bg-aticom-blue text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Newspaper className="h-4 w-4" />
            <span>News Articles</span>
          </Link>

          <Link
            to="/admin/team"
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              isActive('/admin/team')
                ? 'bg-aticom-blue text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Team Members</span>
          </Link>

          <Link
            to="/admin/business-sectors"
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              isActive('/admin/business-sectors')
                ? 'bg-aticom-blue text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Building2 className="h-4 w-4" />
            <span>Business Sectors</span>
          </Link>

          <Separator className="my-2" />
          
          <div className="space-y-1">
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Business Content
            </div>
            {businessSectorPages.map((page) => {
              const IconComponent = page.icon;
              return (
                <Link
                  key={page.path}
                  to={page.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive(page.path)
                      ? 'bg-aticom-green text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span className="text-sm">{page.label}</span>
                </Link>
              );
            })}
          </div>

          <Separator className="my-2" />
          
          <div className="space-y-1">
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Page Content
            </div>
            {contentPages.map((page) => {
              const IconComponent = page.icon;
              return (
                <Link
                  key={page.path}
                  to={page.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive(page.path)
                      ? 'bg-aticom-green text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span className="text-sm">{page.label}</span>
                </Link>
              );
            })}
          </div>

          <Separator className="my-2" />

          <Link
            to="/admin/company-stats"
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              isActive('/admin/company-stats')
                ? 'bg-aticom-blue text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <BarChart3 className="h-4 w-4" />
            <span>Company Stats</span>
          </Link>

          <Link
            to="/admin/site-settings"
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              isActive('/admin/site-settings')
                ? 'bg-aticom-blue text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Settings className="h-4 w-4" />
            <span>Site Settings</span>
          </Link>

          <Link
            to="/admin/seo"
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              isActive('/admin/seo')
                ? 'bg-aticom-blue text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Settings className="h-4 w-4" />
            <span>SEO</span>
          </Link>

          <Link
            to="/admin/job-positions"
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              isActive('/admin/job-positions')
                ? 'bg-aticom-blue text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <LayoutDashboard className="h-4 w-4" />
            <span>Job Positions</span>
          </Link>
          <Link
            to="/admin/job-applications"
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              isActive('/admin/job-applications')
                ? 'bg-aticom-blue text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Applications</span>
          </Link>
        </nav>

        <div className="p-4 border-t">
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-800 hover:bg-red-50"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader className="h-4 w-4 mr-2 animate-spin" />
                Logging out...
              </>
            ) : (
              <>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">
              Admin Dashboard
            </h2>
            <div className="text-sm text-gray-500">
              Welcome to ATICOM Admin Panel
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          {!user?.email?.endsWith('@aticom.com') && (
            <Alert className="mb-6 border-amber-200 bg-amber-50">
              <AlertDescription className="text-amber-800">
                Notice: Admin access is restricted to @aticom.com email addresses.
              </AlertDescription>
            </Alert>
          )}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
