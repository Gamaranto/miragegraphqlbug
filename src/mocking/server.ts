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
          search(
            obj: unknown,
            { query_str }: { query_str: string },
            context: unknown,
            info: unknown
          ) {
            const items = [...mockDogs, ...mockCats];

            let rankCount = 0;
            const matchQueryStr = (str: string) =>
              str.includes(query_str) || query_str.includes(str);

            return items.reduce((acc, item) => {
              const isMatch = matchQueryStr(item.name);
              return isMatch ? [...acc, { item, rank: rankCount++ }] : acc;
            }, [] as any);
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
