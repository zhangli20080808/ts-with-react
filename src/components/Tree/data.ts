import { TreeData } from "./typings";
const data: TreeData = {
  name: "父亲",
  key: "1",
  type: "folder",
  collapsed: false,
  children: [
    {
      name: "儿子1",
      key: "1-1",
      collapsed: false,
      type: "folder",
      children: [
        {
          name: "孙子1",
          key: "1-1-1",
          collapsed: false,
          type: "folder",
          children: [
            {
              name: "重孙1",
              key: "1-1-1-1",
              collapsed: false,
              type: "folder",
              children: [],
            },
          ],
        },
      ],
    },
    {
      name: "儿子2",
      key: "1-2",
      collapsed: false,
      type: "folder",
    },
  ],
};

export default data;
