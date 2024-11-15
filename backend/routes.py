from flask import jsonify, request
from app import app, db
from models import Vendedor, Produto, Venda
from datetime import datetime

@app.route('/api/vendedores', methods=['GET', 'POST'])
def vendedores():
    if request.method == 'GET':
        vendedores = Vendedor.query.all()
        return jsonify([{'id': v.id, 'nome': v.nome, 'email': v.email} for v in vendedores])
    elif request.method == 'POST':
        data = request.json
        novo_vendedor = Vendedor(nome=data['nome'], email=data['email'])
        db.session.add(novo_vendedor)
        db.session.commit()
        return jsonify({'message': 'Vendedor adicionado com sucesso!'}), 201

@app.route('/api/produtos', methods=['GET', 'POST'])
def produtos():
    if request.method == 'GET':
        produtos = Produto.query.all()
        return jsonify([{'id': p.id, 'nome': p.nome, 'preco': p.preco} for p in produtos])
    elif request.method == 'POST':
        data = request.json
        novo_produto = Produto(nome=data['nome'], preco=data['preco'])
        db.session.add(novo_produto)
        db.session.commit()
        return jsonify({'message': 'Produto adicionado com sucesso!'}), 201

@app.route('/api/vendas', methods=['GET', 'POST'])
def vendas():
    if request.method == 'GET':
        vendas = Venda.query.all()
        return jsonify([{
            'id': v.id,
            'vendedor_id': v.vendedor_id,
            'produto_id': v.produto_id,
            'quantidade': v.quantidade,
            'data': v.data.isoformat()
        } for v in vendas])
    elif request.method == 'POST':
        data = request.json
        nova_venda = Venda(
            vendedor_id=data['vendedor_id'],
            produto_id=data['produto_id'],
            quantidade=data['quantidade'],
            data=datetime.fromisoformat(data['data'])
        )
        db.session.add(nova_venda)
        db.session.commit()
        return jsonify({'message': 'Venda registrada com sucesso!'}), 201

@app.route('/api/dashboard')
def dashboard():
   
    vendas_por_vendedor = db.session.query(Vendedor.nome, db.func.sum(Venda.quantidade)).join(Venda).group_by(Vendedor.id).all()
    produtos_mais_vendidos = db.session.query(Produto.nome, db.func.sum(Venda.quantidade)).join(Venda).group_by(Produto.id).order_by(db.func.sum(Venda.quantidade).desc()).limit(5).all()
    
    return jsonify({
        'vendas_por_vendedor': [{'nome': v[0], 'total': v[1]} for v in vendas_por_vendedor],
        'produtos_mais_vendidos': [{'nome': p[0], 'total': p[1]} for p in produtos_mais_vendidos]
    })