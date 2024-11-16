'use client'

import React, { useState, useEffect } from 'react'
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
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
  InputLabel
} from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import { useAppContext } from '../contexts/AppContext'

export default function Vendas() {
  const { vendedores, produtos, vendas, adicionarVenda } = useAppContext();
  const [open, setOpen] = useState(false);
  const [novaVenda, setNovaVenda] = useState({ 
    vendedorId: '', 
    produtoId: '', 
    quantidade: 1, 
    data: new Date().toISOString().split('T')[0],
    valorTotal: 0
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNovaVenda({ 
      vendedorId: '', 
      produtoId: '', 
      quantidade: 1, 
      data: new Date().toISOString().split('T')[0],
      valorTotal: 0
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setNovaVenda(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (novaVenda.produtoId && novaVenda.quantidade) {
      const produto = produtos.find(p => p.id === Number(novaVenda.produtoId));
      if (produto) {
        const valorTotal = produto.preco * Number(novaVenda.quantidade);
        setNovaVenda(prev => ({ ...prev, valorTotal }));
      }
    }
  }, [novaVenda.produtoId, novaVenda.quantidade, produtos]);

  const handleAddVenda = () => {
    const produto = produtos.find(p => p.id === Number(novaVenda.produtoId));
    if (produto && Number(novaVenda.quantidade) <= produto.estoque) {
      adicionarVenda({
        vendedorId: Number(novaVenda.vendedorId),
        produtoId: Number(novaVenda.produtoId),
        quantidade: Number(novaVenda.quantidade),
        valorTotal: novaVenda.valorTotal,
        data: new Date(novaVenda.data)
      });
      handleClose();
    } else {
      alert('Quantidade indisponível em estoque!');
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Registro de Vendas
      </Typography>

      <Button 
        variant="contained" 
        startIcon={<AddIcon />} 
        onClick={handleClickOpen}
        sx={{ mb: 2 }}
      >
        Registrar Venda
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Data</TableCell>
              <TableCell>Vendedor</TableCell>
              <TableCell>Produto</TableCell>
              <TableCell align="right">Quantidade</TableCell>
              <TableCell align="right">Valor Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vendas.map((venda) => {
              const vendedor = vendedores.find(v => v.id === venda.vendedorId);
              const produto = produtos.find(p => p.id === venda.produtoId);
              return (
                <TableRow key={venda.id}>
                  <TableCell>{new Date(venda.data).toLocaleDateString()}</TableCell>
                  <TableCell>{vendedor?.nome}</TableCell>
                  <TableCell>{produto?.nome}</TableCell>
                  <TableCell align="right">{venda.quantidade}</TableCell>
                  <TableCell align="right">R$ {venda.valorTotal.toFixed(2)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Registrar Nova Venda</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel id="vendedor-label">Vendedor</InputLabel>
            <Select
              labelId="vendedor-label"
              name="vendedorId"
              value={novaVenda.vendedorId}
              onChange={(e: SelectChangeEvent<string>) => handleInputChange(e)}
              label="Vendedor"
            >
              {vendedores.map(vendedor => (
                <MenuItem key={vendedor.id} value={vendedor.id}>{vendedor.nome}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel id="produto-label">Produto</InputLabel>
            <Select
              labelId="produto-label"
              name="produtoId"
              value={novaVenda.produtoId}
              onChange={(e: SelectChangeEvent<string>) => handleInputChange(e)}
              label="Produto"
            >
              {produtos.map(produto => (
                <MenuItem key={produto.id} value={produto.id}>{produto.nome} (Estoque: {produto.estoque})</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            name="quantidade"
            label="Quantidade"
            type="number"
            fullWidth
            variant="standard"
            value={novaVenda.quantidade}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
          />
          <TextField
            margin="dense"
            name="data"
            label="Data"
            type="date"
            fullWidth
            variant="standard"
            value={novaVenda.data}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
          />
          <TextField
            margin="dense"
            name="valorTotal"
            label="Valor Total"
            type="number"
            fullWidth
            variant="standard"
            value={novaVenda.valorTotal}
            InputProps={{
              readOnly: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleAddVenda}>Registrar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}