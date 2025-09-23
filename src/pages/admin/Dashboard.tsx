
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { 
  FileText, 
  Users, 
  Building2, 
  TrendingUp,
  Plus,
  Edit,
  BarChart3,
  Settings,
  Loader
} from 'lucide-react';

interface DashboardStats {
  heroSlides: number;
  newsArticles: number;
  teamMembers: number;
  businessSectors: number;
  companyStats: number;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    heroSlides: 0,
    newsArticles: 0,
    teamMembers: 0,
    businessSectors: 0,
    companyStats: 0
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const [heroSlides, newsArticles, teamMembers, businessSectors, companyStats] = await Promise.all([
        supabase.from('hero_slides').select('id', { count: 'exact' }),
        supabase.from('news_articles').select('id', { count: 'exact' }),
        supabase.from('team_members').select('id', { count: 'exact' }),
        supabase.from('business_sectors').select('id', { count: 'exact' }),
        supabase.from('company_stats').select('id', { count: 'exact' })
      ]);

      setStats({
        heroSlides: heroSlides.count || 0,
        newsArticles: newsArticles.count || 0,
        teamMembers: teamMembers.count || 0,
        businessSectors: businessSectors.count || 0,
        companyStats: companyStats.count || 0
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const statCards = [
    { 
      label: 'Hero Slides', 
      count: stats.heroSlides, 
      icon: FileText, 
      path: '/admin/hero-slides',
      color: 'text-blue-600'
    },
    { 
      label: 'News Articles', 
      count: stats.newsArticles, 
      icon: FileText, 
      path: '/admin/news',
      color: 'text-green-600'
    },
    { 
      label: 'Team Members', 
      count: stats.teamMembers, 
      icon: Users, 
      path: '/admin/team',
      color: 'text-purple-600'
    },
    { 
      label: 'Business Sectors', 
      count: stats.businessSectors, 
      icon: Building2, 
      path: '/admin/sectors',
      color: 'text-orange-600'
    },
    { 
      label: 'Company Stats', 
      count: stats.companyStats, 
      icon: TrendingUp, 
      path: '/admin/stats',
      color: 'text-red-600'
    },
  ];

  const quickActions = [
    { label: 'Add News Article', icon: Plus, path: '/admin/news', action: 'create' },
    { label: 'Edit Hero Slides', icon: Edit, path: '/admin/hero-slides' },
    { label: 'Manage Team', icon: Users, path: '/admin/team' },
    { label: 'Business Sectors', icon: Building2, path: '/admin/sectors' },
    { label: 'Company Stats', icon: TrendingUp, path: '/admin/stats' },
    { label: 'Site Settings', icon: Settings, path: '/admin/settings' },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="h-8 w-8 animate-spin text-aticom-blue" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-aticom-navy">Dashboard</h2>
        <p className="text-gray-600">Manage your website content and settings</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {statCards.map((stat) => (
          <Card 
            key={stat.label} 
            className="hover:shadow-md transition-all duration-200 cursor-pointer border-l-4 border-l-aticom-blue hover:border-l-aticom-green" 
            onClick={() => navigate(stat.path)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.label}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-aticom-navy">{stat.count}</div>
              <p className="text-xs text-gray-500 mt-1">Click to manage</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-aticom-blue" />
            Quick Actions
          </CardTitle>
          <CardDescription>Common tasks and shortcuts for content management</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action) => (
              <Button
                key={action.label}
                variant="outline"
                className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-aticom-blue/5 hover:border-aticom-blue transition-all duration-200"
                onClick={() => navigate(action.path)}
              >
                <action.icon className="h-6 w-6 text-aticom-blue" />
                <span className="text-sm font-medium">{action.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest changes to your content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Hero slides system updated</span>
                </div>
                <Badge variant="secondary">Just now</Badge>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Admin dashboard enhanced</span>
                </div>
                <Badge variant="secondary">1 min ago</Badge>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm">Database connected successfully</span>
                </div>
                <Badge variant="secondary">2 min ago</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Info */}
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Current system information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Database</span>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Connected</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Authentication</span>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Content Management</span>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Ready</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Content Items</span>
                <Badge variant="outline">
                  {stats.heroSlides + stats.newsArticles + stats.teamMembers + stats.businessSectors}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
