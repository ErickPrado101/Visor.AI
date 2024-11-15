import { BellIcon } from '@heroicons/react/24/outline'

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Plataforma de Previsão de Vendas</h1>
        <button className="p-2 rounded-full hover:bg-gray-200">
          <BellIcon className="h-6 w-6 text-gray-600" />
        </button>
      </div>
    </header>
  )
}