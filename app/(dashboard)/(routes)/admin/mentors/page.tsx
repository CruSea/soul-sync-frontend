'use client'
import { Mentors } from "@/components/shared/mentors";
import withAuth from "@/context/withAuth";

 function Mentor() {
  return (
    <>
   <Mentors />
    </>
  );
}
export default withAuth(Mentor)
