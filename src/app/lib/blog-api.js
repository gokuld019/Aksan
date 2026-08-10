// lib/blog-api.js
import axios from 'axios';

const API_BASE_URL = 'https://api.crazystory.in/api';

// Get auth token from localStorage
const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Create API client
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add token to every request
apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// ============================================
// BLOG API FUNCTIONS
// ============================================

/**
 * 1. Create a new blog
 */
export async function createBlog(data) {
  try {
    const response = await apiClient.post('/admin/blogs', data);
    return response.data.data || response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create blog');
  }
}

/**
 * 2. Get all blogs (Admin)
 */
export async function getAdminBlogs(params = {}) {
  try {
    const response = await apiClient.get('/admin/blogs', { params });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch blogs');
  }
}

/**
 * 3. Get single blog (Admin)
 */
export async function getAdminBlog(id) {
  try {
    const response = await apiClient.get(`/admin/blogs/${id}`);
    return response.data.data || response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch blog');
  }
}

/**
 * 4. Update blog
 */
export async function updateBlog(id, data) {
  try {
    const response = await apiClient.put(`/admin/blogs/${id}`, data);
    return response.data.data || response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update blog');
  }
}

/**
 * 5. Update blog status
 */
export async function updateBlogStatus(id, status) {
  try {
    const response = await apiClient.patch(`/admin/blogs/${id}/status`, { status });
    return response.data.data || response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update status');
  }
}

/**
 * 6. Delete blog
 */
export async function deleteBlog(id) {
  try {
    const response = await apiClient.delete(`/admin/blogs/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete blog');
  }
}

/**
 * 7. Public - Get published blogs
 */
export async function getPublicBlogs(params = {}) {
  try {
    const response = await apiClient.get('/public/blogs', { params });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch blogs');
  }
}

/**
 * 8. Public - Get featured blogs
 */
export async function getFeaturedBlogs() {
  try {
    const response = await apiClient.get('/public/blogs/featured');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch featured blogs');
  }
}

/**
 * 9. Public - Get blog by slug
 */
export async function getBlogBySlug(slug) {
  try {
    const response = await apiClient.get(`/public/blogs/${slug}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch blog');
  }
}