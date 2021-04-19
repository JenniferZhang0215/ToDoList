import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import Edit from "./index";

const props = {
  onCancel: jest.fn(),
  onSave: jest.fn(),
  defaultValue: "fake default value",
};

configure({ adapter: new Adapter() });

describe("<Edit />", () => {
  const wrapper = shallow(<Edit {...props} />);

  it("should render default snapshot", () => {
    expect(wrapper).toMatchSnapshot("default");
  });

  describe("edit input", () => {
    const input = wrapper.findWhere((node) => node.key() === "edit-input");
    it("should call handleEditItem function when edit input is changed", () => {
      const e = { target: { value: "edit input" } };
      input.simulate("change", e);
      expect(wrapper.state("editText")).toEqual(e.target.value);
    });
    it("should pass defaultValue to input correctly", () => {
      expect(input.props().defaultValue).toEqual(props.defaultValue);
    });
  });

  describe("cancel button", () => {
    const button = wrapper.findWhere((node) => node.key() === "cancel-btn");
    it("should pass onCancel correctly", () => {
      expect(button.props().onClick).toEqual(props.onCancel);
    });
  });

  describe("save button", () => {
    it("should call onSave function if the save button is clicked", () => {
      const button = wrapper.findWhere((node) => node.key() === "save-btn");
      const mockEditText = wrapper.state("editText");
      button.simulate("click");
      expect(props.onSave).toHaveBeenCalledWith(mockEditText);
    });
  });
});
