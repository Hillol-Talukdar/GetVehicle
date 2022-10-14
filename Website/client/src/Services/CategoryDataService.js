import axios from 'axios';

export const getAllCategories = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/category`);
};

export const getAllSUbCategoriesOfACategory = async (id) => {
  return await axios.get(`${process.env.REACT_APP_API}/category/subCategory/${id}`);
};