'use client'
import AdminView from '@/components/views/admin/dashboard'
import withAuth from '@/context/withAuth';

 function UserPage() {
  return (
    <>
      <AdminView />
    </>
  );
}
export default withAuth(UserPage)