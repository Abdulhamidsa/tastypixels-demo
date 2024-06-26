// pages/userProfile/[userId].js
import { Box, Image, Heading, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button, IconButton, useToast, Spinner, Center } from "@chakra-ui/react";
import { useRef, useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import CryptoJS from "crypto-js";
import { useRouter } from "next/router";

function UserProfile() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUploadId, setSelectedUploadId] = useState(null);
  const { userId, isLoggedIn } = useAuth();
  const onClose = () => setIsOpen(false);
  const [uploadList, setUploadList] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const cancelRef = useRef();
  const router = useRouter();
  const { userId: encryptedUserId } = router.query;

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    } else {
      fetchUserData();
    }
  }, [isLoggedIn]);

  const fetchUserData = async () => {
    try {
      const bytes = CryptoJS.AES.decrypt(decodeURIComponent(encryptedUserId), "secret key");
      const decryptedUserId = bytes.toString(CryptoJS.enc.Utf8);

      const response = await fetch(`/api/getUserUploads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: decryptedUserId }),
      });

      if (response.ok) {
        const data = await response.json();
        setUploadList(data.uploads);
      } else {
        console.error("Failed to fetch uploads");
      }
    } catch (error) {
      console.error("Error fetching uploads:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveUpload = async (Id) => {
    try {
      const response = await fetch("/api/api-delete-recipe", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, Id }),
      });

      if (response.ok) {
        console.log("Upload removed successfully");
        setUploadList(uploadList.filter((upload) => upload._id !== Id));
        toast({
          title: "Upload deleted.",
          description: "The upload has been successfully deleted.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } else {
        const errorData = await response.json();
        console.error("Failed to remove upload:", errorData.error);
        toast({
          title: "Error",
          description: errorData.error,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error removing upload:", error);
      toast({
        title: "Error",
        description: "An error occurred while deleting the upload.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    onClose();
  };

  return (
    <>
      {isLoggedIn ? (
        <Box p={5} m="auto" maxW="420px" display="grid" gap="10">
          {loading ? (
            <Center>
              <Spinner />
            </Center>
          ) : (
            uploadList.map((upload) => (
              <Box position="relative" key={upload._id} borderWidth="1px" borderRadius="lg" overflow="hidden" width="100%" maxW="600px" mx="auto" my="4" boxShadow="md" bg="gray.900">
                <Box position="relative" p={3} bg="white" color="black">
                  <Image src={upload.imageUrl} alt={upload.title} layout="fill" objectFit="cover" />
                </Box>
                <Box display="flex" flexDirection="column" p="6">
                  <Box d="flex" alignItems="baseline">
                    <Heading size="xl">{upload.title}</Heading>
                  </Box>
                  <Box mt="1" mb="4" fontWeight="semibold" as="h4" lineHeight="tight">
                    {upload.description}
                  </Box>
                  <IconButton
                    width="10%"
                    icon={<FaTrash />}
                    aria-label="Delete upload"
                    onClick={() => {
                      setIsOpen(true);
                      setSelectedUploadId(upload._id);
                    }}
                    colorScheme="black"
                    color="red.500"
                    bg="white"
                  />
                </Box>
              </Box>
            ))
          )}
          <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Delete Upload
                </AlertDialogHeader>
                <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>
                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button colorScheme="red" onClick={() => handleRemoveUpload(selectedUploadId)} ml={3}>
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </Box>
      ) : (
        <Box p={5} m="auto" maxW="420px" display="grid" gap="10">
          <Heading size="lg">Please log in to view your uploads.</Heading>
        </Box>
      )}
    </>
  );
}

export default UserProfile;
