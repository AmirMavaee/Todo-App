import { RiMastodonLine } from "react-icons/ri";
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";
import { MdModeEdit } from "react-icons/md";
import Link from "next/link";

function Tasks({ data, nextStatus, backStatus, fetchtodos }) {
  const changeStatusHandler = async (id, status) => {
    const res = await fetch("/api/Todo", {
      method: "PATCH",
      body: JSON.stringify({ id, status }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.status === "success") {
      fetchtodos();
    }
  };
  return (
    <div className="tasks">
      {data?.map((item) => (
        <div key={item._id} className="tasks__card">
          <span className={item.status}></span>
          <div>
            <RiMastodonLine />
            <button className="edit-button">
              <Link href={`/EditTodo/${item._id}`}>
              <MdModeEdit />
              </Link>
            </button>
          </div>

          <h4>
            <b>{item.title}</b>
          </h4>
          <h4>{item.description}</h4>
          <div>
            {backStatus ? (
              <button
                className="button-back"
                onClick={() => changeStatusHandler(item._id, backStatus)}
              >
                <BiLeftArrow />
                back
              </button>
            ) : null}
            {nextStatus ? (
              <button
                className="button-next"
                onClick={() => changeStatusHandler(item._id, nextStatus)}
              >
                next
                <BiRightArrow />
              </button>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Tasks;
