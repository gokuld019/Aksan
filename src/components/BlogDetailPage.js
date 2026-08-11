'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getBlogBySlug } from '@/components/blogService';
import { ArrowLeft, ArrowRight, Calendar, Clock, User, Tag, Share2, Bookmark, ChevronRight, FileText, TrendingUp, Award, Building2, BarChart3, Users, Sparkles, Target, Rocket, Briefcase, Star, Shield, Zap, Globe, Layers, PieChart, LineChart, Banknote, Handshake, Lightbulb, CheckCircle2, ArrowUpRight, MoveRight } from 'lucide-react';

function stripHtml(html = '') {
  return html.replace(/<[^>]*>/g, '');
}

function readTime(content = '') {
  const words = stripHtml(content).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

// TEMP: manual banner mapping until backend supports featured_image upload
const BANNER_MAP = {
  'sme-ipo-vs-mainboard-ipo-which-one-fits-your-business': '/blog/bb1.png',
  'common-financial-challenges-faced-by-smes-and-how-to-overcome-them': '/blog/bb2.png',
  'what-is-an-sme-ipo-everything-you-need-to-know-1786428769': '/blog/b3.png',
};

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isShared, setIsShared] = useState(false);

  useEffect(() => {
    if (!slug) return;
    getBlogBySlug(slug)
      .then((res) => {
        if (res.success) {
          setBlog(res.data);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog?.title,
        text: blog?.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setIsShared(true);
      setTimeout(() => setIsShared(false), 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 border-3 border-[#0b1a3a]/10 border-t-orange-500 rounded-full animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            </div>
          </div>
          <p className="text-xs text-gray-400 tracking-wider font-medium">LOADING ARTICLE...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-6 px-4">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
          <FileText className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-sm text-gray-500">Blog not found.</p>
        <Link
          href="/BlogsPage"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-[#0b1a3a] hover:text-orange-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Blogs
        </Link>
      </div>
    );
  }

  const tag = blog.meta_data?.tags?.[0] || 'Insight';
  const authorName = blog.creator?.name || blog.author || 'Admin';
  const dateSource = blog.published_at || blog.created_at;
  const banner = blog.featured_image || BANNER_MAP[blog.slug] || null;
  const readingTime = readTime(blog.content);

  // Extract key insights from content (simplified)
  const keyInsights = [
    { icon: TrendingUp, label: 'Market Analysis', color: 'text-blue-500' },
    { icon: Award, label: 'Industry Recognition', color: 'text-orange-500' },
    { icon: Building2, label: 'Corporate Strategy', color: 'text-purple-500' },
    { icon: BarChart3, label: 'Growth Metrics', color: 'text-green-500' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Reduced Banner Height */}
      <div className="relative bg-gradient-to-br from-[#0b1a3a] via-[#0f2044] to-[#0b1a3a] overflow-hidden pt-20 pb-14 sm:pt-24 sm:pb-16">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4" />
          <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        </div>

        {banner && (
          <div className="absolute inset-0">
            <img
              src={banner}
              alt=""
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b1a3a] via-[#0b1a3a]/80 to-[#0b1a3a]/50" />
          </div>
        )}

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
          {/* Breadcrumb */}
          {/* <div className="flex items-center gap-2 text-xs text-white/50 mb-4">
            <Link href="/" className="hover:text-orange-400 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/BlogsPage" className="hover:text-orange-400 transition-colors">Blogs</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/70 truncate max-w-[200px]">{blog.title}</span>
          </div> */}

          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="inline-flex items-center gap-1.5 bg-orange-500/20 backdrop-blur-sm text-orange-400 font-semibold text-[10px] sm:text-xs tracking-wider uppercase px-3 py-1.5 rounded-full border border-orange-500/30">
              <Sparkles className="w-3 h-3" />
              {tag}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/5 backdrop-blur-sm text-white/60 font-medium text-[10px] sm:text-xs px-3 py-1.5 rounded-full border border-white/10">
              <Clock className="w-3 h-3" />
              {readingTime} min read
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-[1.15] mb-4 max-w-4xl">
            {blog.title}
          </h1>

          <div className="w-14 h-1 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full mb-5" />

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-slate-300">
            {/* <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-orange-500/25">
                {authorName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-white font-medium text-sm">{authorName}</p>
                <p className="text-white/40 text-[10px] tracking-wider">AUTHOR</p>
              </div>
            </div> */}
            <div className="hidden sm:block w-px h-8 bg-white/10" />
            <div className="flex items-center gap-2 text-white/50">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">
                {dateSource
                  ? new Date(dateSource).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })
                  : ''}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <button
              onClick={handleShare}
              className="group inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/10 transition-all hover:scale-105"
            >
              <Share2 className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
              {isShared ? 'Copied!' : 'Share'}
            </button>
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="group inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/10 transition-all hover:scale-105"
            >
              <Bookmark className={`w-3.5 h-3.5 transition-colors ${isBookmarked ? 'fill-orange-500 text-orange-500' : ''}`} />
              {isBookmarked ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Description */}
            {blog.description && (
              <div className="mb-10 pb-10 border-b border-gray-200">
                <p className="text-base sm:text-lg text-gray-600 font-medium leading-relaxed">
                  {blog.description}
                </p>
              </div>
            )}

            {/* Content with enhanced styling */}
            <div
              className="max-w-none text-sm sm:text-base
                [&_*]:text-gray-600
                [&_h1]:text-[#0b1a3a] [&_h2]:text-[#0b1a3a] [&_h3]:text-[#0b1a3a] [&_h4]:text-[#0b1a3a]
                [&_h1]:font-bold [&_h2]:font-bold [&_h3]:font-bold [&_h4]:font-bold
                [&_h1]:text-2xl sm:[&_h1]:text-3xl [&_h2]:text-xl sm:[&_h2]:text-2xl [&_h3]:text-lg sm:[&_h3]:text-xl [&_h4]:text-base sm:[&_h4]:text-lg
                [&_h1]:mt-10 [&_h2]:mt-10 [&_h3]:mt-8 [&_h4]:mt-6
                [&_h1]:mb-5 [&_h2]:mb-5 [&_h3]:mb-4 [&_h4]:mb-3
                [&_h1]:leading-tight [&_h2]:leading-tight [&_h3]:leading-tight
                [&_h1]:relative [&_h1]:pl-4 [&_h1]:border-l-4 [&_h1]:border-orange-500
                [&_h2]:relative [&_h2]:pl-4 [&_h2]:border-l-4 [&_h2]:border-orange-400/60
                [&_p]:text-sm sm:[&_p]:text-base [&_p]:text-gray-600 [&_p]:leading-[1.9] [&_p]:mb-5
                [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-5 [&_ul]:text-sm sm:[&_ul]:text-base [&_ul]:text-gray-600
                [&_ul]:space-y-2
                [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-5 [&_ol]:text-sm sm:[&_ol]:text-base [&_ol]:text-gray-600
                [&_ol]:space-y-2
                [&_li]:text-sm sm:[&_li]:text-base [&_li]:text-gray-600 [&_li]:mb-1
                [&_li::marker]:text-orange-500
                [&_strong]:text-[#0b1a3a] [&_strong]:font-semibold
                [&_em]:text-gray-600
                [&_a]:text-orange-500 [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-orange-600
                [&_img]:rounded-xl [&_img]:my-8 [&_img]:shadow-lg [&_img]:w-full [&_img]:h-auto
                [&_table]:w-full [&_table]:my-6 [&_table]:border-collapse
                [&_th]:bg-[#0b1a3a] [&_th]:text-white [&_th]:p-3 [&_th]:text-left [&_th]:text-sm
                [&_td]:p-3 [&_td]:border [&_td]:border-gray-200 [&_td]:text-sm
                [&_tr]:even:bg-gray-50
                [&_blockquote]:border-l-4 [&_blockquote]:border-orange-500 [&_blockquote]:pl-5 [&_blockquote]:py-2 [&_blockquote]:my-6 [&_blockquote]:bg-orange-50/50 [&_blockquote]:rounded-r-lg
                [&_blockquote_p]:text-orange-800 [&_blockquote_p]:italic
                [&_hr]:my-10 [&_hr]:border-gray-200
                [&_.table-container]:overflow-x-auto"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Author Bio Section */}
            {/* <div className="mt-12 pt-10 border-t border-gray-200">
              <div className="flex items-start gap-5 p-6 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-orange-500/20 shrink-0">
                  {authorName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0b1a3a] flex items-center gap-2">
                    {authorName}
                    <span className="text-[10px] font-normal text-gray-400">• Author</span>
                  </h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Expert in equity advisory and IPO consulting with years of experience in the financial markets.
                  </p>
                </div>
              </div>
            </div> */}

            {/* Tags */}
            {blog.meta_data?.tags?.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-xs font-semibold text-gray-400 tracking-wider uppercase mb-3">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {blog.meta_data.tags.map((t) => (
                    <Link
                      key={t}
                      href={`/BlogsPage?tag=${t}`}
                      className="group inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-[11px] font-semibold text-[#0b1a3a] hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 transition-all"
                    >
                      <Tag className="w-3 h-3 group-hover:rotate-12 transition-transform" />
                      {t}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Summary Card */}
            <div className="bg-gradient-to-br from-[#0b1a3a] to-[#0f2044] rounded-xl p-6 text-white">
              <h4 className="text-xs font-semibold tracking-wider uppercase text-orange-400 mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Quick Summary
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/40 uppercase tracking-wider">Read Time</p>
                    <p className="text-sm font-semibold">{readingTime} minutes</p>
                  </div>
                </div>
                <div className="w-full h-px bg-white/10" />
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/40 uppercase tracking-wider">Published</p>
                    <p className="text-sm font-semibold">
                      {dateSource
                        ? new Date(dateSource).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })
                        : ''}
                    </p>
                  </div>
                </div>
                <div className="w-full h-px bg-white/10" />
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center shrink-0">
                    <Tag className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/40 uppercase tracking-wider">Category</p>
                    <p className="text-sm font-semibold">{tag}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Insights */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <h4 className="text-xs font-semibold text-gray-400 tracking-wider uppercase mb-4 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-orange-500" />
                Key Insights
              </h4>
              <div className="space-y-3">
                {keyInsights.map((insight, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all group cursor-pointer">
                    <insight.icon className={`w-4 h-4 ${insight.color} group-hover:scale-110 transition-transform`} />
                    <span className="text-xs font-medium text-gray-700 group-hover:text-[#0b1a3a] transition-colors">
                      {insight.label}
                    </span>
                    <ArrowRight className="w-3 h-3 text-gray-300 ml-auto group-hover:translate-x-1 transition-transform" />
                  </div>
                ))}
              </div>
            </div>

            {/* Related Topics */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h4 className="text-xs font-semibold text-gray-400 tracking-wider uppercase mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-orange-500" />
                Related Topics
              </h4>
              <div className="space-y-2">
                {['IPO Process', 'Equity Advisory', 'Capital Raising', 'SME Funding'].map((topic) => (
                  <Link
                    key={topic}
                    href="#"
                    className="group flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-xs text-gray-600 group-hover:text-[#0b1a3a] transition-colors">{topic}</span>
                    <MoveRight className="w-3 h-3 text-gray-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA Mini */}
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 p-6 text-white">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              <div className="relative">
                <Rocket className="w-8 h-8 mb-3 text-white/80" />
                <h4 className="text-sm font-bold mb-1">Ready to Grow?</h4>
                <p className="text-xs text-white/80 mb-4">Speak with our experts today</p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white text-orange-600 font-semibold text-xs px-4 py-2 rounded-lg hover:bg-orange-50 transition-all hover:scale-105 group"
                >
                  Contact Us
                  <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Between Posts */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pb-12">
        <div className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-gray-200">
          <Link
            href="/BlogsPage"
            className="group inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-[#0b1a3a] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            All Blogs
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="group inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-[#0b1a3a] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Prev
            </Link>
            <span className="w-px h-4 bg-gray-300" />
            <Link
              href="#"
              className="group inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-[#0b1a3a] transition-colors"
            >
              Next
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Banner - Modern Design */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pb-20">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0b1a3a] via-[#0f2044] to-[#0b1a3a] px-6 sm:px-12 py-12 sm:py-16 text-center">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-[120px] -translate-x-1/3 translate-y-1/3" />
          
          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-orange-500/20 backdrop-blur-sm text-orange-400 text-[10px] font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full border border-orange-500/30 mb-6">
              <Sparkles className="w-3 h-3" />
              Let's Connect
            </div>
            
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3">
              Ready to grow your capital?
            </h3>
            <p className="text-sm text-white/60 mb-8 max-w-md mx-auto">
              Talk to our advisory team about how AKSAN can help structure your next move.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs px-6 sm:px-8 py-3 rounded-lg transition-all hover:scale-105 shadow-lg shadow-orange-500/25"
              >
                Contact Us
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/BlogsPage"
                className="group inline-flex items-center gap-2 border border-white/20 hover:bg-white/10 text-white font-semibold text-xs px-6 sm:px-8 py-3 rounded-lg transition-all"
              >
                More Insights
                <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}