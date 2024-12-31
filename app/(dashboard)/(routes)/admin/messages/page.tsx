import { MessageTable } from '@/components/shared/MessageTable';
import withAuth from '@/context/withAuth';

function Message() {
  return (
    <>
      <MessageTable />
    </>
  );
}

export default withAuth(Message);
