const request = require("supertest");
const app = require('../app');
require('../models/index');

const BASE_URL = '/genres'

const genre = {
    name: 'terror'
};

let genreId;

test("POST '/genres', should return statusCode 201, and res,body to be defined and res.body.name = genre.name ", async() => {

    const res = await request(app)
     .post(BASE_URL)
     .send(genre)
    
    genreId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name)
    
});

test("GET-ALL '/genres',  should return statusCode 201, and res,body to be defined and res.body.name = genre.name", async() => {

    const res = await request(app)
     .get(BASE_URL)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
});

test("GET_ONE -> '/songs', should return statusCode: 201 ", async() => {
    const res = await request(app)
    .get(`${BASE_URL}/${genreId} `)

    
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name)
});


test("PUT '/songs' should return statusCode 200", async() => {
    
    const res = await request(app)

        .put(`${BASE_URL}/${genreId}`)
        .send({ name: 'Suspenso' })

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe('Suspenso')
});

test("DELETE '/songs', should return statusCode 204", async() => {
    const res = await request(app)
     .delete(`${BASE_URL}/${genreId}`)
    
    expect(res.statusCode).toBe(204)
});


