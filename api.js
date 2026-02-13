// API Configuration
// Updated for production backend (replace with your real production URL if needed)
const API_BASE_URL = 'https://neighbour-nurturing-system-production.up.railway.app/api';

// Helper function to get auth token
function getAuthToken() {
  return localStorage.getItem('authToken');
}

// Helper function to store auth token
function setAuthToken(token) {
  localStorage.setItem('authToken', token);
}

// Helper function for API calls
async function apiCall(endpoint, method = 'GET', body = null) {
  const headers = {
    'Content-Type': 'application/json'
  };

  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API Error');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    alert(error.message);
    throw error;
  }
}

// ============ USER API ============

async function registerUser(userData) {
  const response = await apiCall('/users/register', 'POST', userData);
  setAuthToken(response.token);
  return response.user;
}

async function loginUser(email, password) {
  const response = await apiCall('/users/login', 'POST', { email, password });
  setAuthToken(response.token);
  return response.user;
}

async function getCurrentUser() {
  const response = await apiCall('/users/profile/me');
  return response.user;
}

async function getAllUsers() {
  const response = await apiCall('/users');
  return response.users;
}

async function getUserById(id) {
  const response = await apiCall(`/users/${id}`);
  return response.user;
}

async function updateUserProfile(id, userData) {
  const response = await apiCall(`/users/${id}`, 'PUT', userData);
  return response.user;
}

// ============ NEIGHBOR API ============

async function getAllNeighbors() {
  const response = await apiCall('/neighbors');
  return response.neighbors;
}

async function searchNeighbors(skill, interest) {
  let url = '/neighbors/search?';
  if (skill) url += `skill=${skill}`;
  if (interest) url += `interest=${interest}`;
  
  const response = await apiCall(url);
  return response.neighbors;
}

async function getNeighborById(id) {
  const response = await apiCall(`/neighbors/${id}`);
  return response.neighbor;
}

// ============ RESOURCE API ============

async function createResource(resourceData) {
  const response = await apiCall('/resources', 'POST', resourceData);
  return response.resource;
}

async function getAllResources() {
  const response = await apiCall('/resources');
  return response.resources;
}

async function getResourceById(id) {
  const response = await apiCall(`/resources/${id}`);
  return response.resource;
}

async function updateResource(id, resourceData) {
  const response = await apiCall(`/resources/${id}`, 'PUT', resourceData);
  return response.resource;
}

async function deleteResource(id) {
  const response = await apiCall(`/resources/${id}`, 'DELETE');
  return response;
}

// ============ EVENT API ============

async function createEvent(eventData) {
  const response = await apiCall('/events', 'POST', eventData);
  return response.event;
}

async function getAllEvents() {
  const response = await apiCall('/events');
  return response.events;
}

async function getEventById(id) {
  const response = await apiCall(`/events/${id}`);
  return response.event;
}

async function attendEvent(id) {
  const response = await apiCall(`/events/${id}/attend`, 'POST');
  return response.event;
}

async function leaveEvent(id) {
  const response = await apiCall(`/events/${id}/leave`, 'POST');
  return response.event;
}

async function updateEvent(id, eventData) {
  const response = await apiCall(`/events/${id}`, 'PUT', eventData);
  return response.event;
}

async function deleteEvent(id) {
  const response = await apiCall(`/events/${id}`, 'DELETE');
  return response;
}

// ============ AUTHENTICATION HELPER ============

function isLoggedIn() {
  return !!getAuthToken();
}

function logout() {
  localStorage.removeItem('authToken');
  window.location.href = '/';
}
