import Link from 'next/link'
import { HomeIcon, UserGroupIcon, CubeIcon, ChartBarIcon } from '@heroicons/react/24/outline'

export default function Sidebar() {
  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <nav>
        <ul className="space-y-2">
          <li>
            <Link href="/" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
              <HomeIcon className="h-5 w-5" />
              <span>Início</span>
            </Link>
          </li>
          <li>
            <Link href="/dashboard" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
              <ChartBarIcon className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link href="/vendedores" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
              <UserGroupIcon className="h-5 w-5" />
              <span>Vendedores</span>
            </Link>
          </li>
          <li>
            <Link href="/produtos" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
              <CubeIcon className="h-5 w-5" />
              <span>Produtos</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
