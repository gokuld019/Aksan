'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllBlogs, deleteBlog, updateBlogStatus } from '@/services/blogService';

export default function DashboardBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [actionError, setActionError] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, [page, status]);

  const fetchBlogs = async () => {
    setLoading(true);
    setActionError('');
    try {
      const res = await getAllBlogs({ status, search, per_page: 15, page });
      if (res.success) {
        setBlogs(res.data.data);
        setLastPage(res.data.last_page);
        setTotal(res.data.total);
      } else {
        setActionError(res.message || 'Failed to load blogs');
      }
    } catch (err) {
      setActionError('Network error while loading blogs');
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchBlogs();
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this blog?')) return;
    setActionError('');
    try {
      const res = await deleteBlog(id);
      if (res.success) {
        setBlogs((prev) => prev.filter((b) => b.id !== id));
        setTotal((prev) => prev - 1);
      } else {
        setActionError(res.message || 'Delete failed');
      }
    } catch (err) {
      setActionError('Network error while deleting');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    setActionError('');
    try {
      const res = await updateBlogStatus(id, newStatus);
      if (res.success) {
        setBlogs((prev) => prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b)));
      } else {
        setActionError(res.message || 'Status update failed');
      }
    } catch (err) {
      setActionError('Network error while updating status');
    }
  };

  const statusColor = (s) => {
    if (s === 'published') return { bg: '#e6f7e9', color: '#1a7f37' };
    if (s === 'draft') return { bg: '#fff4e5', color: '#b26a00' };
    return { bg: '#f0f0f0', color: '#666' };
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px' }}>Blogs ({total})</h1>
        <Link
          href="/dashboard/blogs/new"
          style={{
            padding: '10px 20px',
            background: '#111',
            color: '#fff',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '14px'
          }}
        >
          + New Blog
        </Link>
      </div>

      {actionError && (
        <div style={{ background: '#fdecea', color: '#c0392b', padding: '10px 16px', borderRadius: '6px', marginBottom: '16px', fontSize: '13px' }}>
          {actionError}
        </div>
      )}

      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, minWidth: '200px', padding: '10px 14px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }}
        />
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          style={{ padding: '10px 14px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }}
        >
          <option value="all">All</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>
        <button type="submit" style={{ padding: '10px 20px', background: '#111', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Search
        </button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <div style={{ border: '1px solid #eee', borderRadius: '10px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: '#fafafa', textAlign: 'left' }}>
                <th style={{ padding: '12px 16px' }}>Image</th>
                <th style={{ padding: '12px 16px' }}>Title</th>
                <th style={{ padding: '12px 16px' }}>Author</th>
                <th style={{ padding: '12px 16px' }}>Status</th>
                <th style={{ padding: '12px 16px' }}>Created</th>
                <th style={{ padding: '12px 16px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => {
                const sc = statusColor(blog.status);
                return (
                  <tr key={blog.id} style={{ borderTop: '1px solid #eee' }}>
                    <td style={{ padding: '12px 16px' }}>
                      {blog.featured_image ? (
                        <img src={blog.featured_image} alt="" style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '6px' }} />
                      ) : (
                        <div style={{ width: '48px', height: '48px', background: '#f0f0f0', borderRadius: '6px' }} />
                      )}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <Link href={`/dashboard/blogs/${blog.id}`} style={{ color: '#111', textDecoration: 'none', fontWeight: 500 }}>
                        {blog.title}
                      </Link>
                    </td>
                    <td style={{ padding: '12px 16px', color: '#666' }}>{blog.author}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <select
                        value={blog.status}
                        onChange={(e) => handleStatusChange(blog.id, e.target.value)}
                        style={{
                          background: sc.bg,
                          color: sc.color,
                          border: 'none',
                          padding: '4px 8px',
                          borderRadius: '999px',
                          fontSize: '12px',
                          fontWeight: 500,
                          cursor: 'pointer'
                        }}
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="archived">Archived</option>
                      </select>
                    </td>
                    <td style={{ padding: '12px 16px', color: '#666' }}>
                      {new Date(blog.created_at).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <Link href={`/dashboard/blogs/${blog.id}`} style={{ color: '#111', fontSize: '13px', textDecoration: 'underline' }}>
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          style={{ color: '#c0392b', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', padding: 0 }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {lastPage > 1 && (
        <div style={{ display: 'flex', gap: '8px', marginTop: '24px', justifyContent: 'center' }}>
          <button disabled={page === 1} onClick={() => setPage((p) => p - 1)} style={{ padding: '8px 16px', cursor: page === 1 ? 'not-allowed' : 'pointer' }}>
            Prev
          </button>
          <span style={{ padding: '8px 16px' }}>Page {page} of {lastPage}</span>
          <button disabled={page === lastPage} onClick={() => setPage((p) => p + 1)} style={{ padding: '8px 16px', cursor: page === lastPage ? 'not-allowed' : 'pointer' }}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}