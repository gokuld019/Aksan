// app/admin/blogs/page.js
"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

// ============================================
// BLOG SERVICE (Integrated in same file)
// Covers all Blog APIs from the docs:
//   Auth
//     1. Login                POST   /login
//   Admin (Bearer token required)
//     2. Create Blog          POST   /admin/blogs
//     3. Get All Blogs        GET    /admin/blogs
//     4. Get Single Blog      GET    /admin/blogs/:id
//     5. Update Blog          PUT    /admin/blogs/:id
//     6. Update Blog Status   PATCH  /admin/blogs/:id/status
//     7. Delete Blog          DELETE /admin/blogs/:id
//   Public (no auth)
//     8. Get Published Blogs  GET    /public/blogs
//     9. Get Featured Blogs   GET    /public/blogs/featured
//    10. Get Blog by Slug     GET    /public/blogs/:slug
// ============================================

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.crazystory.in/api";

// ------------------------------------------------
// TOKEN HELPERS
// ------------------------------------------------

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

const setToken = (token) => {
  if (typeof window !== "undefined" && token) {
    localStorage.setItem("token", token);
  }
};

const removeToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
};

const getHeaders = (withAuth = true) => {
  const token = withAuth ? getToken() : null;
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// ------------------------------------------------
// CENTRALIZED RESPONSE HANDLER
// Also catches expired/invalid tokens (401), forbidden (403),
// not found (404) and validation errors (422)
// ------------------------------------------------

const handleResponse = async (response, label = "") => {
  let data = null;
  const rawText = await response.text();
  try {
    data = rawText ? JSON.parse(rawText) : null;
  } catch {
    console.error(`[${label}] Non-JSON response (status ${response.status}):`, rawText.slice(0, 500));
  }

  console.log(`[${label}] status:`, response.status, "body:", data);

  if (response.status === 401) {
    throw new Error((data && data.message) || "Session expired or invalid token. Please log in again.");
  }

  if (response.status === 403) {
    throw new Error((data && data.message) || "Not authorized (403) — this account may not have admin access.");
  }

  if (response.status === 404) {
    throw new Error((data && data.message) || "Endpoint not found (404) — check API_URL / route.");
  }

  if (response.status === 422) {
    const details = data?.errors ? JSON.stringify(data.errors) : "";
    throw new Error((data && data.message) || `Validation failed (422). ${details}`);
  }

  if (!response.ok) {
    throw new Error((data && data.message) || `Request failed (${response.status})`);
  }

  return data;
};

// Strip empty/undefined/null query params so we don't send junk querystrings
const buildQuery = (params = {}) => {
  const cleaned = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== "")
  );
  return new URLSearchParams(cleaned).toString();
};

// ================================================
// 1. LOGIN
// ================================================

const login = async (email, password) => {
  console.log("[login] POST", `${API_URL}/login`);
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: getHeaders(false),
    body: JSON.stringify({ email, password }),
  });

  const rawText = await response.text();
  let data = null;
  try {
    data = rawText ? JSON.parse(rawText) : null;
  } catch {
    console.error("[login] Non-JSON response:", rawText.slice(0, 500));
  }
  console.log("[login] status:", response.status, "body:", data);

  // Backend returns { status: "success", access_token, user }
  if (!response.ok || data?.status !== "success") {
    throw new Error((data && data.message) || "Invalid email or password");
  }

  if (data?.access_token) {
    setToken(data.access_token);
  }
  if (typeof window !== "undefined" && data?.user) {
    localStorage.setItem("user", JSON.stringify(data.user));
  }

  return data;
};

const isLoggedIn = () => Boolean(getToken());

const getUser = () => {
  if (typeof window !== "undefined") {
    const raw = localStorage.getItem("user");
    try {
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
  return null;
};

const logout = () => {
  removeToken();
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
  }
};

// ================================================
// ADMIN BLOG ENDPOINTS (Bearer token required)
// ================================================

// 2. Create Blog
const createBlog = async (blogData) => {
  console.log("[createBlog] POST", `${API_URL}/admin/blogs`, "payload:", blogData);
  const response = await fetch(`${API_URL}/admin/blogs`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(blogData),
  });
  return handleResponse(response, "createBlog");
};

