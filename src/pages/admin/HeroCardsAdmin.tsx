import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import ImageUpload from '@/components/admin/ImageUpload';
import { 
  Edit, 
  Save, 
  X, 
  Plus,
  Trash2,
  GripVertical,
  Image as ImageIcon,
  AlertCircle
} from 'lucide-react';

interface HeroCard {
  id: string;
  title: string;
  subtitle: string;
  route: string;
  primary_image: string;
  secondary_image?: string;
  tertiary_image?: string;
  gradient_from: string;
  gradient_to: string;
  order_index: number;
  active: boolean;
}

const HeroCardsAdmin = () => {
  const [cards, setCards] = useState<HeroCard[]>([]);
  const [editingCard, setEditingCard] = useState<HeroCard | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);

  
  const fetchCards = async () => {
    try {
      const { data, error } = await supabase
        .from('hero_cards')
        .select('*')
        .order('order_index');

      if (error) throw error;
      setCards(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch hero cards",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  useEffect(() => {
    const checkAdmin = async () => {
      setAuthLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (session) {
        // Assuming you have a 'profiles' table with a 'role' column
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          setIsAdmin(false);
        } else if (profile?.role === 'admin') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      setAuthLoading(false);
    };

    checkAdmin();
  }, []);

  const handleSave = async (card: HeroCard) => {
    try {
      const { error } = await supabase
        .from('hero_cards')
        .update({
          title: card.title,
          subtitle: card.subtitle,
          route: card.route,
          primary_image: card.primary_image,
          secondary_image: card.secondary_image,
          tertiary_image: card.tertiary_image,
          gradient_from: card.gradient_from,
          gradient_to: card.gradient_to,
          order_index: card.order_index,
          active: card.active,
        })
        .eq('id', card.id);

      if (error) throw error;

      setCards(cards.map(c => c.id === card.id ? card : c));
      setEditingCard(null);
      
      toast({
        title: "Success",
        description: "Hero card updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update hero card",
        variant: "destructive",
      });
    }
  };

  const handleCreate = async (card: Omit<HeroCard, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('hero_cards')
        .insert([card])
        .select()
        .single();

      if (error) throw error;

      setCards([...cards, data]);
      setIsCreating(false);
      
      toast({
        title: "Success",
        description: "Hero card created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create hero card",
        variant: "destructive",
      });
    }
  };

  const deleteImageFromStorage = async (imageUrl: string) => {
    if (!imageUrl || !imageUrl.includes('hero-cards')) return;
    
    try {
      // Extract the file path from the URL
      const urlParts = imageUrl.split('/hero-cards/');
      if (urlParts.length < 2) return;
      
      const filePath = `hero-cards/${urlParts[1]}`;
      await supabase.storage.from('hero-cards').remove([filePath]);
    } catch (error) {
      console.warn('Failed to delete image from storage:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this hero card?')) return;

    try {
      // Get the card to delete its images
      const cardToDelete = cards.find(c => c.id === id);
      
      const { error } = await supabase
        .from('hero_cards')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Clean up images from storage
      if (cardToDelete) {
        await Promise.all([
          deleteImageFromStorage(cardToDelete.primary_image),
          cardToDelete.secondary_image && deleteImageFromStorage(cardToDelete.secondary_image),
          cardToDelete.tertiary_image && deleteImageFromStorage(cardToDelete.tertiary_image),
        ].filter(Boolean));
      }

      setCards(cards.filter(c => c.id !== id));
      
      toast({
        title: "Success",
        description: "Hero card deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete hero card",
        variant: "destructive",
      });
    }
  };

  const CardForm = ({ card, onSave, onCancel, isNew = false }: {
    card: HeroCard | Omit<HeroCard, 'id'>;
    onSave: (card: any) => void;
    onCancel: () => void;
    isNew?: boolean;
  }) => {
    const [formData, setFormData] = useState(card);

    return (
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>{isNew ? 'Create New Hero Card' : 'Edit Hero Card'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Card title"
              />
            </div>
            <div>
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="Card subtitle"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="route">Route</Label>
              <Input
                id="route"
                value={formData.route}
                onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                placeholder="/route-path"
              />
            </div>
            <div>
              <Label htmlFor="order_index">Order</Label>
              <Input
                id="order_index"
                type="number"
                value={formData.order_index}
                onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
                placeholder="1"
              />
            </div>
          </div>

          <ImageUpload
            label="Primary Image"
            value={formData.primary_image}
            onChange={(url) => setFormData({ ...formData, primary_image: url })}
            required
          />

          <ImageUpload
            label="Secondary Image (Optional)"
            value={formData.secondary_image || ''}
            onChange={(url) => setFormData({ ...formData, secondary_image: url })}
          />

          <ImageUpload
            label="Tertiary Image (Optional)"
            value={formData.tertiary_image || ''}
            onChange={(url) => setFormData({ ...formData, tertiary_image: url })}
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="gradient_from">Gradient From</Label>
              <Input
                id="gradient_from"
                value={formData.gradient_from}
                onChange={(e) => setFormData({ ...formData, gradient_from: e.target.value })}
                placeholder="blue-900/20"
              />
            </div>
            <div>
              <Label htmlFor="gradient_to">Gradient To</Label>
              <Input
                id="gradient_to"
                value={formData.gradient_to}
                onChange={(e) => setFormData({ ...formData, gradient_to: e.target.value })}
                placeholder="blue-800/10"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="active"
              checked={formData.active}
              onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
            />
            <Label htmlFor="active">Active</Label>
          </div>

          <div className="flex space-x-2">
            <Button onClick={() => onSave(formData)}>
              <Save className="w-4 h-4 mr-2" />
              {isNew ? 'Create' : 'Save'}
            </Button>
            <Button variant="outline" onClick={onCancel}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return <div className="p-6">Loading hero cards...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Hero Cards Management</h1>
          <p className="text-gray-600">Manage the hero section cards displayed on the homepage</p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Card
        </Button>
      </div>

      {isCreating && (
        <CardForm
          card={{
            title: '',
            subtitle: '',
            route: '',
            primary_image: '',
            secondary_image: '',
            tertiary_image: '',
            gradient_from: 'blue-900/20',
            gradient_to: 'blue-800/10',
            order_index: cards.length + 1,
            active: true,
          }}
          onSave={handleCreate}
          onCancel={() => setIsCreating(false)}
          isNew
        />
      )}

      <div className="grid gap-4">
        {cards.map((card) => (
          <div key={card.id}>
            {editingCard?.id === card.id ? (
              <CardForm
                card={editingCard}
                onSave={handleSave}
                onCancel={() => setEditingCard(null)}
              />
            ) : (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <GripVertical className="w-5 h-5 text-gray-400" />
                      <div>
                        <CardTitle>{card.title}</CardTitle>
                        <CardDescription>{card.subtitle}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={card.active ? "default" : "secondary"}>
                        {card.active ? "Active" : "Inactive"}
                      </Badge>
                      <Badge variant="outline">Order: {card.order_index}</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingCard(card)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(card.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Image Previews */}
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Image Previews</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {card.primary_image && (
                          <div className="relative group">
                            <img
                              src={card.primary_image}
                              alt="Primary"
                              className="w-full h-20 object-cover rounded border"
                            />
                            <div className="absolute bottom-1 left-1 bg-green-500 text-white text-xs px-1 rounded">
                              Primary
                            </div>
                          </div>
                        )}
                        {card.secondary_image && (
                          <div className="relative group">
                            <img
                              src={card.secondary_image}
                              alt="Secondary"
                              className="w-full h-20 object-cover rounded border"
                            />
                            <div className="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-1 rounded">
                              Secondary
                            </div>
                          </div>
                        )}
                        {card.tertiary_image && (
                          <div className="relative group">
                            <img
                              src={card.tertiary_image}
                              alt="Tertiary"
                              className="w-full h-20 object-cover rounded border"
                            />
                            <div className="absolute bottom-1 left-1 bg-purple-500 text-white text-xs px-1 rounded">
                              Tertiary
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Details */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Route</Label>
                        <p className="text-sm text-gray-600">{card.route}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Gradient</Label>
                        <p className="text-sm text-gray-600">{card.gradient_from} → {card.gradient_to}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ))}
      </div>

      {cards.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hero cards found</h3>
            <p className="text-gray-600 text-center">
              Create your first hero card to get started with the homepage showcase.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HeroCardsAdmin;
