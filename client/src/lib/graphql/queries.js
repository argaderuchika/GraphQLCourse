import { GraphQLClient, gql } from 'graphql-request';

const client = new GraphQLClient('http://localhost:9000/graphql');

export async function getJob(id) {
    const query = gql`
      query JobById( $id: ID!){
 job(id: $id){
  id,
  title,
  company {
    id
    name
  }
  date
 }
}
    `;
    const { job } = await client.request(query, {id});
    return job;
  }

  export async function getCompany(id) {
    const query = gql`
      query CompanyById( $id: ID!){
 company(id: $id){
  id,
  name,
  description,
  jobs{
    id,
    date,
    title
  }
 }
}
    `;
    const { company } = await client.request(query, {id});
    return company;
  }
export async function getJobs() {
  const query = gql`
    query {
      jobs {
        id
        date
        title
        company {
          id
          name
        }
      }
    }
  `;
  const { jobs } = await client.request(query);
  return jobs;
}