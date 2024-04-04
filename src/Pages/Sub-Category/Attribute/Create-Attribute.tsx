import { message } from "antd";
import { CreateAttributeForm } from "../../../Components/attribute-form/Create-AttributeForm";
import { useCreateAttributes } from "./services/mutation/useCreateAttributes";

interface AttributeType {
  title: string;
  category: {}[];
  values: {
    value: string;
  }[];
}

export const CreateAttribute = () => {
  const { mutate } = useCreateAttributes();

  const CreateAttribute = (data: AttributeType) => {
    console.log(data);
    mutate(data, {
      onSuccess: () => {
        message.success("Success");
        console.log(data);
      },
      onError: (error) => {
        message.error(error.message);
      },
    });
  };

  return (
    <div>
      <CreateAttributeForm submit={CreateAttribute} />
    </div>
  );
};
