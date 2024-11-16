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
  DialogTitle,
  IconButton
} from '@mui/material'
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material'
import { useAppContext } from '../contexts/AppContext'



interface Vendedor {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  vendasTotais: number;
}

export default function Vendedores() {
  const { vendedores, setVendedores } = useAppContext();
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [novoVendedor, setNovoVendedor] = useState({ nome: '', email: '', telefone: '', vendasTotais: 0 });

  const handleClickOpen = () => {
    setOpen(true);
    setEditingId(null);
    setNovoVendedor({ nome: '', email: '', telefone: '', vendasTotais: 0 });
  };

  const handleClose = () => {
    setOpen(false);
    setEditingId(null);
    setNovoVendedor({ nome: '', email: '', telefone: '', vendasTotais: 0 });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNovoVendedor(prev => ({ 
      ...prev, 
      [name]: name === 'vendasTotais' ? Number(value) : value 
    }));
  };

  const handleAddVendedor = () => {
    if (editingId !== null) {
      setVendedores(prev => prev.map(vendedor => 
        vendedor.id === editingId ? { ...vendedor, ...novoVendedor } : vendedor
      ));
    } else {
      const id = Math.max(...vendedores.map(v => v.id), 0) + 1;
      setVendedores(prev => [...prev, { id, ...novoVendedor }]);
    }
    handleClose();
  };

  const handleDeleteVendedor = (id: number) => {
    setVendedores(prev => prev.filter(vendedor => vendedor.id !== id));
  };

  const handleEditVendedor = (vendedor: Vendedor) => {
    setEditingId(vendedor.id);
    setNovoVendedor({
      nome: vendedor.nome,
      email: vendedor.email,
      telefone: vendedor.telefone,
      vendasTotais: vendedor.vendasTotais
    });
    setOpen(true);
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
                  <IconButton onClick={() => handleEditVendedor(vendedor)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteVendedor(vendedor.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingId !== null ? 'Editar Vendedor' : 'Adicionar Novo Vendedor'}</DialogTitle>
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
          <TextField
            margin="dense"
            name="vendasTotais"
            label="Vendas Totais"
            type="number"
            fullWidth
            variant="standard"
            value={novoVendedor.vendasTotais}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleAddVendedor}>{editingId !== null ? 'Salvar' : 'Adicionar'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}