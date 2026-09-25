const fs = require('fs');
const os = require('os');
const path = require('path');
const request = require('supertest');

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'tasks-'));
const tempFile = path.join(tempDir, 'tasks.json');
process.env.TASKS_FILE = tempFile;

const app = require('./server');

//Enne igat testi kirjutatakse test andmed faili
beforeEach(() => {
    fs.writeFileSync(tempFile, JSON.stringify({
        tasks: [
            { id: 1, title: 'Test A', completed: true },
            { id: 2, title: 'Test B', completed: false }
        ]
    }));
});

//Peale kõiki teste eemaldatakse ajutine kaust
afterAll(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
    delete process.env.TASKS_FILE;
});

describe('Task API', () => {
    test('GET /tasks to get alltasks', async () => {
        const res = await request(app).get('/tasks')

        expect(res.statusCode).toBe(200)
        expect(Array.isArray(res.body)).toBe(true)
    });

    test('GET /tasks/:id to get one task', async () => {
        const res = await request(app).get('/tasks/1')

        expect(res.statusCode).toBe(200)
        expect(res.body).toHaveProperty("id", 1)
    })

    test('GET /tasks/:id return 404 if wrong id', async () => {
        const res = await request(app).get('/tasks/999999999')

        expect(res.statusCode).toBe(404)
        expect(res.body).toHaveProperty('error')
    })

    test('GET /unknown returns 404', async () => {
        const res = await request(app).get('/unknown');

        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('error', 'Route not found');
    });

    test('POST /tasks/add adds a new task', async () => {
        const res = await request(app)
            .post('/tasks/add')
            .send({ title: '123' })

        expect(res.statusCode).toBe(201)
        expect(res.body).toHaveProperty('task')
    })

    test('POST /tasks/add to get 400 if title is empty', async () => {
        const res = await request(app)
            .post('/tasks/add')
            .send({ title: '' })

        expect(res.statusCode).toBe(400)
        expect(res.body).toHaveProperty('error')
    })

    test('DELETE /tasks/delete/:id deletes the task by id', async () => {
        const res = await request(app).delete('/tasks/delete/2')

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'Task deleted');
    })

})