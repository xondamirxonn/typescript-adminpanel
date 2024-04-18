// import { InboxOutlined } from "@ant-design/icons";
// import { Button, Form, Image, Input, InputNumber, Select, Switch } from "antd";
// import Dragger from "antd/es/upload/Dragger";
// interface FormType {
//   is_available: boolean;
//   title: string;
//   image: [];
//   product: number;
//   attribute_value: [];
//   other_detail: string;
//   price: string;
//   quantity: number;
// }
// interface FormSubmit {
//   submit: (data: FormType) => void;
//   isPending: boolean;
// }
// export const ProductVariantForm: React.FC<FormSubmit> = ({
//   submit,
//   isPending,
// }) => {
//   return (
//     <Form layout="vertical" onFinish={submit}>
//       <Form.Item
//         hasFeedback
//         name={"attribute_value"}
//         // hidden={initialValue ? true : false}
//         // rules={
//         //   initialValue
//         //     ? [{ required: false }]
//         //     : [{ required: true, message: "Select is required" }]
//         // }
//       >
//         <Select
//           defaultValue={"Parent Category"}
//           options={data?.results.map((item) => ({
//             value: item.id,
//             label: item.title,
//           }))}
//         />
//       </Form.Item>
//       <div style={{ display: "flex", gap: "1rem" }}>
//         <Form.Item label={"New"} name={"is_new"}>
//           <Switch onChange={onChange} />
//         </Form.Item>
//         <Form.Item label={"Available"} name={"is_available"}>
//           <Switch onChange={onChange} />
//         </Form.Item>
//       </div>

//       <Form.Item
//         name={"title"}
//         // rules={
//         //   initialValue
//         //     ? [{ required: false }]
//         //     : [{ required: true, message: "Title is required" }]
//         // }
//         hasFeedback
//       >
//         <Input />
//       </Form.Item>

//       <Form.Item
//         name={"price"}
//         // rules={
//         //   initialValue
//         //     ? [{ required: false }]
//         //     : [{ required: true, message: "Price is requried" }]
//         // }
//         hasFeedback
//       >
//         <InputNumber<number>
//           formatter={(value) =>
//             `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
//           }
//           parser={(value) =>
//             value?.replace(/\$\s?|(,*)/g, "") as unknown as number
//           }
//           style={{ width: "100%" }}
//         />
//       </Form.Item>
//       <Form.Item
//         name={"image"}
//         hasFeedback
//         // rules={
//         //   initialValue
//         //     ? [{ required: false }]
//         //     : [{ required: true, message: "Image upload is mandatory" }]
//         // }
//       >
//         <Dragger
//           listType="picture-card"
//           multiple={false}
//           maxCount={1}
//           beforeUpload={() => false}
//           accept=".png, .jpg, .svg, .jpeg "
//           fileList={fileList}
//           onChange={onchangeImg}
//         >
//           <p className="ant-upload-drag-icon">
//             {" "}
//             <InboxOutlined />
//           </p>
//           <p className="ant-upload-text">
//             Click or drag file to this area to upload
//           </p>
//           <p className="ant-upload-hint">
//             Support for a single or bulk upload. Strictly prohibited from
//             uploading company data or other banned files.
//           </p>
//         </Dragger>
//       </Form.Item>
//       {/* {initialValue && !fileList.length && (
//         <Image
//           width={200}
//           height={150}
//           style={{ objectFit: "contain", display: "block" }}
//           src={typeof initialValue?.image == "string" ? initialValue.image : ""}
//         />
//       )} */}

//       <Form.Item>
//         <Button
//           loading={isPending}
//           style={{ width: "150px" }}
//           htmlType="submit"
//         >
//           Submit
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// };
