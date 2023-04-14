import { useState, useEffect, BaseSyntheticEvent } from "react";
import {
  QuestionFormModal, QuestionPreviewModal, DeleteQuestionConfirmation, QuestionHeader, QuestionTable
} from "./question.data";
import { getQuestionDetails } from "../../services/service/user.service";
import QuestionEditModal from "./questionEditModal";

const PreQuestion = () => {
  const [showQuestionForm, setQuestionForm] = useState<boolean>(false);
  const [questionPreview, setQuestionPreview] = useState<boolean>(false);
  const [questionDelete, setQuestionDelete] = useState<boolean>(false);
  const [questionEdit, setQuestionEdit] = useState<boolean>(false);
  const [questionDetails, setQuestionDetails] = useState<any>({});
  const [questionType, setQuestionType] = useState<string>('All Questions')
  const [questions, setQuestions] = useState<any>([])
  const [editFormDetails, setEditFormDetails] = useState<any>({})

  const handleValue = (val: string) => {
    setQuestionType(val)
    getQuestions(val)
  }

  const handlePreviewIcon = (item: any) => {
    setQuestionPreview(!questionPreview)
    setQuestionDetails(item)
  }

  const handleDeleteAction = (item: any) => {
    setQuestionDelete(!questionDelete)
  }

  const handleEditIcon = (item: any, e: any) => {
    setQuestionEdit(!questionEdit)
    setEditFormDetails(item)
  }

  const getQuestions = async (category: string, type: string = 'PreOnboard') => {
    const response = await getQuestionDetails(category, type);
    setQuestions(response?.data?.data)
  }

  useEffect(() => {
    getQuestions('', 'PreOnboard')
  }, [])

  return (
    <>
      <QuestionHeader
        showQuestionForm={showQuestionForm}
        setQuestionForm={setQuestionForm}
        questionType={questionType}
        setQuestionType={setQuestionType}
        handleValue={handleValue}
      />
      {showQuestionForm && (
        <QuestionFormModal
          showQuestionForm={showQuestionForm}
          setQuestionForm={setQuestionForm}
        />
      )}
      {questionPreview && (
        <QuestionPreviewModal
          questionPreview={questionPreview}
          setQuestionPreview={setQuestionPreview}
          questionDetails={questionDetails}
        />
      )}
      {questionDelete && (
        <DeleteQuestionConfirmation
          questionDelete={questionDelete}
          setQuestionDelete={setQuestionDelete}
        />
      )}
      {questionEdit && (
        <QuestionEditModal
          questionEdit={questionEdit}
          setQuestionEdit={setQuestionEdit}
          editFormDetails={editFormDetails}
          setEditFormDetails={setEditFormDetails}
        />
      )}
      <QuestionTable
        questionSet={questions}
        questionPreview={questionPreview}
        setQuestionPreview={setQuestionPreview}
        handlePreviewIcon={handlePreviewIcon}
        handleDeleteAction={handleDeleteAction}
        handleEditIcon={handleEditIcon}
      />
    </>
  )
};

export default PreQuestion;
