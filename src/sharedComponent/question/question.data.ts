import React from "react";

const QuestionFormModal = React.lazy(() => import("./questionFormModal"));
const QuestionPreviewModal = React.lazy(() => import("./questionPreviewModal"));
const DeleteQuestionConfirmation = React.lazy(() => import("./deleteConfirmationModal"));
const QuestionTable = React.lazy(() => import("./questionTable"));
const QuestionHeader = React.lazy(() => import("./questionHeader"));

export {
  QuestionFormModal,
  QuestionPreviewModal,
  DeleteQuestionConfirmation,
  QuestionHeader,
  QuestionTable
}