import { Suspense } from 'react';
import NewPassword from '@/components/containers/new-password';

export default function newpasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewPassword />
    </Suspense>
  );
}
