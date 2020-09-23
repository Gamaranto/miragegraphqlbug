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

const SEARCH = gql`
  query Search {
    search {
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
  const { loading, data } = useQuery(SEARCH);
  if (loading || !data) return <p>Loading...</p>;

  console.log({ data });
  return (
    <div>
      <code>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </code>
    </div>
  );
};
export default Results;
