import { Button, Popconfirm, Spin, Table, TableProps, message } from "antd";
import { useGetAttribute } from "./services/query/useGetAttribute";
import { useDeleteAttribute } from "./services/mutation/useDeleteAttribute";
import { useQueryClient } from "@tanstack/react-query";
interface DataType {
  key: number;
  image: string;
  id: number;
  title: string;
  category_title: {
    title: string;
  }[];
}

interface Type {
  title: string;
  id: number;
  category_title: {
    title: string;
  }[];
}
export const Attribute = () => {
  const { data, isLoading } = useGetAttribute();
  const { mutate } = useDeleteAttribute();
  const queryClint = useQueryClient()

  const deleteAttribute = (id: string) => {
    mutate(id, {
      onSuccess: () => {
        message.success("Deleted Successfully");
           queryClint.invalidateQueries({ queryKey: ["attribute-data"] });
      },
    });
  };
  const dataSource = data?.results.map((item: Type) => ({
    key: item.id,
    id: item.id,
    title: item.title,
    name: item.category_title.map((item) => item.title),
  }));

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
    },

    {
      title: "SubCategory Name",
      dataIndex: "name",
      key: "name",
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
              onConfirm={() => deleteAttribute(String(data?.id))}
            >
              <Button type="primary">Delete</Button>
            </Popconfirm>
            <Button type="primary">Edit</Button>
            {/* onClick={() => EditPage(String(data?.id))} */}
          </div>
        );
      },
    },
  ];

  return isLoading ? (
    <Spin fullscreen size="large" />
  ) : (
    <Table dataSource={dataSource} columns={columns} />
  );
};
