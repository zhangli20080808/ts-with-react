import { Divider } from "antd";
import React from "react";

const TitleContainer: React.FC<{
  title: string;
  extraContent?: JSX.Element;
}> = ({ title, extraContent, children }) => {
  return (
    <>
      <Divider dashed />
      <div className="title">
        {title}
        <span>{extraContent}</span>
      </div>
      {children}
    </>
  );
};

export default TitleContainer;
