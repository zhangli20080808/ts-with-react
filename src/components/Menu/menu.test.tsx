import React from "react";
import {
  render,
  fireEvent,
  RenderResult,
  cleanup,
  wait
} from "@testing-library/react";

import Menu, { MenuProps } from "./menu";

import MenuItem from "./menuItem";
// @ts-ignore
import SubMenu from "./subMenu";

// 1. 提供默认属性 显示正常行为
// 2. 测试行为 点击事件切换 还是属性的回调触发
// 3. 渲染对应的class

const testProps: MenuProps = {
  defaultIndex: "0",
  onSelect: jest.fn(),
  className: "test"
};

const testVerProps: MenuProps = {
  defaultIndex: "0",
  mode: "vertical"
};

const createStyleFile = () => {
  const cssFile: string = `
    .viking-submenu {
      display: none;
    }
    .viking-submenu.menu-opened {
      display:block;
    }
  `;
  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = cssFile;
  return style;
};

// 用来渲染不同类型的组件
const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem index="0">active</MenuItem>
      <MenuItem disabled index="1">
        disabled
      </MenuItem>
      <MenuItem index="2">xyz</MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>drop1</MenuItem>
      </SubMenu>
      <SubMenu title="opened">
        <MenuItem>opened1</MenuItem>
      </SubMenu>
    </Menu>
  );
};
// 由于几个case都要操作相同的元素，
let wrapper: RenderResult,
  // wrapper2: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disableElement: HTMLElement;
describe("test Menu and MenuItem component", () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps));
    // 一般都是通过渲染元素的内容 而不是通过id class 推荐给外层的元素加上一个id
    wrapper.container.append(createStyleFile());
    menuElement = wrapper.getByTestId("test-menu");
    activeElement = wrapper.getByText("active");
    disableElement = wrapper.getByText("disabled");
  });
  it("should render current Menu and MenuItem based on default props", () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass("viking-menu test");
    // expect(menuElement.getElementsByTagName("li").length).toEqual(7);
    expect(menuElement.querySelectorAll(":scope >li").length).toEqual(4);
    expect(activeElement).toHaveClass("menu-item is-active");
    expect(disableElement).toHaveClass("menu-item is-disabled");
  });
  it("click item should change active and call the right callback", () => {
    const thirdItem = wrapper.getByText("xyz");
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass("is-active");
    expect(activeElement).not.toHaveClass("is-active");
    expect(testProps.onSelect).toHaveBeenCalledWith("2");
    fireEvent.click(disableElement);
    expect(disableElement).not.toHaveClass("is-active");
    expect(testProps.onSelect).not.toHaveBeenCalledWith("1");
  });
  it("should render vertical class when mode is vertical", () => {
    cleanup();
    const wrapper = render(generateMenu(testVerProps));
    const menuElement = wrapper.getByTestId("test-menu");
    expect(menuElement).toHaveClass("menu-vertical");
  });

  it("should show dropdown item when hover on submenu", async () => {
    expect(wrapper.getByText("drop1")).not.toBeVisible();
    const dropElement = wrapper.getByText("dropdown");
    fireEvent.mouseEnter(dropElement);
    await wait(() => {
      expect(wrapper.getByText("drop1")).toBeVisible();
    });
    fireEvent.click(wrapper.getByText("drop1"));
    expect(testProps.onSelect).toHaveBeenCalledWith("3-0");
    fireEvent.mouseLeave(dropElement);
    await wait(() => {
      expect(wrapper.getByText("drop1")).not.toBeVisible();
    });
  });
});

// describe("test Menu and MenuItem component in vertical mode", () => {
//   beforeEach(() => {
//     wrapper2 = render(generateMenu(testVerProps));
//     wrapper2.container.append(createStyleFile());
//   });
//   it("should render vertical mode when mode is set to vertical", () => {
//     const menuElement = wrapper2.getByTestId("test-menu");
//     expect(menuElement).toHaveClass("menu-vertical");
//   });
//   it("should show dropdown items when click on subMenu for vertical mode", () => {
//     const dropDownItem = wrapper2.queryByText("drop1");
//     expect(dropDownItem).not.toBeVisible();
//     fireEvent.click(wrapper2.getByText("dropdown"));
//     expect(dropDownItem).toBeVisible();
//   });
//   it("should show subMenu dropdown when defaultOpenSubMenus contains SubMenu index", () => {
//     expect(wrapper2.queryByText("opened1")).toBeVisible();
//   });
// });
