import {
  RouterProvider,
  createBrowserRouter,
  useRouteError,
} from "react-router-dom";

import { RawStoryView } from "./RawStoryView.js";

function RawStoryErrorBoundary() {
  let error = useRouteError();
  console.error(error);

  return (
    <div>
      <p>Error rendering story. Check the console for more details.</p>
    </div>
  );
}

export const App = () => {
  const router = createBrowserRouter([
    {
      path: "/render/:storyId",
      element: <RawStoryView />,
      errorElement: <RawStoryErrorBoundary />,
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
