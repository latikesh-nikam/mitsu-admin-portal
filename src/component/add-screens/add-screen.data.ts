import { ShowModalActivityVideo, ShowModalCheckboxList, ShowModalQuiz, ShowModalTextIntro, ShowModalActivityAudio, ShowModalTextInput, ShowModalActivitySwipeHelp, ShowModalEmotionIntensity, ShowQuizQuesModal } from "../../pages/dashboard/post-onboard/showModals";
import ShowModalGroundingExercise from "../../pages/dashboard/post-onboard/showModals/showModalGroundingExercise";
import ShowModalFearLadder from "../../pages/dashboard/post-onboard/showModals/showModalFearLadder";
import ShowModalThinkingTraps from "../../pages/dashboard/post-onboard/showModals/showModalThinkingTraps";

export const screensDropdown = [
  { id: 1, label: "Mood Log", value: "Mood_Log" },
  { id: 2, label: "Text Block", value: "Text_Block", modal: ShowModalTextInput },
  { id: 3, label: "Quiz", value: "Quiz", modal: ShowQuizQuesModal },
  { id: 4, label: "Subjective Quiz", value: "Subjective_Quiz", modal: ShowModalCheckboxList },
  { id: 5, label: "Audio", value: "Audio", modal: ShowModalActivityAudio },
  { id: 6, label: "Video", value: "Video", modal: ShowModalActivityVideo },
  { id: 8, label: "Thinking Traps", value: "Thinking_Traps", modal: ShowModalThinkingTraps },
  { id: 9, label: "Grounding Exercise", value: "Grounding_Exercise", modal: ShowModalGroundingExercise },
  { id: 10, label: "Swipe Text", value: "Swipe_Text", modal: ShowModalActivitySwipeHelp },
  { id: 11, label: "Emotion Intensity", value: "Emotion_Intensity", modal: ShowModalEmotionIntensity },
  { id: 12, label: "Thinking Traps", value: "Thinking_Traps", modal: ShowModalThinkingTraps },
  { id: 13, label: "Fear Ladder", value: "Fear_Ladder", modal: ShowModalFearLadder }
]
