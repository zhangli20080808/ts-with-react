import React from "react";
import { storiesOf } from "@storybook/react";
import { library } from "@fortawesome/fontawesome-svg-core"; // 导入图标仓库
import { fas } from "@fortawesome/free-solid-svg-icons"; // 全部图标

import { action } from "@storybook/addon-actions";
import Upload, { UploadFile } from "./upload";
//import Button from '../Button/button'
import Icon from "../Icon/icon";
library.add(fas); // 把图标添加进仓库

const defaultFileList: UploadFile[] = [
  {
    uid: "123",
    size: 1234,
    name: "hello.md",
    status: "uploading",
    percent: 60,
  },
  { uid: "122", size: 1234, name: "xyz.md", status: "success", percent: 30 },
  { uid: "121", size: 1234, name: "eyiha.md", status: "error", percent: 30 },
];
// const checkFileSize = (file: File) => {
//   if (Math.round(file.size / 1024) > 50) {
//     alert('file too big')
//     return false;
//   }
//   return true;
// }
// const filePromise = (file: File) => {
//   const newFile = new File([file], 'new_name.docx', {type: file.type})
//   return Promise.resolve(newFile)
// }
const SimpleUpload = () => {
  return (
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      onChange={action("changed")}
      onRemove={action("removed")}
      defaultFileList={defaultFileList}
      name="fileName"
      headers={{
        x: "123",
      }}
      data={{
        key: "value",
      }}
      accept='.jpg'
      // multiple
      drag
    >
      <Icon icon="upload" size="4x" theme="secondary" />
      <br />
      <p>Drag file over to upload</p>
    </Upload>
  );
};

storiesOf("Upload component", module).add("Upload", SimpleUpload);
