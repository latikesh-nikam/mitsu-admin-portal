import { ShowModalActivityAudio, ShowModalActivityVideo, ShowModalCheckboxList, ShowModalQuiz } from "../../../pages/dashboard/post-onboard/showModals";

export const subScreensDropdown = [
  { id: 1, label: "Quiz", value: "quiz", modal: ShowModalQuiz },
  { id: 2, label: "Audio", value: "Audio", modal: ShowModalActivityAudio },
  { id: 3, label: "Video", value: "Video", modal: ShowModalActivityVideo },
]