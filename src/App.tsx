import { Routes, Route } from "react-router-dom";
import { Login } from "./Pages/Login/Login";
import MainLayout from "./Layout/MainLayout";
import { Category } from "./Pages/Category/Category";
import { SubCategory } from "./Pages/Sub-Category/SubCategory";
import { Brand } from "./Pages/Brand/Brand";
import { CreateCategory } from "./Pages/Create-Category/Create-category";
import { CreateSubCategory } from "./Pages/Sub-Category/Create-Sub-Category/Create-SubCategory";
import { EditCategory } from "./Pages/Category/Edit-Category";
import { Dashboard } from "./Pages/Dashboard/Dashboard";
import { EditSubCategory } from "./Pages/Sub-Category/Edit-SubCategory";
import { Attribute } from "./Pages/Sub-Category/Attribute/Attribute";
import { CreateAttribute } from "./Pages/Sub-Category/Attribute/Create-Attribute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/category" element={<Category />} />
          <Route path="/sub-category" element={<SubCategory />} />
          <Route path="/brand" element={<Brand />} />
          <Route path="/create-category" element={<CreateCategory />} />
          <Route path="/create-sub-category" element={<CreateSubCategory />} />
          <Route path="/edit-category/:id" element={<EditCategory />} />
          <Route path="/edit-sub-category/:id" element={<EditSubCategory />} />
          <Route path="/attribute" element={<Attribute />} />
          <Route path="/create-attribute" element={<CreateAttribute />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
