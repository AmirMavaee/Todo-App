import { useEffect, useState } from "react";
import Tasks from "../modules/Tasks";

function HomePage() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    fetchtodos();
  }, []);
  const fetchtodos = async () => {
    const res = await fetch("/api/Todo");
    const data = await res.json();
    if (data.status === "success") {
      setTodos(data.data.todos);
    }
  };

  return (
    <div className="home-page">
      <div className="home-page--todo">
        <p>Todos</p>
        <Tasks data={todos.todo} nextStatus="inProgress" fetchtodos={fetchtodos}/>
      </div>
      <div className="home-page--inProgress">
        <p>In Progress</p>
        <Tasks data={todos.inProgress} nextStatus="review" backStatus="todo" fetchtodos={fetchtodos}/>
      </div>
      <div className="home-page--review">
        <p>Review</p>
        <Tasks data={todos.review}  nextStatus="done" backStatus="inProgress" fetchtodos={fetchtodos}/>
      </div>
      <div className="home-page--done">
        <p>Done</p>
        <Tasks data={todos.done} backStatus="review" fetchtodos={fetchtodos}/>
      </div>
    </div>
  );
}

export default HomePage;
