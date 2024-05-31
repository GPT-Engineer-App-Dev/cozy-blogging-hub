import { useState } from "react";
import { Container, VStack, Heading, Input, Textarea, Button, useColorMode } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = { title, content };
    const existingPosts = JSON.parse(localStorage.getItem("posts")) || [];
    localStorage.setItem("posts", JSON.stringify([...existingPosts, newPost]));
    navigate("/");
  };

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={4} as="form" onSubmit={handleSubmit}>
        <Heading as="h1" size="xl">Add New Post</Heading>
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          isRequired
        bg={colorMode === "light" ? "white" : "gray.700"}
        />
        <Textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          isRequired
        bg={colorMode === "light" ? "white" : "gray.700"}
        />
        <Button type="submit" colorScheme="teal" size="md">Submit</Button>
      </VStack>
    </Container>
  );
};

export default AddPost;