import React, { Component } from "react";
import List from "./list";
import Status from "./status";

import "./index.style.css";

class App extends Component {
  state = {
    // inputArray used to store all to do items
    inputArray: [],
    // newData used to store the new single item in the inputArray
    newData: { key: "", text: "", edit: false, status: false, priority: 0 },
    id: 0,
    statusArray: ["All", "Processing", "Done"],
    selectedStatus: "All",
    searchText: "",
  };

  get filteredInputArray() {
    const { inputArray, selectedStatus, searchText } = this.state;

    let filtered;
    if (selectedStatus === "All") {
      filtered = inputArray;
    } else if (selectedStatus === "Done") {
      filtered = inputArray.filter((item) => item.status);
    } else if (selectedStatus === "Processing") {
      filtered = inputArray.filter((item) => !item.status);
    }

    if (searchText !== "") {
      //string.indexOf(seartchContent)
      filtered = filtered.filter(
        (item) => item.text.indexOf(searchText) !== -1
      );
    }

    //desc sorting order
    filtered = filtered.sort((a, b) => b.priority - a.priority);

    return filtered;
  }

  //handle priority
  handleEditPriority = (e, item) => {
    //convert a string to number
    const priorityValue = e.target.value - 0;
    const inputArray = Object.assign([], this.state.inputArray);
    item.priority = priorityValue;
    this.setState({ inputArray });
  };

  //get the input value into newData
  handleChange = (e) => {
    const { id } = this.state;
    this.setState({
      newData: { ...this.state.newData, key: id, text: e.target.value },
    });
  };

  handleSearch = (e) => {
    this.setState({ searchText: e.target.value });
  };

  //save the edit data to inputArray and replace the old one
  handleSave = (item, editText) => {
    let inputArray = Object.assign([], this.state.inputArray);
    let element = inputArray.find((i) => i.key === item.key);
    //take the opposite
    element.edit = !element.edit;
    element.text = editText;
    this.setState({ inputArray });
  };

  handleCancel = (item) => {
    let inputArray = Object.assign([], this.state.inputArray);
    let element = inputArray.find((i) => i.key === item.key);
    element.edit = !element.edit;
    this.setState({ inputArray });
  };

  //save the newData to inputArray
  handleClick = () => {
    //to avoid empty item was pushed into the inputArray
    if (this.state.newData.text !== "") {
      this.setState({
        inputArray: [...this.state.inputArray, this.state.newData],
        newData: {
          key: this.state.id,
          text: "",
          edit: false,
          status: false,
          priority: 0,
        },
        id: this.state.id + 1,
      });
    }
  };

  handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      //e.preventDefault();
      this.handleClick();
    }
  };

  //to toggle edit status
  handleEdit = (item) => {
    let inputArray = [...this.state.inputArray];
    const element = inputArray.find((i) => i.key === item.key);
    element.edit = !element.edit;
    this.setState({ inputArray });
  };

  handleDelete = (item) => {
    let inputArray = [...this.state.inputArray];
    const index = inputArray.indexOf(item);
    //pay attention to the syntax, the inputArray has been automatically changed
    inputArray.splice(index, 1);
    this.setState({ inputArray });
  };

  handleFinish = (item) => {
    let inputArray = [...this.state.inputArray];
    let element = inputArray.find((i) => i.key === item.key);
    //because the element is unique in the inputArray due to the id property
    element.status = !element.status;
    this.setState({ inputArray });
  };

  //define a new property in state: selectedStatus
  handleStatus = (status) => {
    //setState is async process.
    this.setState({ selectedStatus: status });
  };

  render() {
    const { inputArray, statusArray, selectedStatus } = this.state;

    if (inputArray.length === 0) {
      return (
        <div style={{ position: "absolute", top: "100px", left: "500px" }}>
          <h3>No ToDos Here</h3>
          <input
            onChange={this.handleChange}
            value={this.state.newData.text}
            onKeyDown={this.handleKeyDown}
            placeholder={"Add New To Do Item"}
          />
          <button
            onClick={this.handleClick}
            className="btn-success btn-sm m-2"
            disabled={""}
          >
            Add
          </button>
        </div>
      );
    } else {
      return (
        <div style={{ position: "absolute", top: "100px", left: "500px" }}>
          {/*search bar */}
          <input
            key="search-bar"
            onChange={this.handleSearch}
            value={this.state.searchText}
            placeholder={"Search The To Do List"}
          />

          <List
            inputArray={this.filteredInputArray}
            onDelete={this.handleDelete}
            onEdit={this.handleEdit}
            onSave={this.handleSave}
            onCancel={this.handleCancel}
            onFinish={this.handleFinish}
            onEditPriority={this.handleEditPriority}
          />
          <Status
            statusArray={statusArray}
            onStatus={this.handleStatus}
            selectedStatus={selectedStatus}
          />
          <div>
            <input
              key="add-input"
              onChange={this.handleChange}
              value={this.state.newData.text}
              onKeyDown={this.handleKeyDown}
              placeholder={"Add New To Do Item"}
            />
            <button
              onClick={this.handleClick}
              className="btn-success btn-sm m-2"
            >
              Add
            </button>
          </div>
        </div>
      );
    }
  }
}
export default App;
