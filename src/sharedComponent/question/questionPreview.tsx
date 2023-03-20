import React from "react";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/src/styles.scss';

const QuestionPreview = (props: any) => {
  const { questionDetails } = props
  return (
    <>
      <p >{questionDetails?.description}</p>
      <p className="h6">{questionDetails?.title}</p>
      {questionDetails?.imageLink ? (
        <img src={questionDetails.imageLink} style={{
          width: "-webkit-fill-available",
          height: "15rem"
        }} alt="imageLinks" />
      ) : null}
      {questionDetails?.videoLink ? (
        <>
          <iframe src={questionDetails?.videoLink} title="video" style={{
            width: "-webkit-fill-available",
            height: "15rem"
          }}></iframe>
        </>
      ) : null}
      {questionDetails?.audioLink ? (
        <>
          <AudioPlayer
            autoPlay
            src={questionDetails?.audioLink}
            onPlay={e => console.log("onPlay")}
          // other props here
          />
        </>
      ) : null}
      {questionDetails?.options ? (
        <>
          <p className="h6">Options</p>
          <ol className="list-group list-group-numbered">
            {questionDetails?.options.map((item: any, index: number) => (
              <li className="list-group-item">{item.title}</li>
            ))}
          </ol>
        </>
      ) : null}
    </>
  )
};

export default QuestionPreview;
