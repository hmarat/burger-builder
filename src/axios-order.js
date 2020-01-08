import axios from "axios"

const instance = axios.create({
    baseURL: "https://burger-builder-134d9.firebaseio.com"
})

export default instance;