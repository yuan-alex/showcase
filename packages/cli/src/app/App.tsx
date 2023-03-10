import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { BlankStory } from "./components/BlankStory.js";
import { Home } from "./components/Home.jsx";
import { StoryView } from "./components/StoryView.js";

export const App = () => {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Home />,
      children: [
        {
          path: "/",
          element: <BlankStory />,
        },
        {
          path: "/stories/:storyId",
          element: <StoryView />,
        },
      ],
    },
    {
      path: "*",
      element: (
        <div style={{ padding: 20 }}>
          <strong>Couldn't find this story</strong>
          <p>Pick another one if you just deleted this story.</p>
        </div>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};
