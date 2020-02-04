import React, { useEffect, useState } from "react";
import Form from "../form/Form.js";
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

const GraphQLApp = props => {
  const { loading, data } = useQuery(GET_CONTACTS);

  return (
    <div className="flex-container">
      {data ? <Form contacts={data}></Form> : <div>Loading...</div>}
    </div>
  );
};

export default GraphQLApp;
