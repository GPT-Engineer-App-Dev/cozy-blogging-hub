import { Container, Text, VStack, Heading, Box, Image, Link, Button, useColorMode, IconButton } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

const Index = () => {
  const [posts, setPosts] = useState([]);

  const { colorMode } = useColorMode();

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(storedPosts);
  }, []);

  const handleDelete = (index) => {
    const updatedPosts = posts.filter((_, i) => i !== index);
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={4}>
        <Heading as="h1" size="2xl" mb={4}>Welcome to My Personal Blog</Heading>
        <Box boxSize="sm">
          <Image src="/images/blog-banner.jpg" alt="Blog Banner" borderRadius="md" />
        </Box>
        <Text fontSize="lg" textAlign="center">
          Dive into my thoughts, experiences, and stories. Explore various topics ranging from technology, travel, lifestyle, and more.
        </Text>
        <Button as={RouterLink} to="/add-post" colorScheme="teal" size="md">Add New Post</Button>
        {posts.map((post, index) => (
          <Box key={index} p={5} shadow="md" borderWidth="1px" borderRadius="md" w="100%" bg={colorMode === "light" ? "white" : "gray.700"}>
            <Heading fontSize="xl">{post.title}</Heading>
            <Text mt={4}>{post.content}</Text>
            <IconButton
              aria-label="Delete Post"
              icon={<DeleteIcon />}
              colorScheme="red"
              onClick={() => handleDelete(index)}
              mt={4}
            />
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;