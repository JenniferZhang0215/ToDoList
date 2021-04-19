import React from "react";
import PropTypes from "prop-types";
import Edit from "../edit";

const List = (props) => {
  const {
    inputArray,
    onEdit,
    onDelete,
    onSave,
    onCancel,
    onFinish,
    onEditPriority,
  } = props;

  const list = inputArray.map((item) => {
    if (item.edit === false) {
      return (
        <li key={item.key}>
          <input
            onChange={(e) => onEditPriority(e, item)}
            value={item.priority}
            type="number"
            min="0"
          />
          <span
            onClick={() => onFinish(item)}
            //insert the css class "finish"
            className={item.status ? "finish" : null}
            style={{ cursor: "pointer" }}
          >
            {item.text}
          </span>
          <button
            key="edit-btn"
            onClick={() => onEdit(item)}
            className="btn-sm m-1"
          >
            Edit
          </button>
          <button
            key="delete-btn"
            onClick={() => onDelete(item)}
            className="btn-danger btn-sm m-1"
          >
            Delete
          </button>
        </li>
      );
    } else {
      return (
        <li key={item.key}>
          <input
            onChange={(e) => onEditPriority(e, item)}
            value={item.priority}
            type={"number"}
          />
          <Edit
            onSave={(editText) => onSave(item, editText)}
            onCancel={() => onCancel(item)}
            defaultValue={item.text}
          />
          <button
            onClick={() => onDelete(item)}
            className="btn-danger btn-sm m-1"
          >
            Delete
          </button>
        </li>
      );
    }
  });

  return <ul>{list}</ul>;
};

List.propTypes = {
  inputArray: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired,
};

export default List;
