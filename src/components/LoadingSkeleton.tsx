import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const LoadingSkeleton = () => {
  return (
    <Box
      borderRadius={8}
      padding="6"
      boxShadow="lg"
      bg="white"
      width="full"
      minHeight="474px"
    >
      <SkeletonCircle size="10" />
      <SkeletonText
        noOfLines={10}
        spacing="5"
        skeletonHeight="4"
        startColor="white"
        endColor="grey.400"
      />
    </Box>
  );
};

export default LoadingSkeleton;
