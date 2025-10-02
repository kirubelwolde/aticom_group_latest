import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

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

export const HeroCardsDebug = () => {
  const [cards, setCards] = useState<HeroCard[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchCards = async () => {
    try {
      const { data, error } = await supabase
        .from('hero_cards')
        .select('*')
        .order('order_index');

      if (error) throw error;
      setCards(data || []);
    } catch (error) {
      console.error('Error fetching cards:', error);
      toast({
        title: "Error",
        description: "Failed to fetch hero cards",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fixDoublePathUrls = async () => {
    try {
      // Fix primary_image
      await supabase.rpc('exec_sql', {
        sql: `
          UPDATE hero_cards 
          SET 
            primary_image = REPLACE(primary_image, '/hero-cards/hero-cards/', '/hero-cards/'),
            secondary_image = REPLACE(secondary_image, '/hero-cards/hero-cards/', '/hero-cards/'),
            tertiary_image = REPLACE(tertiary_image, '/hero-cards/hero-cards/', '/hero-cards/')
          WHERE 
            primary_image LIKE '%/hero-cards/hero-cards/%' 
            OR secondary_image LIKE '%/hero-cards/hero-cards/%' 
            OR tertiary_image LIKE '%/hero-cards/hero-cards/%'
        `
      });

      toast({
        title: "Success",
        description: "Fixed double path URLs in database",
      });
      
      // Refresh the data
      fetchCards();
    } catch (error) {
      console.error('Error fixing URLs:', error);
      toast({
        title: "Error", 
        description: "Failed to fix URLs. Please run the SQL script manually.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Hero Cards Debug - Database URLs</CardTitle>
          <Button onClick={fixDoublePathUrls} variant="outline">
            Fix Double Path URLs
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cards.map((card) => (
              <div key={card.id} className="border p-4 rounded">
                <h3 className="font-bold">{card.title}</h3>
                <p className="text-sm text-gray-600">{card.subtitle}</p>
                <div className="mt-2 space-y-1">
                  <div>
                    <strong>Primary Image:</strong>
                    <div className="text-xs break-all bg-gray-100 p-1 rounded">
                      {card.primary_image}
                    </div>
                    {card.primary_image && (
                      <img 
                        src={card.primary_image} 
                        alt="Primary" 
                        className="w-20 h-20 object-cover mt-1"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.border = '2px solid red';
                        }}
                      />
                    )}
                  </div>
                  {card.secondary_image && (
                    <div>
                      <strong>Secondary Image:</strong>
                      <div className="text-xs break-all bg-gray-100 p-1 rounded">
                        {card.secondary_image}
                      </div>
                    </div>
                  )}
                  {card.tertiary_image && (
                    <div>
                      <strong>Tertiary Image:</strong>
                      <div className="text-xs break-all bg-gray-100 p-1 rounded">
                        {card.tertiary_image}
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-2">
                  <strong>Active:</strong> {card.active ? 'Yes' : 'No'} | 
                  <strong> Order:</strong> {card.order_index}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};


