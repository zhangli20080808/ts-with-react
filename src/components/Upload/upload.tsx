import React, { ChangeEvent, FC, useRef, useState } from "react";
import { Button } from "../Button/button";
import axios from "axios";
import UploadList from "./uploadList";

export type UploadFileStatus = "ready" | "uploading" | "success" | "error";

export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status: UploadFileStatus;
  percent?: number;
  // 源文件
  raw?: File;
  response?: any;
  error?: any;
}

export interface UploadProps {
  // 后续 File 类型 替换成 UploadFile ，因为信息更具体
  action: string;
  // 默认显示组件已经上传过的图片信息
  defaultFileList: UploadFile[];
  beforeUpload?: (file: File) => boolean | Promise<File>;
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (err: any, file: File) => void;
  onChange?: (file: File) => void;
  // 从当前列表中删除文件
  onRemove?: (file: UploadFile) => void;
}

export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    defaultFileList = [],
    onRemove,
  } = props;
  const fileInput = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);
  /**
   *
   * @param updateFile 当前需要更新的文件
   * @param updateObj 更新的项目 Partial 更新任何几项都可以
   */
  const uploadFileList = (
    updateFile: UploadFile,
    updateObj: Partial<UploadFile>
  ) => {
    setFileList((prevList) => {
      return prevList.map((file) => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj };
        }
        return file;
      });
    });
  };
  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };
  /**
   * 文件上传方法
   * @param file
   */
  const post = (file: File) => {
    const curFile: UploadFile = {
      uid: `${Date.now()}-upload-file`,
      status: "ready",
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    };
    setFileList([curFile, ...fileList]);
    const formData = new FormData();
    formData.append(file.name, file);
    axios
      .post(action, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (e) => {
          // 四舍五入向上取整
          const percentage = Math.round((e.loaded * 100) / e.total) || 0;
          if (percentage < 100) {
            if (onProgress) {
              // 拿到上次更新的 fileList
              uploadFileList(curFile, {
                percent: percentage,
                status: "uploading",
              });
              onProgress(percentage, file);
            }
          }
        },
      })
      .then((res) => {
        uploadFileList(curFile, {
          status: "success",
          response: res.data,
        });
        if (onSuccess) {
          onSuccess(res.data, file);
        }
      })
      .catch((err) => {
        uploadFileList(curFile, {
          status: "error",
          error: err,
        });
        if (onError) {
          onError(err, file);
        }
      })
      .finally(() => {
        if (onChange) {
          onChange(file);
        }
      });
  };

  const uploadFiles = (files: FileList) => {
    const postFiles = Array.from(files);
    postFiles.forEach((file) => {
      if (!beforeUpload) {
        post(file);
      } else {
        const result = beforeUpload(file);
        if (result && result instanceof Promise) {
          result.then((processedFile) => {
            post(processedFile);
          });
        } else if (result) {
          post(file);
        }
      }
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) return;
    uploadFiles(files);
    // 上传结束，清空值
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };

  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter((item) => item.uid !== file.uid);
    });
    if (onRemove) {
      onRemove(file);
    }
  };

  /**
   * 完成验证 boolean、转换结果
   */

  // const checkFileSize = (file: File) => {
  //   if (Math.round(file.size / 1024) > 50) {
  //     alert("file too big");
  //     return false;
  //   }
  //   return true;
  // };

  // const filePromise = (file: File) => {
  //   const newFile = new File([file], "new_name.docx", { type: file.type });
  //   return Promise.resolve(newFile);
  // };
  console.log(fileList);
  return (
    <div className="viking-upload-component">
      <Button btnType="primary" onClick={handleClick}>
        Upload File
      </Button>
      <input
        type="file"
        style={{ display: "none" }}
        ref={fileInput}
        onChange={handleFileChange}
      />
      <UploadList onRemove={handleRemove} fileList={fileList} />
    </div>
  );
};
