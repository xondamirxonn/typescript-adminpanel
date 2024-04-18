import {
  Button,
  Image,
  Popconfirm,
  Spin,
  Table,
  TableProps,
  message,
  Input,
  Pagination,
  PaginationProps,
} from "antd";
import { useDeleteBrand } from "./services/mutation/useDeleteBrand";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import useDebounce from "../../hook/useDebounce";
import { useSearchBrand } from "./services/query/useSearchBrand";
import { useFilterPaginationBran } from "./services/query/useFilterPaginationBran";
import { useNavigate } from "react-router-dom";

const { Search } = Input;
type Brand = {
  id: string;
  title: string;
  image: string;
};
interface DataType {
  key: string;
  image: string;
  id: string;
  title: string;
}
export const Brand = () => {
  const [page, setPage] = useState<number>(0);
  const [pages, setPages] = useState(1);
  const { mutate } = useDeleteBrand();
  const queryClient = useQueryClient();
  const [value, setValue] = useState("");
  const search = useDebounce(value);
  const navigate = useNavigate();
  const { data: brandData, isLoading: searchLoading } = useSearchBrand(search);
  const { data: PageData, isLoading } = useFilterPaginationBran("id", page);

  const PageOnChange: PaginationProps["onChange"] = (page) => {
    setPages(page);
    setPage((page - 1) * 5);
  };

  const EditBrand = (id: string) => {
    navigate(`/edit-brand/${id}`);
  };
  const delBrand = (id: string) => {
    mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["pagination-brand"] });
        queryClient.invalidateQueries({ queryKey: ["search-brand"] });
        message.success("deleted successfully");
      },
    });
  };
  const dataSource = PageData?.data?.results.map((item) => ({
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
              title="Are you sure you want to delete this brand"
              onConfirm={() => delBrand(String(data?.id))}
            >
              <Button type="primary">Delete</Button>
            </Popconfirm>
            <Button type="primary" onClick={() => EditBrand(String(data.id))}>
              Edit
            </Button>
          </div>
        );
      },
    },
  ];

  const CreateBrand = () => {
    navigate("/create-brand");
  };

  return isLoading ? (
    <Spin fullscreen size="large" />
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
        <Button onClick={CreateBrand} type="primary" style={{ width: "150px" }}>
          Create Brand
        </Button>

        <div style={{ position: "relative", width: "100%" }}>
          <Search
            placeholder="Brand search..."
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
                  borderBottomLeftRadius: "3px",
                  borderBottomRightRadius: "3px",
                  maxHeight: "50vh",
                  overflowY: "auto",
                }}
              >
                {searchLoading ? (
                  <h1>Loading...</h1>
                ) : (
                  brandData?.results.map((item) => (
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
                      <div
                        // to={`/edit-category/${item.id}`}
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
                      </div>
                      <Popconfirm
                        title="Are you sure you want to delete this brand?"
                        onConfirm={() => delBrand(String(item.id))}
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
        onChange={PageOnChange}
        current={pages}
        total={PageData?.pageSize}
        defaultCurrent={page}
        style={{ display: "flex", justifyContent: "end" }}
        pageSize={5}
      />
    </div>
  );
};
