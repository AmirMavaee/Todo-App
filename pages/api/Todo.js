import User from "../../models/User";
import connectDB from "../../utils/connectDB";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { sortTodos } from "../../utils/sortTodos";

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
    res.status(404).json({ status: "failed", message: "User does'n Exist" });
  }

  if (req.method === "POST") {
    const { id, title, description, status } = req.body;

    if (!id) {
      if (!title || !status || !description) {
        res.status(422).json({ status: "failed", message: "Invalid Data" });
      }

      user.todos.push({ title, description, status });
      user.save();

      res.status(201).json({ status: "success", message: "Todo Created" });
    } else {
      const todo = user.todos.filter((item) => item._id.toString() === id);
      return res.status(200).json({
        status: "success",
        data: {
          title: todo[0].title,
          description: todo[0].description,
          status: todo[0].status,
        },
      });
    }
  } else if (req.method === "GET") {
    const sortData = sortTodos(user.todos);

    res.status(200).json({ status: "success", data: { todos: sortData } });
  } else if (req.method === "PATCH") {
    const { id, title, description, status } = req.body;
    if (!title && !description) {
      if (!id || !status) {
        return res
          .status(422)
          .json({ status: "failed", message: "Invalid Data" });
      }
      const result = await User.updateOne(
        { "todos._id": id },
        {
          $set: {
            "todos.$.status": status,
          },
        }
      );
    }
    else {
      const result = await User.updateOne(
        { "todos._id": id },
        {
          $set: {
            "todos.$.status": status,
            "todos.$.description": description,
            "todos.$.title": title,
          },
        }
      );
    }
    res.status(200).json({ status: "success"});
  }
}
