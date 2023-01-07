import axios from 'axios';

export const getAllUsers = async (authtoken) => {
    return await axios.get(`${process.env.REACT_APP_API}/user`, {
      headers: {
        authtoken,
      },
    });
  };

  export const updateAUser = async (id, userData, authtoken) => {
    return await axios.patch(
        `${process.env.REACT_APP_API}/user/${id}`,
        userData,
        {
            headers: {
                authtoken,
            },
        }
    );
  };