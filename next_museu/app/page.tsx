import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <div className="text-[#9000FF] flex justify-center text-5xl"> Dashboard</div>
      <ul>
        <li className="flex flex-row justify-center gap-8">
          <Link className="flex justify-center text-xl hover:text-[#A650F2]" href="/usuario">
            Usuario
          </Link>
          <Link className=" flex justify-center text-xl hover:text-[#A650F2]" href="/contato">
            Contato
          </Link>
        </li>
      </ul>
    </div>
  );
}
