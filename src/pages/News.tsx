import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// Removed Layout to avoid double wrapping
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  ArrowRight,
  Eye,
  Share2,
  BookmarkPlus,
  Search,
  Clock,
  User,
  Tag,
  TrendingUp,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const News = () => {
  const [visibleNews, setVisibleNews] = useState(6);
  const [selectedCategory, setSelectedCategory] = useState("All News");
  const [searchTerm, setSearchTerm] = useState("");
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("news_articles")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });
      if (data) setNews(data);
      setLoading(false);
    };

    fetchNews();
  }, []);

  const categories = [
    "All News",
    ...Array.from(new Set(news.map((article) => article.category))),
  ];

  const filteredNews = news.filter((article) => {
    const matchesCategory =
      selectedCategory === "All News" || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Show up to 3 items as featured: hero + secondary grid
  const featuredNews = filteredNews.slice(0, 3);
  const regularNews = filteredNews.slice(3);
  const displayedRegularNews = regularNews.slice(0, visibleNews);

  const handleLoadMore = () => {
    setVisibleNews((prev) => Math.min(prev + 6, regularNews.length));
  };

  const hasMoreToLoad = visibleNews < regularNews.length;

  return (
      <div className="bg-white">
        {/* Hero Section - Matching Team page styling */}
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium text-white/90 mb-4 animate-fade-in">
                📰 LATEST UPDATES
              </div>
              <h1
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent animate-fade-in"
                style={{ animationDelay: "0.1s" }}
              >
                News & Insights
              </h1>
              <p
                className="text-base md:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed animate-fade-in"
                style={{ animationDelay: "0.2s" }}
              >
                Stay informed about our latest achievements, innovations, and
                industry developments
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-12 bg-gradient-to-r from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-6 justify-between items-center">
              <div className="relative w-full lg:w-96">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search news and updates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#417ABD] focus:border-transparent bg-white hover:bg-white transition-all"
                />
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={
                      selectedCategory === category ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={`transition-all duration-300 ${
                      selectedCategory === category
                        ? "bg-[#417ABD] hover:bg-[#417ABD]/90 text-white"
                        : "hover:bg-[#417ABD]/10 hover:text-[#417ABD] hover:border-[#417ABD]"
                    }`}
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Articles */}
        {featuredNews.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <Badge className="mb-3 text-xs px-3 py-1">
                  FEATURED STORIES
                </Badge>
                <h2 className="text-2xl md:text-3xl font-bold text-[#417ABD] mb-3">
                  Latest Headlines
                </h2>
                <p className="text-sm text-gray-600 max-w-3xl mx-auto">
                  Our most significant developments and achievements
                </p>
              </div>

              {/* Hero Featured Article */}
              {featuredNews.length > 0 && (
                <div className="mb-12 animate-scale-in">
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-700 bg-white border-none shadow-lg">
                    <div className="relative">
                      <img
                        src={featuredNews[0].image_url}
                        alt={featuredNews[0].title}
                        className="w-full h-64 lg:h-80 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                      <div className="absolute top-6 left-6 flex gap-2">
                        <Badge className="bg-[#5EB447] text-white shadow-lg">
                          {featuredNews[0].category}
                        </Badge>
                      </div>

                      <div className="absolute bottom-6 left-6 right-6 text-white">
                        <div className="flex items-center text-sm text-white/80 mb-4">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(featuredNews[0].created_at).toLocaleDateString()}
                        </div>

                        <h3 className="text-2xl lg:text-3xl font-bold mb-3 leading-tight">
                          {featuredNews[0].title}
                        </h3>

                        <p className="text-white/90 mb-4 text-base leading-relaxed line-clamp-2">
                          {featuredNews[0].excerpt}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <User className="w-5 h-5 mr-2" />
                            <span className="font-medium">
                              By {featuredNews[0].author}
                            </span>
                          </div>
                          <Button
                            asChild
                            className="bg_WHITE text-[#417ABD] hover:bg-gray-100 px-6 py-3"
                          >
                            <Link to={`/news/${featuredNews[0].id}`}>
                              Read Full Story
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {/* Other Featured Articles Grid */}
              {featuredNews.length > 1 && (
                <div className="grid md:grid-cols-2 gap-8">
                  {featuredNews.slice(1).map((article, index) => (
                    <Card
                      key={article.id}
                      className="group hover:shadow-xl transition-all duration-500 bg-white border-none shadow-lg animate-scale-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={article.image_url}
                          alt={article.title}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                        <div className="absolute top-4 left-4 flex gap-2">
                          <Badge className="bg-[#5EB447] text_WHITE text-white shadow-lg">
                            {article.category}
                          </Badge>
                        </div>

                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <div className="flex items-center text-xs text-white/80 mb-2">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(article.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <CardContent className="p-6">
                        <h3 className="text-lg font-bold text-[#417ABD] mb-3 group-hover:text-[#5EB447] transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-xs text-gray-500">
                            <User className="w-3 h-3 mr-1" />
                            {article.author}
                          </div>
                          <Button
                            asChild
                            variant="ghost"
                            size="sm"
                            className="text-[#417ABD] hover:text-[#5EB447] p-0 group/btn"
                          >
                            <Link to={`/news/${article.id}`}>
                              Read More
                              <ArrowRight className="w-3 h-3 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* All News Articles */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                {filteredNews.length === 0
                  ? "No Results Found"
                  : "All News & Updates"}
              </h2>
              <p className="text-sm text-gray-600">
                {filteredNews.length === 0
                  ? "Try adjusting your search or filter criteria"
                  : "Latest developments from across our business sectors"}
              </p>
            </div>

            {filteredNews.length === 0 ? (
              <div className="text-center py-20 animate-bounce-in">
                <div className="text-6xl mb-6">🔍</div>
                <h3 className="text-2xl font-bold text-gray-700 mb-4">
                  No matching news found
                </h3>
                <p className="text-gray-500 mb-8 text-lg">
                  Try using different keywords or categories
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All News");
                  }}
                  className="border-[#417ABD] text-[#417ABD] hover:bg-[#417ABD] hover:text-white px-8 py-3"
                >
                  Reset Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedRegularNews.map((article, index) => (
                    <Card
                      key={article.id}
                      className="group hover:shadow-xl transition-all duration-300 bg_WHITE border-none shadow-lg animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={article.image_url}
                          alt={article.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                        <div className="absolute top-3 left-3">
                          <Badge
                            variant="secondary"
                            className="bg-white/90 text-[#417ABD] shadow-lg"
                          >
                            {article.category}
                          </Badge>
                        </div>
                      </div>

                      <CardContent className="p-6">
                        <div className="flex items-center justify_between text-xs text-gray-500 mb-3">
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(article.created_at).toLocaleDateString()}
                          </div>
                        </div>

                        <h3 className="text-lg font-bold text-[#417ABD] mb-3 group-hover:text-[#5EB447] transition-colors line-clamp-2">
                          {article.title}
                        </h3>

                        <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                          {article.excerpt}
                        </p>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center text-xs text-gray-500">
                            <User className="w-3 h-3 mr-1" />
                            {article.author}
                          </div>
                          <Button
                            asChild
                            variant="ghost"
                            size="sm"
                            className="text-[#417ABD] hover:text-[#5EB447] p-0 group/btn"
                          >
                            <Link to={`/news/${article.id}`}>
                              Read More
                              <ArrowRight className="w-3 h-3 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {hasMoreToLoad && (
                  <div className="text-center mt-16 animate-fade-in-up">
                    <Button
                      onClick={handleLoadMore}
                      className="bg-[#417ABD] hover:bg-[#417ABD]/90 text-white px-8 py-4 text-lg"
                    >
                      Load More Articles
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* Newsletter Subscription - Matching Team page CTA styling */}
        <section className="py-16 lg:py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx_auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Stay Updated with ATICOM
              </h2>
              <p className="text-base text-white/80 mb-8 leading-relaxed">
                Subscribe to our newsletter to receive the latest news,
                insights, and exclusive updates directly in your inbox. Join
                over 10,000 subscribers worldwide.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto mb-8">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 rounded-xl text-gray-900 border-0 focus:ring-2 focus:ring-white text-lg"
                />
                <Button className="bg-gradient-to-r from-[#417ABD] to-[#5EB447] hover:from-[#5EB447] hover:to-[#417ABD] text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Subscribe Now
                </Button>
              </div>

              <p className="text-white/70 text-sm">
                ✓ Weekly industry insights ✓ Exclusive company updates ✓ No
                spam, unsubscribe anytime
              </p>
            </div>
          </div>
        </section>
      </div>
  );
};

export default News;
