import React from "react";

import { ComponentMeta, ComponentStory } from "@showcasejs/react";

import Test from "./Test";

export default {
  component: Test,
} as ComponentMeta<typeof Test>;

const Template: ComponentStory<typeof Test> = (args) => <Test {...args} />;

export const Default = Template.bind({});
