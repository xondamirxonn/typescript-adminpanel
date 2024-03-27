import { Button, Table, Image, Spin, message } from "antd";
import { useGetCategory } from "./service/query/useGetCategory";
import { useDeleteAcc } from "./service/mutation/useCategoryDelete";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

  type Category = {
    title: string;
    id: number;
    image: string;
  };

export const Category = () => {


  const { data, isLoading } = useGetCategory();
  const { mutate } = useDeleteAcc();
  const navigate = useNavigate();
  const queryClint = useQueryClient();
  const createPage = () => {
    navigate("/create-category");
  };
  const del = (data: Category) => {
    mutate(data, {
      onSuccess: (data) => {
        console.log(data);
        queryClint.invalidateQueries({ queryKey: ["category"] });
        message.success("deleted successfully");
      },
    });
  };

  const dataSource = data?.results.map((item: Category) => ({
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
            <Button type="primary" onClick={() => del(data?.id)}>
              Delete
            </Button>
            <Button type="primary">Edit</Button>
          </div>
        );
      },
    },
  ];

  return isLoading ? (
    <Spin size="large" fullscreen />
  ) : (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <Button onClick={createPage} type="primary" style={{ width: "150px" }}>
        Create
      </Button>
      <Table
        style={{ height: "70vh", overflow: "auto" }}
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  );
};
