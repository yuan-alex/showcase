import { HexColorPicker } from "react-colorful";

import { ArgType } from "@showcasejs/react";

interface ArgsEditorProps {
  defaultArgs: any;
  args: any;
  updateArgs: (newArgs: any) => void;
  argTypes: { [arg: string]: ArgType };
}

export const ArgsEditor = ({
  defaultArgs, // used to render the defaults
  args,
  updateArgs,
  argTypes,
}: ArgsEditorProps) => {
  const updateArg = (argName: string, value: any) => {
    updateArgs({ ...args, [argName]: value });
  };

  return (
    <table className="mb-10 min-w-full">
      <thead className="border-b">
        <tr>
          <th className="px-5 py-3 text-left text-sm" style={{ width: 200 }}>
            Name
          </th>
          <th className="px-5 py-3 text-left text-sm" style={{ width: 100 }}>
            Type
          </th>
          <th className="px-5 py-3 text-left text-sm">Control</th>
        </tr>
      </thead>
      <tbody className="divide-y">
        {Object.keys(argTypes).map((arg) => {
          const argType = argTypes[arg];
          const argValue = args[arg];
          return (
            <tr key={arg}>
              <td className="px-5 py-4 font-mono text-sm">{arg}</td>
              <td className="px-5 py-4 font-mono text-sm">
                {typeof argType.control == "object"
                  ? argType.control.type
                  : argType.control}
              </td>
              <td className="text-md px-5 py-4">
                <RenderField
                  argName={arg}
                  argType={argType}
                  argValue={argValue}
                  updateArg={updateArg}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const RenderField = ({
  argName,
  argType,
  argValue,
  updateArg,
}: {
  argName: string;
  argType: ArgType;
  argValue: any | null;
  updateArg: (argName: string, value: any) => void;
}) => {
  const control =
    typeof argType.control == "string"
      ? argType.control
      : argType.control?.type;
  switch (control) {
    case "boolean":
      return (
        <input
          type="checkbox"
          value={argValue}
          onChange={(event) => {
            updateArg(argName, event.target.checked);
          }}
        />
      );
    case "number":
      return (
        <input
          type="number"
          className="w-full rounded border py-1 px-2"
          value={argValue}
          onChange={(event) => {
            updateArg(argName, event.target.value);
          }}
        />
      );
    case "range":
      return (
        <div className="flex space-x-2">
          <input
            type="range"
            min={argType.control.min}
            max={argType.control.max}
            step={argType.control.step}
            value={argValue}
            onChange={(event) => {
              updateArg(argName, event.target.value);
            }}
          />
          <p className="font-mono text-xs">{argValue}</p>
        </div>
      );
    case "object":
      return (
        <textarea
          className="w-full rounded border"
          value={JSON.stringify(argValue, null, 2)}
          onChange={(value: string) => {
            updateArg(argName, JSON.parse(value));
          }}
        />
      );
    case "file":
      return (
        <input
          type="file"
          accept={argType.control.accept}
          onChange={(event) => {
            updateArg(argName, event.target.files);
          }}
        />
      );
    case "radio":
      return (
        <div className="flex flex-col">
          {argType.options?.map((option) => (
            <div className="flex space-x-1" key={option}>
              <input
                type="radio"
                name={argName}
                value={option}
                checked={argValue === option}
                onChange={(e) => updateArg(argName, e.target.value)}
              />
              <p>{option}</p>
            </div>
          ))}
        </div>
      );
    case "inline-radio":
      return (
        <div className="flex space-x-3">
          {argType.options?.map((option) => (
            <div className="flex space-x-1" key={option}>
              <input
                type="radio"
                name={argName}
                value={option}
                checked={argValue === option}
                onChange={(e) => updateArg(argName, e.target.value)}
              />
              <p>{option}</p>
            </div>
          ))}
        </div>
      );
    case "check":
      return (
        <div className="flex flex-col">
          {argType.control.options.map((option) => (
            <div className="flex items-center space-x-1" key={option}>
              <input
                type="checkbox"
                name={argName}
                value={option}
                checked={argValue?.includes(option)}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateArg(argName, [...argValue, option]);
                  } else {
                    updateArg(
                      argName,
                      argValue.filter((x: any) => x !== option),
                    );
                  }
                }}
              />
              <p className="text-sm">{option}</p>
            </div>
          ))}
        </div>
      );
    case "select":
      return (
        <select
          className="rounded border py-1 px-2 text-sm"
          value={argValue}
          onChange={(event) => {
            updateArg(argName, event.target.value);
          }}
        >
          {argType.options?.map((option) => (
            <option key={option} value={option}>
              {argType.labels?.[option] || option}
            </option>
          ))}
        </select>
      );
    case "text":
      return (
        <textarea
          className="w-full rounded border p-3 text-sm"
          value={argValue}
          onChange={(event) => {
            updateArg(argName, event.target.value);
          }}
        />
      );
    case "color":
      return (
        <HexColorPicker
          color={argValue}
          onChange={(color) => updateArg(argName, color)}
        />
      );
    case "date":
      return (
        <input
          type="date"
          className="w-full rounded border py-1 px-2"
          value={argValue}
          onChange={(event) => {
            updateArg(argName, event.target.value);
          }}
        />
      );
    default:
      return null;
  }
};
