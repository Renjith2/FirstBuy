import axios from 'axios'
export const axiosInstance = axios.create({
    headers:{
        Credentials:'include',
        method:'post',
        'Content-Type':'application/json'
    }
})