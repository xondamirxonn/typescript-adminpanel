import { Routes, Route } from "react-router-dom";
import { Login } from "./Pages/Login/Login";
import MainLayout from "./Layout/MainLayout";
import { Category } from "./Pages/Category/Category";
import { SubCategory } from "./Pages/Sub-Category/SubCategory";
import { Brand } from "./Pages/Brand/Brand";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainLayout />}>
          <Route path="/category" element={<Category />} />
          <Route path="/sub-category" element={<SubCategory />}/>
          <Route path="/brand" element={<Brand />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
