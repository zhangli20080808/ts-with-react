import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import { Upload, UploadProps } from "./upload";

export default {
  title: "Example/Upload",
  component: Upload,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

const Template: Story<UploadProps> = (args) => <Upload {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  action: "",
};
