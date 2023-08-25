import { quotes, users } from "./fakedb.js";
import { randomBytes } from "crypto";

// create resolver
const resolvers = {
  Query: {
    // greet:()=> "Hello World!"
    users: () => users,
    user: (_, args) => users.find((user) => user.id == args.id),
    quotes: () => quotes,
    iquote: (_, { by }) => quotes.filter((quote) => quote.by == by),
  },
  User: {
    quotes: (ur) => quotes.filter((quotes) => quotes.by == ur.id),
  },

  Mutation: {
    signupUserDummy: (_, { userNew }) => {
      const id = randomBytes(5).toString("hex");
      users.push({
        id,
        ...userNew,
      });
      return users.find((user) => user.id == id);
    },
  },
};

export default resolvers;
