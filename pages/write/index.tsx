import React from "react";
import WriteForm from "../../components/WriteForm";
import MainLayout from "../../layouts/MainLayout";

const Write = () => {
  return (
    <MainLayout className={"main-layout--white"} hideLeftMenu>
      <WriteForm />
    </MainLayout>
  );
};

export default Write;
