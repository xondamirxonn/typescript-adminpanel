import { Button, Image, Table, TableProps, message } from "antd";
import { useGetBrand } from "./services/query/useGetBrand";
import { useDeleteBrand } from "./services/mutation/useDeleteBrand";
import { useQueryClient } from "@tanstack/react-query";
type Brand = {
  id: string;
  title: string;
  image: string;
};
interface DataType {
  key: number;
  image: string;
  id: number;
  title: string;
}
export const Brand = () => {
  const { data } = useGetBrand();
  const { mutate } = useDeleteBrand();
  const queryClient = useQueryClient();
  const delBrand = (id: string) => {
    mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["brand"] });

        message.success("deleted successfully");
      },
    });
  };
  const dataSource = data?.results.map((item: Brand) => ({
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
            <Button type="primary" onClick={() => delBrand(String(data?.id))}>
              Delete
            </Button>
            <Button type="primary">Edit</Button>
          </div>
        );
      },
    },
  ];
  return <Table dataSource={dataSource} columns={columns} />;
};
