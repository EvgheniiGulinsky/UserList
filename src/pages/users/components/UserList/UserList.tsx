import { useNavigate } from "react-router-dom";
import { getUsers, removeUser } from "../../../../api";
import { Container, Button, Heading, Box, Text } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useState } from "react";

const UserList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState(getUsers());
  const handleRemove = (id: string): void => {
    removeUser(id);
    setUsers(getUsers());
  };

  return (
    <Container centerContent w={500}>
      <Heading as="h1">Users</Heading>
      <Button onClick={() => navigate("createuser")}>Add new user</Button>
      {users.length > 0 ? (
        users.map((user) => (
          <Box
            display="flex"
            flexDir="row"
            w="full"
            p={15}
            justifyContent="space-between"
            mt={100}
            border="1px"
          >
            <Box>
              <Text>Name: {user.name}</Text>
              <Text>Date of birth: {user.dateOfBirth}</Text>
              <Text>Adress: {user.adress}</Text>
              <Text>City: {user.city}</Text>
              <Text>Phone number: {user.phoneNumber}</Text>
            </Box>
            <Box
              alignSelf="center"
              w={50}
              display="flex"
              justifyContent="space-between"
            >
              <button onClick={() => navigate(`users/${user.id}/edit`)}>
                <EditIcon fontSize={20} color="green" />
              </button>
              <button
                onClick={() => {
                  handleRemove(user.id);
                }}
              >
                <DeleteIcon fontSize={20} color="red" />
              </button>
            </Box>
          </Box>
        ))
      ) : (
        <Text mt={100}>There are no users yet...</Text>
      )}
    </Container>
  );
};

export default UserList;