// 3. Get All Blogs (status, search, per_page, page)
const getAllBlogs = async (params = {}) => {
  const query = buildQuery(params);
  const url = `${API_URL}/admin/blogs?${query}`;
  console.log("[getAllBlogs] GET", url);
  const response = await fetch(url, {
    method: "GET",
    headers: getHeaders(),
  });
  return handleResponse(response, "getAllBlogs");
};

// 4. Get Single Blog
const getBlogById = async (id) => {
  console.log("[getBlogById] GET", `${API_URL}/admin/blogs/${id}`);
  const response = await fetch(`${API_URL}/admin/blogs/${id}`, {
    method: "GET",
    headers: getHeaders(),
  });
  return handleResponse(response, "getBlogById");
};

// 5. Update Blog
const updateBlog = async (id, blogData) => {
  console.log("[updateBlog] PUT", `${API_URL}/admin/blogs/${id}`, "payload:", blogData);
  const response = await fetch(`${API_URL}/admin/blogs/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(blogData),
  });
  return handleResponse(response, "updateBlog");
};

// 6. Update Blog Status (draft | published | archived)
const updateBlogStatus = async (id, status) => {
  console.log("[updateBlogStatus] PATCH", `${API_URL}/admin/blogs/${id}/status`, "status:", status);
  const response = await fetch(`${API_URL}/admin/blogs/${id}/status`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify({ status }),
  });
  return handleResponse(response, "updateBlogStatus");
};

// 7. Delete Blog
const deleteBlog = async (id) => {
  console.log("[deleteBlog] DELETE", `${API_URL}/admin/blogs/${id}`);
  const response = await fetch(`${API_URL}/admin/blogs/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  return handleResponse(response, "deleteBlog");
};

// ================================================
// PUBLIC BLOG ENDPOINTS (no auth required)
// ================================================

// 8. Get Published Blogs (page, per_page, search)
const getPublishedBlogs = async (params = {}) => {
  const query = buildQuery(params);
  const url = `${API_URL}/public/blogs?${query}`;
  console.log("[getPublishedBlogs] GET", url);
  const response = await fetch(url, {
    method: "GET",
    headers: getHeaders(false),
  });
  return handleResponse(response, "getPublishedBlogs");
};

// 9. Get Featured Blogs
const getFeaturedBlogs = async () => {
  console.log("[getFeaturedBlogs] GET", `${API_URL}/public/blogs/featured`);
  const response = await fetch(`${API_URL}/public/blogs/featured`, {
    method: "GET",
    headers: getHeaders(false),
  });
  return handleResponse(response, "getFeaturedBlogs");
};

// 10. Get Blog by Slug
const getBlogBySlug = async (slug) => {
  console.log("[getBlogBySlug] GET", `${API_URL}/public/blogs/${slug}`);
  const response = await fetch(`${API_URL}/public/blogs/${slug}`, {
    method: "GET",
    headers: getHeaders(false),
  });
  return handleResponse(response, "getBlogBySlug");
};

// ============================================
// CONSTANTS
// ============================================

const STATUS_OPTIONS = ["draft", "published", "archived"];

const STATUS_STYLES = {
  published: "bg-green-100 text-green-700",
  draft: "bg-gray-100 text-gray-700",
  archived: "bg-red-100 text-red-700",
};

// ============================================
// MAIN BLOG COMPONENT
// ============================================

export default function BlogsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [view, setView] = useState(
    searchParams.get("new") === "1" ? "create" : "list"
  ); // 'list', 'create', 'edit'
  const [editingId, setEditingId] = useState(null);

  // List state
  const [blogs, setBlogs] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    search: "",
    page: 1,
    per_page: 15,
  });
  const [busyId, setBusyId] = useState(null);

  // Form state (for create and edit)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    author: "",
    status: "draft",
    seoTitle: "",
    seoDescription: "",
    tagsInput: "",
  });
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  // ============================================
  // FETCH BLOGS
  // ============================================

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getAllBlogs(filters);

      // Debug: log the raw response so the actual API shape is visible in DevTools console
      console.log("[getAllBlogs] raw response:", response);

      // Try to locate the blogs array regardless of exact nesting.
      // Handles all of these shapes:
      //   { success, data: [...] }
      //   { success, data: { data: [...], current_page, last_page, total } }
      //   { success, data: { blogs: [...], pagination: {...} } }
      //   { success, blogs: [...] }
      //   [...] (bare array)
      let list = null;
      let pagination = null;

      const root = response?.data ?? response;

      if (Array.isArray(root)) {
        list = root;
      } else if (root && typeof root === "object") {
        if (Array.isArray(root.data)) {
          list = root.data;
          pagination = {
            currentPage: root.current_page ?? root.currentPage ?? 1,
            lastPage: root.last_page ?? root.lastPage ?? 1,
            total: root.total ?? list.length,
          };
        } else if (Array.isArray(root.blogs)) {
          list = root.blogs;
          const p = root.pagination || {};
          pagination = {
            currentPage: p.current_page ?? p.currentPage ?? 1,
            lastPage: p.last_page ?? p.lastPage ?? 1,
            total: p.total ?? list.length,
          };
        } else if (Array.isArray(root.items)) {
          list = root.items;
        }
      }

      if (list) {
        setBlogs(list);
        setMeta(pagination);
        if (list.length === 0) {
          console.log("[getAllBlogs] API returned an empty array — no blogs match current filters, or none exist yet.");
        }
      } else {
        console.warn("[getAllBlogs] Could not find a blogs array in the response. Check the shape above.");
        setBlogs([]);
        setMeta(null);
        setError("Unexpected response format from server. Check the browser console for details.");
      }
    } catch (err) {
      console.error("[getAllBlogs] request failed:", err);
      setError(err.message || "Could not load blogs.");
      setBlogs([]);
      setMeta(null);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    if (view === "list") {
      fetchBlogs();
    }
  }, [fetchBlogs, view]);

  // ============================================
  // BLOG CRUD OPERATIONS
  // ============================================

  const handleCreate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFormError("");

    try {
      const tags = formData.tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const blogData = {
        title: formData.title,
        description: formData.description,
        content: formData.content,
        author: formData.author,
        status: formData.status,
        meta_data: {
          seo_title: formData.seoTitle,
          seo_description: formData.seoDescription,
          tags: tags,
        },
      };

      const response = await createBlog(blogData);

      if (response?.success) {
        resetForm();
        setView("list");
        fetchBlogs();
      } else {
        throw new Error(response?.message || "Failed to create blog");
      }
    } catch (err) {
      setFormError(err.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = async (id) => {
    setLoading(true);
    setFormError("");

    try {
      const response = await getBlogById(id);

      if (response?.success && response.data) {
        const blog = response.data;
        setFormData({
          title: blog.title || "",
          description: blog.description || "",
          content: blog.content || "",
          author: blog.author || "",
          status: blog.status || "draft",
          seoTitle: blog.meta_data?.seo_title || "",
          seoDescription: blog.meta_data?.seo_description || "",
          tagsInput: blog.meta_data?.tags?.join(", ") || "",
        });
        setEditingId(id);
        setView("edit");
      } else {
        throw new Error(response?.message || "Failed to load blog");
      }
    } catch (err) {
      setFormError(err.message || "Failed to load blog");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFormError("");

    try {
      const tags = formData.tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const blogData = {
        title: formData.title,
        description: formData.description,
        content: formData.content,
        author: formData.author,
        status: formData.status,
        meta_data: {
          seo_title: formData.seoTitle,
          seo_description: formData.seoDescription,
          tags,
        },
      };

      const response = await updateBlog(editingId, blogData);

      if (response?.success) {
        resetForm();
        setView("list");
        fetchBlogs();
      } else {
        throw new Error(response?.message || "Failed to update blog");
      }
    } catch (err) {
      setFormError(err.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this blog? This cannot be undone.")) return;
    setBusyId(id);
    try {
      const response = await deleteBlog(id);
      if (response?.success) {
        setBlogs((prev) => prev.filter((b) => b.id !== id));
        setMeta((prev) => (prev ? { ...prev, total: Math.max(0, prev.total - 1) } : prev));
      } else {
        throw new Error(response?.message || "Could not delete blog.");
      }
    } catch (err) {
      alert(err.message || "Could not delete blog.");
    } finally {
      setBusyId(null);
    }
  };

  // Generic status changer — used for Publish / Archive / Draft actions
  const handleStatusChange = async (id, status) => {
    setBusyId(id);
    try {
      const response = await updateBlogStatus(id, status);
      if (response?.success) {
        setBlogs((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status } : b))
        );
      } else {
        throw new Error(response?.message || "Could not update status.");
      }
    } catch (err) {
      alert(err.message || "Could not update status.");
    } finally {
      setBusyId(null);
    }
  };

  // ============================================
  // HELPER FUNCTIONS
  // ============================================

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      content: "",
      author: "",
      status: "draft",
      seoTitle: "",
      seoDescription: "",
      tagsInput: "",
    });
    setEditingId(null);
    setFormError("");
    setSaving(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getStatusBadge = (status) => STATUS_STYLES[status] || STATUS_STYLES.draft;

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value, page: 1 }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setFilters((prev) => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const cancelForm = () => {
    resetForm();
    setView("list");
  };

  // ============================================
  // RENDER: BLOG FORM (Create/Edit)
  // ============================================

  const renderForm = () => (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <button
          onClick={cancelForm}
          className="text-[#71768a] hover:text-[#0b1220] transition-colors"
        >
          ← Back
        </button>
        <h1 className="text-[#0b1220] text-2xl font-semibold">
          {view === "create" ? "Create New Blog" : "Edit Blog"}
        </h1>
      </div>

      {formError && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-[13px] px-3.5 py-2.5 rounded-lg mb-5">
          {formError}
        </div>
      )}

      <form
        onSubmit={view === "create" ? handleCreate : handleUpdate}
        className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-start"
      >
        {/* Main Content */}
        <div className="bg-white border border-[#ece8dc] rounded-2xl p-6 space-y-4">
          <div>
            <label className="block text-[#0b1220] text-sm font-medium mb-1.5">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleFormChange}
              required
              className="w-full bg-[#faf9f6] border border-[#ece8dc] rounded-lg px-3 py-2.5 text-[#0b1220] text-sm outline-none focus:border-[#c5a059] transition-colors"
              placeholder="Enter blog title"
            />
          </div>

          <div>
            <label className="block text-[#0b1220] text-sm font-medium mb-1.5">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              rows={2}
              value={formData.description}
              onChange={handleFormChange}
              required
              className="w-full bg-[#faf9f6] border border-[#ece8dc] rounded-lg px-3 py-2.5 text-[#0b1220] text-sm outline-none focus:border-[#c5a059] transition-colors resize-y"
              placeholder="Brief description of your blog"
            />
          </div>

          <div>
            <label className="block text-[#0b1220] text-sm font-medium mb-1.5">
              Content (HTML) <span className="text-red-500">*</span>
            </label>
            <textarea
              name="content"
              rows={14}
              value={formData.content}
              onChange={handleFormChange}
              required
              className="w-full bg-[#faf9f6] border border-[#ece8dc] rounded-lg px-3 py-2.5 text-[#0b1220] text-sm outline-none focus:border-[#c5a059] transition-colors resize-y font-mono"
              placeholder="<h1>Your blog content here...</h1>"
            />
          </div>

          <div>
            <label className="block text-[#0b1220] text-sm font-medium mb-1.5">
              Author <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleFormChange}
              required
              className="w-full bg-[#faf9f6] border border-[#ece8dc] rounded-lg px-3 py-2.5 text-[#0b1220] text-sm outline-none focus:border-[#c5a059] transition-colors"
              placeholder="Author name"
            />
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          <div className="bg-white border border-[#ece8dc] rounded-2xl p-4 space-y-3">
            <h3 className="text-[#0b1220] text-sm font-semibold">SEO Metadata</h3>

            <div>
              <label className="block text-[#71768a] text-xs mb-1">SEO Title</label>
              <input
                type="text"
                name="seoTitle"
                value={formData.seoTitle}
                onChange={handleFormChange}
                className="w-full bg-[#faf9f6] border border-[#ece8dc] rounded-lg px-3 py-2 text-[#0b1220] text-sm outline-none focus:border-[#c5a059] transition-colors"
                placeholder="SEO optimized title"
              />
            </div>

            <div>
              <label className="block text-[#71768a] text-xs mb-1">SEO Description</label>
              <textarea
                name="seoDescription"
                rows={2}
                value={formData.seoDescription}
                onChange={handleFormChange}
                className="w-full bg-[#faf9f6] border border-[#ece8dc] rounded-lg px-3 py-2 text-[#0b1220] text-sm outline-none focus:border-[#c5a059] transition-colors resize-y"
                placeholder="SEO meta description"
              />
            </div>

            <div>
              <label className="block text-[#71768a] text-xs mb-1">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                name="tagsInput"
                value={formData.tagsInput}
                onChange={handleFormChange}
                placeholder="mental health, wellness, tips"
                className="w-full bg-[#faf9f6] border border-[#ece8dc] rounded-lg px-3 py-2 text-[#0b1220] text-sm outline-none focus:border-[#c5a059] transition-colors"
              />
            </div>
          </div>

          <div className="bg-white border border-[#ece8dc] rounded-2xl p-4">
            <label className="block text-[#0b1220] text-sm font-medium mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleFormChange}
              className="w-full bg-[#faf9f6] border border-[#ece8dc] rounded-lg px-3 py-2.5 text-[#0b1220] text-sm outline-none focus:border-[#c5a059] transition-colors"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              {view === "edit" && (
                <option value="archived">Archived</option>
              )}
            </select>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={cancelForm}
              className="flex-1 bg-[#f7f4ee] border border-[#ece8dc] rounded-lg text-[#0b1220] font-semibold text-sm py-3 hover:bg-[#ece8dc] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-gradient-to-r from-[#c5a059] to-[#8a6d2f] rounded-lg text-white font-semibold text-sm py-3 disabled:opacity-60 disabled:cursor-not-allowed hover:brightness-105 transition-all shadow-lg shadow-[#c5a059]/20"
            >
              {saving ? "Saving…" : view === "create" ? "Publish Blog" : "Update Blog"}
            </button>
          </div>
        </aside>
      </form>
    </div>
  );

  // ============================================
  // RENDER: BLOG LIST
  // ============================================

  const renderList = () => (
    <div>
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
        <h1 className="text-[#0b1220] text-2xl font-semibold">Blogs</h1>
        <button
          onClick={() => {
            resetForm();
            setView("create");
          }}
          className="bg-gradient-to-r from-[#c5a059] to-[#8a6d2f] text-white font-semibold text-sm px-4 py-2.5 rounded-lg hover:brightness-105 transition-all shadow-md"
        >
          + New Blog
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <form onSubmit={handleSearchSubmit} className="flex gap-2 flex-1 min-w-[220px]">
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Search blogs…"
            className="flex-1 bg-white border border-[#ece8dc] rounded-lg px-3 py-2.5 text-[#0b1220] text-sm outline-none focus:border-[#c5a059] transition-colors"
          />
          <button
            type="submit"
            className="bg-[#f7f4ee] border border-[#ece8dc] text-[#71768a] px-4 rounded-lg text-sm hover:bg-[#ece8dc] transition-colors"
          >
            Search
          </button>
        </form>

        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="bg-white border border-[#ece8dc] rounded-lg px-3 py-2.5 text-[#0b1220] text-sm outline-none focus:border-[#c5a059]"
        >
          <option value="all">All statuses</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>

        <select
          name="per_page"
          value={filters.per_page}
          onChange={handleFilterChange}
          className="bg-white border border-[#ece8dc] rounded-lg px-3 py-2.5 text-[#0b1220] text-sm outline-none focus:border-[#c5a059]"
        >
          <option value={10}>10 / page</option>
          <option value={15}>15 / page</option>
          <option value={25}>25 / page</option>
          <option value={50}>50 / page</option>
        </select>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-[13px] px-3.5 py-2.5 rounded-lg mb-5">
          {error}
        </div>
      )}

      {/* Blogs Table */}
      <div className="bg-white border border-[#ece8dc] rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-[#71768a] text-sm">Loading…</div>
        ) : blogs.length === 0 ? (
          <div className="p-12 text-center text-[#71768a] text-sm">
            No blogs found.{" "}
            <button
              onClick={() => {
                resetForm();
                setView("create");
              }}
              className="text-[#c5a059] hover:underline"
            >
              Create one
            </button>
            .
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-[#faf9f6]">
                  <th className="text-left text-[#71768a] text-xs uppercase px-5 py-3.5 border-b border-[#ece8dc]">
                    Title
                  </th>
                  <th className="text-left text-[#71768a] text-xs uppercase px-5 py-3.5 border-b border-[#ece8dc]">
                    Author
                  </th>
                  <th className="text-left text-[#71768a] text-xs uppercase px-5 py-3.5 border-b border-[#ece8dc]">
                    Status
                  </th>
                  <th className="text-left text-[#71768a] text-xs uppercase px-5 py-3.5 border-b border-[#ece8dc]">
                    Created
                  </th>
                  <th className="border-b border-[#ece8dc] px-5 py-3.5"></th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-[#faf9f6] transition-colors">
                    <td className="px-5 py-3.5 text-[#0b1220] text-sm border-b border-[#ece8dc]">
                      {blog.title}
                    </td>
                    <td className="px-5 py-3.5 text-[#0b1220] text-sm border-b border-[#ece8dc]">
                      {blog.author || "—"}
                    </td>
                    <td className="px-5 py-3.5 text-sm border-b border-[#ece8dc]">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusBadge(blog.status)}`}>
                        {blog.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-[#0b1220] text-sm border-b border-[#ece8dc]">
                      {blog.created_at
                        ? new Date(blog.created_at).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "—"}
                    </td>
                    <td className="px-5 py-3.5 text-sm border-b border-[#ece8dc]">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleEdit(blog.id)}
                          disabled={busyId === blog.id}
                          className="text-[#c5a059] font-semibold hover:text-[#8a6d2f] disabled:opacity-50 transition-colors"
                        >
                          Edit
                        </button>

                        {blog.status !== "published" && (
                          <button
                            onClick={() => handleStatusChange(blog.id, "published")}
                            disabled={busyId === blog.id}
                            className="text-green-600 hover:text-green-800 disabled:opacity-50 transition-colors"
                          >
                            Publish
                          </button>
                        )}

                        {blog.status !== "draft" && (
                          <button
                            onClick={() => handleStatusChange(blog.id, "draft")}
                            disabled={busyId === blog.id}
                            className="text-[#71768a] hover:text-[#0b1220] disabled:opacity-50 transition-colors"
                          >
                            Unpublish
                          </button>
                        )}

                        {blog.status !== "archived" && (
                          <button
                            onClick={() => handleStatusChange(blog.id, "archived")}
                            disabled={busyId === blog.id}
                            className="text-[#71768a] hover:text-[#0b1220] disabled:opacity-50 transition-colors"
                          >
                            Archive
                          </button>
                        )}

                        <button
                          onClick={() => handleDelete(blog.id)}
                          disabled={busyId === blog.id}
                          className="text-red-500 hover:text-red-700 disabled:opacity-50 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {meta && meta.lastPage > 1 && (
        <div className="flex items-center justify-center gap-3 mt-5">
          <button
            onClick={() => handlePageChange(Math.max(1, filters.page - 1))}
            disabled={filters.page === 1}
            className="text-[#0b1220] text-sm px-3 py-1.5 rounded-lg bg-white border border-[#ece8dc] disabled:opacity-40 hover:bg-[#f7f4ee] transition-colors"
          >
            Prev
          </button>
          <span className="text-[#71768a] text-sm">
            Page {meta.currentPage} of {meta.lastPage} · {meta.total} total
          </span>
          <button
            onClick={() => handlePageChange(Math.min(meta.lastPage, filters.page + 1))}
            disabled={filters.page === meta.lastPage}
            className="text-[#0b1220] text-sm px-3 py-1.5 rounded-lg bg-white border border-[#ece8dc] disabled:opacity-40 hover:bg-[#f7f4ee] transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );

  // ============================================
  // MAIN RENDER
  // ============================================

  return (
    <div>
      {view === "list" ? renderList() : renderForm()}
    </div>
  );
}