module.exports = {
  client: {
    service: {
      name: "miragebug-graphql",
      localSchemaFile: "src/schema.graphql",
    },
    excludes: ["src/schema.graphql"],
  },
};
