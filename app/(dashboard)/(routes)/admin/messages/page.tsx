'use client'
import withAuth from "@/context/withAuth";
import Main from "@/components/shared/layout/mentor-main";

 function Message() {
  return (
    <>
      <Main page="mentor" />
    </>
  );
}

export default withAuth(Message)