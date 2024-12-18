"use client";
import ChannelsPage from "@/components/views/admin/channel";
import withAuth from "@/context/withAuth";

function Channels() {
  return (
    <>
      <ChannelsPage />
    </>
  );
}
export default withAuth(Channels);
