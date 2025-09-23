
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
  FileText,
  Calendar
} from 'lucide-react';

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image_url?: string;
  category: string;
  author: string;
  published: boolean;
  created_at: string;
}

const NewsAdmin = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('news_articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
      toast({
        title: "Error",
        description: "Failed to fetch articles",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleEdit = (article: NewsArticle) => {
    setEditingArticle({ ...article });
  };

  const handleSave = async () => {
    if (!editingArticle) return;

    try {
      if (isCreating) {
        const { error } = await supabase
          .from('news_articles')
          .insert({
            title: editingArticle.title,
            excerpt: editingArticle.excerpt,
            content: editingArticle.content,
            image_url: editingArticle.image_url,
            category: editingArticle.category,
            author: editingArticle.author,
            published: editingArticle.published
          });

        if (error) throw error;
        toast({
          title: "Success",
          description: "Article created successfully",
        });
      } else {
        const { error } = await supabase
          .from('news_articles')
          .update({
            title: editingArticle.title,
            excerpt: editingArticle.excerpt,
            content: editingArticle.content,
            image_url: editingArticle.image_url,
            category: editingArticle.category,
            author: editingArticle.author,
            published: editingArticle.published
          })
          .eq('id', editingArticle.id);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Article updated successfully",
        });
      }

      setEditingArticle(null);
      setIsCreating(false);
      fetchArticles();
    } catch (error) {
      console.error('Error saving article:', error);
      toast({
        title: "Error",
        description: "Failed to save article",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('news_articles')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({
        title: "Success",
        description: "Article deleted successfully",
      });
      fetchArticles();
    } catch (error) {
      console.error('Error deleting article:', error);
      toast({
        title: "Error",
        description: "Failed to delete article",
        variant: "destructive",
      });
    }
  };

  const handleCreate = () => {
    setEditingArticle({
      id: '',
      title: '',
      excerpt: '',
      content: '',
      image_url: '',
      category: '',
      author: '',
      published: false,
      created_at: new Date().toISOString()
    });
    setIsCreating(true);
  };

  const handleCancel = () => {
    setEditingArticle(null);
    setIsCreating(false);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-aticom-navy">News Articles</h2>
          <p className="text-gray-600">Manage news and announcements</p>
        </div>
        <Button onClick={handleCreate} className="bg-aticom-blue hover:bg-aticom-blue/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Article
        </Button>
      </div>

      {/* Edit/Create Form */}
      {editingArticle && (
        <Card className="border-aticom-blue">
          <CardHeader>
            <CardTitle>{isCreating ? 'Create New Article' : 'Edit Article'}</CardTitle>
            <CardDescription>
              {isCreating ? 'Add a new news article' : 'Update article content and settings'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={editingArticle.title}
                  onChange={(e) => setEditingArticle({...editingArticle, title: e.target.value})}
                  placeholder="Enter article title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={editingArticle.category}
                  onChange={(e) => setEditingArticle({...editingArticle, category: e.target.value})}
                  placeholder="Enter category"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={editingArticle.excerpt}
                onChange={(e) => setEditingArticle({...editingArticle, excerpt: e.target.value})}
                placeholder="Enter article excerpt"
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={editingArticle.content}
                onChange={(e) => setEditingArticle({...editingArticle, content: e.target.value})}
                placeholder="Enter article content"
                rows={6}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={editingArticle.author}
                  onChange={(e) => setEditingArticle({...editingArticle, author: e.target.value})}
                  placeholder="Enter author name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={editingArticle.image_url || ''}
                  onChange={(e) => setEditingArticle({...editingArticle, image_url: e.target.value})}
                  placeholder="Enter image URL"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="published"
                checked={editingArticle.published}
                onCheckedChange={(checked) => setEditingArticle({...editingArticle, published: checked})}
              />
              <Label htmlFor="published">Published</Label>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-aticom-green hover:bg-aticom-green/90">
                <Save className="h-4 w-4 mr-2" />
                {isCreating ? 'Create Article' : 'Save Changes'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Articles List */}
      <div className="grid gap-4">
        {articles.map((article) => (
          <Card key={article.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold text-aticom-navy">{article.title}</h3>
                    <Badge variant={article.published ? "default" : "secondary"}>
                      {article.published ? "Published" : "Draft"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{article.excerpt}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span className="flex items-center">
                      <FileText className="h-3 w-3 mr-1" />
                      {article.category}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(article.created_at).toLocaleDateString()}
                    </span>
                    <span>By {article.author}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(article)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(article.id)}
                    className="text-red-600 hover:text-red-800 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {articles.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center">
                <FileText className="h-8 w-8 text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">No articles yet</h3>
                <p className="text-gray-600">Create your first news article to get started.</p>
              </div>
              <Button onClick={handleCreate} className="bg-aticom-blue hover:bg-aticom-blue/90">
                <Plus className="h-4 w-4 mr-2" />
                Create First Article
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NewsAdmin;
