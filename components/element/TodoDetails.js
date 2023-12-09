import { AiOutlineFileSearch } from "react-icons/ai";
import { BsAlignStart } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { GrAddCircle } from "react-icons/gr";
import { MdDoneAll } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import RadioButton from "./RadioButton";

function TodoDetails({
  headerText,
  title,
  setTitle,
  description,
  setDescription,
  status,
  setStatus,
  addOrEditHandler,
  textButton
}) {
  return (
    <div className="add-form">
      <h2>
        <GrAddCircle />
        {headerText}
      </h2>
      <div className="add-form__input">
        <div className="add-form__input--first">
          <label htmlFor="title">Title :</label>
          <input
            id="title"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="title">Description :</label>
          <input
            id="title"
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="add-form__input--second">
          <RadioButton
            status={status}
            setStatus={setStatus}
            value="todo"
            title="Todos"
          >
            <BsAlignStart />
          </RadioButton>
          <RadioButton
            status={status}
            setStatus={setStatus}
            value="inProgress"
            title="In Progress"
          >
            <FiSettings />
          </RadioButton>
          <RadioButton
            status={status}
            setStatus={setStatus}
            value="review"
            title="Review"
          >
            <AiOutlineFileSearch />
          </RadioButton>
          <RadioButton
            status={status}
            setStatus={setStatus}
            value="done"
            title="Done"
          >
            <MdDoneAll />
          </RadioButton>
        </div>
        <button onClick={addOrEditHandler}>{textButton}</button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default TodoDetails;
