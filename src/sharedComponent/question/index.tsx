import { useState } from "react";
import { AppHeader } from '../../component/topBar/index';
import { depressionQuestions, anxietyQuestions, otherQuestions } from "./questionSet";
import {
  QuestionFormModal, QuestionPreviewModal, DeleteQuestionConfirmation, QuestionHeader, QuestionTable
} from "./question.data";

const Question = () => {
  const [showQuestionForm, setQuestionForm] = useState(false);
  const [questionPreview, setQuestionPreview] = useState(false);
  const [questionDelete, setQuestionDelete] = useState(false);
  const [questionDetails, setQuestionDetails] = useState({});
  const [questionSet, setQuestionSet] = useState(depressionQuestions.concat(anxietyQuestions, otherQuestions));
  const [questionType, setQuestionType] = useState('All Questions')

  const handleValue = (val: string) => {
    setQuestionType(val)
    if (val === 'Anxiety') {
      setQuestionSet(anxietyQuestions)
    } else if (val === 'Depression') {
      setQuestionSet(depressionQuestions)
    } else if (val === 'Other') {
      setQuestionSet(otherQuestions)
    } else {
      setQuestionSet(depressionQuestions.concat(anxietyQuestions, otherQuestions))
    }
  }

  const handlePreviewIcon = (item: any) => {
    setQuestionPreview(!questionPreview)
    setQuestionDetails(item)
  }

  const handleDeleteAction = (item: any) => {
    setQuestionDelete(!questionDelete)
  }

  return (
    <>
      <AppHeader />
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
      <QuestionTable
        questionSet={questionSet}
        questionPreview={questionPreview}
        setQuestionPreview={setQuestionPreview}
        handlePreviewIcon={handlePreviewIcon}
        handleDeleteAction={handleDeleteAction}
      />
    </>
  )
};

export default Question;
