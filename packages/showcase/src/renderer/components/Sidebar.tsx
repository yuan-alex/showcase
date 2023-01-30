import {
  BookmarkIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "react-router-dom";

import { stories } from "@showcasejs/internal/stories";

const SidebarComponent = ({
  storyComponentName,
}: {
  storyComponentName: string;
}) => {
  const [hidden, setHidden] = React.useState<boolean>(false);

  return (
    <div key={storyComponentName}>
      <div
        className="cursor-pointer px-4 py-2 hover:bg-gray-200"
        onClick={() => setHidden((i) => !i)}
      >
        <div className="flex items-center space-x-2">
          {hidden ? (
            <ChevronRightIcon className="h-4 w-4" />
          ) : (
            <ChevronDownIcon className="h-4 w-4" />
          )}
          <p className="text-sm">{storyComponentName}</p>
        </div>
      </div>
      {!hidden && (
        <div className="flex flex-col">
          {Object.keys(stories[storyComponentName])
            .filter((k) => k != "default")
            .map((storyName) => (
              <Link to={`/stories/${storyComponentName}--${storyName}`}>
                <div className="flex w-full cursor-pointer items-center space-x-2 py-2 hover:bg-gray-200">
                  <BookmarkIcon className="ml-10 h-4 w-4 text-blue-500" />
                  <p key={storyName} className="text-xs">
                    {storyName}
                  </p>
                </div>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
};

export const Sidebar = () => {
  return (
    <div className="flex h-full flex-col">
      <Link to="/">
        <div className="flex cursor-pointer items-center space-x-3 px-5 py-3">
          <p className="text-xl">Showcase</p>
        </div>
      </Link>
      {Object.keys(stories).map((storyComponentName) => (
        <SidebarComponent
          key={storyComponentName}
          storyComponentName={storyComponentName}
        />
      ))}
    </div>
  );
};
