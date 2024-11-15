'use client'

import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

// Definindo a interface para os itens de dados
interface VendasItem {
  nome: string
  total: number
}

// Definindo a tipagem para o props do componente
interface VendasChartProps {
  data: VendasItem[]
}

export default function VendasChart({ data }: VendasChartProps) {
  const chartData = {
    labels: data.map(item => item.nome),
    datasets: [
      {
        label: 'Total de Vendas',
        data: data.map(item => item.total),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Vendas por Vendedor',
      },
    },
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <Bar data={chartData} options={options} />
    </div>
  )
}
