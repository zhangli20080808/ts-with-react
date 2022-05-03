import React from "react";

const NoContent: React.FC<{
  style?: React.CSSProperties;
  content?: string;
}> = ({ style, content }) => {
  return (
    <div style={style} className="noContent">
      <div className="inner">{content ? content : "暂无数据"}</div>
    </div>
  );
};

export default NoContent;
