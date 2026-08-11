'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBlog } from '@/services/blogService';

export default function NewBlogPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: '',
    description: '',
    content: '',
    status: 'draft',
    author: '',
    seo_title: '',
    seo_description: '',
    tags: ''
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be under 5MB.');
      return;
    }
    setError('');
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('content', form.content);
      formData.append('status', form.status);
      formData.append('author', form.author);

      const tags = form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : [];
      tags.forEach((tag) => formData.append('meta_data[tags][]', tag));
      formData.append('meta_data[seo_title]', form.seo_title);
      formData.append('meta_data[seo_description]', form.seo_description);

      if (imageFile) {
        formData.append('featured_image', imageFile);
      }

      const res = await createBlog(formData);
      setSaving(false);

      if (res.success) {
        router.push('/dashboard/blogs');
      } else {
        setError(res.message || 'Failed to create blog');
      }
    } catch (err) {
      setSaving(false);
      setError('Something went wrong. Please try again.');
    }
  };

  const cardStyle = { background: '#fff', border: '1px solid #eee', borderRadius: '10px', padding: '24px' };
  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px',
    marginTop: '6px',
    boxSizing: 'border-box'
  };
  const labelStyle = { fontSize: '13px', fontWeight: 500, color: '#333' };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
      <div style={{ marginBottom: '20px' }}>
        <a href="/dashboard/blogs" style={{ fontSize: '13px', color: '#666', textDecoration: 'none' }}>
          ← Back
        </a>
        <h1 style={{ fontSize: '26px', fontWeight: 700, marginTop: '6px' }}>Create New Blog</h1>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
        <div style={{ ...cardStyle, flex: '1 1 65%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <label style={labelStyle}>
            Title <span style={{ color: '#c0392b' }}>*</span>
            <input style={inputStyle} name="title" value={form.title} onChange={handleChange} placeholder="Enter blog title" required />
          </label>

          <label style={labelStyle}>
            Description <span style={{ color: '#c0392b' }}>*</span>
            <textarea style={{ ...inputStyle, minHeight: '70px' }} name="description" value={form.description} onChange={handleChange} placeholder="Brief description of your blog" required />
          </label>

          <label style={labelStyle}>
            Featured Image
            <div style={{ marginTop: '6px', border: '2px dashed #ddd', borderRadius: '8px', padding: '18px', textAlign: 'center' }}>
              {preview ? (
                <div>
                  <img src={preview} alt="Preview" style={{ maxHeight: '200px', width: '100%', objectFit: 'cover', borderRadius: '6px', marginBottom: '12px' }} />
                  <button type="button" onClick={handleRemoveImage} style={{ background: 'none', border: '1px solid #c0392b', color: '#c0392b', borderRadius: '6px', padding: '6px 14px', fontSize: '13px', cursor: 'pointer' }}>
                    Remove Image
                  </button>
                </div>
              ) : (
                <div style={{ color: '#999', fontSize: '13px', marginBottom: '10px' }}>No image selected — recommended 1200×630px</div>
              )}
              <input type="file" accept="image/png, image/jpeg, image/webp" onChange={handleImageChange} style={{ marginTop: preview ? '12px' : '0', fontSize: '13px' }} />
            </div>
          </label>

          <label style={labelStyle}>
            Content (HTML) <span style={{ color: '#c0392b' }}>*</span>
            <textarea style={{ ...inputStyle, minHeight: '260px', fontFamily: 'monospace' }} name="content" value={form.content} onChange={handleChange} placeholder="<h1>Your blog content here...</h1>" required />
          </label>

          <label style={labelStyle}>
            Author <span style={{ color: '#c0392b' }}>*</span>
            <input style={inputStyle} name="author" value={form.author} onChange={handleChange} placeholder="Author name" required />
          </label>
        </div>

        <div style={{ flex: '1 1 35%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={cardStyle}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '16px' }}>SEO Metadata</h3>
            <label style={labelStyle}>
              SEO Title
              <input style={inputStyle} name="seo_title" value={form.seo_title} onChange={handleChange} placeholder="SEO optimized title" />
            </label>
            <label style={{ ...labelStyle, display: 'block', marginTop: '16px' }}>
              SEO Description
              <textarea style={{ ...inputStyle, minHeight: '70px' }} name="seo_description" value={form.seo_description} onChange={handleChange} placeholder="SEO meta description" />
            </label>
            <label style={{ ...labelStyle, display: 'block', marginTop: '16px' }}>
              Tags (comma-separated)
              <input style={inputStyle} name="tags" value={form.tags} onChange={handleChange} placeholder="mental health, wellness, tips" />
            </label>
          </div>

          <div style={cardStyle}>
            <label style={labelStyle}>
              Status
              <select style={inputStyle} name="status" value={form.status} onChange={handleChange}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </label>
          </div>

          {error && <p style={{ color: '#c0392b', fontSize: '13px', margin: 0 }}>{error}</p>}

          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="button" onClick={() => router.push('/dashboard/blogs')} style={{ flex: 1, padding: '12px 20px', background: '#f3f0e8', color: '#333', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 500 }}>
              Cancel
            </button>
            <button type="submit" disabled={saving} style={{ flex: 1, padding: '12px 20px', background: '#b8934a', color: '#fff', border: 'none', borderRadius: '8px', cursor: saving ? 'not-allowed' : 'pointer', fontSize: '14px', fontWeight: 600 }}>
              {saving ? 'Saving...' : 'Publish Blog'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}