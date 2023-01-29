import { stories } from "@showcasejs/internal/stories";
import React from "react";
import { useParams } from "react-router-dom";
import { ArgsEditor } from "./ArgsEditor.js";

export const StoryView = () => {
  const { storyId } = useParams();
  if (!storyId) {
    return null;
  }

  const [componentName, setComponentName] = React.useState(
    storyId.split("--")[0],
  );
  const [storyName, setStoryName] = React.useState(storyId.split("--")[1]);

  const [props, setProps] = React.useState({});
  const [encodedProps, setEncodedProps] = React.useState<string>(
    encodeURIComponent("{}"),
  );
  const [viewportMode, setViewportMode] = React.useState<string>("desktop");

  React.useEffect(() => {
    const [componentName, storyName] = storyId.split("--");
    setComponentName(componentName);
    setStoryName(storyName);
    setProps(stories[componentName][storyName]?.args || {});
  }, [stories, storyId]);

  React.useEffect(() => {
    setEncodedProps(encodeURIComponent(JSON.stringify(props)));
  }, [props]);

  return (
    <div className="flex h-full flex-col divide-y">
      <div className="flex h-12 p-2">
        <select
          value={viewportMode}
          onChange={(event) => setViewportMode(event.target.value)}
          className="rounded border py-1 px-2 text-sm"
        >
          <option value="desktop">Desktop</option>
          <option value="tablet">Tablet</option>
          <option value="mobile">Mobile</option>
        </select>
      </div>
      <div
        className={`flex flex-grow items-center justify-center ${
          ["tablet", "mobile"].includes(viewportMode) ? "bg-gray-100 p-5" : ""
        }`}
      >
        <iframe
          className={`h-full ${
            ["tablet", "mobile"].includes(viewportMode)
              ? "border bg-white shadow-xl"
              : ""
          }`}
          src={`/stories/${storyId}/preview?props=${encodedProps}`}
          style={{
            width:
              viewportMode === "tablet"
                ? 810
                : viewportMode === "mobile"
                ? 410
                : "100%",
          }}
        />
      </div>
      <div className="h-80 overflow-y-auto">
        <div>
          {stories[componentName][storyName].argTypes ||
          stories[componentName]["default"].argTypes ? (
            <ArgsEditor
              defaultArgs={stories[componentName][storyName].args}
              args={props}
              argTypes={
                stories[componentName][storyName].argTypes ||
                stories[componentName]["default"].argTypes
              }
              updateArgs={setProps}
            />
          ) : (
            <div className="p-5">
              <h3 className="text-sm font-medium">No arguments</h3>
              <p className="mt-1 text-sm text-gray-500">
                Add arguments to your story by adding them to the `args`
                property.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
