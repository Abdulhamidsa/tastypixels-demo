import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/legacy/image";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { isLoggedIn, isLoading } = useAuth();
  return (
    <>
      <Head>
        <title>TASTY PIXELS</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box position="absolute" top="0" h="100vh" w="100%">
        <Image src="/bg-main.jpg" alt="Background Image" layout="fill" objectFit="cover" quality={100} priority />

        {isLoggedIn ? (
          <Flex m="auto" width="50vw" direction="column" position="absolute" top="0" right="0" bottom="50" left="0" alignItems="center" justifyContent="center" textAlign="center" spacing={5}>
            <Heading fontSize="4xl" fontWeight="bold" color="white">
              Welcome to Tasty Pixels!
            </Heading>
            <Text fontSize="xl" color="white">
              Share your food pictures and enjoy others' culinary creations. Join our community and explore the world of food like never before. Discover new recipes, make new friends, and share your passion for food with the world.
            </Text>
          </Flex>
        ) : (
          <Flex m="auto" width="50vw" direction="column" position="absolute" top="0" right="0" bottom="50" left="0" alignItems="center" justifyContent="center" textAlign="center" spacing={5}>
            <Heading fontSize="lg" color="white">
              Login to have access to be able to start uploading and sharing your food pictures with the world.
            </Heading>
          </Flex>
        )}
      </Box>
    </>
  );
}
