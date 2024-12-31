'use client';
import withAuth from '@/context/withAuth';
import { MentorsTable } from '@/components/shared/admin/admin-mentors/mentors';

function Mentor() {
  return (
    <>
      <MentorsTable />
    </>
  );
}
export default withAuth(Mentor);
