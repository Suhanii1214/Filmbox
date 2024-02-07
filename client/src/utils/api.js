import axios from "axios";
import ENV from './config'

const BASE_URL = "https://api.themoviedb.org/3"

const headers = {
    Authorization: "Bearer " + ENV.VITE_APP_TMBD_TOKEN,
};

export const fetchDataFromApi = async (url, params) => {
    try {
        const {data} = await axios.get(BASE_URL + url, {
            headers,
            params
        })
        return data
    } catch (error) {
        console.log(error);
        return error;
    }
}