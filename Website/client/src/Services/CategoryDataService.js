import axios from 'axios';

export const getAllCategories = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/category`);
};

export const getACategory = async (id) => {
  return await axios.get(`${process.env.REACT_APP_API}/category/${id}`);
};

export const getAllSubCategoriesOfACategory = (id) => {
  return axios.get(
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

export const deleteACategory = async (id, authtoken) => {
  return await axios.delete(`${process.env.REACT_APP_API}/category/${id}`, {
    headers: {
      authtoken,
    },
  });
};

export const updateACategory = async (id, categoryData, authtoken) => {
  return await axios.patch(
    `${process.env.REACT_APP_API}/category/${id}`,
    categoryData,
    {
      headers: {
        authtoken,
      },
    }
  );
};
