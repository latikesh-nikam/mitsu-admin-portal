import DOMPurify from 'dompurify';

const QuestionPreview = (props: any) => {
  const { questionDetails } = props

  const displayOptions = (obj: any) => {
    let val;
    let options = []
    for (val in obj) {
      options.push(val)
    }
    return (
      <ul>
        {options?.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    )
  };

  return (
    <>
      <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(`${questionDetails?.description}`) }}></p>
      <p className="h6">{questionDetails?.title}</p>
      {questionDetails?.options ? (
        <>
          <p className="h6">Options</p>
          {displayOptions(questionDetails?.options)}
        </>
      ) : null}
    </>
  )
};

export default QuestionPreview;
