
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, Calendar, User } from "lucide-react";

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  image_url: string | null;
  category: string;
  author: string;
  created_at: string;
}

interface SectionHeaders {
  title: string;
  subtitle: string;
}

const dummyArticles: NewsArticle[] = [
  {
    id: "1",
    title: "Welcome to ATICOM News!",
  excerpt: "Join us as we proudly celebrate the anniversary of One Company Built—a milestone marking our journey of innovation, growth, and shared success.",
    image_url: null,
    category: "General",
    author: "Admin",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Invite Partners",
    excerpt: "Invite partners to collaborate and grow together with ATICOM.",
    image_url: null,
    category: "Updates",
    author: "Editor",
    created_at: new Date().toISOString(),
  },
];

const NewsSection = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [headers, setHeaders] = useState<SectionHeaders>({
    title: "Latest News & Updates",
    subtitle: "Stay informed about our latest developments and industry insights"
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch latest news articles
        const { data: articlesData, error: articlesError } = await supabase
          .from('news_articles')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false })
          .limit(3);

        if (articlesError) throw articlesError;
        setArticles(articlesData || []);

        // Fetch section headers from site_settings
        const { data: settingsData, error: settingsError } = await supabase
          .from('site_settings')
          .select('key, value')
          .in('key', ['news_section_title', 'news_section_subtitle']);

        if (!settingsError && settingsData) {
          const titleSetting = settingsData.find(s => s.key === 'news_section_title');
          const subtitleSetting = settingsData.find(s => s.key === 'news_section_subtitle');
          
          setHeaders({
            title: titleSetting?.value || "Latest News & Updates",
            subtitle: subtitleSetting?.value || "Stay informed about our latest developments and industry insights"
          });
        }
      } catch (error) {
        console.error('Error fetching news data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="py-12 lg:py-16 bg-gradient-to-br from-white to-aticom-gray/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 lg:py-16 bg-gradient-to-br from-white to-aticom-gray/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-3 bg-gradient-to-r from-aticom-green to-aticom-blue text-white px-3 py-1 text-xs font-semibold animate-fade-in">
            NEWS & INSIGHTS
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold text-aticom-navy mb-3 animate-fade-in">
            {headers.title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto animate-fade-in">
            {headers.subtitle}
          </p>
        </div>
{(articles.length > 0 ? articles : dummyArticles).length > 0 ? (
  <>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
      {(articles.length > 0 ? articles : dummyArticles).map((article, index) => (
        <Card
          key={article.id}
          className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white overflow-hidden animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {article.image_url && (
            <div className="relative h-48 overflow-hidden">
              <img
                src={article.image_url}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-aticom-green text-white text-xs">
                  {article.category}
                </Badge>
              </div>
            </div>
          )}
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-aticom-navy mb-2 group-hover:text-aticom-green transition-colors duration-300">
              {article.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
              {article.excerpt}
            </p>
            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
              <div className="flex items-center space-x-1">
                <User className="w-3 h-3" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(article.created_at)}</span>
              </div>
            </div>
            <Link to={`/news/${article.id}`}>
              <Button variant="outline" className="w-full group-hover:bg-aticom-green group-hover:text-white group-hover:border-aticom-green transition-all duration-300">
                Read More
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
    <div className="text-center">
      <Link to="/news">
        <Button className="bg-gradient-to-r from-aticom-green to-aticom-blue hover:from-aticom-blue hover:to-aticom-green text-white px-6 py-2.5 text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          View All News
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </div>
  </>
) : (
  <div className="text-center py-12">
    <p className="text-gray-600">No news articles available at the moment.</p>
  </div>
)}
      </div>
    </section>
  );
};

export default NewsSection;
