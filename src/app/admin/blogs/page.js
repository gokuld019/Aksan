// app/admin/blogs/page.js
"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

// ============================================
// BLOG SERVICE (Integrated in same file)
// ============================================

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.crazystory.in/api";

// Images now live in THIS Next.js app's /public folder, so we resolve
// relative paths against our own origin instead of the backend's storage host.
function resolveImageUrl(path) {
  if (!path || typeof path !== "string") return null;
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return cleanPath; // served straight from our own /public
}

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
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
};

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

const buildQuery = (params = {}) => {
  const cleaned = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== "")
  );
  return new URLSearchParams(cleaned).toString();
};

const formatPublishedAt = (value) => {
  if (!value) return "";
  const normalized = value.length === 16 ? `${value}:00` : value;
  return normalized.replace("T", " ");
};

// ================================================
// AUTH
// ================================================

const login = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: getHeaders(false),
    body: JSON.stringify({ email, password }),
  });

  const rawText = await response.text();
  let data = null;
  try {
    data = rawText ? JSON.parse(rawText) : null;
  } catch {}

  if (!response.ok || data?.status !== "success") {
    throw new Error((data && data.message) || "Invalid email or password");
  }

  if (data?.access_token) setToken(data.access_token);
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
// LOCAL IMAGE UPLOAD (stores in THIS app's /public/uploads/blogs)
// Hits our own /api/upload route, not the backend. Returns a plain
// string path like "/uploads/blogs/169999_ab12cd.jpg" which is what
// gets sent to createBlog/updateBlog as featured_image.
// ================================================

const uploadBlogImageLocally = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  console.log("[uploadBlogImageLocally] POST /api/upload, file:", file?.name);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  let data = null;
  try {
    data = await response.json();
  } catch {}

  if (!response.ok) {
    throw new Error((data && data.error) || "Local image upload failed");
  }

  console.log("[uploadBlogImageLocally] response:", data);
  return data.path; // e.g. "/uploads/blogs/169999_ab12cd.jpg"
};

// ================================================
// ADMIN BLOG ENDPOINTS (Bearer token required)
// featured_image is ALWAYS a plain string — the file itself never
// goes to the backend, only the local URL path from uploadBlogImageLocally.
// ================================================

const createBlog = async (blogData) => {
  console.log("[createBlog] POST", `${API_URL}/admin/blogs`, "payload:", blogData);
  const response = await fetch(`${API_URL}/admin/blogs`, {
    method: "POST",
    headers: getHeaders(true),
    body: JSON.stringify(blogData),
  });
  return handleResponse(response, "createBlog");
};

const getAllBlogs = async (params = {}) => {
  const query = buildQuery(params);
  const url = `${API_URL}/admin/blogs?${query}`;
  const response = await fetch(url, {
    method: "GET",
    headers: getHeaders(),
  });
  return handleResponse(response, "getAllBlogs");
};

const getBlogById = async (id) => {
  const response = await fetch(`${API_URL}/admin/blogs/${id}`, {
    method: "GET",
    headers: getHeaders(),
  });
  return handleResponse(response, "getBlogById");
};

const updateBlog = async (id, blogData) => {
  console.log("[updateBlog] PUT (JSON)", `${API_URL}/admin/blogs/${id}`, "payload:", blogData);
  const response = await fetch(`${API_URL}/admin/blogs/${id}`, {
    method: "PUT",
    headers: getHeaders(true),
    body: JSON.stringify(blogData),
  });
  return handleResponse(response, "updateBlog");
};

const updateBlogStatus = async (id, status) => {
  const response = await fetch(`${API_URL}/admin/blogs/${id}/status`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify({ status }),
  });
  return handleResponse(response, "updateBlogStatus");
};

