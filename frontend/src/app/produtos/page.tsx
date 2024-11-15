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

interface Produto {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
  estoque: number;
}

const produtosIniciais: Produto[] = [
  { id: 1, nome: "Smartphone X", categoria: "Eletrônicos", preco: 1999.99, estoque: 50 },
  { id: 2, nome: "Notebook Y", categoria: "Eletrônicos", preco: 3999.99, estoque: 30 },
  { id: 3, nome: "Fone de Ouvido Z", categoria: "Acessórios", preco: 299.99, estoque: 100 },
  { id: 4, nome: "Smart TV 4K", categoria: "Eletrônicos", preco: 2499.99, estoque: 20 },
  { id: 5, nome: "Câmera Digital", categoria: "Eletrônicos", preco: 1499.99, estoque: 15 },
];

export default function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>(produtosIniciais);
  const [open, setOpen] = useState(false);
  const [novoProduto, setNovoProduto] = useState<Omit<Produto, 'id'>>({ nome: '', categoria: '', preco: 0, estoque: 0 });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNovoProduto({ nome: '', categoria: '', preco: 0, estoque: 0 });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNovoProduto(prev => ({ ...prev, [name]: name === 'preco' || name === 'estoque' ? Number(value) : value }));
  };

  const handleAddProduto = () => {
    const id = Math.max(...produtos.map(p => p.id)) + 1;
    const produto: Produto = {
      ...novoProduto,
      id
    };
    setProdutos(prev => [...prev, produto]);
    handleClose();
  };

  const handleDeleteProduto = (id: number) => {
    setProdutos(prev => prev.filter(produto => produto.id !== id));
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
                <TableCell align="right">
                  <Button
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteProduto(produto.id)}
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
        <DialogTitle>Adicionar Novo Produto</DialogTitle>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleAddProduto}>Adicionar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}