import Layout from '@/components/Layout';
import PropertyDetail from '@/components/PropertyDetail';

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  return (
    <Layout>
      <PropertyDetail propertyId={params.id} />
    </Layout>
  );
}

