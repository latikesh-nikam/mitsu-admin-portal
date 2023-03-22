import { getQuestions, addQuestion, updateQuestion, deleteQuestion, logOutUser } from "../constants/urls";
import axiosInstance from "./axios.instance";

export const getQuestionDetails = async (category: string) => {
  try {
    if(category && category!== 'All Questions'){
      const res = await axiosInstance.get(`${getQuestions}?category=${category}`)
      return res
    } else {
      const res = await axiosInstance.get(`${getQuestions}`)
      return res
    }
   
  } catch (e) {
    console.log(e)
  }
};

export const addQuestionDetails = async (data: any) => {
  try {
    const res = await axiosInstance.post(addQuestion, data)
    return res
  } catch (e) {
    console.log(e)
  }
};

export const updateQuestionDetails = async (questionId: string, data: any) => {
  try {
    const res  = await axiosInstance.put(`${updateQuestion}/${questionId}`, data)
    return res
  } catch (e) {
    console.log(e)
  }
};

export const deleteQuestions = async (questionId: string) => {
  try {
    const res = await axiosInstance.delete(`${deleteQuestion}/${questionId}`)
    return res
  } catch (error) {
    console.log(error)
  }
};

export const userLogOut = async () => {
  try {
    const res = await axiosInstance.delete(logOutUser)
    return res
  } catch (error) {
    console.log(error)
  }
}
