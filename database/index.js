require('dotenv').config();
var knex = require('../knex')

const getPeople = function () {
    return knex.select('*').from('person')
}

const updatePerson = function (id, first, last, age) {
    knex("person").where("Id", knex.raw(id))
        .update({ FirstName: first, LastName: last, Age: age }).then(function () {

        })
}

const addPerson = function (first, last, age) {
    knex.insert({ FirstName: first, LastName: last, Age: age }).into("person").then(function (id) {

    })
}

const deletePerson = function (id) {
    knex('person')
        .where('Id', id)
        .del().then(function () { })
}

const getPersonCars = function getPersonCars(personId) {
    return knex.select('person.FirstName', 'person.LastName', 'Car.Name', 'Car.Color')
        .from('personcar')
        .join('cars', 'cars.Id', '=', 'personcar.CarId')
        .join('person', 'person.Id', '=', 'personcar.PersonId')
        .where('personcar.PersonId', '=', personId);
}

module.exports = {
    deletePerson: deletePerson,
    addPerson: addPerson,
    updatePerson: updatePerson,
    getPeople: getPeople,
    getPersonCars: getPersonCars
}