import { createServer } from "miragejs";
import { createGraphQLHandler } from "@miragejs/graphql";

import { loader } from "graphql.macro";

import mockDogs from "./mockDogs";
import mockCats from "./mockCats";

const graphQLSchema = loader("../schema.graphql");

createServer({
  routes() {
    const graphqlHandler = createGraphQLHandler(graphQLSchema, this.schema, {
      resolvers: {
        Query: {
          search() {
            const dogs = mockDogs.map((d) => ({ ...d, __typename: "Dog" }));
            const cats = mockCats.map((d) => ({ ...d, __typename: "Cat" }));
            const items = [...dogs, ...cats];

            let rankCount = 0;
            const resolverReturn = items.reduce((acc, item) => {
              return [
                ...acc,
                { __typename: "SearchResult", item, rank: rankCount++ },
              ];
            }, [] as any);
            console.log({ resolverReturn });
            return resolverReturn;
          },
        },
      },
    });
    this.post("/graphql", graphqlHandler);
  },
  seeds(server) {
    mockDogs.forEach((dog) => {
      server.create("Dog", { ...(dog as any) });
    });

    mockCats.forEach((cat) => {
      server.create("Cat", { ...(cat as any) });
    });
  },
});
