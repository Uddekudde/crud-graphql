import React, { useEffect, useState } from "react";
import ContactList from "../contactlist/ContactList.js";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import "./Form.css";

const CREATE_CONTACT_MUTATION = gql`
  mutation createPost($id: ID!, $email: String!, $username: String!) {
    createPost(id: $id, email: $email, username: $username) {
      id
      email
      username
    }
  }
`;

const UPDATE_CONTACT_MUTATION = gql`
  mutation updatePost($id: ID!, $email: String!, $username: String!) {
    updatePost(id: $id, email: $email, username: $username) {
      id
      email
      username
    }
  }
`;

const Form = props => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contactId, setId] = useState("");

  const [createContact, { createError }] = useMutation(
    CREATE_CONTACT_MUTATION,
    {
      refetchQueries: ["getPosts"]
    }
  );
  const [updateContact, { updateError }] = useMutation(
    UPDATE_CONTACT_MUTATION,
    {
      refetchQueries: ["getPosts"]
    }
  );

  function handleSubmit(event) {
    event.preventDefault();
    let contactExists = props.contacts.allPosts.some(u => u.id === contactId);

    if (contactExists) {
      console.log("update" + contactId);
      updateContact({
        variables: { id: contactId, username: username, email: email }
      });
      handleClear();
    } else {
      let userEmpty = username === "";
      let emailEmpty = email === "";
      if (!userEmpty && !emailEmpty) {
        console.log("subitted");
        createContact({
          variables: { id: Date.now(), username: username, email: email }
        });
      }
    }
  }

  function handleChange(event) {
    event.target.name === "username"
      ? setUsername(event.target.value)
      : setEmail(event.target.value);
  }

  function handleClear() {
    setUsername("");
    setEmail("");
    setId("");
  }

  return (
    <div className="flex-container">
      <form
        className="form"
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
      >
        <TextField
          name="username"
          fullWidth
          label="Name"
          value={username}
          onChange={handleChange}
        />
        <TextField
          name="email"
          fullWidth
          label="Email"
          value={email}
          onChange={handleChange}
        />
        <div className="form-buttons">
          <div className="button-margin">
            <Button className="button-submit" variant="contained" type="submit">
              Submit
            </Button>
          </div>
          <div className="button-margin">
            <Button
              onClick={handleClear}
              className="button-clear"
              variant="contained"
            >
              Clear
            </Button>
          </div>
        </div>
      </form>
      <ContactList
        contacts={props.contacts}
        setUsername={setUsername}
        setEmail={setEmail}
        setId={setId}
      />
    </div>
  );
};

export default Form;
