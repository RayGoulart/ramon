const request = require('supertest');
const app = require('../index'); 

describe('Clientes API', () => {
    let clienteId;

    // Testar se esta criando clientes
    describe('POST /clientes', () => {
        it('deve criar um novo cliente com sucesso', async () => {
            const res = await request(app).post('/clientes').send({
                nome: "Cliente Teste",
                email: "cliente@example.com",
                senha: "senha"
            });
            expect(res.status).toBe(201); 
            expect(res.body).toHaveProperty('id'); 
            expect(res.body).toHaveProperty('nome', 'Cliente Teste');
            expect(res.body).toHaveProperty('email', 'cliente@example.com');
            clienteId = res.body.id; 
        });
    });

    //testa se esta listando lista de clientes
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
            expect(res.body.error).toBe('not found');
        });
    });

    //testar se esta atualizando cliente
    describe('PUT /clientes/:id', () => {
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

    //testar se esta deletando cliente
    describe('DELETE /clientes/:id', () => {
        it('deve deletar um cliente existente com sucesso', async () => {
            const res = await request(app).delete(`/clientes/${clienteId}`).send();
            expect(res.status).toBe(204);
        });
    });

    afterAll(async () => {
        
        if (clienteId) {
            await request(app).delete(`/clientes/${clienteId}`);
        }
    });
});