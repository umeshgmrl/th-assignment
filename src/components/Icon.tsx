import { Box } from "@chakra-ui/react";
import { ReactComponent as LearningPath } from "../icons/LearningPath.svg";
import { ReactComponent as Podcast } from "../icons/Podcast.svg";
import { ReactComponent as Ebook } from "../icons/Ebook.svg";
import { ReactComponent as Event } from "../icons/Event.svg";
import { ReactComponent as Stream } from "../icons/Stream.svg";
import { CSSProperties } from "react";
import { IconType } from "../types/schemaTypes";

interface IconProps {
  type: IconType;
  style?: CSSProperties;
}

const getIcon = (type: IconType) => {
  switch (type) {
    case IconType.LearningPath:
      return <LearningPath />;
    case IconType.Podcast:
      return <Podcast />;
    case IconType.Ebook:
      return <Ebook />;
    case IconType.Event:
      return <Event />;
    case IconType.Stream:
      return <Stream />;
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
