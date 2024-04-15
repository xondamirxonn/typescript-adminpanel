import { Button, Spin } from "antd";
import { useGetBanner } from "./services/query/useGetBanner";
import { useNavigate } from "react-router-dom";

export const Banner = () => {
  const { data, isLoading } = useGetBanner();
  const navigate = useNavigate();
  console.log(data);
  const CreatePage = () => {
    navigate("/create-banner");
  };
  return isLoading ? (
    <Spin fullscreen size="large" />
  ) : (
    <div>
      <Button onClick={CreatePage} type="primary">
        Create Banner
      </Button>
    </div>
  );
};
