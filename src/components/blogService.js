const API_BASE_URL = 'https://api.crazystory.in/api';

function getToken() {
  return typeof window !== 'undefined' ? localStorage.getItem('token') : null;
}

// For public blog listing (no auth required)
export async function getPublishedBlogs({ page = 1, per_page = 12 } = {}) {
  const params = new URLSearchParams();
  params.append('per_page', per_page);
  params.append('page', page);

  const token = getToken();

  try {
    const res = await fetch(`${API_BASE_URL}/admin/blogs?${params.toString()}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
      }
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: 'Network error while fetching blogs' };
  }
}

// For public - get blog by slug (fetches list and filters, since API is ID-based)
export async function getBlogBySlug(slug) {
  const token = getToken();
  try {
    const res = await fetch(`${API_BASE_URL}/admin/blogs?per_page=100&page=1`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
      }
    });
    const json = await res.json();
    if (json.success && json.data) {
      const list = json.data.data || [];
      const blog = list.find((b) => b.slug === slug);
      return blog
        ? { success: true, data: blog }
        : { success: false, message: 'Blog not found' };
    }
    return { success: false, message: 'Blog not found' };
  } catch (err) {
    return { success: false, message: 'Network error while fetching blog' };
  }
}

// For admin - get all blogs with filters
export async function getAllBlogs({ status = 'all', search = '', per_page = 15, page = 1 } = {}) {
  const token = getToken();
  const params = new URLSearchParams();
  if (status && status !== 'all') params.append('status', status);
  if (search) params.append('search', search);
  params.append('per_page', per_page);
  params.append('page', page);

  try {
    const res = await fetch(`${API_BASE_URL}/admin/blogs?${params.toString()}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: 'Network error while fetching blogs' };
  }
}

// For admin - get blog by ID with auth
export async function getAdminBlogById(id) {
  const token = getToken();
  try {
    const res = await fetch(`${API_BASE_URL}/admin/blogs/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: 'Network error while fetching blog' };
  }
}

export async function createBlog(formData) {
  const token = getToken();
  try {
    const res = await fetch(`${API_BASE_URL}/admin/blogs`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      },
      body: formData
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: 'Network error while creating blog' };
  }
}

export async function updateBlog(id, formData) {
  const token = getToken();
  formData.append('_method', 'PUT');

  try {
    const res = await fetch(`${API_BASE_URL}/admin/blogs/${id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      },
      body: formData
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: 'Network error while updating blog' };
  }
}

export async function updateBlogStatus(id, status) {
  const token = getToken();
  try {
    const res = await fetch(`${API_BASE_URL}/admin/blogs/${id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ _method: 'PUT', status })
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: 'Network error while updating status' };
  }
}

export async function deleteBlog(id) {
  const token = getToken();
  try {
    const res = await fetch(`${API_BASE_URL}/admin/blogs/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: 'Network error while deleting blog' };
  }
}