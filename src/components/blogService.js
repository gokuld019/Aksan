const API_BASE_URL = 'https://aksan.athmamind.com/api'; // Fixed typo: was api.craystory.in

function getToken() {
  return typeof window !== 'undefined' ? localStorage.getItem('token') : null;
}

// For public blog listing (no auth required)
export async function getPublishedBlogs({ page = 1, per_page = 12 } = {}) {
  const params = new URLSearchParams();
  params.append('per_page', per_page);
  params.append('page', page);

  try {
    const res = await fetch(`${API_BASE_URL}/public/blogs?${params.toString()}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    });
    const json = await res.json();

    // API returns { success, data: { data: [...], current_page, ... }, message }
    // Normalize so callers always get a flat array in res.data
    if (json.success && json.data) {
      if (Array.isArray(json.data)) {
        return { success: true, data: json.data };
      }
      if (json.data.data && Array.isArray(json.data.data)) {
        return { success: true, data: json.data.data, meta: json.data };
      }
    }
    return json;
  } catch (err) {
    return { success: false, message: 'Network error while fetching blogs' };
  }
}

// For public - get featured blogs
export async function getFeaturedBlogs() {
  try {
    const res = await fetch(`${API_BASE_URL}/public/blogs/featured`, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: 'Network error while fetching featured blogs' };
  }
}

// For public - get blog by slug
export async function getBlogBySlug(slug) {
  try {
    const res = await fetch(`${API_BASE_URL}/public/blogs/${slug}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    });
    return await res.json();
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
    const res = await fetch(`${API_BASE_URL}/public/blogs?${params.toString()}`, {
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

// For admin - get blog by ID
export async function getBlogById(id) {
  const token = getToken();
  try {
    const res = await fetch(`${API_BASE_URL}/public/blogs/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
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
    const res = await fetch(`${API_BASE_URL}/public/blogs`, {
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
    const res = await fetch(`${API_BASE_URL}/public/blogs/${id}`, {
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
    const res = await fetch(`${API_BASE_URL}/public/blogs/${id}`, {
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
    const res = await fetch(`${API_BASE_URL}/public/blogs/${id}`, {
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