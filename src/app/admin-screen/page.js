import AdminScreen from "@/components/admin-screen/AdminScreen";
import React, { Suspense } from "react";

const AdminScreenPage = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <AdminScreen />
      </Suspense>
    </>
  );
};

export default AdminScreenPage;
