import { createBrowserRouter } from "react-router-dom";
import App from "./App";

import NewPage from "./pages/NewPage";

import PageView from "./pages/PageView";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/pages/new",
        element: <NewPage />,
    },
    {
        path: "/pages/:id",
        element: <PageView />,
    },
]);