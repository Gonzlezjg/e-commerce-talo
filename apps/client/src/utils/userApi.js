import axios from 'axios';

const BASE_URL = '/api';

export const createUserAPI = async (userData, accessToken) => {
  const response = await axios.post(`${BASE_URL}/users/create`, userData, {
    headers: { 'A-Token': accessToken },
  });
  return response;
};

export const readUserAPI = async (userId, accessToken) => {
  const response = await axios.get(`${BASE_URL}/users/${userId}`, {
    headers: { 'A-Token': accessToken },
  });
  return response;
};

export const updateUserAPI = async (userId, updatedData, accessToken) => {
  const response = await axios.put(
    `${BASE_URL}/users/update/${userId}`,
    updatedData,
    {
      headers: { 'A-Token': accessToken },
    }
  );
  return response;
};

export const deleteUserAPI = async (userId, accessToken) => {
  const response = await axios.delete(`${BASE_URL}/delete/${userId}`, {
    headers: { 'A-Token': accessToken },
  });
  return response;
};
