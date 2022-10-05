import axios from "axios";

export const userCreateOrUpdate = async (authtoken, userData) => {
    return await axios.post(`${process.env.REACT_APP_API}/auth/user-create-or-update`, {
        token: authtoken,
        data: userData,
    });
};

export const currentUser = async (authtoken, email) => {
    return await axios.post(`${process.env.REACT_APP_API}/auth/current-user`, {
        token: authtoken,
        data: {
            email: email
        }
    });
};