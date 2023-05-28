import { useLocation, useOutlet, useSearchParams } from 'react-router-dom';
import Nav from '../common/Nav';

function RootComponent() {
  const outlet = useOutlet();
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const query = searchParams.get('q') ?? undefined;

  return (
    <>
      <Nav query={query} mainPage={pathname === '/'} />
      {outlet}
    </>
  );
}

export default RootComponent;
