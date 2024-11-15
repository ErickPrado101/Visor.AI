import Link from 'next/link'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Bem-vindo à Plataforma de Previsão de Vendas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/dashboard" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
          <p>Visualize métricas e insights importantes sobre as vendas.</p>
        </Link>
        <Link href="/vendedores" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-4">Vendedores</h2>
          <p>Gerencie perfis e analise o desempenho dos vendedores.</p>
        </Link>
        <Link href="/produtos" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-4">Produtos</h2>
          <p>Acompanhe o desempenho e gerencie o catálogo de produtos.</p>
        </Link>
      </div>
    </div>
  )
}