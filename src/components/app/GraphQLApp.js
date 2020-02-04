import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import "./App.css";

const GET_CONTACTS = gql`
  query getPosts {
    allPosts {
      id
      username
      email
    }
  }
`;

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

const REMOVE_CONTACT_MUTATION = gql`
  mutation removePost($id: ID!) {
    removePost(id: $id)
  }
`;

const GraphQLApp = (props) => {
  const { loading, data } = useQuery(GET_CONTACTS);
  const [contacts, setContact] = useState(false);
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
  const [removeContact, { removeError }] = useMutation(
    REMOVE_CONTACT_MUTATION,
    {
      refetchQueries: ["getPosts"]
    }
  );

  if (updateError) {
    console.log(updateError);
  }

  if (data) {
    console.log(contacts);
  }

  useEffect(() => {
    setContact(data);
  }, [data]);

  function handleSubmit(event) {
    event.preventDefault();
    let contactExists = data.allPosts.some(u => u.id === contactId);

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

  function handleDelete(contact) {
    removeContact({
      variables: { id: contactId }
    });
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
      {data ? (<form
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
      </form>) : ("")}
      {data ? (
        data.allPosts.map(contact => (
          <Card key={contact.id}>
            <CardContent>
              <Typography variant="h5">{contact.username}</Typography>
              <Typography variant="subtitle1">{contact.email}</Typography>
            </CardContent>
            <CardActions>
              <Button
                onClick={() => {
                  setUsername(contact.username);
                  setEmail(contact.email);
                  setId(contact.id);
                }}
                size="small"
              >
                EDIT
              </Button>
              <Button onClick={() => handleDelete(contact)} size="small">
                DELETE
              </Button>
            </CardActions>
          </Card>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default GraphQLApp;
