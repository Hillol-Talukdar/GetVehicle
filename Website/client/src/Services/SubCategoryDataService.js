import axios from 'axios';

export const createSubCategory = async (subCategoryData, authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/subCategory`,
    subCategoryData,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getAllSubCategories = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/subCategory`);
};

export const updateASubCategory = async (id, subCategoryData, authtoken) => {
  return await axios.patch(
    `${process.env.REACT_APP_API}/subCategory/${id}`,
    subCategoryData,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const deleteASubCategory = async (id, authtoken) => {
  return await axios.delete(`${process.env.REACT_APP_API}/subCategory/${id}`, {
    headers: {
      authtoken,
    },
  });
};
