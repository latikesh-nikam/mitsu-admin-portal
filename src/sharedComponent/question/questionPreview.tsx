import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/src/styles.scss';

const QuestionPreview = (props: any) => {
  const { questionDetails } = props

  const displayOptions = (obj: any) => {
    let val;
    let options = []
    for(val in obj){
      options.push(val)
    }
    return(
      <ul>
        {options?.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    )
  }
  return (
    <>
      <p >{questionDetails?.description}</p>
      <p className="h6">{questionDetails?.title}</p>
      {/*questionDetails?.imageLink ? (
        <img src={questionDetails.imageLink} style={{
          width: "-webkit-fill-available",
          height: "15rem"
        }} alt="imageLinks" />
      ) : null*/}
      {/*questionDetails?.videoLink ? (
        <>
          <iframe src={questionDetails?.videoLink} title="video" style={{
            width: "-webkit-fill-available",
            height: "15rem"
          }}></iframe>
        </>
        ) : null*/}
      {/*questionDetails?.audioLink ? (
        <>
          <AudioPlayer
            autoPlay
            src={questionDetails?.audioLink}
            onPlay={e => console.log("onPlay")}
          // other props here
          />
        </>
      ) : null*/}
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
