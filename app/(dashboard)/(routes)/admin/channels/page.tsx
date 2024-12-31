'use client';
import withAuth from '@/context/withAuth';
import ChannelsPage from '@/components/views/admin/channel';

function Channels() {
  return (
    <>
      <ChannelsPage />
    </>
  );
}
export default withAuth(Channels);
