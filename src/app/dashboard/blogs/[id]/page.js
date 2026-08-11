'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getBlogById, updateBlog, deleteBlog } from '@/services/blogService';

export default function EditBlogPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    getBlogById(id).then((res) => {
      if (res.success) {
        const b = res.data;
        setForm({
          title: b.title || '',
          description: b.description || '',
          content: b.content || '',
          status: b.status || 'draft',
          author: b.author || '',
          seo_title: b.meta_data?.seo_title || '',
          seo_description: b.meta_data?.seo_description || '',
          tags: b.meta_data?.tags ? b.meta_data.tags.join(', ') : ''
        });
        setExistingImageUrl(b.featured_image || null);
      } else {
        setError(res.message || 'Failed to load blog');
      }
      setLoading(false);
    });
  }, [id]);

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

  const handleRemoveNewImage = () => {
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

      const res = await updateBlog(id, formData);
      setSaving(false);

      if (res.success) {
        router.push('/dashboard/blogs');
      } else {
        setError(res.message || 'Failed to update blog');
      }
    } catch (err) {
      setSaving(false);
      setError('Something went wrong while updating.');
    }
  };

  const handleDelete = async () => {
    if (!confirm('Delete this blog? This cannot be undone.')) return;
    setDeleting(true);
    setError('');

    try {
      const res = await deleteBlog(id);
      setDeleting(false);

      if (res.success) {
        router.push('/dashboard/blogs');
      } else {
        setError(res.message || 'Failed to delete blog');
      }
    } catch (err) {
      setDeleting(false);
      setError('Something went wrong while deleting.');
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

  if (loading) return <p style={{ padding: '40px', textAlign: 'center' }}>Loading...</p>;
  if (!form) return <p style={{ padding: '40px', textAlign: 'center' }}>Blog not found.</p>;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <a href="/dashboard/blogs" style={{ fontSize: '13px', color: '#666', textDecoration: 'none' }}>
            ← Back
          </a>
          <h1 style={{ fontSize: '26px', fontWeight: 700, marginTop: '6px' }}>Edit Blog</h1>
        </div>
        <button
          onClick={handleDelete}
          disabled={deleting}
          style={{
            color: '#c0392b',
            background: 'none',
            border: '1px solid #c0392b',
            borderRadius: '6px',
            padding: '8px 16px',
            cursor: deleting ? 'not-allowed' : 'pointer',
            fontSize: '13px'
          }}
        >
          {deleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
        <div style={{ ...cardStyle, flex: '1 1 65%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <label style={labelStyle}>
            Title <span style={{ color: '#c0392b' }}>*</span>
            <input style={inputStyle} name="title" value={form.title} onChange={handleChange} required />
          </label>

          <label style={labelStyle}>
            Description <span style={{ color: '#c0392b' }}>*</span>
            <textarea style={{ ...inputStyle, minHeight: '70px' }} name="description" value={form.description} onChange={handleChange} required />
          </label>

          <label style={labelStyle}>
            Featured Image
            <div style={{ marginTop: '6px', border: '2px dashed #ddd', borderRadius: '8px', padding: '18px', textAlign: 'center' }}>
              {preview ? (
                <div>
                  <img src={preview} alt="New preview" style={{ maxHeight: '200px', width: '100%', objectFit: 'cover', borderRadius: '6px', marginBottom: '12px' }} />
                  <button type="button" onClick={handleRemoveNewImage} style={{ background: 'none', border: '1px solid #c0392b', color: '#c0392b', borderRadius: '6px', padding: '6px 14px', fontSize: '13px', cursor: 'pointer' }}>
                    Cancel New Image
                  </button>
                </div>
              ) : existingImageUrl ? (
                <div>
                  <img src={existingImageUrl} alt="Current" style={{ maxHeight: '200px', width: '100%', objectFit: 'cover', borderRadius: '6px', marginBottom: '12px' }} />
                  <p style={{ fontSize: '12px', color: '#999', marginBottom: '10px' }}>Current image — choose a file below to replace it</p>
                </div>
              ) : (
                <div style={{ color: '#999', fontSize: '13px', marginBottom: '10px' }}>No image set — recommended 1200×630px</div>
              )}
              <input type="file" accept="image/png, image/jpeg, image/webp" onChange={handleImageChange} style={{ fontSize: '13px' }} />
            </div>
          </label>

          <label style={labelStyle}>
            Content (HTML) <span style={{ color: '#c0392b' }}>*</span>
            <textarea style={{ ...inputStyle, minHeight: '260px', fontFamily: 'monospace' }} name="content" value={form.content} onChange={handleChange} required />
          </label>

          <label style={labelStyle}>
            Author <span style={{ color: '#c0392b' }}>*</span>
            <input style={inputStyle} name="author" value={form.author} onChange={handleChange} required />
          </label>
        </div>

        <div style={{ flex: '1 1 35%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={cardStyle}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '16px' }}>SEO Metadata</h3>
            <label style={labelStyle}>
              SEO Title
              <input style={inputStyle} name="seo_title" value={form.seo_title} onChange={handleChange} />
            </label>
            <label style={{ ...labelStyle, display: 'block', marginTop: '16px' }}>
              SEO Description
              <textarea style={{ ...inputStyle, minHeight: '70px' }} name="seo_description" value={form.seo_description} onChange={handleChange} />
            </label>
            <label style={{ ...labelStyle, display: 'block', marginTop: '16px' }}>
              Tags (comma-separated)
              <input style={inputStyle} name="tags" value={form.tags} onChange={handleChange} />
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
              {saving ? 'Saving...' : 'Update Blog'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}