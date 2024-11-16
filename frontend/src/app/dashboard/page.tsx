'use client'

import React from 'react'
import { Box, Typography, Card, CardContent, CardHeader, Tabs, Tab } from "@mui/material"
import { TrendingUp, AttachMoney, ShoppingCart, Group } from '@mui/icons-material'
import { Bar, Line, Pie } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from 'chart.js'
import { useAppContext } from '../contexts/AppContext'

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend)

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

export default function Dashboard() {
  const { vendedores, produtos, vendas } = useAppContext();
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const vendasTotais = produtos.reduce((total, produto) => total + produto.valorTotalVendido, 0);

  const produtosVendidos = produtos.reduce((total, produto) => total + produto.quantidadeVendida, 0);

  const vendasPorVendedor = vendedores.map(vendedor => ({
    nome: vendedor.nome,
    total: vendedor.vendasTotais
  }));

  // Função para calcular a média móvel
  const calcularMediaMovel = (dados: number[], periodo: number) => {
    return dados.map((_, index, array) => {
      const start = Math.max(0, index - periodo + 1);
      const slice = array.slice(start, index + 1);
      return slice.reduce((sum, num) => sum + num, 0) / slice.length;
    });
  };

  // Preparar dados de vendas mensais
  const vendasMensais = Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const mes = date.toLocaleString('default', { month: 'short' });
    const total = vendas
      .filter(venda => {
        const vendaDate = new Date(venda.data);
        return vendaDate.getMonth() === date.getMonth() && vendaDate.getFullYear() === date.getFullYear();
      })
      .reduce((total, venda) => total + venda.valorTotal, 0);
    return { mes, total };
  }).reverse();

  const valoresVendas = vendasMensais.map(item => item.total);
  const mediaMovel3Meses = calcularMediaMovel(valoresVendas, 3);
  const mediaMovel6Meses = calcularMediaMovel(valoresVendas, 6);

  // Calcular previsão para os próximos 3 meses
  const calcularPrevisao = (dados: number[], meses: number) => {
    const ultimosMeses = dados.slice(-meses);
    const media = ultimosMeses.reduce((sum, value) => sum + value, 0) / meses;
    const tendencia = (ultimosMeses[ultimosMeses.length - 1] - ultimosMeses[0]) / meses;
    
    return Array.from({ length: 3 }, (_, i) => {
      return Math.max(0, media + tendencia * (i + 1));
    });
  };

  const previsao3Meses = calcularPrevisao(valoresVendas, 3);
  const previsao6Meses = calcularPrevisao(valoresVendas, 6);

  // Calcular taxa de crescimento
  const taxaCrescimento = ((previsao3Meses[2] - valoresVendas[valoresVendas.length - 1]) / valoresVendas[valoresVendas.length - 1]) * 100;

  const desempenhoCategoriasData = produtos.reduce((acc, produto) => {
    if (!acc[produto.categoria]) {
      acc[produto.categoria] = 0;
    }
    acc[produto.categoria] += produto.valorTotalVendido;
    return acc;
  }, {} as Record<string, number>);

  const vendasPorVendedorData = {
    labels: vendasPorVendedor.map(item => item.nome),
    datasets: [{
      label: 'Total de Vendas',
      data: vendasPorVendedor.map(item => item.total),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    }]
  };

  const vendasMensaisData = {
    labels: [...vendasMensais.map(item => item.mes), 'Previsão 1', 'Previsão 2', 'Previsão 3'],
    datasets: [
      {
        label: 'Vendas Mensais',
        data: [...valoresVendas, ...previsao3Meses],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        fill: false
      },
      {
        label: 'Média Móvel (3 meses)',
        data: [...mediaMovel3Meses, ...previsao3Meses],
        borderColor: 'rgb(255, 99, 132)',
        borderDash: [5, 5],
        tension: 0.1,
        fill: false
      },
      {
        label: 'Média Móvel (6 meses)',
        data: [...mediaMovel6Meses, ...previsao6Meses],
        borderColor: 'rgb(54, 162, 235)',
        borderDash: [3, 3],
        tension: 0.1,
        fill: false
      }
    ]
  };

  const desempenhoCategoriasChartData = {
    labels: Object.keys(desempenhoCategoriasData),
    datasets: [{
      label: 'Vendas por Categoria',
      data: Object.values(desempenhoCategoriasData),
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
      ],
    }]
  };

  const produtosMaisVendidosData = {
    labels: produtos.sort((a, b) => b.quantidadeVendida - a.quantidadeVendida).slice(0, 5).map(p => p.nome),
    datasets: [{
      label: 'Quantidade Vendida',
      data: produtos.sort((a, b) => b.quantidadeVendida - a.quantidadeVendida).slice(0, 5).map(p => p.quantidadeVendida),
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    }]
  };

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
              R$ {vendasTotais.toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardHeader
            title={<Typography variant="subtitle2">Vendedores Ativos</Typography>}
            action={<Group />}
          />
          <CardContent>
            <Typography variant="h6">{vendedores.length}</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardHeader
            title={<Typography variant="subtitle2">Produtos Vendidos</Typography>}
            action={<ShoppingCart />}
          />
          <CardContent>
            <Typography variant="h6">
              {produtosVendidos}
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardHeader
            title={<Typography variant="subtitle2">Previsão de Crescimento</Typography>}
            action={<TrendingUp />}
          />
          <CardContent>
            <Typography variant="h6">{taxaCrescimento.toFixed(2)}%</Typography>
            <Typography variant="caption" color="text.secondary">
              Próximos 3 meses
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="dashboard tabs">
            <Tab label="Vendas" />
            <Tab label="Produtos" />
            <Tab label="Previsões" />
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
            <CardHeader title="Vendas Mensais e Previsões" subheader="Tendência de vendas e previsões para os próximos meses" />
            <CardContent>
              <Box sx={{ height: 300 }}>
                <Line data={vendasMensaisData} options={{ maintainAspectRatio: false }} />
              </Box>
            </CardContent>
          </Card>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Card sx={{ mb: 2 }}>
            <CardHeader title="Desempenho por Categoria" subheader="Distribuição de vendas por categoria de produto" />
            <CardContent>
              <Box sx={{ height: 300 }}>
                <Pie data={desempenhoCategoriasChartData} options={{ maintainAspectRatio: false }} />
              </Box>
            </CardContent>
          </Card>
          <Card>
            <CardHeader title="Produtos Mais Vendidos" subheader="Top 5 produtos com maior quantidade vendida" />
            <CardContent>
              <Box sx={{ height: 300 }}>
                <Bar data={produtosMaisVendidosData} options={{ maintainAspectRatio: false }} />
              </Box>
            </CardContent>
          </Card>
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <Card>
            <CardHeader title="Previsão de Vendas" subheader="Projeção de vendas para os próximos meses" />
            <CardContent>
              <Box sx={{ height: 300 }}>
                <Line data={vendasMensaisData} options={{ maintainAspectRatio: false }} />
              </Box>
            </CardContent>
          </Card>
        </TabPanel>
      </Box>
    </Box>
  )
}