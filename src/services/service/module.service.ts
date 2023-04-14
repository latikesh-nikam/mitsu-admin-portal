import axiosInstance from "./axios.instance";

export const getAllModules = async () => {
    try {
      const res = await axiosInstance.get('/programs/modules')
      return res
    } catch (e) {
      console.error(e)
    }
};

export const getProgramsByCategories = async(category: string) => {
  try {
    const res = await axiosInstance.get(`/programs?category=${category}`)
    return res;
  } catch (error) {
    console.error(error)
  }
};

export const assignModuleToCategories = async(payload: any) => {
  try {
    const res = await axiosInstance.put('/programs', payload)
    return res;
  } catch (error) {
    console.error(error)
  }
};

export const addModules = async(payload: any) => {
  try {
    const res = await axiosInstance.post('/programs/modules', payload)
    return res;
  } catch (error) {
    console.error(error)
  }
}
