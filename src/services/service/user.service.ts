import { getQuestions, addQuestion, updateQuestion, deleteQuestion, logOutUser, user } from "../../utils/constants/urls";
import axiosInstance from "./axios.instance";

export const getQuestionDetails = async (category: string, type: string) => {
  try {
    if (category && category !== 'All Questions') {
      const res = await axiosInstance.get(`${getQuestions}?type=${type}&category=${category}`)
      return res
    } else {
      const res = await axiosInstance.get(`${getQuestions}?type=${type}`)
      return res
    }

  } catch (e) {
    console.error(e)
  }
};

export const addQuestionDetails = async (data: any) => {
  try {
    const res = await axiosInstance.post(addQuestion, data)
    return res
  } catch (e) {
    console.error(e)
  }
};

export const updateQuestionDetails = async (data: any) => {
  try {
    const res = await axiosInstance.put(`${updateQuestion}`, data)
    return res
  } catch (e) {
    console.error(e)
  }
};

export const deleteQuestions = async (questionId: string) => {
  try {
    const res = await axiosInstance.delete(`${deleteQuestion}/${questionId}`)
    return res
  } catch (error) {
    console.error(error)
  }
};

export const userLogOut = async () => {
  try {
    const res = await axiosInstance.delete(logOutUser)
    return res
  } catch (error) {
    console.error(error)
  }
}

export const userDelete = async (data: any) => {
  try {
    const res = await axiosInstance.delete(`${user}?id=${data.id}`)
    return res
  } catch (error) {
    console.error(error)
  }
}

export const getPostOnBoardingQuestions = async () => {
  try {
    const res = await axiosInstance.get('/questions?type=PostOnboard')
    return res
  } catch (e) {
    console.error(e)
  }
}