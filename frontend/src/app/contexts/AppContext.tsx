'use client'

import React, { createContext, useContext, useState } from 'react'

interface Vendedor {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  vendasTotais: number;
}

interface Produto {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
  estoque: number;
  quantidadeVendida: number;
  valorTotalVendido: number;
}

interface Venda {
  id: number;
  vendedorId: number;
  produtoId: number;
  quantidade: number;
  valorTotal: number;
  data: Date;
}

interface AppContextType {
  vendedores: Vendedor[];
  produtos: Produto[];
  vendas: Venda[];
  setVendedores: React.Dispatch<React.SetStateAction<Vendedor[]>>;
  setProdutos: React.Dispatch<React.SetStateAction<Produto[]>>;
  setVendas: React.Dispatch<React.SetStateAction<Venda[]>>;
  adicionarVenda: (venda: Omit<Venda, 'id'>) => void;
  atualizarProduto: (produto: Produto) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [vendedores, setVendedores] = useState<Vendedor[]>([
    { id: 1, nome: "João Silva", email: "joao@exemplo.com", telefone: "(11) 98765-4321", vendasTotais: 0 },
    { id: 2, nome: "Maria Santos", email: "maria@exemplo.com", telefone: "(21) 98765-4321", vendasTotais: 0 },
    { id: 3, nome: "Pedro Oliveira", email: "pedro@exemplo.com", telefone: "(31) 98765-4321", vendasTotais: 0 },
  ]);

  const [produtos, setProdutos] = useState<Produto[]>([
    { id: 1, nome: "Smartphone X", categoria: "Eletrônicos", preco: 1999.99, estoque: 50, quantidadeVendida: 0, valorTotalVendido: 0 },
    { id: 2, nome: "Notebook Y", categoria: "Eletrônicos", preco: 3999.99, estoque: 30, quantidadeVendida: 0, valorTotalVendido: 0 },
    { id: 3, nome: "Fone de Ouvido Z", categoria: "Acessórios", preco: 299.99, estoque: 100, quantidadeVendida: 0, valorTotalVendido: 0 },
  ]);

  const [vendas, setVendas] = useState<Venda[]>([]);

  const adicionarVenda = (novaVenda: Omit<Venda, 'id'>) => {
    const venda: Venda = {
      ...novaVenda,
      id: vendas.length + 1,
    };

    setVendas(prevVendas => [...prevVendas, venda]);

    setProdutos(prevProdutos =>
      prevProdutos.map(produto =>
        produto.id === venda.produtoId
          ? { 
              ...produto, 
              estoque: produto.estoque - venda.quantidade,
              quantidadeVendida: produto.quantidadeVendida + venda.quantidade,
              valorTotalVendido: produto.valorTotalVendido + venda.valorTotal
            }
          : produto
      )
    );

    setVendedores(prevVendedores =>
      prevVendedores.map(vendedor =>
        vendedor.id === venda.vendedorId
          ? {
              ...vendedor,
              vendasTotais: vendedor.vendasTotais + venda.valorTotal
            }
          : vendedor
      )
    );
  };

  const atualizarProduto = (produtoAtualizado: Produto) => {
    setProdutos(prevProdutos =>
      prevProdutos.map(produto =>
        produto.id === produtoAtualizado.id ? produtoAtualizado : produto
      )
    );
  };

  return (
    <AppContext.Provider value={{ 
      vendedores, 
      produtos, 
      vendas, 
      setVendedores, 
      setProdutos, 
      setVendas, 
      adicionarVenda,
      atualizarProduto
    }}>
      {children}
    </AppContext.Provider>
  );
};