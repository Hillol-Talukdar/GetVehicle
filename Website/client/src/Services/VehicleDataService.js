import axios from "axios";

export const getAllVehicleList = async() => {
    return await axios.get('http://localhost:4000/api/vehicle');
}