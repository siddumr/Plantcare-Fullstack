import React from "react";

const ImageUpload = ({ onUpload }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    onUpload(file);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <label>
        Upload Plant Image:
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ marginLeft: "10px" }}
        />
      </label>
    </div>
  );
};

export default ImageUpload;
