import { useParams, useNavigate } from "react-router-dom";
import { ErrorMessage, Formik, Form } from "formik";
import {
  Input,
  Container,
  Heading,
  InputGroup,
  InputLeftAddon,
  Button,
  Text,
  Box,
} from "@chakra-ui/react";
import { DateSelect } from "react-ymd-date-select/dist/esm/presets/chakra-ui";
import { addUser, changeUser, getUser } from "../../../../api";
import { generateUserId } from "../../../../utils";
import { PHONE_CODE } from "../../../../consts";
import * as Yup from "yup";

export const UserForm = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const isEditing = !!userId;
  const user = isEditing && getUser(userId);

  const formSchema = Yup.object().shape({
    name: Yup.string().max(100, "Name is too Long!").required("Required"),
    dateOfBirth: Yup.string().required("Required"),
    phoneNumber: Yup.string().max(10, "Phone number must be 10 digits long"),
  });

  return (
    <Container centerContent w={500}>
      <Heading as="h1" my={100}>
        {isEditing ? "Edit user info" : "Create a new user"}
      </Heading>
      <Formik
        initialValues={
          user
            ? {
                name: user.name,
                dateOfBirth: user.dateOfBirth,
                adress: user.adress || "",
                city: user.city || "",
                phoneNumber: user.phoneNumber || "",
              }
            : {
                name: "",
                dateOfBirth: "",
                adress: "",
                city: "",
                phoneNumber: "",
              }
        }
        validationSchema={formSchema}
        onSubmit={(values) => {
          const newUser = {
            ...values,
            id: isEditing ? userId : generateUserId(),
          };

          if (isEditing) {
            changeUser(newUser, userId);
          } else {
            addUser(newUser);
          }

          navigate("/");
        }}
      >
        {({ values, handleChange, setFieldValue, errors, touched }) => (
          <Form>
            <Box display="flex" flexDir="column" gap={5}>
              <label>
                First and last name
                <Input
                  isInvalid={!!errors.name && touched.name}
                  type="text"
                  name="name"
                  id="name"
                  value={values.name}
                  onChange={handleChange}
                  placeholder="First and last name"
                  width="full"
                />
                <Text color="red">
                  <ErrorMessage name="name" />
                </Text>
              </label>
              Date of birth
              <DateSelect
                name="dateOfBirth"
                value={values.dateOfBirth}
                onChange={(value) => setFieldValue("dateOfBirth", value)}
              />
              <Text color="red">
                <ErrorMessage name="dateOfBirth" />
              </Text>
              <label>
                Adress
                <Input
                  type="text"
                  name="adress"
                  id="adress"
                  value={values.adress}
                  onChange={handleChange}
                  placeholder="Adress"
                  width="full"
                />
              </label>
              <label>
                City
                <Input
                  type="text"
                  name="city"
                  id="city"
                  value={values.city}
                  onChange={handleChange}
                  placeholder="City"
                  width="full"
                />
              </label>
              <label>
                Phone number
                <InputGroup width="full">
                  <InputLeftAddon children={PHONE_CODE} />
                  <Input
                    type="number"
                    placeholder="phone number"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    isInvalid={!!errors.phoneNumber && touched.phoneNumber}
                  />
                </InputGroup>
                <Text color="red">
                  <ErrorMessage name="phoneNumber" />
                </Text>
              </label>
              <Box display="flex" flexDir="row" justifyContent="space-between">
                <Button type="submit" colorScheme="blue">
                  Save changes
                </Button>
                <Button onClick={() => navigate("/")} colorScheme="red">
                  Cancel
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default UserForm;
