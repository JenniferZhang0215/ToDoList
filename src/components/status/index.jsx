import React from "react";
import PropTypes from "prop-types";

const Status = (props) => {
  const { statusArray, onStatus, selectedStatus } = props;
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <ul className="navbar-nav">
        {statusArray.map((status) => (
          <li
            className={
              status === selectedStatus ? "nav-item active" : "nav-item "
            }
            key={status}
          >
            <span
              style={{ cursor: "pointer" }}
              className="nav-link"
              onClick={() => onStatus(status)}
            >
              {status}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Status.propTypes = {
  statusArray: PropTypes.array.isRequired,
  onStatus: PropTypes.func.isRequired,
  selectedStatus: PropTypes.string.isRequired,
};

export default Status;
