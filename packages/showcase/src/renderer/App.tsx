import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Home } from "./Home.js";
import { BlankStory } from "./components/BlankStory.js";
import { StoryView } from "./components/StoryView.js";
import { RawStoryView } from "./components/RawStoryView.js";

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
    },
  ]);

  return <RouterProvider router={router} />;
};
