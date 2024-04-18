import { useNavigate, useParams } from "react-router-dom";
import { Forms } from "../../Components/Form/Form";
import { useSingleEditData } from "./service/query/useSingleEditData";
import { useEditCategory } from "./service/mutation/useEditCategory";
import { Categories } from "../Create-Category/Create-category";
import {
  Button,
  Image,
  Popconfirm,
  Spin,
  Table,
  TableProps,
  Tabs,
  TabsProps,
  message,
} from "antd";
import { useDeleteSubCategory } from "../Sub-Category/services/mutation/useDeleteSubCategory";
import { useQueryClient } from "@tanstack/react-query";

interface DataType {
  key: string;
  image: string;
  id: string;
  title: string;
}

interface CategoryChild {
  id: string;
  image: string;
  title: string;
}
export const EditCategory = () => {
  const { id } = useParams();
  const { data, isLoading } = useSingleEditData(id);
  console.log(data);

  const { mutate, isPending } = useEditCategory(id);
  const { mutate: DeleteSubCategory } = useDeleteSubCategory();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const EditSubmit = (data: Categories) => {
    const formData = new FormData();
    formData.append("title", data.title);
    if (data.image) formData.append("image", data.image.file);
    formData.append("parent", "");

    mutate(formData, {
      onSuccess: () => {
        message.success("Category changed successfully");
        queryClient.invalidateQueries({ queryKey: ["single-data"] });
      },
      onError: () => {
        message.error("error");
      },
    });
  };

  const EditPage = (id: string) => {
    navigate(`/edit-sub-category/${id}`);
  };
  const delSubCategory = (id: string) => {
    DeleteSubCategory(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["single-data"] });
        message.success("Deleted Successfully");
      },
      onError: () => {
        message.error("Error");
      },
    });
  };
  const dataSource = data?.children?.map((item: CategoryChild) => ({
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
              title="Are you sure you want to delete this category"
              onConfirm={() => delSubCategory(String(data?.id))}
            >
              <Button danger>Delete</Button>
            </Popconfirm>
            <Button type="primary" onClick={() => EditPage(data?.id)}>
              Edit
            </Button>
          </div>
        );
      },
    },
  ];

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Edit Category",
      children: (
        <Forms
          isPending={isPending}
          submit={EditSubmit}
          initialValues={{ title: data?.title, image: data?.image }}
        />
      ),
    },
    {
      key: "2",
      label: "Sub Categories",
      children: <Table dataSource={dataSource} columns={columns} />,
    },
  ];

  return isLoading ? (
    <Spin fullscreen />
  ) : (
    <div>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};
