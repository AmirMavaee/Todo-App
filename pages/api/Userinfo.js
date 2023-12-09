import { getServerSession } from "next-auth";
import User from "../../models/User";
import { verifyPassword } from "../../utils/auth";
import connectDB from "../../utils/connectDB";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", message: "error in coonecting to DB" });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res
      .status(401)
      .json({ status: "failed", message: "You Are Not Logged in" });
  }

  const user = await User.findOne({ email: session.user.email });

  if (!user) {
    return res.status(404).json({ status: "failed", message: "User does'n Exist" });
  }

  if (req.method === "POST") {
    const { name, lastName , password } = req.body;

    const isValid =  await verifyPassword(password , user.password)

    if(!isValid){
        return res.status(401).json({ status: "failed", message: "Password Is Incorrect" });
    }

    user.name = name;
    user.lastName = lastName;

    user.save();
    res
    .status(200)
    .json({ status: "success" , data : {name , lastName , email: session.user.email} });
  }
  else if (req.method === "GET"){
    return res.status(200).json({ status: "success" , data : {name : user.name , lastName : user.lastName , email : user.email}});
  }
}
