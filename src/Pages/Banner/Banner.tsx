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
import { useDeleteBanner } from "./services/mutation/useDeleteBanner";
import { useQueryClient } from "@tanstack/react-query";
import { usePaginationBanner } from "./services/query/usePaginationBanner";
import { useState } from "react";

interface DataType {
  key: number;
  image: string;
  id: number;
  title: string;
}
export const Banner = () => {
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);
  const { data, isLoading } = usePaginationBanner("id", page);
  const { mutate } = useDeleteBanner();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  console.log(data);

  const PageOnChange: PaginationProps["onChange"] = (page) => {
    setPages(page);
    setPage((page - 1) * 5);
  };

  const CreatePage = () => {
    navigate("/create-banner");
  };

  const delBanner = (id: number) => {
    mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["banner"] });
        message.success("deleted successfully");
      },
    });
  };

  const EditPage = (id: string) => {
    navigate(`/edit-banner/${id}`);
  };

  const dataSource = data?.data.results.map((item) => ({
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
              title="Are you sure you want to delete this banner?"
              onConfirm={() => delBanner(Number(data?.id))}
            >
              <Button danger>Delete</Button>
            </Popconfirm>
            <Button type="primary" onClick={() => EditPage(String(data.id))}>
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
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Button onClick={CreatePage} type="primary" style={{ width: "150px" }}>
        Create Banner
      </Button>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        style={{ maxHeight: "70vh", overflowY: "auto" }}
      />
      <Pagination
        onChange={PageOnChange}
        current={pages}
        total={data?.pageSize}
        defaultCurrent={page}
        style={{ display: "flex", justifyContent: "end", marginTop: "10px" }}
        pageSize={5}
      />
    </div>
  );
};
