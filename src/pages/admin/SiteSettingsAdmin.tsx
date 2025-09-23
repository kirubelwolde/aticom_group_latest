import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Save, Settings, Loader } from 'lucide-react';

interface SiteSetting {
  id: string;
  key: string;
  value: string;
  description?: string;
}

const SiteSettingsAdmin = () => {
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .order('key');

      if (error) throw error;
      setSettings(data || []);
    } catch (error) {
      console.error('Error fetching site settings:', error);
      toast({
        title: "Error",
        description: "Failed to fetch site settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      // Update all settings
      for (const setting of settings) {
        const { error } = await supabase
          .from('site_settings')
          .update({ value: setting.value })
          .eq('id', setting.id);

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: "All settings saved successfully",
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = (id: string, value: string) => {
    setSettings(settings.map(setting => 
      setting.id === id ? { ...setting, value } : setting
    ));
  };

  const getSettingsByCategory = () => {
    const categories = {
      company: settings.filter(s => s.key.startsWith('company_')),
      hero: settings.filter(s => s.key.startsWith('hero_')),
      other: settings.filter(s => !s.key.startsWith('company_') && !s.key.startsWith('hero_'))
    };
    return categories;
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  const categorizedSettings = getSettingsByCategory();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-aticom-navy">Site Settings</h2>
          <p className="text-gray-600">Manage global website configuration</p>
        </div>
        <Button 
          onClick={handleSaveAll} 
          disabled={saving}
          className="bg-aticom-green hover:bg-aticom-green/90"
        >
          {saving ? (
            <Loader className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          Save All Changes
        </Button>
      </div>

      {/* Company Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Company Information
          </CardTitle>
          <CardDescription>Basic company details and contact information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {categorizedSettings.company.map((setting) => (
            <div key={setting.id} className="space-y-2">
              <Label htmlFor={setting.key}>
                {setting.key.replace('company_', '').replace('_', ' ').toUpperCase()}
              </Label>
              {setting.key === 'company_description' ? (
                <Textarea
                  id={setting.key}
                  value={setting.value}
                  onChange={(e) => updateSetting(setting.id, e.target.value)}
                  placeholder={setting.description}
                  rows={3}
                />
              ) : (
                <Input
                  id={setting.key}
                  value={setting.value}
                  onChange={(e) => updateSetting(setting.id, e.target.value)}
                  placeholder={setting.description}
                />
              )}
              {setting.description && (
                <p className="text-xs text-gray-500">{setting.description}</p>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Hero Section Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
          <CardDescription>Homepage hero section configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {categorizedSettings.hero.map((setting) => (
            <div key={setting.id} className="space-y-2">
              <Label htmlFor={setting.key}>
                {setting.key.replace('hero_', '').replace('_', ' ').toUpperCase()}
              </Label>
              <Input
                id={setting.key}
                value={setting.value}
                onChange={(e) => updateSetting(setting.id, e.target.value)}
                placeholder={setting.description}
              />
              {setting.description && (
                <p className="text-xs text-gray-500">{setting.description}</p>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Other Settings */}
      {categorizedSettings.other.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Other Settings</CardTitle>
            <CardDescription>Additional site configuration options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {categorizedSettings.other.map((setting) => (
              <div key={setting.id} className="space-y-2">
                <Label htmlFor={setting.key}>
                  {setting.key.replace('_', ' ').toUpperCase()}
                </Label>
                <Input
                  id={setting.key}
                  value={setting.value}
                  onChange={(e) => updateSetting(setting.id, e.target.value)}
                  placeholder={setting.description}
                />
                {setting.description && (
                  <p className="text-xs text-gray-500">{setting.description}</p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {settings.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center">
                <Settings className="h-8 w-8 text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">No settings found</h3>
                <p className="text-gray-600">Site settings will appear here once configured in the database.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Save Button (Bottom) */}
      <div className="flex justify-end">
        <Button 
          onClick={handleSaveAll} 
          disabled={saving}
          className="bg-aticom-green hover:bg-aticom-green/90"
          size="lg"
        >
          {saving ? (
            <Loader className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          Save All Changes
        </Button>
      </div>
    </div>
  );
};

export default SiteSettingsAdmin;
