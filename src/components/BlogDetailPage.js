'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getBlogBySlug } from '@/components/blogService';

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#0b1a3a]/20 border-t-orange-500 rounded-full animate-spin" />
          <p className="text-xs text-gray-500 tracking-wide">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-4">
        <p className="text-sm text-gray-500">Blog not found.</p>
        <Link
          href="/BlogsPage"
          className="text-xs font-semibold text-[#0b1a3a] hover:text-orange-500 transition-colors"
        >
          ← Back to Blogs
        </Link>
      </div>
    );
  }

  const tag = blog.meta_data?.tags?.[0] || 'Insight';
  const authorName = blog.creator?.name || blog.author || 'Admin';
  const dateSource = blog.published_at || blog.created_at;
  const banner = blog.featured_image || BANNER_MAP[blog.slug] || null;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative bg-[#0b1a3a] overflow-hidden pt-32 pb-24">
        {banner ? (
          <div className="absolute inset-0">
            <img
              src={banner}
              alt=""
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b1a3a] via-[#0b1a3a]/70 to-[#0b1a3a]/40" />
          </div>
        ) : (
          <div className="absolute inset-0 opacity-40">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 40px)',
              }}
            />
          </div>
        )}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[140px] -translate-y-1/3 translate-x-1/4" />

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10">
          <Link
            href="/BlogsPage"
            className="inline-flex items-center gap-2 text-[11px] font-semibold text-white/50 hover:text-orange-400 transition-colors mb-8 tracking-wide uppercase"
          >
            ← Back to Blogs
          </Link>

          <span className="block text-orange-500 font-semibold text-xs tracking-wide uppercase mb-4">
            {tag}
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6 max-w-4xl">
            {blog.title}
          </h1>

          <span className="block w-14 h-1 bg-orange-500 mb-6" />

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-300">
            <span className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-[10px] shrink-0">
                {authorName.charAt(0)}
              </span>
              <span className="text-white/90 font-medium">
                {authorName}
              </span>
            </span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span>
              {dateSource
                ? new Date(dateSource).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })
                : ''}
            </span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span>{readTime(blog.content)} min read</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1400px] mx-auto px-6 py-16 lg:py-20">
        <p className="text-base text-gray-600 font-medium leading-relaxed mb-10 pb-10 border-b border-gray-200">
          {blog.description}
        </p>

        <div
          className="max-w-none text-sm
            [&_*]:text-gray-600
            [&_h1]:text-[#0b1a3a] [&_h2]:text-[#0b1a3a] [&_h3]:text-[#0b1a3a] [&_h4]:text-[#0b1a3a]
            [&_h1]:font-bold [&_h2]:font-bold [&_h3]:font-bold [&_h4]:font-bold
            [&_h1]:text-2xl [&_h2]:text-xl [&_h3]:text-lg [&_h4]:text-base
            [&_h1]:mt-8 [&_h2]:mt-8 [&_h3]:mt-6 [&_h4]:mt-5
            [&_h1]:mb-4 [&_h2]:mb-4 [&_h3]:mb-3 [&_h4]:mb-2
            [&_p]:text-sm [&_p]:text-gray-600 [&_p]:leading-[1.8] [&_p]:mb-4
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:text-sm [&_ul]:text-gray-600
            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:text-sm [&_ol]:text-gray-600
            [&_li]:text-sm [&_li]:text-gray-600 [&_li]:mb-1
            [&_strong]:text-[#0b1a3a] [&_strong]:font-semibold
            [&_em]:text-gray-600
            [&_a]:text-orange-500 [&_a]:font-medium hover:[&_a]:underline
            [&_img]:rounded-xl [&_img]:my-6"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Tags */}
        {blog.meta_data?.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-200">
            {blog.meta_data.tags.map((t) => (
              <span
                key={t}
                className="px-4 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-[11px] font-semibold text-[#0b1a3a] hover:border-orange-300 hover:text-orange-600 transition-colors"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* CTA Banner */}
      <div className="max-w-[1400px] mx-auto px-6 pb-20">
        <div className="relative overflow-hidden rounded-2xl bg-[#0b1a3a] px-8 py-12 sm:px-12 text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3" />
          <h3 className="relative text-xl sm:text-2xl font-bold text-white mb-3">
            Ready to grow your capital?
          </h3>
          <p className="relative text-sm text-white/60 mb-8 max-w-md mx-auto">
            Talk to our advisory team about how AKSAN can help structure your next move.
          </p>
          <div className="relative flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs px-6 py-3 rounded-lg transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/BlogsPage"
              className="inline-flex items-center gap-2 border border-white/20 hover:bg-white/10 text-white font-semibold text-xs px-6 py-3 rounded-lg transition-colors"
            >
              More Insights
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}