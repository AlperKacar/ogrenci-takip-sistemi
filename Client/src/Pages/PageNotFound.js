import React from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Result
      status="404"
      title="404 Sayfa Bulunamadı"
      subTitle="Üzgünüz, aradığınız sayfayı bulamadık."
      extra={
        <Link to="/">
          <Button type="primary">Ana Sayfa</Button>
        </Link>
      }
    />
  );
};

export default PageNotFound;
