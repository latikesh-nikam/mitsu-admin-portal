import axiosInstance from "./axios.instance";
import { addTherapist } from "../constants/urls";

export const getTherapistDetails = async () => {
    try {
        const res = await axiosInstance.get('/users?role=Therapist')
        return res
    } catch (e) {
        console.error(e)
    }
};

export const addTherapistUser = async (therapistDetails: any) => {
    try {
        const res = await axiosInstance.post(addTherapist, therapistDetails)
        return res
    } catch (e) {
        console.error(e)
    }
};

export const updateTherapistUser = async () => {
    try {
        const res = await axiosInstance.put(addTherapist)
        return res
    } catch (e) {
        console.error(e)
    }
};