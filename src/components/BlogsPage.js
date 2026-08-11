'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getPublishedBlogs } from '@/components/blogService';

function stripHtml(html = '') {
  return html.replace(/<[^>]*>/g, '');
}

function readTime(content = '') {
  const words = stripHtml(content).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

// TEMP: manual thumbnail mapping until backend supports featured_image upload
const THUMBNAIL_MAP = {
  'sme-ipo-vs-mainboard-ipo-which-one-fits-your-business': '/blog/b1.png',
  'common-financial-challenges-faced-by-smes-and-how-to-overcome-them': '/blog/b2.png',
  'what-is-an-sme-ipo-everything-you-need-to-know-1786428769': '/blog/b3.png',
};

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublishedBlogs({ page: 1, per_page: 12 })
      .then((res) => {
        if (res.success && res.data) {
          const list = res.data.data || [];
          setBlogs(list.filter((b) => b.status === 'published'));
        } else {
          setBlogs([]);
        }
      })
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="relative bg-[#0b1a3a] overflow-hidden h-[520px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="/blog.png"
            alt=""
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1a3a] via-[#0b1a3a]/60 to-[#0b1a3a]/20" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 w-full">
          <h1 className="text-5xl font-bold text-white mb-4">Our Blogs</h1>
          <div className="w-14 h-1 bg-orange-500 mb-5" />
          <p className="text-gray-300 max-w-xl">
            Stay informed with our expert perspectives on capital markets, IPOs,
            regulatory updates, and strategic finance.
          </p>
        </div>
      </div>

      {/* Latest Insights */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#0b1a3a] mb-3">Latest Insights</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Explore our latest articles covering key developments, market trends,
            and expert opinions that matter to your investment decisions.
          </p>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-500">No blogs found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => {
              const tag = blog.meta_data?.tags?.[0] || 'Insight';
              const dateSource = blog.published_at || blog.created_at;
              const thumbnail = blog.featured_image || THUMBNAIL_MAP[blog.slug] || null;

              return (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.slug}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48 bg-[#0b1a3a] overflow-hidden">
                    {thumbnail ? (
                      <img
                        src={thumbnail}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/20 text-4xl font-bold">
                        {tag}
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <span className="text-xs font-semibold text-orange-500 uppercase tracking-wide">
                      {tag}
                    </span>
                    <h3 className="mt-2 text-lg font-bold text-[#0b1a3a] leading-snug group-hover:text-orange-500 transition-colors">
                      {blog.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                      {blog.description}
                    </p>

                    <div className="mt-5 flex items-center justify-between text-xs text-gray-400 border-t pt-4">
                      <span className="flex items-center gap-1">
                        📅{' '}
                        {dateSource
                          ? new Date(dateSource).toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric'
                            })
                          : ''}
                      </span>
                      <span>{readTime(blog.content)} min read</span>
                      <span className="text-orange-500 text-base">→</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}