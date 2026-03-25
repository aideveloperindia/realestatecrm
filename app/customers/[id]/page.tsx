import Layout from '@/components/Layout';
import CustomerDetail from '@/components/CustomerDetail';

export default function CustomerDetailPage({ params }: { params: { id: string } }) {
  return (
    <Layout>
      <CustomerDetail customerId={params.id} />
    </Layout>
  );
}

