import axios from 'axios';

export const getAllCategories = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/category`);
};

export const getAllSubCategoriesOfACategory = async (id) => {
  return await axios.get(
    `${process.env.REACT_APP_API}/category/subCategory/${id}`
  );
};

export const createCategory = async (categoryData, authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/category`,
    categoryData,
    {
      headers: {
        authtoken,
      },
    }
  );
};