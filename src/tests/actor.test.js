const request = require("supertest");
const app = require('../app');
require('../models/index');

const BASE_URL = '/actors'

const actor = {
    firstName: 'Ryan ',
    lastName: 'reynols',
    nationality: 'USA',
    image: 'https://m.media-amazon.com/images/M/MV5BODFmN2VmZmEtYTRjZi00ZjY1LTgxYjQtODMyNDI3ZDk4ZTJiXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
    birthday: '1994-11-8'
};

let actorId;

test("POST '/actors', should return statusCode 201, and res,body to be defined and res.body.name = genre.name ", async() => {

    const res = await request(app)
     .post(BASE_URL)
     .send(actor)
    
     actorId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
    
});

test("GET_ALL '/actors' should return statusCode 201 ", async() => {
    const res = await request(app) 
     .get(BASE_URL)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
});

test("GET_ONE -> '/actors', should return statusCode: 201 ", async() => {
    const res = await request(app)
    .get(`${BASE_URL}/${actorId} `)

    
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
});

test("PUT '/actors' should return statusCode 200", async() => {
    
    const res = await request(app)

        .put(`${BASE_URL}/${actorId}`)
        .send({ firstName: 'robert downey jr' })

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe('robert downey jr')
});

test("DELETE '/actors', should return statusCode 204", async() => {
    const res = await request(app)
     .delete(`${BASE_URL}/${actorId}`)
    
    expect(res.statusCode).toBe(204)
});
