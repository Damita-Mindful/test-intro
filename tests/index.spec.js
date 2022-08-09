import app from '../src/app';
import request from 'supertest';

describe('GET /tasks', () => {

  test('should respond with a 200 status code', async () => {
    const response = await request(app).get('/tasks').send();
    expect(response.statusCode).toBe(200);
  });

  test('should respond withn an array', async () => {
    const response = await request(app).get('/tasks').send();
    expect(response.body).toBeInstanceOf(Array)
  });

})

describe('POST /tasks', () => {
  describe('given a  title and description', () => {

    const newTask = {
      title: 'Test Task',
      description: "Test Description",
    }

    test('should respond with a 20 status code', async () => {
      const response = await request(app).post('/tasks').send(newTask);
      expect(response.statusCode).toBe(200)
    });
  
    test('should have a content-type: application/json in header', async () => {
      const response = await request(app).post('/tasks').send(newTask);
      expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    });
  
    test('should respond with a tasks ID', async () => {
      const response = await request(app).post('/tasks').send(newTask);
      expect(response.body.id).toBeDefined()
    });
  
  })

  describe('when title and descripttion is missing', () => {
    test('should respond with a 400 status code', async () =>{
      const fields = [
        {},
        { title: 'Test Task' },
        { description: 'Test Descrption' },
      ];

      for (const body of fields) {
      const response = await request(app).post('/tasks').send({})
      expect(response.statusCode).toBe(400)
      }
    })
  })
    
  })


