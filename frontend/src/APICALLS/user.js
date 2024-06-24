const {axiosInstance}=require(".")
export const registerUser = async (payload)=>{
    try {
        const response= await axiosInstance.post('/register',payload)
        return response.data
    } catch (error) {
        return error
    }
}
