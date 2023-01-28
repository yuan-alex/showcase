import React from "react";

type Decorator = (Story: React.ComponentType) => JSX.Element;

export interface ComponentMeta<T> {
  id?: string;
  title?: string;
  component: any;
  decorators?: Decorator[];
  argTypes?: { [arg: string]: ArgType };
}

type ComponentStoryType =
  | "boolean"
  | "number"
  | "range"
  | "object"
  | "file"
  | "radio"
  | "inline-radio"
  | "check"
  | "inline-check"
  | "select"
  | "multi-select"
  | "text"
  | "color"
  | "date";

export type ArgType = {
  control:
    | {
        type: ComponentStoryType;
        min?: number; // used for range
        max?: number;
        step?: number;
        presetColors?: string[]; // used for color
        options?: string[]; // used for check
        accept?: string; // used for file
      }
    | "boolean"
    | "number"
    | "object"
    | "inline-radio"
    | "radio"
    | "select"
    | "text"
    | "color"
    | "date";
  labels?: { [option: string]: string }; // used for select
  options?: (string | number)[]; // used for radio
};

export type ComponentStory<T> = {
  (args: any): JSX.Element;
  args?: any;
  argTypes?: { [arg: string]: ArgType };
};
