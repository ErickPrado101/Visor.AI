'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, Tabs, Tab, Typography, Box } from "@mui/material"
import { TrendingUp, AttachMoney, ShoppingCart, Group } from '@mui/icons-material'
import { Bar, Line, Pie } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend)

interface DashboardData {
  vendas_por_vendedor: { nome: string; total: number }[];
  produtos_mais_vendidos: { nome: string; total: number }[];
  vendas_mensais: { mes: string; total: number }[];
  desempenho_categorias: { categoria: string; vendas: number }[];
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const dashboardData: DashboardData = {
  vendas_por_vendedor: [
    { nome: "João Silva", total: 120000 },
    { nome: "Maria Santos", total: 98000 },
    { nome: "Pedro Oliveira", total: 85000 },
    { nome: "Ana Rodrigues", total: 110000 },
    { nome: "Carlos Ferreira", total: 75000 }
  ],
  produtos_mais_vendidos: [
    { nome: "Smartphone X", total: 500 },
    { nome: "Notebook Y", total: 300 },
    { nome: "Fone de Ouvido Z", total: 1000 },
    { nome: "Smart TV 4K", total: 200 },
    { nome: "Câmera Digital", total: 150 }
  ],
  vendas_mensais: [
    { mes: "Jan", total: 50000 },
    { mes: "Fev", total: 60000 },
    { mes: "Mar", total: 75000 },
    { mes: "Abr", total: 65000 },
    { mes: "Mai", total: 90000 },
    { mes: "Jun", total: 100000 }
  ],
  desempenho_categorias: [
    { categoria: "Eletrônicos", vendas: 250000 },
    { categoria: "Moda", vendas: 180000 },
    { categoria: "Casa", vendas: 120000 },
    { categoria: "Esportes", vendas: 90000 },
    { categoria: "Livros", vendas: 60000 }
  ]
};

export default function Dashboard() {
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const vendasPorVendedorData = {
    labels: dashboardData.vendas_por_vendedor.map(item => item.nome),
    datasets: [{
      label: 'Total de Vendas',
      data: dashboardData.vendas_por_vendedor.map(item => item.total),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    }]
  }

  const vendasMensaisData = {
    labels: dashboardData.vendas_mensais.map(item => item.mes),
    datasets: [{
      label: 'Vendas Mensais',
      data: dashboardData.vendas_mensais.map(item => item.total),
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  }

  const desempenhoCategoriasData = {
    labels: dashboardData.desempenho_categorias.map(item => item.categoria),
    datasets: [{
      label: 'Vendas por Categoria',
      data: dashboardData.desempenho_categorias.map(item => item.vendas),
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
      ],
    }]
  }

  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 2, mb: 4 }}>
        <Card>
          <CardHeader
            title={<Typography variant="subtitle2">Vendas Totais</Typography>}
            action={<AttachMoney />}
          />
          <CardContent>
            <Typography variant="h6">
              R$ {dashboardData.vendas_por_vendedor.reduce((acc, curr) => acc + curr.total, 0).toLocaleString()}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              +20.1% em relação ao mês anterior
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardHeader
            title={<Typography variant="subtitle2">Novos Clientes</Typography>}
            action={<Group />}
          />
          <CardContent>
            <Typography variant="h6">+2350</Typography>
            <Typography variant="caption" color="text.secondary">
              +180.1% em relação ao mês anterior
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardHeader
            title={<Typography variant="subtitle2">Produtos Vendidos</Typography>}
            action={<ShoppingCart />}
          />
          <CardContent>
            <Typography variant="h6">
              {dashboardData.produtos_mais_vendidos.reduce((acc, curr) => acc + curr.total, 0)}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              +19% em relação ao mês anterior
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardHeader
            title={<Typography variant="subtitle2">Taxa de Crescimento</Typography>}
            action={<TrendingUp />}
          />
          <CardContent>
            <Typography variant="h6">+12.5%</Typography>
            <Typography variant="caption" color="text.secondary">
              +2.4% em relação ao mês anterior
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="dashboard tabs">
            <Tab label="Vendas" />
            <Tab label="Produtos" />
            <Tab label="Categorias" />
          </Tabs>
        </Box>
        <TabPanel value={tabValue} index={0}>
          <Card sx={{ mb: 2 }}>
            <CardHeader title="Vendas por Vendedor" subheader="Comparação das vendas totais por vendedor" />
            <CardContent>
              <Box sx={{ height: 300 }}>
                <Bar data={vendasPorVendedorData} options={{ maintainAspectRatio: false }} />
              </Box>
            </CardContent>
          </Card>
          <Card>
            <CardHeader title="Vendas Mensais" subheader="Tendência de vendas ao longo dos últimos meses" />
            <CardContent>
              <Box sx={{ height: 300 }}>
                <Line data={vendasMensaisData} options={{ maintainAspectRatio: false }} />
              </Box>
            </CardContent>
          </Card>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Card>
            <CardHeader title="Produtos Mais Vendidos" subheader="Top 5 produtos com maior volume de vendas" />
            <CardContent>
              <table style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left' }}>Produto</th>
                    <th style={{ textAlign: 'right' }}>Total Vendido</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.produtos_mais_vendidos.map((produto, index) => (
                    <tr key={index} style={{ borderTop: '1px solid #e0e0e0' }}>
                      <td style={{ padding: '8px 0' }}>{produto.nome}</td>
                      <td style={{ textAlign: 'right', padding: '8px 0' }}>{produto.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <Card>
            <CardHeader title="Desempenho por Categoria" subheader="Distribuição de vendas por categoria de produto" />
            <CardContent>
              <Box sx={{ height: 300 }}>
                <Pie data={desempenhoCategoriasData} options={{ maintainAspectRatio: false }} />
              </Box>
            </CardContent>
          </Card>
        </TabPanel>
      </Box>
    </Box>
  )
}