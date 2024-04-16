import {
  Button,
  Image,
  Pagination,
  PaginationProps,
  Popconfirm,
  Spin,
  Table,
  TableProps,
  message,
} from "antd";
import { useNavigate } from "react-router-dom";
import { useDeleteProduct } from "./services/mutation/useDeleteProduct";
import { useQueryClient } from "@tanstack/react-query";
import { useGetProduct } from "./services/query/useGetProduct";
import { useState } from "react";

interface DataType {
  key: number;
  id: number;
  title: string;
  image: string;
  price: string;
}

export const Product = () => {
  const [page, setPage] = useState<number>(0);
  const [pages, setPages] = useState(1);
  const { data, isLoading } = useGetProduct("id", page);
  const { mutate } = useDeleteProduct();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dataSource = data?.data.results.map((item) => ({
    key: item.id,
    id: item.id,
    title: item.title,
    image: item.image,
    price: "$" + item.price,
  }));

  const delProduct = (id: number) => {
    mutate(id, {
      onSuccess: () => {
        message.success("deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["product"] });
      },
    });
  };

  const PageOnChange: PaginationProps["onChange"] = (page) => {
    setPages(page);
    setPage((page - 1) * 5);
  };

  const EditPage = (id: number) => {
    navigate(`/edit-product/${id}`);
  };
  const CreateProduct = () => {
    navigate("/product/create");
  };

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
      render: (data) => {
        return <Image src={data} width={100} />;
      },
    },

    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      key: "action",
      title: "Action",
      render: (_, data) => {
        return (
          <div style={{ display: "flex", gap: "1rem" }}>
            <Popconfirm
              title="Are you sure you want to delete this Product?"
              onConfirm={() => delProduct(Number(data?.id))}
            >
              <Button danger>Delete</Button>
            </Popconfirm>
            <Button onClick={() => EditPage(Number(data?.id))} type="default">
              Edit
            </Button>
          </div>
        );
      },
    },
  ];

  console.log(data);

  return isLoading ? (
    <Spin fullscreen size="large" />
  ) : (
    <div>
      <Button onClick={CreateProduct} type="primary">
        Create Product
      </Button>
      <Table dataSource={dataSource} columns={columns} pagination={false} style={{maxHeight: "70vh", overflowY: "auto" }} />
      <Pagination
        onChange={PageOnChange}
        total={data?.pageSize}
        defaultCurrent={page}
        current={pages}
        simple
        style={{ display: "flex", justifyContent: "end", marginTop: "8px" }}
        pageSize={5}
      />
    </div>
  );
};
