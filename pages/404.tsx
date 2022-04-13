import Link from 'next/link';
import { Layout } from '../components/layout/Layout';

function errorPage(): JSX.Element {
  return (
    <Layout
      title="404"
      footer={(
        <Link href="./">Til baka</Link>
      )}
    >
      <h1>404 - Þessi síða er ekki til</h1>
    </Layout>
  );
}
export default errorPage;
