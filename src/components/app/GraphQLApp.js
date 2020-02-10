import React, { useEffect, useState } from "react";
import Form from "../form/Form.js";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

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

  return data ? <Form contacts={data}></Form> : <div>Loading...</div>;
};

export default GraphQLApp;
