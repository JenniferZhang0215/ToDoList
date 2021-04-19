import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import List from "./index";
import Edit from "../edit";

const props = {
  inputArray: [],
  onEdit: jest.fn(),
  onDelete: jest.fn(),
  onSave: jest.fn(),
  onCancel: jest.fn(),
  onFinish: jest.fn(),
  onEditPriority: jest.fn(),
};

configure({ adapter: new Adapter() });

describe("<List />", () => {
  it("should render default snapshot", () => {
    const wrapper = shallow(<List {...props} />);
    expect(wrapper).toMatchSnapshot("default");
  });

  describe("when item.edit is false", () => {
    const item = {
      key: "1",
      priority: 0,
      text: "fake text",
      edit: false,
      status: false,
    };
    const inputArray = [item];
    const newProps = { ...props, inputArray };
    const wrapper = shallow(<List {...newProps} />);
    it("should render correctly", () => {
      expect(wrapper).toMatchSnapshot("edit is false");
    });

    describe("input", () => {
      const input = wrapper.find("input");
      it("should call onEditPriority if input is changed", () => {
        const e = { target: { value: 1 } };
        input.simulate("change", e);
        expect(newProps.onEditPriority).toHaveBeenCalledWith(e, item);
      });

      it("should pass priority to input value", () => {
        expect(input.props().value).toEqual(item.priority);
      });
    });

    describe("span", () => {
      const span = wrapper.find("span");
      it("should call onFinish function with correct argument when input is clicked", () => {
        span.simulate("click");
        expect(newProps.onFinish).toHaveBeenCalledWith(item);
      });

      it("should pass null as the value of className of span", () => {
        expect(span.props().className).toEqual(null);
      });
    });

    describe("edit button", () => {
      const button = wrapper.findWhere((node) => node.key() === "edit-btn");
      button.simulate("click");
      expect(newProps.onEdit).toHaveBeenCalledWith(item);
    });

    describe("delete button", () => {
      const button = wrapper.findWhere((node) => node.key() === "delete-btn");
      button.simulate("click");
      expect(newProps.onDelete).toHaveBeenCalledWith(item);
    });
  });

  describe("when item.edit is true", () => {
    const item = {
      key: "1",
      priority: 0,
      text: "fake text",
      edit: true,
      status: false,
    };
    const inputArray = [item];
    const newProps = { ...props, inputArray };
    const wrapper = shallow(<List {...newProps} />);

    it("should render correctly", () => {
      expect(wrapper).toMatchSnapshot("edit is true");
    });

    describe("input", () => {
      const input = wrapper.find("input");
      it("should call onEditPriority if input is changed", () => {
        const e = { target: { value: 1 } };
        input.simulate("change", e);
        expect(newProps.onEditPriority).toHaveBeenCalledWith(e, item);
      });

      it("should pass priority to input value", () => {
        expect(input.props().value).toEqual(item.priority);
      });
    });

    describe("<Edit />", () => {
      const editComponent = wrapper.find(Edit);
      it("should call onSave function with correct argument", () => {
        const editText = "fake edit text";
        editComponent.simulate("save", editText);
        expect(newProps.onSave).toHaveBeenCalledWith(item, editText);
      });

      it("should call onCancel function with correct argument", () => {
        editComponent.simulate("cancel");
        expect(newProps.onCancel).toHaveBeenCalledWith(item);
      });
    });

    describe("delete button", () => {
      const button = wrapper.find("button");
      button.simulate("click");
      expect(newProps.onDelete).toHaveBeenCalledWith(item);
    });
  });
});
