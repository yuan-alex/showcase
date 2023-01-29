import React, { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { stories } from "@showcasejs/internal/stories";

interface RawStoryViewProps {
  component?: JSX.Element;
  props?: any;
}

export const RawStoryView = (props: RawStoryViewProps) => {
  const { storyId } = useParams();
  const [searchParams] = useSearchParams();

  if (!storyId) {
    return null;
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

  const decoratorWrapper = React.useCallback(
    (element: JSX.Element) => {
      const decorator = stories[componentName]["default"]?.decorators?.reduce(
        (acc, curr) => curr(() => acc),
      );
      if (decorator) {
        return decorator(() => element);
      }
      return element;
    },
    [componentName],
  );

  return (
    <main id="raw-story-view">
      {decoratorWrapper(stories[componentName][storyName](storyProps))}
    </main>
  );
};
