"use client";
import withAuth from "@/context/withAuth";
import { Mentors } from "@/components/shared/admin/admin-mentors/mentors";

function Mentor() {
  return (
    <>
      <Mentors />
    </>
  );
}
export default withAuth(Mentor);
