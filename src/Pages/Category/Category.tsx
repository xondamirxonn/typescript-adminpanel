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
  Modal,
  Tooltip,
  PaginationProps,
} from "antd";
import { usePaginationGetCategory } from "./service/query/usePaginationGetCategory";
import { useDeleteAcc } from "./service/mutation/useCategoryDelete";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import useDebounce from "../../hook/useDebounce";
import { useGetSearchCategory } from "./service/query/useGetSearchCategory";

import { SearchOutlined } from "@ant-design/icons";
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
  const [page, setPage] = useState<number>(0);
  const [pages, setPages] = useState(1);
  const { data, isLoading } = usePaginationGetCategory("id", page);
  const { mutate } = useDeleteAcc();
  const navigate = useNavigate();
  const queryClint = useQueryClient();
  const [value, setValue] = useState("");
  const search = useDebounce(value);
  const { data: category, isLoading: isCategoryLoading } =
    useGetSearchCategory(search);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setValue("");
  };
  const [arrow] = useState("Show");

  const mergedArrow = useMemo(() => {
    if (arrow === "Hide") {
      return false;
    }

    if (arrow === "Show") {
      return true;
    }

    return {
      pointAtCenter: true,
    };
  }, [arrow]);

  const createPage = () => {
    navigate("/create-category");
  };

  const PageOnChange: PaginationProps["onChange"] = (page) => {
    setPages(page);
    setPage((page - 1) * 5);
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
  const SearchCategory = category?.results.map((item: Category) => ({
    key: item.id,
    image: item.image,
    id: item.id,
    title: item.title,
  }));
  const SearchColumns: TableProps<DataType>["columns"] = [
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
        <Tooltip title="Create Category" placement="right">
          <Button
            onClick={createPage}
            type="primary"
            style={{ width: "150px" }}
          >
            Create
          </Button>
        </Tooltip>

        <Tooltip placement="leftTop" title={"Search"} arrow={mergedArrow}>
          <Button
            icon={<SearchOutlined />}
            type="primary"
            onClick={showModal}
          ></Button>
        </Tooltip>
        <Modal
          closable={false}
          
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
                  {isCategoryLoading ? (
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
                        dataSource={SearchCategory}
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
        style={{ height: "70vh", overflow: "auto" }}
        dataSource={dataSource}
        columns={columns}
        pagination={false}
      />
      <Pagination
        onChange={PageOnChange}
        total={data?.pageSize}
        defaultCurrent={page}
        current={pages}
        style={{ display: "flex", justifyContent: "end" }}
        pageSize={5}
      />
    </div>
  );
};
