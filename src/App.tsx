import React from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Results from "./Results";
import "./App.css";
import "./mocking/server";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Results />
      </div>
    </ApolloProvider>
  );
}

export default App;
