import React, { FC } from "react";
import { UploadFile } from "./upload";

interface UploadListProps {
  fileList: UploadFile[];
  onRemove: (_file: UploadFile) => void;
}

export const UploadList: FC<UploadListProps> = props => {
  const { fileList } = props;
  return (
    <div className="">
      {fileList.map(item => {
        return (
          <li className="viking-upload-list-item" key={item.uid}>
            <span className={`file-name file-name-${item.status}`}>
              {/*<Icon icon="file-alt" />*/}
            </span>
          </li>
        );
      })}
    </div>
  );
};
export default UploadList;
