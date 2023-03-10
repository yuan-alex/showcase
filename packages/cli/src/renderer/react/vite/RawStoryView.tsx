import React, { useState } from "react";

import { preview, stories } from "@showcasejs/internal";

interface RawStoryViewProps {
  component?: JSX.Element;
  props?: any;
}

export const RawStoryView = (props: RawStoryViewProps) => {
  const searchParams = new URLSearchParams(document.location.search);

  const storyId = searchParams.get("storyId");
  if (!storyId) {
    return (
      <div style={{ padding: 20 }}>
        <strong>Couldn't find this story</strong>
        <p>Pick another one if you just deleted this story.</p>
      </div>
    );
  }

  const [a, b] = storyId.split("--");
  const [componentName, setComponentName] = useState(a);
  const [storyName, setStoryName] = useState(b);

  const [storyProps, setStoryProps] = useState(
    JSON.parse(searchParams.get("props") ?? props.props ?? "{}"),
  );

  React.useEffect(() => {
    const [componentName, storyName] = storyId.split("--");
    setComponentName(componentName);
    setStoryName(storyName);

    if (searchParams.get("props") != null) {
      setStoryProps(
        JSON.parse(decodeURIComponent(searchParams.get("props")!!)),
      );
    } else {
      setStoryProps(stories[componentName][storyName]?.args || {});
    }
  }, [stories, storyId, searchParams]);

  const decorate = React.useCallback(
    (element: JSX.Element) => {
      const globalDecorators = preview?.decorators || [];
      const componentDecorators =
        stories[componentName]["default"]?.decorators || [];
      const storyDecorators =
        stories[componentName][storyName]?.decorators || [];

      const decorators = globalDecorators
        .concat(componentDecorators)
        .concat(storyDecorators)
        .filter((d) => d != undefined);

      return (
        decorators?.reduce(
          (accumulator, currentValue) => currentValue(() => accumulator),
          element,
        ) || element
      );
    },
    [componentName],
  );

  return (
    <div id="raw-story-view">
      {decorate(stories[componentName][storyName](storyProps))}
    </div>
  );
};
