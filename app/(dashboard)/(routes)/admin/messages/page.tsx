'use client'
import Main from "@/components/shared/Main";
import withAuth from "@/context/withAuth";

 function Message() {
  return (
    <>
       <Main page="mentor"/>
    </>
  );
}

export default withAuth(Message)