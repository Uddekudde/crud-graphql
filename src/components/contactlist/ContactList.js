import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";


const REMOVE_CONTACT_MUTATION = gql`
  mutation removePost($id: ID!) {
    removePost(id: $id)
  }
`;

const ContactList = props => {
  const [removeContact, { removeError }] = useMutation(
    REMOVE_CONTACT_MUTATION,
    {
      refetchQueries: ["getPosts"]
    }
  );

  function handleDelete(contact) {
    removeContact({
      variables: { id: contact.id }
    });
  }

  return props.contacts.allPosts.map(contact => (
    <Card key={contact.id}>
      <CardContent>
        <Typography variant="h5">{contact.username}</Typography>
        <Typography variant="subtitle1">{contact.email}</Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => {
            props.setUsername(contact.username);
            props.setEmail(contact.email);
            props.setId(contact.id);
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
  ));
};

export default ContactList;
