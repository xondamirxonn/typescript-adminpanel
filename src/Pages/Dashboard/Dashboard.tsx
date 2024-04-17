import { Card, Spin, Statistic, StatisticProps } from "antd";
import { useGetSubCategory } from "../Sub-Category/services/query/useGetSubCategory";
import { useGetBrand } from "../Brand/services/query/useGetBrand";
import { useGetCategory } from "../Category/service/query/useGetCategory";
import CountUp from "react-countup";

export const Dashboard = () => {
  const { data, isLoading } = useGetCategory();
  const { data: SubCategory } = useGetSubCategory();
  const { data: Brand } = useGetBrand();

  const formatter: StatisticProps["formatter"] = (value) => (
    <CountUp end={value as number} separator="," />
  );

  return isLoading ? (
    <Spin size="large" fullscreen />
  ) : (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
      <Card
        hoverable
        style={{
          width: "300px ",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Statistic
            title="Categories"
            value={data?.count}
            formatter={formatter}
          />
        </div>
      </Card>
      <Card
        hoverable
        style={{
          width: "300px ",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Statistic
            title="Sub Categories"
            value={SubCategory?.count}
            formatter={formatter}
          />
        </div>
      </Card>
      <Card
        hoverable
        style={{
          width: "300px ",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Statistic
            title="Brand"
            value={Brand?.count}
            formatter={formatter}
          />
        </div>
      </Card>
    </div>
  );
};
