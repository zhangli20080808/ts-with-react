import classNames from "classnames";
import React from "react";
interface FormItemProps {
  label?: string;
}

export const FormItem: React.FC<FormItemProps> = (props) => {
  const { label } = props;
  const rowClass = classNames('viking-row',{
    'viking-row-no-label':label
  })
  return (
    <div className={rowClass}>
      
    {
        label && <div></div>
    }
    </div>
  );
};
