import { CButton, CDropdownToggle, CDropdownMenu, CDropdownItem, CDropdown } from '@coreui/react'
import styles from "./questionHeader.module.scss";
import { BaseSyntheticEvent } from 'react';

const QuestionHeader = (props: any) => {
  const { showQuestionForm, setQuestionForm, questionType, handleValue } = props;

  return (
    <div className={styles.questionHeaderWrapper}>
      <CButton color="primary" variant="outline" onClick={(e: BaseSyntheticEvent) => {
        e.stopPropagation()
        setQuestionForm(!showQuestionForm)
      }}>Add Question</CButton>
      <CDropdown style={{ marginLeft: "0.35rem" }}  >
        <CDropdownToggle href="#" variant="outline" color="primary">{questionType}</CDropdownToggle>
        <CDropdownMenu>
          <CDropdownItem href="#" onClick={() => handleValue('All Questions')}>All Questions</CDropdownItem>
          <CDropdownItem href="#" onClick={() => handleValue('Anxiety')}>Anxiety</CDropdownItem>
          <CDropdownItem href="#" onClick={() => handleValue('Depression')}>Depression</CDropdownItem>
          <CDropdownItem href="#" onClick={() => handleValue('Other')}>Other</CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    </div>
  )
};

export default QuestionHeader;
