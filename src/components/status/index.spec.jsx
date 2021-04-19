import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import Status from "./index";

const props = {
  statusArray: ["All", "Processing", "Done"],
  onStatus: jest.fn(),
  selectedStatus: "All",
};

configure({ adapter: new Adapter() });
describe("<Status />", () => {
  const wrapper = shallow(<Status {...props} />);

  it("should render default snapshot", () => {
    expect(wrapper).toMatchSnapshot("default");
  });

  describe("span", () => {
    const status = "Processing";
    const span = wrapper
      .findWhere((node) => node.key() === status)
      .find("span");
    it("should call onStatus if status text is clicked", () => {
      span.simulate("click");
      expect(props.onStatus).toHaveBeenCalledWith(status);
    });

    it("should render status text correctly", () => {
      expect(span.text()).toEqual(status);
    });
  });
});
