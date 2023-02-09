import React from "react";
import { useParams } from "react-router-dom";

import { stories } from "@showcasejs/internal";

import { ArgsEditor } from "./ArgsEditor.js";

interface ViewportOption {
  name: string;
  styles: {
    width: string | number;
    height: string | number;
  };
  type?: string;
}

const MINIMAL_VIEWPORTS: { [key: string]: ViewportOption } = {
  default: {
    name: "Default",
    styles: {
      width: "100%",
      height: "100%",
    },
  },
  tablet: {
    name: "Tablet",
    styles: {
      height: "1112px",
      width: "834px",
    },
    type: "tablet",
  },
  mobile2: {
    name: "Large mobile",
    styles: {
      height: "896px",
      width: "414px",
    },
    type: "mobile",
  },
  mobile1: {
    name: "Small mobile",
    styles: {
      height: "568px",
      width: "320px",
    },
    type: "mobile",
  },
};

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
  const [viewportMode, setViewportMode] = React.useState("default");

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
    <div className="flex h-screen flex-col divide-y">
      <div className="flex h-12 flex-none p-2">
        <select
          value={viewportMode}
          onChange={(event) => setViewportMode(event.target.value)}
          className="rounded border py-1 px-2 text-sm"
        >
          {Object.keys(MINIMAL_VIEWPORTS).map((viewport) => (
            <option value={viewport}>{MINIMAL_VIEWPORTS[viewport].name}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-grow justify-center overflow-y-auto bg-gray-100 p-3">
        <iframe
          className="border bg-white shadow-lg"
          src={`/stories/${storyId}/preview?props=${encodedProps}`}
          style={viewportMode ? MINIMAL_VIEWPORTS[viewportMode]?.styles : {}}
        />
      </div>
      <div className="h-80 flex-none grow-0 overflow-y-auto">
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
              <h3 className="text-md font-medium">No arguments</h3>
              <p className="mt-1 text-sm text-gray-500">
                Add argument types to your story using the `argTypes` property.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
