import React from "react";

interface FormProps {
  name?: string;
}

export const Form: React.FC<FormProps> = (props) => {
  const { name } = props;
  return (
    <div>
      <form name={name}>13</form>
    </div>
  );
};
