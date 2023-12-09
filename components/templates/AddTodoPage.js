import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import TodoDetails from "../element/TodoDetails";

function AddTodoPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");

  const addHandler = async () => {
    const res = await fetch("/api/Todo", {
      method: "POST",
      body: JSON.stringify({ title, description, status }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.status === "success") {
      toast.success("Todo Created !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTitle("");
      setStatus("todo");
    }
  };

  return (
    <TodoDetails
      headerText="Add New Todo"
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      status={status}
      setStatus={setStatus}
      addOrEditHandler = {addHandler}
      textButton="Add"
    />
  );
}

export default AddTodoPage;
