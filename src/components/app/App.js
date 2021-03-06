import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import "./App.css";

const API_BASE_URL = "http://localhost:3000/contacts";

function App() {
  const [contacts, setContact] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contactId, setId] = useState("");

  useEffect(() => {
    axios.get(API_BASE_URL).then(response => {
      setContact(response.data);
    });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const contactExists = contacts.some(u => u.id === contactId);

    if (contactExists) {
      const contact = {
        id: contactId,
        username: username,
        email: email
      };
      axios
        .put(API_BASE_URL + "/" + contactId.toString(), contact)
        .then(response => {});
      handleClear();
    } else {
      const userEmpty = username === "";
      const emailEmpty = email === "";
      if (!userEmpty && !emailEmpty) {
        const contact = {
          id: Date.now(),
          username: username,
          email: email
        };
        axios.post(API_BASE_URL, contact).then(response => {});
      }
    }
  }

  function handleDelete(contact) {
    axios.delete(API_BASE_URL + "/" + contact.id.toString()).then(res => {
      setContact(contacts.filter(u => u.id !== contact.id));
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
      {contacts ? (
        contacts.map(contact => (
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

export default App;
