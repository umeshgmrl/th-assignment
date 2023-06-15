import { Box } from "@chakra-ui/react";
import LearningPath from "../icons/LearningPath.svg";
import Podcast from "../icons/Podcast.svg";
import Ebook from "../icons/Ebook.svg";
import Event from "../icons/Event.svg";
import Stream from "../icons/Stream.svg";
import { CSSProperties } from "react";
import { IconType } from "../types/schemaTypes";

interface IconProps {
  type: IconType;
  style?: CSSProperties;
}

const getIcon = (type: IconType) => {
  switch (type) {
    case IconType.LearningPath:
      return <img src={LearningPath} alt="Learnig path" />;
    case IconType.Podcast:
      return <img src={Podcast} alt="Podcast" />;
    case IconType.Ebook:
      return <img src={Ebook} alt="Ebook" />;
    case IconType.Event:
      return <img src={Event} alt="Event" />;
    case IconType.Stream:
      return <img src={Stream} alt="Stream" />;
    default:
      return null;
  }
};

const Icon = ({ type }: IconProps) => {
  return (
    <Box
      position="absolute"
      bottom="10px"
      left="10px"
      borderRadius="full"
      backgroundColor={"brand"}
      padding="10px"
      height="40px"
      width="40px"
    >
      {getIcon(type)}
    </Box>
  );
};

export default Icon;
