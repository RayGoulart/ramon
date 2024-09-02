const request = require('supertest');
const app = require('../index'); // Certifique-se de que o caminho está correto

describe('Produtos API', () => {

    let produtoId; 

    beforeAll(async () => {
        
        const res = await request(app).post('/produtos').send({
            nome: "Produto Teste",
            descricao: "Descrição do produto teste",
            preco: 100.00
        });
        produtoId = res.body.id;
    });

    //testar listar todos os produtos
    describe('GET /produtos', () => {
        it('deve retornar a lista de produtos com sucesso', async () => {
            const res = await request(app).get('/produtos').send();
            expect(res.status).toBe(200);
            expect(res.body).toBeInstanceOf(Array);
        });
    });

    //testar listar produto especifico
    describe('GET /produtos/:id', () => {
        it('deve retornar um produto específico pelo ID com sucesso', async () => {
            const res = await request(app).get(`/produtos/${produtoId}`).send();
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('id', produtoId);
        });

        it('deve retornar 404 para um produto não encontrado', async () => {
            const res = await request(app).get('/produtos/999').send();
            expect(res.status).toBe(404);
            expect(res.body.error).toBe('not found'); // Ajustado para "not found"
        });
    });

    //testar atualizar produto 
    describe('PUT /produtos/:id', () => {
        describe('Atualizar um produto existente', () => {
            it('deve atualizar um produto existente com sucesso', async () => {
                const res = await request(app).put(`/produtos/${produtoId}`).send({
                    nome: "Produto Atualizado",
                    descricao: "Descrição atualizada",
                    preco: 120.00
                });
                expect(res.status).toBe(200);
                expect(res.body).toHaveProperty('nome', 'Produto Atualizado');
                expect(res.body).toHaveProperty('preco', 120.00);
            });
        });

    });

    //testar se esta criando produto
    describe('POST /produtos', () => {
        it('deve criar um novo produto com sucesso', async () => {
            const res = await request(app).post('/produtos').send({
                nome: "Produto Teste",
                preco: 100.00,
                descricao: "Descrição do Produto Teste"
            });
            expect(res.status).toBe(201); // Assumindo que a criação deve retornar um status 201 Created
            expect(res.body).toHaveProperty('id'); // Verifica se o ID do produto foi retornado
            expect(res.body).toHaveProperty('nome', 'Produto Teste');
            expect(res.body).toHaveProperty('preco', 100.00);
            expect(res.body).toHaveProperty('descricao', 'Descrição do Produto Teste');
            produtoId = res.body.id; // Armazena o ID do produto criado para usar nos outros testes
        });
    });

    //testar deletar produto
    describe('DELETE /produtos/:id', () => {
        describe('Deletar um produto existente', () => {
            it('deve deletar um produto existente com sucesso', async () => {
                const res = await request(app).delete(`/produtos/${produtoId}`).send();
                expect(res.status).toBe(204);
            });
        });

        
    });

    afterAll(async () => {
        // Remove o produto criado para os testes
        if (produtoId) {
            await request(app).delete(`/produtos/${produtoId}`);
        }
    });
});