import {
  Button,
  Image,
  Modal,
  Pagination,
  PaginationProps,
  Popconfirm,
  Spin,
  Table,
  TableProps,
  Tooltip,
  message,
  Input,
} from "antd";
import { useNavigate } from "react-router-dom";
import { useDeleteProduct } from "./services/mutation/useDeleteProduct";
import { useQueryClient } from "@tanstack/react-query";
import { useGetProduct } from "./services/query/useGetProduct";
import { useState } from "react";
import useDebounce from "../../hook/useDebounce";
import { useSearchProduct } from "./services/query/useSearchProduct";
import { SearchOutlined } from "@ant-design/icons";

interface DataType {
  key: number;
  id: number;
  title: string;
  image: string;
  price: string;
}

interface SearchDataType {
  key: number;
  image: string;
  id: number;
  title: string;
}

export const Product = () => {
  const { Search } = Input;
  const [value, setValue] = useState("");
  const search = useDebounce(value);
  const { data: dataSearch, isLoading: searchLoading } =
    useSearchProduct(search);
  const [page, setPage] = useState<number>(0);
  const [pages, setPages] = useState(1);
  const { data, isLoading } = useGetProduct("id", page);
  const { mutate } = useDeleteProduct();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setValue("");
  };

  const SearchProduct = dataSearch?.results.map((item) => ({
    key: item.id,
    image: item.image,
    id: item.id,
    title: item.title,
  }));
  const SearchColumns: TableProps<SearchDataType>["columns"] = [
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
            width={100}
            height={80}
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
              onConfirm={() => delProduct(Number(data?.id))}
            >
              <Button danger>Delete</Button>
            </Popconfirm>
            <Button type="primary" onClick={() => EditPage(Number(data?.id))}>
              Edit
            </Button>
          </div>
        );
      },
    },
  ];

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
        queryClient.invalidateQueries({ queryKey: ["search-product"] });
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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          onClick={CreateProduct}
          type="primary"
          style={{ marginBottom: "3%" }}
        >
          Create Product
        </Button>
        <Tooltip title="Create Category" placement="right">
          <Button
            icon={<SearchOutlined />}
            type="primary"
            onClick={showModal}
          ></Button>
        </Tooltip>
        <Modal
          title="Search..."
          open={isModalOpen}
          onCancel={handleCancel}
          cancelButtonProps={{ style: { marginTop: "1rem" } }}
          okButtonProps={{ style: { display: "none" } }}
          width="60%"
        >
          <div style={{ width: "100%" }}>
            <Search
              id="search"
              placeholder="Category search..."
              value={value}
              onChange={(e) => setValue(e.target.value.trimStart())}
              allowClear
              enterButton
            />
            <div>
              {value.length >= 3 ? (
                <div>
                  {searchLoading ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "100px",
                      }}
                    >
                      <Spin size="large" />
                    </div>
                  ) : (
                    <div>
                      <Table
                        style={{
                          marginTop: "1rem",
                          maxHeight: "50vh",
                          overflowY: "auto",
                        }}
                        dataSource={SearchProduct}
                        columns={SearchColumns}
                        pagination={false}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <label
                  htmlFor="search"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "30px",
                    cursor: "pointer",
                  }}
                >
                  <h1>
                    Search <SearchOutlined />
                  </h1>
                </label>
              )}
            </div>
          </div>
        </Modal>
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        style={{ maxHeight: "70vh", overflowY: "auto" }}
      />
      <Pagination
        onChange={PageOnChange}
        total={data?.pageSize}
        defaultCurrent={page}
        current={pages}
        style={{ display: "flex", justifyContent: "end", marginTop: "2%" }}
        pageSize={5}
      />
    </div>
  );
};
