import axios from 'axios';

export const getAllCategories = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/category`);
};

export const getAllSubCategoriesOfACategory = async (id) => {
  return await axios.get(`${process.env.REACT_APP_API}/category/subCategory/${id}`);
};