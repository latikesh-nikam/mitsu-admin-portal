
import { ShowModalActivityVideo, ShowModalCheckboxList, ShowModalQuiz, ShowModalTextIntro, ShowModalActivityAudio, ShowModalTextInput, ShowModalActivitySwipeHelp } from "../../pages/dashboard/post-onboard/showModals";

export const screensDropdown = [
  { id: 1, label: "Mood Log", value: "Mood_Log" },
  { id: 2, label: "Text Intro", value: "text-intro", modal: ShowModalTextIntro },
  { id: 3, label: "Text Block", value: "Text_Block", modal: ShowModalTextInput },
  { id: 4, label: "Quiz", value: "quiz", modal: ShowModalQuiz },
  { id: 5, label: "Checkbox List", value: "checkbox-list", modal: ShowModalCheckboxList },
  { id: 6, label: "Audio", value: "Audio", modal: ShowModalActivityAudio },
  { id: 7, label: "Video", value: "Video", modal: ShowModalActivityVideo },
  { id: 8, label: "Swipe Help", value: "swipe-help", modal: ShowModalActivitySwipeHelp },
]