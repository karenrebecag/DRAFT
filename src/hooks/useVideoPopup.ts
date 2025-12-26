import { useContext } from "react";
import type { VideoContextType } from "../modals/VideoContext";
import VideoContext from "../modals/VideoContext";

export const useVideoPopup = (): VideoContextType => {
   const context = useContext(VideoContext);
   if (!context) throw new Error("useVideoPopup must be used within a VideoProvider");
   return context;
};