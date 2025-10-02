
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import ImageUpload from '@/components/admin/ImageUpload';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Users,
  Building2
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  department: string;
  bio: string;
  image_url?: string;
  experience?: string;
  order_index: number;
  active: boolean;
}

const TeamAdmin = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  const fetchMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('order_index');

      if (error) throw error;
      setMembers(data || []);
    } catch (error) {
      console.error('Error fetching team members:', error);
      toast({
        title: "Error",
        description: "Failed to fetch team members",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleEdit = (member: TeamMember) => {
    setEditingMember({ ...member });
  };

  const handleSave = async () => {
    if (!editingMember) return;

    try {
      if (isCreating) {
        const { error } = await supabase
          .from('team_members')
          .insert({
            name: editingMember.name,
            position: editingMember.position,
            department: editingMember.department,
            bio: editingMember.bio,
            image_url: editingMember.image_url,
            experience: editingMember.experience,
            order_index: members.length + 1,
            active: editingMember.active
          });

        if (error) throw error;
        toast({
          title: "Success",
          description: "Team member created successfully",
        });
        // Navigate to team page after successful creation
        navigate('/team');
      } else {
        const { error } = await supabase
          .from('team_members')
          .update({
            name: editingMember.name,
            position: editingMember.position,
            department: editingMember.department,
            bio: editingMember.bio,
            image_url: editingMember.image_url,
            experience: editingMember.experience,
            active: editingMember.active
          })
          .eq('id', editingMember.id);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Team member updated successfully",
        });
      }

      setEditingMember(null);
      setIsCreating(false);
      fetchMembers();
    } catch (error) {
      console.error('Error saving team member:', error);
      toast({
        title: "Error",
        description: "Failed to save team member",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({
        title: "Success",
        description: "Team member deleted successfully",
      });
      fetchMembers();
    } catch (error) {
      console.error('Error deleting team member:', error);
      toast({
        title: "Error",
        description: "Failed to delete team member",
        variant: "destructive",
      });
    }
  };

  const handleCreate = () => {
    setEditingMember({
      id: '',
      name: '',
      position: '',
      department: '',
      bio: '',
      image_url: '',
      experience: '',
      order_index: members.length + 1,
      active: true
    });
    setIsCreating(true);
  };

  const handleCancel = () => {
    setEditingMember(null);
    setIsCreating(false);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-aticom-navy">Team Members</h2>
          <p className="text-gray-600">Manage company team and leadership</p>
        </div>
        <Button onClick={handleCreate} className="bg-aticom-blue hover:bg-aticom-blue/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Member
        </Button>
      </div>

      {/* Edit/Create Form */}
      {editingMember && (
        <Card className="border-aticom-blue">
          <CardHeader>
            <CardTitle>{isCreating ? 'Add New Team Member' : 'Edit Team Member'}</CardTitle>
            <CardDescription>
              {isCreating ? 'Add a new team member' : 'Update team member information'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={editingMember.name}
                  onChange={(e) => setEditingMember({...editingMember, name: e.target.value})}
                  placeholder="Enter full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  value={editingMember.position}
                  onChange={(e) => setEditingMember({...editingMember, position: e.target.value})}
                  placeholder="Enter position/title"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={editingMember.department}
                  onChange={(e) => setEditingMember({...editingMember, department: e.target.value})}
                  placeholder="Enter department"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Experience</Label>
                <Input
                  id="experience"
                  value={editingMember.experience || ''}
                  onChange={(e) => setEditingMember({...editingMember, experience: e.target.value})}
                  placeholder="e.g., 15+ Years"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={editingMember.bio}
                onChange={(e) => setEditingMember({...editingMember, bio: e.target.value})}
                placeholder="Enter team member bio"
                rows={4}
              />
            </div>
            <ImageUpload
              label="Profile Image"
              value={editingMember.image_url || ''}
              onChange={(url) => setEditingMember({...editingMember, image_url: url})}
              bucketName="hero-cards"
              placeholder="Upload team member photo"
            />
            <div className="flex items-center space-x-2">
              <Switch
                id="active"
                checked={editingMember.active}
                onCheckedChange={(checked) => setEditingMember({...editingMember, active: checked})}
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
                {isCreating ? 'Add Member' : 'Save Changes'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Members List */}
      <div className="grid gap-4">
        {members.map((member) => (
          <Card key={member.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                {/* Image */}
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {member.image_url ? (
                    <img 
                      src={member.image_url} 
                      alt={member.name}
                      className="w-full h-full object-cover rounded-full"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <Users className={`h-8 w-8 text-gray-400 ${member.image_url ? 'hidden' : ''}`} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-aticom-navy">{member.name}</h3>
                      <p className="text-sm text-aticom-blue">{member.position}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Building2 className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-600">{member.department}</span>
                        {member.experience && (
                          <>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-600">{member.experience}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={member.active ? "default" : "secondary"}>
                        {member.active ? "Active" : "Inactive"}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(member)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(member.id)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">{member.bio}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {members.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center">
                <Users className="h-8 w-8 text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">No team members yet</h3>
                <p className="text-gray-600">Add your first team member to get started.</p>
              </div>
              <Button onClick={handleCreate} className="bg-aticom-blue hover:bg-aticom-blue/90">
                <Plus className="h-4 w-4 mr-2" />
                Add First Member
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TeamAdmin;
