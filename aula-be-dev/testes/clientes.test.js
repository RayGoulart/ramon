const request = require('supertest');
const app = require('../index'); // Certifique-se de que o caminho está correto

describe('Clientes API', () => {

    let clienteId; // Variável para armazenar o ID do cliente criado

    beforeAll(async () => {
        // Crie um cliente para os testes
        const res = await request(app).post('/clientes').send({
            nome: "Cliente Teste",
            email: "cliente@example.com",
            senha: "senha"
        });
        clienteId = res.body.id;
    });

    //testar se esta retornando a lista de clientes
    describe('GET /clientes', () => {
        it('deve retornar a lista de clientes com sucesso', async () => {
            const res = await request(app).get('/clientes').send();
            expect(res.status).toBe(200);
            expect(res.body).toBeInstanceOf(Array);
        });
    });
    
    //testar se esta listando um cliente especifico
    describe('GET /clientes/:id', () => {
        it('deve retornar um cliente específico pelo ID com sucesso', async () => {
            const res = await request(app).get(`/clientes/${clienteId}`).send();
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('id', clienteId);
        });

        it('deve retornar 404 para um cliente não encontrado', async () => {
            const res = await request(app).get('/clientes/999').send();
            expect(res.status).toBe(404);
            expect(res.body.error).toBe('not found'); // Ajustado para "not found"
        });
    });


    describe('PUT /clientes/:id', () => {
        describe('Atualizar um cliente existente', () => {
            it('deve atualizar um cliente existente com sucesso', async () => {
                const res = await request(app).put(`/clientes/${clienteId}`).send({
                    nome: "Cliente Atualizado",
                    email: "clienteatualizado@example.com"
                });
                expect(res.status).toBe(200);
                expect(res.body).toHaveProperty('nome', 'Cliente Atualizado');
                expect(res.body).toHaveProperty('email', 'clienteatualizado@example.com');
            });
        });

    });

    describe('DELETE /clientes/:id', () => {
        describe('Deletar um cliente existente', () => {
            it('deve deletar um cliente existente com sucesso', async () => {
                const res = await request(app).delete(`/clientes/${clienteId}`).send();
                expect(res.status).toBe(204);
            });
        });

        
    });

    afterAll(async () => {
        // Remove o cliente criado para os testes
        if (clienteId) {
            await request(app).delete(`/clientes/${clienteId}`);
        }
    });
});