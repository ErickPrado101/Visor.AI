'use client'

import React, { useState } from 'react'
import { 
  Box, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button, 
  TextField, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle
} from '@mui/material'
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material'

interface Vendedor {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  vendasTotais: number;
}

const vendedoresIniciais: Vendedor[] = [
  { id: 1, nome: "João Silva", email: "joao@exemplo.com", telefone: "(11) 98765-4321", vendasTotais: 120000 },
  { id: 2, nome: "Maria Santos", email: "maria@exemplo.com", telefone: "(21) 98765-4321", vendasTotais: 98000 },
  { id: 3, nome: "Pedro Oliveira", email: "pedro@exemplo.com", telefone: "(31) 98765-4321", vendasTotais: 85000 },
  { id: 4, nome: "Ana Rodrigues", email: "ana@exemplo.com", telefone: "(41) 98765-4321", vendasTotais: 110000 },
  { id: 5, nome: "Carlos Ferreira", email: "carlos@exemplo.com", telefone: "(51) 98765-4321", vendasTotais: 75000 },
];

export default function Vendedores() {
  const [vendedores, setVendedores] = useState<Vendedor[]>(vendedoresIniciais);
  const [open, setOpen] = useState(false);
  const [novoVendedor, setNovoVendedor] = useState<Omit<Vendedor, 'id' | 'vendasTotais'>>({ nome: '', email: '', telefone: '' });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNovoVendedor({ nome: '', email: '', telefone: '' });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNovoVendedor(prev => ({ ...prev, [name]: value }));
  };

  const handleAddVendedor = () => {
    const id = Math.max(...vendedores.map(v => v.id)) + 1;
    const vendedor: Vendedor = {
      ...novoVendedor,
      id,
      vendasTotais: 0
    };
    setVendedores(prev => [...prev, vendedor]);
    handleClose();
  };

  const handleDeleteVendedor = (id: number) => {
    setVendedores(prev => prev.filter(vendedor => vendedor.id !== id));
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Gerenciamento de Vendedores
      </Typography>
      
      <Button 
        variant="contained" 
        startIcon={<AddIcon />} 
        onClick={handleClickOpen}
        sx={{ mb: 2 }}
      >
        Adicionar Vendedor
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell align="right">Vendas Totais</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vendedores.map((vendedor) => (
              <TableRow key={vendedor.id}>
                <TableCell>{vendedor.nome}</TableCell>
                <TableCell>{vendedor.email}</TableCell>
                <TableCell>{vendedor.telefone}</TableCell>
                <TableCell align="right">R$ {vendedor.vendasTotais.toLocaleString()}</TableCell>
                <TableCell align="right">
                  <Button
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteVendedor(vendedor.id)}
                    color="error"
                  >
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Adicionar Novo Vendedor</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="nome"
            label="Nome"
            type="text"
            fullWidth
            variant="standard"
            value={novoVendedor.nome}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            value={novoVendedor.email}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="telefone"
            label="Telefone"
            type="tel"
            fullWidth
            variant="standard"
            value={novoVendedor.telefone}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleAddVendedor}>Adicionar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}