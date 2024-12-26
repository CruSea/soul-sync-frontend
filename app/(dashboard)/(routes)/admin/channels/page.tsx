'use client'
import withAuth from "@/context/withAuth";

 function Channels() {
  return (
    <>
      <ChannelsPage />
    </>
  );
}
export default withAuth(Channels)
