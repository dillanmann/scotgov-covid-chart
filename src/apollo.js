import ApolloClient from 'apollo-boost';

export default new ApolloClient(
  {
    uri: "https://scotgovcovidweb.azurewebsites.net/",
  }
);