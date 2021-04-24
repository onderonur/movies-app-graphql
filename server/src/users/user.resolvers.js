import jwt from "jsonwebtoken";
import {
  AuthenticationError,
  UserInputError,
  ApolloError,
} from "apollo-server";
import { combineResolvers } from "graphql-resolvers";
import { isAdmin, isAuthenticated } from "../shared/authorization.utils";

const accessTokenExpiresIn = "1d";

const createToken = async (user, secret, expiresIn) => {
  const { id, username, firstname, lastname, role } = user;
  const token = await jwt.sign(
    { id, username, firstname, lastname, role },
    secret,
    {
      expiresIn,
    }
  );
  return token;
};

export default {
  Query: {
    users: async (parent, args, { models }) => {
      return await models.User.findAll({ order: [["id", "ASC"]] });
    },
    user: async (parent, { id }, { models }) => {
      return await models.User.findByPk(id);
    },
    viewer: async (parent, args, { models, viewer }) => {
      if (!viewer) {
        return null;
      }

      return await models.User.findByPk(viewer.id);
    },
  },

  Mutation: {
    signUp: async (parent, { input }, { models, secret }) => {
      const { passwordConfirmation, ...rest } = input;

      if (input.password === passwordConfirmation) {
        const existingUser = await models.User.findByUsername(input.username);

        if (existingUser) {
          throw new ApolloError(`"${input.username}" is already taken.`);
        }

        const user = await models.User.create(rest);

        const token = createToken(user, secret, accessTokenExpiresIn);

        return { token };
      }

      throw new UserInputError("Passwords don't match");
    },
    signIn: async (parent, { username, password }, { models, secret }) => {
      const user = await models.User.findByUsername(username);

      if (user) {
        const isValid = await user.validatePassword(password);
        if (isValid) {
          const token = createToken(user, secret, accessTokenExpiresIn);

          return { token };
        }
      }

      throw new AuthenticationError("Invalid login credentials");
    },
    deleteUser: combineResolvers(
      isAdmin,
      async (parent, { id }, { models }) => {
        const deletedUser = models.User.findByIdAndDelete(id);

        if (deletedUser) {
          return {
            success: true,
            message: "Successfully deleted user",
            user: deletedUser,
          };
        }

        return {
          success: false,
          message: "Failed to delete user",
        };
      }
    ),
    changePassword: combineResolvers(
      isAuthenticated,
      async (parent, { input }, { models, viewer }) => {
        const { currentPassword, newPassword, newPasswordConfirmation } = input;

        if (newPassword === newPasswordConfirmation) {
          const { id } = viewer;
          const user = await models.User.findByPk(id);

          const isValid = await user.validatePassword(currentPassword);

          if (isValid) {
            await user.update({
              password: newPassword,
            });

            return {
              success: true,
              message: "Password has been updated succesfully",
            };
          }

          return {
            success: false,
            message: "Current password is invalid",
          };
        }

        throw new UserInputError("Passwords don't match");
      }
    ),
  },
  MutationResponse: {
    __resolveType: (parent) => {
      if (parent.user) {
        return "User";
      }
    },
  },
};