const deleteBlog = async (id) => {
  const response = await fetch(`${API_URL}/admin/blogs/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  return handleResponse(response, "deleteBlog");
};

// ================================================
// PUBLIC BLOG ENDPOINTS (no auth required)
// ================================================

const getPublishedBlogs = async (params = {}) => {
  const query = buildQuery(params);
  const url = `${API_URL}/public/blogs?${query}`;
  const response = await fetch(url, {
    method: "GET",
    headers: getHeaders(false),
  });
  return handleResponse(response, "getPublishedBlogs");
};

const getFeaturedBlogs = async () => {
  const response = await fetch(`${API_URL}/public/blogs/featured`, {
    method: "GET",
    headers: getHeaders(false),
  });
  return handleResponse(response, "getFeaturedBlogs");
};

const getBlogBySlug = async (slug) => {
  const response = await fetch(`${API_URL}/public/blogs/${slug}`, {
    method: "GET",
    headers: getHeaders(false),
  });
  return handleResponse(response, "getBlogBySlug");
};

// ============================================
// CONSTANTS
// ============================================

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
  );
  const [editingId, setEditingId] = useState(null);

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

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    author: "",
    status: "draft",
    seoTitle: "",
    seoDescription: "",
    tagsInput: "",
    readingTime: "",
    featuredImage: null, // File object selected by user (not yet uploaded)
    existingImage: "",   // string path already on the blog
    published_at: "",
  });
  const [imagePreview, setImagePreview] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formError, setFormError] = useState("");

  // ============================================
  // FETCH BLOGS
  // ============================================

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getAllBlogs(filters);

      let list = null;
      let pagination = null;
      const root = response?.data ?? response;

      if (Array.isArray(root)) {
        list = root;
      } else if (root && typeof root === "object") {
        if (Array.isArray(root.data)) {
          list = root.data;
          pagination = {
            currentPage: root.current_page ?? 1,
            lastPage: root.last_page ?? 1,
            total: root.total ?? list.length,
          };
        } else if (Array.isArray(root.blogs)) {
          list = root.blogs;
          const p = root.pagination || {};
          pagination = {
            currentPage: p.current_page ?? 1,
            lastPage: p.last_page ?? 1,
            total: p.total ?? list.length,
          };
        } else if (Array.isArray(root.items)) {
          list = root.items;
        }
      }

      if (list) {
        setBlogs(list);
        setMeta(pagination);
      } else {
        setBlogs([]);
        setMeta(null);
        setError("Unexpected response format from server. Check the browser console for details.");
      }
    } catch (err) {
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

      // If a new file was picked, save it locally in /public/uploads/blogs
      // and use the returned path as featured_image.
      let imagePath = "";
      if (formData.featuredImage) {
        setUploadingImage(true);
        try {
          imagePath = await uploadBlogImageLocally(formData.featuredImage);
        } finally {
          setUploadingImage(false);
        }
        if (!imagePath) {
          throw new Error("Local image upload succeeded but no path was returned.");
        }
      }

      const payload = {
        title: formData.title,
        description: formData.description,
        content: formData.content,
        author: formData.author,
        status: formData.status,
        featured_image: imagePath || null,
        meta_data: {
          seo_title: formData.seoTitle,
          seo_description: formData.seoDescription,
          keywords: tags,
          reading_time: formData.readingTime ? Number(formData.readingTime) : undefined,
        },
      };

      if (formData.published_at) {
        payload.published_at = formatPublishedAt(formData.published_at);
      }

      const response = await createBlog(payload);

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
      setUploadingImage(false);
    }
  };

  const handleEdit = async (id) => {
    setLoading(true);
    setFormError("");

    try {
      const response = await getBlogById(id);

      if (response?.success && response.data) {
        const blog = response.data;

        const rawImage =
          typeof blog.featured_image === "string"
            ? blog.featured_image
            : typeof blog.image_url === "string"
            ? blog.image_url
            : "";

        setFormData({
          title: blog.title || "",
          description: blog.description || "",
          content: blog.content || "",
          author: blog.author || "",
          status: blog.status || "draft",
          seoTitle: blog.meta_data?.seo_title || "",
          seoDescription: blog.meta_data?.seo_description || "",
          tagsInput: blog.meta_data?.keywords?.join(", ") || blog.meta_data?.tags?.join(", ") || "",
          readingTime: blog.meta_data?.reading_time ?? "",
          featuredImage: null,
          existingImage: rawImage,
          published_at: blog.published_at ? new Date(blog.published_at).toISOString().slice(0, 16) : "",
        });

        setImagePreview(rawImage ? resolveImageUrl(rawImage) : "");

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

      // Default to whatever string path already exists on the blog.
      let imagePath = formData.existingImage || "";

      // If a new file was picked, save it locally and replace imagePath.
      if (formData.featuredImage) {
        setUploadingImage(true);
        try {
          imagePath = await uploadBlogImageLocally(formData.featuredImage);
        } finally {
          setUploadingImage(false);
        }
        if (!imagePath) {
          throw new Error("Local image upload succeeded but no path was returned.");
        }
      }

      const payload = {
        title: formData.title,
        description: formData.description,
        content: formData.content,
        author: formData.author,
        status: formData.status,
        meta_data: {
          seo_title: formData.seoTitle,
          seo_description: formData.seoDescription,
          keywords: tags,
          reading_time: formData.readingTime ? Number(formData.readingTime) : undefined,
        },
      };

      // Only ever send featured_image as a plain string.
      if (imagePath && typeof imagePath === "string") {
        payload.featured_image = imagePath;
      }

      if (formData.published_at) {
        payload.published_at = formatPublishedAt(formData.published_at);
      }

      const response = await updateBlog(editingId, payload);

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
      setUploadingImage(false);
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

  const handleStatusChange = async (id, status) => {
    if (!confirm(`Change blog status to "${status}"?`)) return;

    setBusyId(id);
    try {
      const response = await updateBlogStatus(id, status);
      if (response?.success) {
        setBlogs((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
        alert(`Blog status updated to "${status}" successfully!`);
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
      readingTime: "",
      featuredImage: null,
      existingImage: "",
      published_at: "",
    });
    setImagePreview("");
    setEditingId(null);
    setFormError("");
    setSaving(false);
    setUploadingImage(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setFormError("Image size should be less than 5MB");
        e.target.value = "";
        return;
      }

      const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
      if (!allowedTypes.includes(file.type)) {
        setFormError("Please upload a valid image (JPEG, PNG, WebP, or GIF)");
        e.target.value = "";
        return;
      }

      setFormData((prev) => ({ ...prev, featuredImage: file }));

      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
      setFormError("");
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, featuredImage: null, existingImage: "" }));
    setImagePreview("");
    const fileInput = document.getElementById("featured_image");
    if (fileInput) fileInput.value = "";
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
        <button onClick={cancelForm} className="text-[#71768a] hover:text-[#0b1220] transition-colors">
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

          <div>
            <label className="block text-[#0b1220] text-sm font-medium mb-1.5">
              Publish Date/Time
            </label>
            <input
              type="datetime-local"
              name="published_at"
              value={formData.published_at}
              onChange={handleFormChange}
              className="w-full bg-[#faf9f6] border border-[#ece8dc] rounded-lg px-3 py-2.5 text-[#0b1220] text-sm outline-none focus:border-[#c5a059] transition-colors"
            />
          </div>

          <div>
            <label className="block text-[#0b1220] text-sm font-medium mb-1.5">
              Reading Time (minutes)
            </label>
            <input
              type="number"
              name="readingTime"
              min="1"
              value={formData.readingTime}
              onChange={handleFormChange}
              className="w-full bg-[#faf9f6] border border-[#ece8dc] rounded-lg px-3 py-2.5 text-[#0b1220] text-sm outline-none focus:border-[#c5a059] transition-colors"
              placeholder="e.g. 8"
            />
          </div>

          <div>
            <label className="block text-[#0b1220] text-sm font-medium mb-1.5">
              Featured Image
            </label>

            <div className="space-y-3">
              <input
                id="featured_image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full bg-[#faf9f6] border border-[#ece8dc] rounded-lg px-3 py-2.5 text-[#0b1220] text-sm outline-none focus:border-[#c5a059] transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#c5a059] file:text-white hover:file:bg-[#8a6d2f]"
              />

              {imagePreview && (
                <div className="relative inline-block">
                  <img
                    src={imagePreview}
                    alt="Featured image preview"
                    className="rounded-lg border border-[#ece8dc] max-h-48 object-cover"
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                </div>
              )}

              {uploadingImage && (
                <p className="text-[#71768a] text-xs">Saving image locally…</p>
              )}

              {view === "edit" && formData.existingImage && !imagePreview && (
                <div className="text-sm text-[#71768a]">
                  Current image: {formData.existingImage.split("/").pop()}
                </div>
              )}
            </div>
          </div>
        </div>

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
              <label className="block text-[#71768a] text-xs mb-1">Tags (comma-separated)</label>
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
            <label className="block text-[#0b1220] text-sm font-medium mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleFormChange}
              className="w-full bg-[#faf9f6] border border-[#ece8dc] rounded-lg px-3 py-2.5 text-[#0b1220] text-sm outline-none focus:border-[#c5a059] transition-colors"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
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
              disabled={saving || uploadingImage}
              className="flex-1 bg-gradient-to-r from-[#c5a059] to-[#8a6d2f] rounded-lg text-white font-semibold text-sm py-3 disabled:opacity-60 disabled:cursor-not-allowed hover:brightness-105 transition-all shadow-lg shadow-[#c5a059]/20"
            >
              {saving || uploadingImage ? "Saving…" : view === "create" ? "Publish Blog" : "Update Blog"}
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

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-[13px] px-3.5 py-2.5 rounded-lg mb-5">
          {error}
        </div>
      )}

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
                  <th className="text-left text-[#71768a] text-xs uppercase px-5 py-3.5 border-b border-[#ece8dc]">Image</th>
                  <th className="text-left text-[#71768a] text-xs uppercase px-5 py-3.5 border-b border-[#ece8dc]">Title</th>
                  <th className="text-left text-[#71768a] text-xs uppercase px-5 py-3.5 border-b border-[#ece8dc]">Author</th>
                  <th className="text-left text-[#71768a] text-xs uppercase px-5 py-3.5 border-b border-[#ece8dc]">Status</th>
                  <th className="text-left text-[#71768a] text-xs uppercase px-5 py-3.5 border-b border-[#ece8dc]">Created</th>
                  <th className="border-b border-[#ece8dc] px-5 py-3.5"></th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => {
                  const thumbUrl = resolveImageUrl(blog.featured_image);
                  return (
                    <tr key={blog.id} className="hover:bg-[#faf9f6] transition-colors">
                      <td className="px-5 py-3.5 border-b border-[#ece8dc]">
                        {thumbUrl ? (
                          <img
                            src={thumbUrl}
                            alt={blog.title}
                            className="w-12 h-12 object-cover rounded-lg"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                              e.currentTarget.nextSibling.style.display = "flex";
                            }}
                          />
                        ) : null}
                        <div
                          className="w-12 h-12 bg-[#f7f4ee] rounded-lg items-center justify-center text-[#71768a] text-xs"
                          style={{ display: thumbUrl ? "none" : "flex" }}
                        >
                          No img
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-[#0b1220] text-sm border-b border-[#ece8dc]">{blog.title}</td>
                      <td className="px-5 py-3.5 text-[#0b1220] text-sm border-b border-[#ece8dc]">{blog.author || "—"}</td>
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
                        <div className="flex items-center gap-3 flex-wrap">
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

                          {blog.status !== "draft" && blog.status !== "archived" && (
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

                          {blog.status === "archived" && (
                            <button
                              onClick={() => handleStatusChange(blog.id, "draft")}
                              disabled={busyId === blog.id}
                              className="text-blue-600 hover:text-blue-800 disabled:opacity-50 transition-colors"
                            >
                              Restore
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
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

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

  return <div>{view === "list" ? renderList() : renderForm()}</div>;
}