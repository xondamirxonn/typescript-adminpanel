import { Button, Image, Popconfirm, Spin, Table, TableProps, message } from "antd";
import { useGetSubCategory } from "./services/query/useGetSubCategory";
import { useDeleteSubCategory } from "./services/mutation/useDeleteSubCategory";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// type SubCategories = {
//   id: string;
//   title: string;
//   image: string;
// };
interface DataType {
  key: number;
  image: string;
  id: number;
  title: string;
}
export const SubCategory = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data, isLoading } = useGetSubCategory();
  const { mutate } = useDeleteSubCategory();
  const subCategorPage = () => {
    navigate("/create-sub-category");
  };

  
  const delSubCategory = (id: string) => {
    mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["sub-category"] });
        message.success("Sub Category deleted successfully");
      },
    });
  };
  const SubEdit = (id: string) => {
    navigate(`/edit-sub-category/${id}`);
  };


  const dataSource = data?.results.map((item) => ({
    key: item.id,
    image: item.image,
    id: item.id,
    title: item.title,
  }));

  const columns: TableProps<DataType>["columns"] = [
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
            <Popconfirm
              title="Are you sure you want to delete this Sub Category?"
              onConfirm={() => delSubCategory(String(data?.id))}
            >
              <Button type="primary">Delete</Button>
            </Popconfirm>
            <Button type="primary" onClick={() => SubEdit(String(data.id))}>
              Edit
            </Button>
          </div>
        );
      },
    },
  ];

  return isLoading ? (
    <Spin fullscreen size="large" />
  ) : (
    // ) : String(Error) ? (
    //   (message.error(`${"Network error"}`),
    //   setTimeout(() => {
    //     navigate("/");
    //   }, 3_000)
    //   )
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Button
        onClick={subCategorPage}
        type="primary"
        style={{ width: "150px" }}
      >
        Create Sub Category
      </Button>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};
