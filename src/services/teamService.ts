import { supabase } from "@/integrations/supabase/client";

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  department: string;
  bio: string;
  image_url: string | null;
  experience: string | null;
  order_index: number;
  active: boolean;
}

export const getTeamMembers = async (limit?: number): Promise<TeamMember[]> => {
  let query = supabase
    .from('team_members')
    .select('*')
    .eq('active', true)
    .order('order_index');

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching team members:', error);
    throw error;
  }

  return data as TeamMember[];
};

export const getTeamMemberById = async (id: string): Promise<TeamMember | null> => {
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching team member with ID ${id}:`, error);
    throw error;
  }

  return data as TeamMember | null;
};

export const createTeamMember = async (member: Omit<TeamMember, 'id' | 'created_at' | 'updated_at'>): Promise<TeamMember> => {
  const { data, error } = await supabase
    .from('team_members')
    .insert(member)
    .single();

  if (error) {
    console.error('Error creating team member:', error);
    throw error;
  }

  return data as TeamMember;
};

export const updateTeamMember = async (id: string, updates: Partial<TeamMember>): Promise<TeamMember> => {
  const { data, error } = await supabase
    .from('team_members')
    .update(updates)
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error updating team member with ID ${id}:`, error);
    throw error;
  }

  return data as TeamMember;
};

export const deleteTeamMember = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('team_members')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`Error deleting team member with ID ${id}:`, error);
    throw error;
  }
};
