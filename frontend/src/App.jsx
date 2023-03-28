import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Tasks from "./pages/Tasks";
import Accounts from "./pages/Accounts";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Accounts />,
            },
            {
                path: ":id",
                element: <Tasks />,
            },
        ],
    },
    {
        path: "*",
        element: (
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-[35px] text-center">
                    404
                    <br />
                    Page not found
                </h1>
            </div>
        ),
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
