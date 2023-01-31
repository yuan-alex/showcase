import React from "react";

import { ComponentMeta, ComponentStory } from "@showcasejs/react";

import Pricing from "./Pricing";

export default {
  component: Pricing,
} as ComponentMeta<typeof Pricing>;

const Template: ComponentStory<typeof Pricing> = (args) => (
  <Pricing {...args} />
);

export const Default = Template.bind({});
