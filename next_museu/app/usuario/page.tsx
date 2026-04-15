import Link from 'next/link';
import ListaUsuario from '../../components/usuario/lista-usuario';

export default async function Usuario() {
  return (
    <div>
      <div className="text-[#9000FF] flex justify-center text-5xl">
        <ListaUsuario />
      </div>
      <Link className=" flex justify-center text-xl hover:text-[#A650F2]" href="/usuario/novo">
        Novo
      </Link>
    </div>
  );
}
