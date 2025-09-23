
import React from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  ArrowLeft,
  User,
  Clock,
  Eye,
  Share2,
  BookmarkPlus,
  Tag,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const NewsArticle = () => {
  const { id } = useParams();

  const { data: article, isLoading, error } = useQuery({
    queryKey: ['news-article', id],
    queryFn: async () => {
      if (!id) throw new Error('Article ID is required');
      
      const { data, error } = await supabase
        .from('news_articles')
        .select('*')
        .eq('id', id)
        .eq('published', true)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const { data: relatedArticles } = useQuery({
    queryKey: ['related-articles', article?.category],
    queryFn: async () => {
      if (!article) return [];
      
      const { data, error } = await supabase
        .from('news_articles')
        .select('*')
        .eq('published', true)
        .eq('category', article.category)
        .neq('id', article.id)
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (error) throw error;
      return data;
    },
    enabled: !!article,
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="bg-white">
          <section className="py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <Skeleton className="h-8 w-32 mb-6" />
              <Skeleton className="h-12 w-3/4 mb-4" />
              <Skeleton className="h-6 w-1/2 mb-8" />
              <Skeleton className="aspect-video w-full mb-8 rounded-lg" />
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </section>
        </div>
      </Layout>
    );
  }

  if (error || !article) {
    return (
      <Layout>
        <div className="bg-white min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
            <p className="text-gray-600 mb-8">The article you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/news">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to News
              </Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <Layout>
      <div className="bg-white">
        {/* Article Header */}
        <section className="py-12 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <Button
              asChild
              variant="ghost"
              className="mb-8 text-[#417ABD] hover:text-[#5EB447] hover:bg-[#417ABD]/5"
            >
              <Link to="/news">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to News
              </Link>
            </Button>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Badge className="bg-[#5EB447] text-white">
                {article.category}
              </Badge>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(article.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <User className="w-4 h-4 mr-1" />
                {article.author}
              </div>
            </div>

            {/* Article Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#417ABD] mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Article Excerpt */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {article.excerpt}
            </p>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 mb-8">
              <Button
                onClick={handleShare}
                variant="outline"
                size="sm"
                className="border-[#417ABD] text-[#417ABD] hover:bg-[#417ABD] hover:text-white"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-[#5EB447] text-[#5EB447] hover:bg-[#5EB447] hover:text-white"
              >
                <BookmarkPlus className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </section>

        {/* Article Image */}
        {article.image_url && (
          <section className="py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="w-full h-64 md:h-96 lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
            </div>
          </section>
        )}

        {/* Article Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <div 
                className="text-gray-700 leading-relaxed"
                style={{ whiteSpace: 'pre-wrap' }}
              >
                {article.content}
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        {relatedArticles && relatedArticles.length > 0 && (
          <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-[#417ABD] mb-4">
                  Related Articles
                </h2>
                <p className="text-gray-600">
                  More stories from the {article.category} category
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {relatedArticles.map((relatedArticle) => (
                  <Card
                    key={relatedArticle.id}
                    className="group hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="relative overflow-hidden">
                      {relatedArticle.image_url ? (
                        <img
                          src={relatedArticle.image_url}
                          alt={relatedArticle.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gradient-to-br from-[#417ABD]/10 to-[#5EB447]/10 flex items-center justify-center">
                          <span className="text-[#417ABD] text-sm">ATICOM News</span>
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-[#5EB447] text-white text-xs">
                          {relatedArticle.category}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold text-[#417ABD] mb-3 group-hover:text-[#5EB447] transition-colors line-clamp-2">
                        {relatedArticle.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {relatedArticle.excerpt}
                      </p>
                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="text-[#417ABD] hover:text-[#5EB447] p-0 h-auto"
                      >
                        <Link to={`/news/${relatedArticle.id}`}>
                          Read More →
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Newsletter CTA */}
        <section className="py-16 bg-gradient-to-r from-[#417ABD] to-[#5EB447] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Stay Updated with ATICOM News
            </h2>
            <p className="text-white/90 mb-8 text-lg">
              Subscribe to our newsletter for the latest updates and industry insights
            </p>
            <Button
              size="lg"
              className="bg-white text-[#417ABD] hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
            >
              Subscribe Now
            </Button>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default NewsArticle;
