const { Router } = require('express')
const {
  getUsers,
  editUser,
  addUser,
  deleteUser,
} = require('../controllers/users')

const router = Router()

router.get('/', getUsers)

router.post('/', addUser)

router.put('/:id', editUser)

router.delete('/:id', deleteUser)

module.exports = router
