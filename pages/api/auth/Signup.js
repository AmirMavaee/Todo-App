import User from "../../../models/User";
import { hashPassword } from "../../../utils/auth";
import connectDB from "../../../utils/connectDB";

export default async function handler(req, res) {
  if (req.method !== "POST") return;

  try {
    await connectDB();
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", message: "error in coonecting to DB" });
  }

  const {email ,password } = req.body;

  if(!email || !password){
    res.status(422).json({status:"failed" , message:"Invalid Data"});
  }

  const exisUser = await User.findOne({email});

  if(exisUser){
    res.status(422).json({status:"failed" , message:"User Exist , Please Sign In"});
  }

  const hashPass = await hashPassword(password);

  const user = await User.create({email , password:hashPass});

  res.status(200).json({status:"success" , data:user});

}
