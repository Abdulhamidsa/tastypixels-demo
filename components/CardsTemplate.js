import { Box, Text, Grid, Button, GridItem, useDisclosure } from "@chakra-ui/react";
import React from "react";

const generatePlaceholderBoxes = (numBoxes) => {
  const boxes = [];
  for (let i = 0; i < numBoxes; i++) {
    boxes.push(
      <Box key={i} borderWidth="1px" borderRadius="lg" bg="gray.200" p={4}>
        <Box height="160px" mb={2} bg="gray.400"></Box>
        <Box height="12px" mb={2} bg="gray.400"></Box>
        <Box height="12px" width="50%" bg="gray.400"></Box>
      </Box>
    );
  }
  return boxes;
};

const PhotosGrid = ({ numCards }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Grid opacity="0.3" templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={6}>
        {generatePlaceholderBoxes(numCards).map((box, index) => (
          <GridItem key={index}>{box}</GridItem>
        ))}
      </Grid>
    </>
  );
};

const MyComponent = () => {
  const numCards = 5;
  return (
    <>
      <Box height="100%" p={6} position={"relative"}>
        <Box position="absolute" top="0" left="0" width="100%" height="100%" bg="rgba(0, 0, 0, 0.8)" zIndex="1" pointerEvents="none" display="flex" justifyContent="center" alignItems="center"></Box>
        <Box zIndex={55} position="absolute" top="30%" left="50%" transform="translate(-50%, -50%)" textAlign="center" color="white" p={5} bg="gray.700" borderRadius="md" boxShadow="xl">
          <Text fontSize="xl" mb={3}>
            Login to have access to this page data
          </Text>
        </Box>
        <PhotosGrid numCards={numCards} />
      </Box>
    </>
  );
};
export default MyComponent;
