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
import { Product } from "./Pages/Product/Product";
import { CreateProduct } from "./Pages/Product/Create-Product";
import { EditProduct } from "./Pages/Product/Edit-Product";
import { CreateBrand } from "./Pages/Brand/Create-Brand";
import { EditBrand } from "./Pages/Brand/Edit-Brand";
import { Banner } from "./Pages/Banner/Banner";
import { CreateBanner } from "./Pages/Banner/Create-Banner";
import { BannerSingleData } from "./Pages/Banner/Banner-SingleData";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="category" element={<Category />} />
          <Route path="sub-category" element={<SubCategory />} />
          <Route path="brand" element={<Brand />} />
          <Route path="create-brand" element={<CreateBrand />} />
          <Route path="create-category" element={<CreateCategory />} />
          <Route path="edit-brand/:id" element={<EditBrand />} />
          <Route path="create-sub-category" element={<CreateSubCategory />} />
          <Route path="edit-category/:id" element={<EditCategory />} />
          <Route path="edit-sub-category/:id" element={<EditSubCategory />} />
          <Route path="attribute" element={<Attribute />} />
          <Route path="create-attribute" element={<CreateAttribute />} />
          <Route path="product" element={<Product />} />
          <Route path="product/create" element={<CreateProduct />} />
          <Route path="edit-product/:id" element={<EditProduct />} />
          <Route path="banner" element={<Banner />} />
          <Route path="create-banner" element={<CreateBanner />} />
          <Route path="edit-banner/:id" element={<BannerSingleData />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
