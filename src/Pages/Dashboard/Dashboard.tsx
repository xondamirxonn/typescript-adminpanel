import { Card, Spin } from "antd";
import { useGetCategory } from "../Category/service/query/useGetCategory";
import { useGetSubCategory } from "../Sub-Category/services/query/useGetSubCategory";
import { useGetBrand } from "../Brand/services/query/useGetBrand";



export const Dashboard = () => {
  const { data, isLoading } = useGetCategory();
  const { data: SubCategory } = useGetSubCategory();
  const { data: Brand } = useGetBrand();
  console.log(SubCategory);

  return isLoading ? (
    <Spin size="large" fullscreen />
  ) : (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
      <Card
        hoverable
        style={{
          width: "300px ",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <strong>Category</strong>
          <span>{data?.results.length}</span>
        </div>
      </Card>
      <Card
        hoverable
        style={{
          width: "300px ",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <strong>Sub Category</strong>
          <span>{SubCategory?.results.length}</span>
        </div>
      </Card>
      <Card
        hoverable
        style={{
          width: "300px ",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <strong>Brand</strong>
          <span>{Brand?.results.length}</span>
        </div>
      </Card>
    </div>
  );
};
