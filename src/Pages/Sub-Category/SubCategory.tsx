import { Button, Image, Spin, Table, message } from "antd";
import { useGetSubCategory } from "./services/query/useGetSubCategory";
import { useDeleteSubCategory } from "./services/mutation/useDeleteSubCategory";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

type SubCategories = {
  id: number;
  title: string;
  image: string;
};
export const SubCategory = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate()
  const { data, isLoading } = useGetSubCategory();
  const { mutate } = useDeleteSubCategory();
  const subCategorPage = () => {
    navigate("/create-sub-category")
  }
  const delSubCategory = (data: SubCategories) => {
    mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["sub-category"] });
        message.success("Sub Category deleted successfully");
      },
    });
  };
  const dataSource = data?.results.map((item: SubCategories) => ({
    key: item.id,
    image: item.image,
    id: item.id,
    title: item.title,
  }));

  const columns = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (data: string) => {
        return (
          <Image
            width={150}
            height={100}
            style={{ objectFit: "contain" }}
            src={data}
          />
        );
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      key: "action",
      title: "Action",
      render: (_, data) => {
        return (
          <div style={{ display: "flex", gap: "1rem" }}>
            <Button type="primary" onClick={() => delSubCategory(data?.id)}>
              Delete
            </Button>
            <Button type="primary">Edit</Button>
          </div>
        );
      },
    },
  ];

  return isLoading ? (
    <Spin fullscreen size="large" />
  ) : (
    <div style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
      <Button onClick={subCategorPage} type="primary" style={{width: "150px"}} >Create Sub Category</Button>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};
