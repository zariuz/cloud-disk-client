import axios from 'axios';
import {setUser} from '../reducers/user/userReducer';
import {API_URL} from '../config';

export const registration = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}api/auth/registration`, {
      email,
      password,
    });
    alert(response.data.message);
  } catch (e) {
    alert(e.response.data.message);
  }
};

export const login = (email: string, password: string) => {
  return async (dispatch: any) => {
    try {
      const response = await axios.post(`${API_URL}api/auth/login`, {
        email,
        password,
      });
      dispatch(setUser(response.data.user));
      localStorage.setItem('token', response.data.token);
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};

export const auth = () => {
  return async (dispatch: any) => {
    try {
      const response = await axios.get(`${API_URL}api/auth/auth`, {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
      });
      localStorage.setItem('token', response.data.token);
      dispatch(setUser(response.data.user));
    } catch (e) {
      localStorage.removeItem('token');
    }
  };
};

export const uploadAvatar = (file: any) => {
  return async (dispatch: any) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post(`${API_URL}api/files/avatar`, formData, {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
      });
      dispatch(setUser(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const deleteAvatar = () => {
  return async (dispatch: any) => {
    try {
      const response = await axios.delete(`${API_URL}api/files/avatar`, {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
      });
      dispatch(setUser(response.data));
    } catch (e) {
      console.log(e);
    }
  };
};
