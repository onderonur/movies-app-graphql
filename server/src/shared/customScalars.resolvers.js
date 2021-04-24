import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";

const toCursor = str => {
  return Buffer.from("cursor" + str).toString("base64");
};

const fromCursor = str => {
  return Buffer.from(str, "base64")
    .toString()
    .slice(6);
};

export default {
  Cursor: new GraphQLScalarType({
    name: "Cursor",
    serialize(value) {
      return toCursor(value);
    },
    parseValue(value) {
      return fromCursor(value);
    },
    parseLiteral(ast) {
      switch (ast.kind) {
        case Kind.STRING:
          return fromCursor(ast.value);
      }
    }
  })
};
