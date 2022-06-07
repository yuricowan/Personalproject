const express = require('express')
const db = require(`./db`)
const router = express.Router()

router.get('/wombles', (req, res) => {
  db.getAllWombles()
    .then((wombles) => {
      res.render(`wombles`, { wombles })
    })
    .catch((err) => {
      res.status(500).send(`server error`)
    })
})

router.get('/rubbish', (req, res) => {
  db.getAllRubbish()
    .then((rubbish) => {
      res.render(`rubbish`, { rubbish })
    })
    .catch((err) => {
      console.log(err)
    })
})

router.get(`/view`, (req, res) => {
  db.getWomble()
    .then((wombles) => {
      res.render(`wombles`, { wombles })
    })
    .catch((err) => {
      console.log(err)
    })
})

router.get('/assignments', (req, res) => {
  db.getAssignedRubbish()
    .then((wombles) => {
      console.log(wombles)
      res.render(`wombles`, { wombles })
    })
    .catch((err) => {
      console.log(err)
    })
})

router.get(`/wombles/birth`, (req, res) => {
  res.render(`womblesForm`)
})

router.post(`/wombles/birth/submit`, (req, res) => {
  const newWomble = req.body

  db.addWomble(newWomble.wombleName, newWomble.wombleCharacteristic)
    .then((wombles) => {
      res.redirect(`/wombles`)
    })
    .catch((err) => {
      console.log(err)
    })
})

module.exports = router
