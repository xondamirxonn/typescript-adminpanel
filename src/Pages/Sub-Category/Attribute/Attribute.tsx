import { Button, Popconfirm, Spin, Table, TableProps, message } from "antd";
import { useGetAttribute } from "./services/query/useGetAttribute";
import { useDeleteAttribute } from "./services/mutation/useDeleteAttribute";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
interface DataType {
  key: string;
  id: string;
  title: string;
  name: {};
}

export const Attribute = () => {
  const { data, isLoading } = useGetAttribute();
  const { mutate } = useDeleteAttribute();
  const queryClint = useQueryClient();
  const navigate = useNavigate();
  console.log(data);

  const CreateAttributePage = () => {
    navigate("/create-attribute");
  };
  const deleteAttribute = (id: string) => {
    mutate(id, {
      onSuccess: () => {
        message.success("Deleted Successfully");
        queryClint.invalidateQueries({ queryKey: ["attribute-data"] });
      },
    });
  };
  const dataSource = data?.results.map((item) => ({
    key: item.id,
    id: item.id,
    title: item.title,
    name: item.category_title.map((item) => item.title).join(",  "),
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
              <Button danger >Delete</Button>
            </Popconfirm>
            <Button >Edit</Button>
            {/* onClick={() => EditPage(String(data?.id))} */}
          </div>
        );
      },
    },
  ];

  return isLoading ? (
    <Spin fullscreen size="large" />
  ) : (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <Button
        onClick={CreateAttributePage}
        size="large"
        type="primary"
        style={{ width: "150px" }}
      >
        Create Attribute
      </Button>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};
