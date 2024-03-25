import { Button, Table, Image } from "antd";
import { useGetCategory } from "./service/query/useGetCategory";

export const Category = () => {
  const { data } = useGetCategory();
  type Category = {
    title: string;
    id: number;
    image: string;
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
      title: "image",
      dataIndex: "image",
      key: "image",
      render: (data: string) => {
        return <Image width={150} height={100} style={{objectFit: "contain"}} src={data} />;
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
        console.log(data);
        return (
          <div style={{display: "flex", gap: "1rem"}}> 
            <Button type="primary">Delete</Button>
            <Button type="primary">Edit</Button>
          </div>
        );
      },
    },
  ];

  return <Table dataSource={dataSource} columns={columns} />;
};
