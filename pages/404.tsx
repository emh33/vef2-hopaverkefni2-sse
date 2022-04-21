import Link from 'next/link';
import { NavBar } from '../components/layout/NavBar';
import { Layout } from '../components/layout/Layout';

function errorPage(): JSX.Element {
  return (
    <Layout
      title="404"
      header={(<NavBar cartItems={0}/>)}
      footer={(
        <Link href="./">Til baka</Link>
      )}
    >
      <h3>404 - Þessi síða er ekki til</h3>
    </Layout>
  );
}
export default errorPage;
