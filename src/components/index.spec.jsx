import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import App from "./index";
import List from "./list";
import Status from "./status";

configure({ adapter: new Adapter() });
describe("<App />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("when inputArray is empty", () => {
    const wrapper = shallow(<App />);
    wrapper.setState({ inputArray: [] });

    it("should render default snapshot", () => {
      expect(wrapper).toMatchSnapshot("default");
    });

    it("should render correctly", () => {
      expect(wrapper).toMatchSnapshot("default");
    });

    it("should render No ToDos Here", () => {
      const title = wrapper.find("h3");
      expect(title.text()).toEqual("No ToDos Here");
    });

    describe("input", () => {
      const input = wrapper.find("input");
      const e = { target: { value: "fake input" }, keyCode: 13 };
      it("should call handleChange when input is changed", () => {
        const id = wrapper.state("id");
        input.simulate("change", e);
        expect(wrapper.state("newData")).toEqual({
          key: id,
          text: e.target.value,
          edit: false,
          status: false,
          priority: 0,
        });
      });

      it("should call handleKeyDown", () => {
        const instance = wrapper.instance();
        jest.spyOn(instance, "handleClick");
        input.simulate("keyDown", e);
        expect(instance.handleClick).toHaveBeenCalled();
      });

      it("should render correct placeholder", () => {
        expect(input.props().placeholder).toEqual("Add New To Do Item");
      });

      it("should pass correct value", () => {
        expect(input.props().value).toEqual(wrapper.state("newData").text);
      });
    });

    describe("button", () => {
      const button = wrapper.find("button");
      it("should call handleClick if add button is clicked", () => {
        const mockNewData = {
          key: 0,
          text: "fake text",
          edit: false,
          status: false,
          priority: 0,
        };
        wrapper.setState({
          newData: mockNewData,
          inputArray: [],
          id: 1,
        });
        button.simulate("click");
        expect(wrapper.state("newData")).toEqual({
          edit: false,
          key: 1,
          priority: 0,
          status: false,
          text: "",
        });
        expect(wrapper.state("inputArray")).toEqual([mockNewData]);
        expect(wrapper.state("id")).toEqual(2);
      });

      it("should render text Add", () => {
        expect(button.text()).toEqual("Add");
      });
    });
  });

  describe("when inputArray is not empty", () => {
    const wrapper = shallow(<App />);
    const initialInputArray = [
      { edit: false, key: 0, priority: 0, status: false, text: "fake text 1" },
      { edit: false, key: 1, priority: 0, status: false, text: "fake text 2" },
    ];
    wrapper.setState({
      inputArray: initialInputArray,
    });

    it("should render correctly", () => {
      expect(wrapper).toMatchSnapshot();
    });

    describe("filteredInputArray", () => {
      const instance = wrapper.instance();

      it("when selectedStatus is All", () => {
        expect(instance.filteredInputArray).toEqual(
          wrapper.state("inputArray")
        );
      });

      it("when selectedStatus is Done", () => {
        wrapper.setState({ selectedStatus: "Done" });
        expect(instance.filteredInputArray).toEqual([]);
      });

      it("when selectedStatus is Processing", () => {
        wrapper.setState({ selectedStatus: "Processing" });
        expect(instance.filteredInputArray).toEqual(initialInputArray);
      });

      it("when searchText exists", () => {
        wrapper.setState({ searchText: "fake text 1" });
        expect(instance.filteredInputArray).toEqual([
          {
            edit: false,
            key: 0,
            priority: 0,
            status: false,
            text: "fake text 1",
          },
        ]);
      });
    });

    describe("search bar input", () => {
      const input = wrapper.findWhere((node) => node.key() === "search-bar");

      it("should call handleSearch when input is changed", () => {
        const e = { target: { value: "fake search content" } };
        input.simulate("change", e);
        expect(wrapper.state("searchText")).toEqual(e.target.value);
      });

      it("should have correct placeholder value", () => {
        expect(input.props().placeholder).toEqual("Search The To Do List");
      });
    });

    describe("<List />", () => {
      const listComponent = wrapper.find(List);

      it("should have correct inputArray value", () => {
        expect(listComponent.props().inputArray).toEqual(initialInputArray);
      });

      it("should assign handleDelete function as onDelete", () => {
        const item = {
          edit: false,
          key: 1,
          priority: 0,
          status: false,
          text: "fake text 2",
        };
        listComponent.simulate("delete", item);
        expect(wrapper.state("inputArray")).toEqual([
          {
            edit: false,
            key: 0,
            priority: 0,
            status: false,
            text: "fake text 1",
          },
        ]);
      });

      it("should assign handleEdit function as onEdit", () => {
        const item = {
          edit: false,
          key: 0,
          priority: 0,
          status: false,
          text: "fake text 1",
        };
        listComponent.simulate("edit", item);
        expect(wrapper.state("inputArray")).toEqual([
          {
            edit: true,
            key: 0,
            priority: 0,
            status: false,
            text: "fake text 1",
          },
        ]);
      });

      it("should assign handleSave function as onEdit", () => {
        const item = {
          edit: true,
          key: 0,
          priority: 0,
          status: false,
          text: "fake text 1",
        };
        const editedText = "edited fake text 1";
        listComponent.simulate("save", item, editedText);
        expect(wrapper.state("inputArray")).toEqual([
          {
            edit: false,
            key: 0,
            priority: 0,
            status: false,
            text: editedText,
          },
        ]);
      });

      it("should assign handleCancel function as onEdit", () => {
        const item = {
          edit: true,
          key: 0,
          priority: 0,
          status: false,
          text: "fake text",
        };
        wrapper.setState({ inputArray: [item] });
        listComponent.simulate("cancel", item);
        expect(wrapper.state("inputArray")).toEqual([
          {
            edit: false,
            key: 0,
            priority: 0,
            status: false,
            text: "fake text",
          },
        ]);
      });

      it("should assign handleFinish function as onEdit", () => {
        const item = {
          edit: false,
          key: 0,
          priority: 0,
          status: false,
          text: "fake text",
        };
        wrapper.setState({ inputArray: [item] });
        listComponent.simulate("finish", item);
        expect(wrapper.state("inputArray")).toEqual([
          {
            edit: false,
            key: 0,
            priority: 0,
            status: true,
            text: "fake text",
          },
        ]);
      });

      it("should assign handleEditPriority function as onEdit", () => {
        const item = {
          edit: false,
          key: 0,
          priority: 0,
          status: false,
          text: "fake text",
        };
        const e = { target: { value: 1 } };
        wrapper.setState({ inputArray: [item] });
        listComponent.simulate("editPriority", e, item);
        expect(wrapper.state("inputArray")).toEqual([
          {
            edit: false,
            key: 0,
            priority: e.target.value,
            status: false,
            text: "fake text",
          },
        ]);
      });
    });

    describe("<Status />", () => {
      const statusComponent = wrapper.find(Status);

      it("should have correct statusArray value", () => {
        expect(statusComponent.props().statusArray).toEqual(
          wrapper.state("statusArray")
        );
      });

      it("should call statusArray", () => {
        const status = "Done";
        statusComponent.simulate("status", status);
        expect(wrapper.state("selectedStatus")).toEqual(status);
      });
    });
  });
});
