
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  TrendingUp,
  GripVertical,
  BarChart3
} from 'lucide-react';

interface CompanyStat {
  id: string;
  label: string;
  value: string;
  icon: string;
  order_index: number;
  active: boolean;
}

const CompanyStatsAdmin = () => {
  const [stats, setStats] = useState<CompanyStat[]>([]);
  const [editingStat, setEditingStat] = useState<CompanyStat | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const iconOptions = [
    'TrendingUp', 'BarChart3', 'Users', 'Building2', 'Globe', 'Target', 
    'Award', 'Star', 'CheckCircle', 'Activity', 'Zap', 'Calendar'
  ];

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase
        .from('company_stats')
        .select('*')
        .order('order_index');

      if (error) throw error;
      setStats(data || []);
    } catch (error) {
      console.error('Error fetching company stats:', error);
      toast({
        title: "Error",
        description: "Failed to fetch company stats",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleEdit = (stat: CompanyStat) => {
    setEditingStat({ ...stat });
  };

  const handleSave = async () => {
    if (!editingStat) return;

    try {
      if (isCreating) {
        const { error } = await supabase
          .from('company_stats')
          .insert({
            label: editingStat.label,
            value: editingStat.value,
            icon: editingStat.icon,
            order_index: stats.length + 1,
            active: editingStat.active
          });

        if (error) throw error;
        toast({
          title: "Success",
          description: "Company stat created successfully",
        });
      } else {
        const { error } = await supabase
          .from('company_stats')
          .update({
            label: editingStat.label,
            value: editingStat.value,
            icon: editingStat.icon,
            active: editingStat.active
          })
          .eq('id', editingStat.id);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Company stat updated successfully",
        });
      }

      setEditingStat(null);
      setIsCreating(false);
      fetchStats();
    } catch (error) {
      console.error('Error saving company stat:', error);
      toast({
        title: "Error",
        description: "Failed to save company stat",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('company_stats')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({
        title: "Success",
        description: "Company stat deleted successfully",
      });
      fetchStats();
    } catch (error) {
      console.error('Error deleting company stat:', error);
      toast({
        title: "Error",
        description: "Failed to delete company stat",
        variant: "destructive",
      });
    }
  };

  const handleCreate = () => {
    setEditingStat({
      id: '',
      label: '',
      value: '',
      icon: 'TrendingUp',
      order_index: stats.length + 1,
      active: true
    });
    setIsCreating(true);
  };

  const handleCancel = () => {
    setEditingStat(null);
    setIsCreating(false);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-aticom-navy">Company Statistics</h2>
          <p className="text-gray-600">Manage homepage statistics and achievements</p>
        </div>
        <Button onClick={handleCreate} className="bg-aticom-blue hover:bg-aticom-blue/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Statistic
        </Button>
      </div>

      {/* Edit/Create Form */}
      {editingStat && (
        <Card className="border-aticom-blue">
          <CardHeader>
            <CardTitle>{isCreating ? 'Create New Statistic' : 'Edit Statistic'}</CardTitle>
            <CardDescription>
              {isCreating ? 'Add a new company statistic' : 'Update statistic information'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="label">Label</Label>
                <Input
                  id="label"
                  value={editingStat.label}
                  onChange={(e) => setEditingStat({...editingStat, label: e.target.value})}
                  placeholder="e.g., Years of Experience"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="value">Value</Label>
                <Input
                  id="value"
                  value={editingStat.value}
                  onChange={(e) => setEditingStat({...editingStat, value: e.target.value})}
                  placeholder="e.g., 15+"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="icon">Icon</Label>
              <select
                id="icon"
                value={editingStat.icon}
                onChange={(e) => setEditingStat({...editingStat, icon: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aticom-blue"
              >
                {iconOptions.map((icon) => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="active"
                checked={editingStat.active}
                onCheckedChange={(checked) => setEditingStat({...editingStat, active: checked})}
              />
              <Label htmlFor="active">Active</Label>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-aticom-green hover:bg-aticom-green/90">
                <Save className="h-4 w-4 mr-2" />
                {isCreating ? 'Create Statistic' : 'Save Changes'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats List */}
      <div className="grid gap-4">
        {stats.map((stat) => (
          <Card key={stat.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <GripVertical className="h-4 w-4 text-gray-400 mr-2" />
                  <div className="w-12 h-12 bg-aticom-blue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-6 w-6 text-aticom-blue" />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-aticom-navy">{stat.label}</h3>
                      <p className="text-2xl font-bold text-aticom-blue">{stat.value}</p>
                      <p className="text-xs text-gray-500">Icon: {stat.icon}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={stat.active ? "default" : "secondary"}>
                        {stat.active ? "Active" : "Inactive"}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(stat)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(stat.id)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {stats.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center">
                <BarChart3 className="h-8 w-8 text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">No statistics yet</h3>
                <p className="text-gray-600">Create your first company statistic to get started.</p>
              </div>
              <Button onClick={handleCreate} className="bg-aticom-blue hover:bg-aticom-blue/90">
                <Plus className="h-4 w-4 mr-2" />
                Create First Statistic
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CompanyStatsAdmin;
