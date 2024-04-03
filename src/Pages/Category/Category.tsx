import {
  Button,
  Table,
  Image,
  Spin,
  message,
  TableProps,
  Popconfirm,
} from "antd";
import { useGetCategory } from "./service/query/useGetCategory";
import { useDeleteAcc } from "./service/mutation/useCategoryDelete";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

type Category = {
  title: string;
  id: number;
  image: string;
};

interface DataType {
  key: number;
  image: string;
  id: number;
  title: string;
}

export const Category = () => {
  const { data, isLoading } = useGetCategory();
  const { mutate } = useDeleteAcc();
  const navigate = useNavigate();
  const queryClint = useQueryClient();
  const createPage = () => {
    navigate("/create-category");
  };
  const del = (id: string) => {
    mutate(id, {
      onSuccess: (data) => {
        console.log(data);
        queryClint.invalidateQueries({ queryKey: ["category"] });
        message.success("deleted successfully");
      },
    });
  };

  const EditPage = (id: string) => {
    navigate(`/edit-category/${id}`);
  };

  const dataSource = data?.results.map((item: Category) => ({
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
              title="Are you sure you want to delete this category?"
              onConfirm={() => del(String(data?.id))}
            >
              <Button type="primary">Delete</Button>
            </Popconfirm>
            <Button type="primary" onClick={() => EditPage(String(data?.id))}>
              Edit
            </Button>
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
