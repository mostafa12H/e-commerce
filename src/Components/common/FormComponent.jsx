import React from "react";

const FormComponent = ({ FormList }) => {
  return (
    <form>
      {FormList?.map((item, index) => (
        <div className="form-group">
          <label>{item.label}</label>
          <input key={index} type={item.type} placeholder={item.placeholder} />
        </div>
      ))}
    </form>
  );
};

export default FormComponent;
