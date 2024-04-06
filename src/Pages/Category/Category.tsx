import {
  Button,
  Table,
  Image,
  Spin,
  message,
  Input,
  TableProps,
  Popconfirm,
  Pagination,
} from "antd";
import { useGetCategory } from "./service/query/useGetCategory";
import { useDeleteAcc } from "./service/mutation/useCategoryDelete";
import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import useDebounce from "../../hook/useDebounce";
import { useGetSearchCategory } from "./service/query/useGetSearchCategory";

const { Search } = Input;

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
  const [page, setPage] = useState<number>(1);
  const { data, isLoading } = useGetCategory("id", page);
  const { mutate } = useDeleteAcc();
  const navigate = useNavigate();
  const queryClint = useQueryClient();
  const [value, setValue] = useState("");
  const search = useDebounce(value);
  const { data: category, isLoading: isCategoryLoading } =
    useGetSearchCategory(search);


  const createPage = () => {
    navigate("/create-category");
  };

  const del = (id: string) => {
    mutate(id, {
      onSuccess: () => {
        queryClint.invalidateQueries({ queryKey: ["category"] });
        queryClint.invalidateQueries({ queryKey: ["search-category"] });
        message.success(` deleted successfully`);
      },
    });
  };

  const EditPage = (id: string) => {
    navigate(`/edit-category/${id}`);
  };

  const dataSource = data?.data.results.map((item: Category) => ({
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
              <Button danger>Delete</Button>
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
      <div
        style={{
          display: "flex",
          width: "100%",
          gap: "5rem",
          justifyContent: "space-between",
        }}
      >
        <Button onClick={createPage} type="primary" style={{ width: "150px" }}>
          Create
        </Button>

        <div style={{ position: "relative", width: "100%" }}>
          <Search
            placeholder="Category search..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            allowClear
            enterButton
          />
          <div
            style={{
              position: "absolute",
              width: "95.5%",
              zIndex: 2,
            }}
          >
            {value.length >= 3 ? (
              <div
                style={{
                  background: "#fff",
                  boxShadow: "1px 1px 0px  2px #00000037",
                  // padding: "10px",
                  borderBottomLeftRadius: "3px",
                  borderBottomRightRadius: "3px",
                  maxHeight: "50vh",
                  overflowY: "auto",
                }}
              >
                {isCategoryLoading ? (
                  <h1>Loading...</h1>
                ) : (
                  category?.results.map((item) => (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "95%",
                        alignItems: "center",
                        padding: "5px",
                        borderBottom: "1px solid gray",
                      }}
                    >
                      <Link
                        to={`/edit-category/${item.id}`}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          color: "black",
                          width: "85%",
                          padding: "15px",
                        }}
                      >
                        <div style={{ display: "flex", gap: "4rem" }}>
                          <img
                            style={{ width: "100px", objectFit: "contain" }}
                            src={item.image}
                            alt={item.title}
                          />
                          <h2
                            style={{ fontSize: "30px", fontWeight: "normal" }}
                          >
                            {item.title}
                          </h2>
                        </div>
                      </Link>
                      <Popconfirm
                        title="Are you sure you want to delete this category?"
                        onConfirm={() => del(String(item.id))}
                      >
                        <Button danger>Delete</Button>
                      </Popconfirm>
                    </div>
                  ))
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <Table
        style={{ height: "70vh", overflow: "auto" }}
        dataSource={dataSource}
        columns={columns}
        pagination={false}
      />
      <Pagination
        onChange={(page) => setPage((page - 1) * 5)}
        total={data?.pageSize}
        defaultCurrent={page}
        simple
        style={{ display: "flex", justifyContent: "end" }}
        pageSize={5}
      />
    </div>
  );
};
