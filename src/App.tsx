import React, { useState } from "react";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCoffee } from "@fortawesome/free-solid-svg-icons";

import { library } from "@fortawesome/fontawesome-svg-core"; // 导入图标仓库
import { fas } from "@fortawesome/free-solid-svg-icons"; // 全部图标

import Button from "./components/Button/button";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
import Transition from "./components/Transition/transition";

import Icon from "./components/Icon/icon";
import IdSelect from "./components/IdSelect/idSelect";
// import Upload2 from "./components/upload2";
import Upload from "./components/Upload/upload";
// import Tree from "./components/Tree/index";

library.add(fas); // 把图标添加进仓库

const App: React.FC = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({ num: 0 });
  return (
    <div style={{ padding: 30 }}>
      <Upload
        defaultFileList={[]}
        action=""
        onChange={(file) => {
          console.log(file, "1");
        }}
      />
      {/* <Tree/> */}
      {/* <IdSelect
        options={[{ label: "123", value: 123 }]}
        value={data.num}
        defaultOptionName="123123"
        // onChange={value => setData({ ...data, num: value })}
      /> */}
      {/*<PreviewImage imgGroup={images} />*/}
      {/*<Carousel src={images} />*/}
      <Icon icon="arrow-down" size="4x" theme="danger" />
      {/*<Menu*/}
      {/*  defaultIndex="0"*/}
      {/*  onSelect={index => alert(index)}*/}
      {/*  mode="horizontal"*/}
      {/*  defaultOpenSubMenus={["4"]}*/}
      {/*>*/}
      {/*  <MenuItem>1</MenuItem>*/}
      {/*  <MenuItem disabled>2</MenuItem>*/}
      {/*  <MenuItem>3</MenuItem>*/}
      {/*  <MenuItem>4</MenuItem>*/}
      {/*  <SubMenu title="dropMenu">*/}
      {/*    <MenuItem>dropMenu1</MenuItem>*/}
      {/*    <MenuItem>dropMenu2</MenuItem>*/}
      {/*  </SubMenu>*/}
      {/*</Menu>*/}
      {/*<Button className="customer">普通按钮</Button>*/}
      {/*<Button disabled>disabled</Button>*/}
      {/*<Button btnType="primary" size="lg">*/}
      {/*  Primary*/}
      {/*</Button>*/}
      {/*<Button btnType="primary" size="sm">*/}
      {/*  Primary*/}
      {/*</Button>*/}
      {/*<Button btnType="danger" size="sm">*/}
      {/*  Danger*/}
      {/*</Button>*/}
      {/*<Button btnType="link" href="www.baidu.com" target="_black">*/}
      {/*  Link*/}
      {/*</Button>*/}
      {/*<Button btnType="link" href="www.baidu.com" disabled>*/}
      {/*  Link*/}
      {/*</Button>*/}
      {/*<div>learn react</div>*/}

      {/*<Button*/}
      {/*  onClick={() => {*/}
      {/*    setShow(!show);*/}
      {/*  }}*/}
      {/*>*/}
      {/*  Toggle*/}
      {/*</Button>*/}

      {/*<Transition in={show} timeout={300} wrapper animation="zoom-in-top">*/}
      {/*  <div>ngsgngkasngnsgkdnsakgsnd个asgag</div>*/}

      {/*  <Button>123123</Button>*/}
      {/*</Transition>*/}
    </div>
  );
};

export default App;
