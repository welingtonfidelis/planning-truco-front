import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import { LayoutRenderer } from "./components/layouts";
import { routes } from "./routes";

export const AppRouter = () => {
  return (
    // <BrowserRouter> Using hashRouter for fix gh pages routing
    <HashRouter>
      <LayoutRenderer>
        <Routes>
          {routes.map(({ path, element: Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </Routes>
      </LayoutRenderer>
    </HashRouter>
    // </BrowserRouter>
  );
};
