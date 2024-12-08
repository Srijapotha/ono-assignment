import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const signup = async (name, email, password) => {
  const response = await axios.post(`${API_URL}/signup`, { name, email, password });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};