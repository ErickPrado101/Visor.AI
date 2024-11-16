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

interface Produto {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
  estoque: number;
  quantidadeVendida: number;
  valorTotalVendido: number;
}

export default function Produtos() {
  const { produtos, setProdutos, atualizarProduto } = useAppContext();
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [novoProduto, setNovoProduto] = useState({ 
    nome: '', 
    categoria: '', 
    preco: 0, 
    estoque: 0,
    quantidadeVendida: 0,
    valorTotalVendido: 0
  });

  const handleClickOpen = () => {
    setOpen(true);
    setEditingId(null);
    setNovoProduto({ nome: '', categoria: '', preco: 0, estoque: 0, quantidadeVendida: 0, valorTotalVendido: 0 });
  };

  const handleClose = () => {
    setOpen(false);
    setEditingId(null);
    setNovoProduto({ nome: '', categoria: '', preco: 0, estoque: 0, quantidadeVendida: 0, valorTotalVendido: 0 });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNovoProduto(prev => ({ 
      ...prev, 
      [name]: ['preco', 'estoque', 'quantidadeVendida', 'valorTotalVendido'].includes(name) ? Number(value) : value 
    }));
  };

  const handleAddProduto = () => {
    if (editingId !== null) {
      atualizarProduto({ id: editingId, ...novoProduto });
    } else {
      const id = Math.max(...produtos.map(p => p.id), 0) + 1;
      setProdutos(prev => [...prev, { id, ...novoProduto }]);
    }
    handleClose();
  };

  const handleDeleteProduto = (id: number) => {
    setProdutos(prev => prev.filter(produto => produto.id !== id));
  };

  const handleEditProduto = (produto: Produto) => {
    setEditingId(produto.id);
    setNovoProduto({ 
      nome: produto.nome, 
      categoria: produto.categoria, 
      preco: produto.preco, 
      estoque: produto.estoque,
      quantidadeVendida: produto.quantidadeVendida,
      valorTotalVendido: produto.valorTotalVendido
    });
    setOpen(true);
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Gerenciamento de Produtos
      </Typography>
      
      <Button 
        variant="contained" 
        startIcon={<AddIcon />} 
        onClick={handleClickOpen}
        sx={{ mb: 2 }}
      >
        Adicionar Produto
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell align="right">Preço</TableCell>
              <TableCell align="right">Estoque</TableCell>
              <TableCell align="right">Quantidade Vendida</TableCell>
              <TableCell align="right">Valor Total Vendido</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {produtos.map((produto) => (
              <TableRow key={produto.id}>
                <TableCell>{produto.nome}</TableCell>
                <TableCell>{produto.categoria}</TableCell>
                <TableCell align="right">R$ {produto.preco.toFixed(2)}</TableCell>
                <TableCell align="right">{produto.estoque}</TableCell>
                <TableCell align="right">{produto.quantidadeVendida}</TableCell>
                <TableCell align="right">R$ {produto.valorTotalVendido.toFixed(2)}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEditProduto(produto)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteProduto(produto.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingId !== null ? 'Editar Produto' : 'Adicionar Novo Produto'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="nome"
            label="Nome do Produto"
            type="text"
            fullWidth
            variant="standard"
            value={novoProduto.nome}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="categoria"
            label="Categoria"
            type="text"
            fullWidth
            variant="standard"
            value={novoProduto.categoria}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="preco"
            label="Preço"
            type="number"
            fullWidth
            variant="standard"
            value={novoProduto.preco}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="estoque"
            label="Estoque"
            type="number"
            fullWidth
            variant="standard"
            value={novoProduto.estoque}
            onChange={handleInputChange}
          />
          {editingId !== null && (
            <>
              <TextField
                margin="dense"
                name="quantidadeVendida"
                label="Quantidade Vendida"
                type="number"
                fullWidth
                variant="standard"
                value={novoProduto.quantidadeVendida}
                onChange={handleInputChange}
              />
              <TextField
                margin="dense"
                name="valorTotalVendido"
                label="Valor Total Vendido"
                type="number"
                fullWidth
                variant="standard"
                value={novoProduto.valorTotalVendido}
                onChange={handleInputChange}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleAddProduto}>{editingId !== null ? 'Salvar' : 'Adicionar'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}