import axiosInstance from "./axios.instance";

export const getPatientDetails = async () => {
    try {
        const res = await axiosInstance.get('/users?role=Patient')
        return res
    } catch (e) {
        console.error(e)
    }
};
