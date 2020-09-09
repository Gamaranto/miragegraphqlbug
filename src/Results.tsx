import React from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

const dogFragment = gql`
  fragment DogFields on Dog {
    id
    name
    race
    vaccinated
  }
`;

const catFragment = gql`
  fragment CatFields on Cat {
    id
    name
    race
    weight
  }
`;
const ANIMALS = gql`
  query Animals {
    animals {
      ... on Dog {
        ...DogFields
      }
      ... on Cat {
        ...CatFields
      }
    }
  }
  ${dogFragment}
  ${catFragment}
`;

const DOGS = gql`
  query Dogs {
    dogs {
      ...DogFields
    }
  }
  ${dogFragment}
`;

const CATS = gql`
  query Cats {
    cats {
      ...CatFields
    }
  }
  ${catFragment}
`;

const SEARCH = gql`
  query Search($query_str: String!) {
    search(query_str: $query_str) {
      item {
        ... on Dog {
          ...DogFields
        }
        ... on Cat {
          ...CatFields
        }
      }
      rank
    }
  }
  ${dogFragment}
  ${catFragment}
`;
const Results: React.FC = () => {
  const { loading, data } = useQuery(SEARCH, {
    variables: { query_str: "e" },
  });
  if (loading || !data) return <p>Loading...</p>;

  console.log({ data });
  return (
    <div>
      <code>
        <pre>{JSON.stringify(data)}</pre>
      </code>
    </div>
  );
};
export default Results;
