import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import "./App.css";

const API_BASE_URL = "http://localhost:3000/posts";

function App() {
  const [posts, setPost] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    axios.get(API_BASE_URL).then(response => {
      setPost(response.data);
    });
  }, []);

  function handleSubmit() {
    const userEmpty = username === "";
    const emailEmpty = email === "";

    if (!userEmpty && !emailEmpty) {
      console.log("subitted");
      const post = {
        id: Date.now(),
        username: username,
        email: email
      };
      axios.post(API_BASE_URL, post).then(response => {});
    }
  }

  function handleDelete(post) {
    console.log(post.id);
    axios.delete(API_BASE_URL + "/" + post.id.toString()).then(res => {
      console.log("USER DELETED", res);
      setPost(posts.filter(u => u.id !== post.id));
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
      {posts ? (
        posts.map(post => (
          <Card key={post.id}>
            <CardContent>
              <Typography variant="h5">{post.username}</Typography>
              <Typography variant="subtitle1">{post.email}</Typography>
            </CardContent>
            <CardActions>
              <Button
                onClick={() => {
                  setUsername(post.username);
                  setEmail(post.email);
                }}
                size="small"
              >
                EDIT
              </Button>
              <Button onClick={() => handleDelete(post)} size="small">
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
