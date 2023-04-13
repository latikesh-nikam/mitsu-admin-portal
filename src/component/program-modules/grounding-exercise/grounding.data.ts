import { ShowModalActivityAudio, ShowModalActivityVideo, ShowModalCheckboxList, ShowModalQuiz } from "../../../pages/dashboard/post-onboard/showModals";

export const subScreensDropdown = [
  { id: 3, label: "Quiz", value: "quiz", modal: ShowModalQuiz },
  { id: 4, label: "Subjective Quiz", value: "Subjective_Quiz", modal: ShowModalCheckboxList },
  { id: 5, label: "Audio", value: "Audio", modal: ShowModalActivityAudio },
  { id: 6, label: "Video", value: "Video", modal: ShowModalActivityVideo },
]