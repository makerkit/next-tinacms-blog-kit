import { TinaAdmin } from 'tinacms';
import Tina from '../.tina/components/TinaDynamicProvider';

function Admin() {
  return (
    <Tina>
      <TinaAdmin />
    </Tina>
  );
}

export default Admin;
