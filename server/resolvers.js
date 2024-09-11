import { GraphQLError } from 'graphql';
import { getJobs, getJob, getJobsByCompanyId } from './db/jobs.js';
import { getCompany } from './db/companies.js';

export const resolvers = {
  Query: {
    company: (_root, { id }) => getCompany(id),
    job: (_root, { id }) => getJob(id),
    company: async (_root, { id }) => {
      const company = await getCompany(id);
      if (!company) {
        throw notFoundError('No Company found with id ' + id);
      }
      return company;
    },
    job: async (_root, { id }) => {
      const job = await getJob(id);
      if (!job) {
        throw notFoundError('No Job found with id ' + id);
      }
      return job;
    },
    jobs: () => getJobs(),
  },

  };

  function notFoundError(message) {
    return new GraphQLError(message, {
      extensions: { code: 'NOT_FOUND' },
    });
  }