import { skip, combineResolvers } from "graphql-resolvers";
import { AuthenticationError, ForbiddenError } from "apollo-server";

// These are our "guarding resolvers"

// Authentication
// To not check "viewer" on every resolver, we introduce an authorization abstraction layer for protecting GraphQL operations,
// with solutions called combined resolvers or resolver middleware.
// The isAuthenticated() resolver function acts as middleware, either continuing with the
// next resolver (skip), or performing another action, like returning an error. In this case,
// an error is returned when the viewer user is not available. Since it is a resolver function itself, it has the same arguments as a normal resolver.
export const isAuthenticated = (parent, args, { viewer }) =>
  viewer ? skip : new AuthenticationError("Not authenticated user");

// Role-based GraphQL Authorization
// * This resolver checks to see if the authenticated user has the ADMIN role. If it doesn’t, the resolver returns an error;
//   if it does, the next resolver is called. This resolver is already combined, using the isAuthenticated resolver.
// * In this example, the role is only a string that needs to be checked. In a more elaborate role-based architecture,
//   the role might change from a string to an array that contains many roles. It eliminates the need for an equal check,
//   since you can check to see if the array includes a targeted role. Using arrays with a roles is the foundation for a sophisticated role-based authorization setup.
export const isAdmin = combineResolvers(
  isAuthenticated,
  (parent, args, { viewer: { role } }) =>
    // No need to use "throw" here. This function returns the result already.
    // If we use curly brackets, we need to use "return" and "throw"
    role === "ADMIN" ? skip : new ForbiddenError("Not authorized as admin")
);
