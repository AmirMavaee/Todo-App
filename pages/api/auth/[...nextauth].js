import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import connectDB from "../../../utils/connectDB";
import { verifyPassword } from "../../../utils/auth";
import User from "../../../models/User";

export const authOptions = {
  secret:process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        try {
          await connectDB();
        } catch (error) {
          throw new Error("Error In Connecting To DB");
        }

        const { email, password } = credentials;
        if (!email || !password) {
          throw new Error("Invalid Data");
        }

        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("User Not Found , Please Sign Up");
        }

        const isValid = verifyPassword(password, user.password);
        if (!isValid) {
          throw new Error("Password Is Incorrect");
        }

        return { email };
      },
    }),
  ],
};

export default NextAuth(authOptions);
