import { makeExecutableSchema } from "apollo-server";
import { loadFilesSync, mergeResolvers, mergeTypeDefs } from "graphql-tools";

// all folder and all files
// load typeEdfs & queries & mutations file. if you miss something it on this file you get the error messages.
const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.js`);

const typeDefs = mergeTypeDefs(loadedTypes);
const resolvers = mergeResolvers(loadedResolvers);

const schema = makeExecutableSchema({typeDefs, resolvers});

export default schema;