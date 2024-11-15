interface Produto {
    nome: string;
    total: number;
  }
  
  interface ProdutosTableProps {
    data: Produto[];
  }
  
  export default function ProdutosTable({ data }: ProdutosTableProps) {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Produtos Mais Vendidos</h2>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Produto</th>
              <th className="px-4 py-2 text-left">Total Vendido</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                <td className="px-4 py-2">{item.nome}</td>
                <td className="px-4 py-2">{item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  