const config = require('./knexfile').development
const connection = require('knex')(config)

function getAllWombles(db = connection) {
  return db(`wombles`).select()
}

function getAllRubbish(db = connection) {
  return db(`rubbish`).select()
}

function getWomble(db = connection) {
  return db(`wombles`)
    .join(`characteristics`, `characteristics.id`, `wombles.characteristic_id`)
    .select(`name`, `description`, `characteristic_id`)
}

function getAssignedRubbish(db = connection) {
  return db('wombles')
    .join(`rubbish`, `rubbish.id`, 'wombles.rubbish_id')
    .select('wombles.name as womblesName', 'rubbish.name')
}

function addWomble(name, characteristic, db = connection) {
  return db(`characteristics`)
    .insert({ description: characteristic })
    .then((characteristic_id) => {
      return db(`wombles`).insert({ name, characteristic_id })
    })
}

module.exports = {
  getAllWombles,
  getAllRubbish,
  getWomble,
  getAssignedRubbish,
  addWomble,
}
