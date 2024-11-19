import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient(process.env.REACT_APP_DATO_CMS_API_URL, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_DATO_CMS_TOKEN}`, // Pass the token here
    },
  });


export default client;

