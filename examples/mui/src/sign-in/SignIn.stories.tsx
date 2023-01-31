import React from "react";

import { ComponentMeta, ComponentStory } from "@showcasejs/react";

import SignIn from "./SignIn";

export default {
  component: SignIn,
} as ComponentMeta<typeof SignIn>;

const Template: ComponentStory<typeof SignIn> = (args) => <SignIn {...args} />;

export const Default = Template.bind({});
