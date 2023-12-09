import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TodoDetails from "../element/TodoDetails";

function EditTodoPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchtodos = async () => {
      if (router.query.todoid) {
        const res = await fetch("/api/Todo", {
          method: "POST",
          body: JSON.stringify({ id: router.query.todoid }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (data.status === "success") {
          setTitle(data.data.title);
          setDescription(data.data.description);
          setStatus(data.data.status);
        }
      }
    };
    fetchtodos();
  }, [router.query.todoid]);

  const EditHandler = async () => {
    const res = await fetch("/api/Todo", {
      method: "PATCH",
      body: JSON.stringify({
        id: router.query.todoid,
        title,
        description,
        status,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.status === "success") {
      toast.success("Todo Edited !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <TodoDetails
      headerText="Edit Todo"
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      status={status}
      setStatus={setStatus}
      addOrEditHandler={EditHandler}
      textButton="Edit"
    />
  );
}

export default EditTodoPage;
