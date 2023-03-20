import { getQuestions, addQuestion, updateQuestion, deleteQuestion } from "../constants/urls";
import axiosInstance from "./axios.instance";

export const getQuestionDetails = async () => {
  try {
    const res = await axiosInstance.get(getQuestions)
    console.log(res)
  } catch (e) {
    console.log(e)
  }
};

export const addQuestionDetails = async (data: any) => {
  try {
    const res = await axiosInstance.post(addQuestion, data)
    console.log(res)
  } catch (e) {
    console.log(e)
  }
};

export const updateQuestionDetails = async (questionId: string, data: any) => {
  try {
    const res  = await axiosInstance.put(`${updateQuestion}/${questionId}`, data)
    console.log(res)
  } catch (e) {
    console.log(e)
  }
};

export const deleteQuestions = async (questionId: string) => {
  try {
    const res = await axiosInstance.delete(`${deleteQuestion}/${questionId}`)
    console.log(res)
  } catch (error) {
    console.log(error)
  }
};
