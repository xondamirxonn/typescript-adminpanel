import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
export const CreateBanner = () => {
  const [value, setValue] = useState("");

  const handleChange = (content: any) => {
    setValue(content);
  };
  return (
    <div>
      <ReactQuill value={value} onChange={handleChange} />
    </div>
  );
};
