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

const GET_POSTS = gql`
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

function GraphQLApp() {
  const { loading, data } = useQuery(GET_POSTS);
  const [contacts, setContact] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contactId, setId] = useState("");

  const [createContact, { error }] = useMutation(CREATE_CONTACT_MUTATION, {
    variables: { username, email },
    refetchQueries: ["getPosts"]
  });

  if (error) {
    console.log(error);
  }

  if (data) {
    console.log(contacts);
  }

  useEffect(() => {
    setContact(data);
  }, [data]);

  function handleSubmit(event) {
    event.preventDefault();
    const contactExists = contacts.allPosts.some(u => u.id === contactId);

    if (contactExists) {
      console.log("update" + contactId);
      const contact = {
        id: contactId,
        username: username,
        email: email
      };
      /*axios
        .put(API_BASE_URL + "/" + contactId.toString(), contact)
        .then(response => {});*/
      handleClear();
    } else {
      const userEmpty = username === "";
      const emailEmpty = email === "";
      if (!userEmpty && !emailEmpty) {
        console.log("subitted");
        createContact({
          variables: { id: Date.now(), username: username, email: email }
        });
      }
    }
  }

  function handleDelete(contact) {
    /*console.log(contact.id);
    axios.delete(API_BASE_URL + "/" + contact.id.toString()).then(res => {
      console.log("USER DELETED", res);
      setContact(contacts.filter(u => u.id !== contact.id));
    });*/
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
        <div>yeet</div>
      )}
    </div>
  );
}

export default GraphQLApp;
