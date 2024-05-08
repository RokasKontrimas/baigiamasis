import axios from "../axios.jsx";
import {useNavigate} from "react-router-dom";
export const createData = async (array, url) => {
    for (const item of array) {
        try {
            const postData = {
                counter: `${Math.floor(Math.random() * item.id * 100)}`,
                animalId: item.id
            }
            await axios.post(url, postData);
        } catch (error) {
            console.error('Error creating data:', error);
        }
    }
};
export const getData = async (url) => {
    try {
        const response = await axios.get(url);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export const sortData = async (url, desc, related) => {
    try {
        const response = await axios.get(url);
        if (desc && related) {
            // Sort in descending order by counter
            const sortedData = response.data.sort((a, b) => b.counter - a.counter);
            return sortedData.slice(0, 3);
        } else {
            // Sort in ascending order by counter
            return response.data.sort((a, b) => a.counter - b.counter);
        }

    } catch (error) {
        console.error(error);
        throw error;
    }
}
export const deleteItemHandler = async (url, item, navigate) => {
    try {
        await axios.delete(`${url}/${item.id}`).then(() => {
            navigate(url, { state: { message: { success: `${item.id} deleted successfully!` } } });
        });
    } catch (error) {
        console.log(error);
    }
};