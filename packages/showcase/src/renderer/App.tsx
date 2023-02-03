import {
  RouterProvider,
  createBrowserRouter,
  useRouteError,
} from "react-router-dom";

import { Home } from "./Home.js";
import { BlankStory } from "./components/BlankStory.js";
import { RawStoryView } from "./components/RawStoryView.js";
import { StoryView } from "./components/StoryView.js";

function RawStoryErrorBoundary() {
  let error = useRouteError();
  console.error(error);
  return (
    <div className="h-full w-full bg-red-200 p-2">
      <p>Error rendering story. Check the console for more details.</p>
    </div>
  );
}

export const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "",
          element: <BlankStory />,
        },
        {
          path: "/stories/:storyId",
          element: <StoryView />,
        },
      ],
    },
    {
      path: "/stories/:storyId/preview",
      element: <RawStoryView />,
      errorElement: <RawStoryErrorBoundary />,
    },
  ]);

  return <RouterProvider router={router} />;
};
