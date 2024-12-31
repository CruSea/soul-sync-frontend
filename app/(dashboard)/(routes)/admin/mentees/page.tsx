'use client';
import withAuth from '@/context/withAuth';
import MenteesTable from '@/components/shared/admin/admin-mentors/mentees';

function Mentee() {
  return (
    <>
      <MenteesTable />
    </>
  );
}
export default withAuth(Mentee);
