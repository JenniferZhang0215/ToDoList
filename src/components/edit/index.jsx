import React, { Component } from "react";
import PropTypes from "prop-types";

export class Edit extends Component {
  static propTypes = {
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    defaultValue: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      editText: "",
    };
    this.handleEditItem = this.handleEditItem.bind(this);
  }

  handleEditItem(e) {
    const text = e.target.value;
    this.setState({ editText: text });
  }

  render() {
    const { onCancel, onSave, defaultValue } = this.props;
    const { editText } = this.state;
    return (
      <React.Fragment>
        <input
          key="edit-input"
          onChange={this.handleEditItem}
          defaultValue={defaultValue}
        />
        <button key="cancel-btn" className="btn-sm m-1" onClick={onCancel}>
          Cancel
        </button>
        {/* pass data from child component to parent component */}
        <button
          key="save-btn"
          className="btn-success btn-sm m-1"
          onClick={() => onSave(editText)}
        >
          Save
        </button>
      </React.Fragment>
    );
  }
}

export default Edit;
