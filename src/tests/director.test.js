const request = require("supertest");
const app = require('../app');
require('../models/index');

const BASE_URL = '/directors';

const director = {
    firstName: 'Guillermo',
    lastName: 'del toro',
    nationality: 'Mexicana',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/34/Guillermo_del_Toro_2023_%28cropped%29.jpg',
    birthday: '1992-09-18'
};

let directorId;

test("POST '/directors', should return statusCode 201 ", async() => {

    const res = await request(app)
     .post(BASE_URL)
     .send(director)
    
    directorId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
    
});

test("GET_ALL '/movies' should return statusCode 201 ", async() => {
    const res = await request(app) 
     .get(BASE_URL)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
});

test("GET_ONE -> '/directors', should return statusCode: 201 ", async() => {
    const res = await request(app)
    .get(`${BASE_URL}/${directorId} `)

    
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
});

test("PUT '/directors' should return statusCode 200", async() => {
    
    const res = await request(app)

        .put(`${BASE_URL}/${directorId}`)
        .send({ firstName: 'otro director' })

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe('otro director')
});

test("DELETE '/directors, should return statusCode 204", async() => {
    const res = await request(app)
     .delete(`${BASE_URL}/${directorId}`)
    
    expect(res.statusCode).toBe(204)
});
