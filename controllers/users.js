const { response, request } = require('express')
const bcryptjs = require('bcryptjs')

const User = require('../models/user')

const getUsers = (req = request, res = response) => {
  const {
    nombre = 'Indefinido',
    apellido = 'Indefinido',
    page = '1',
    limit,
  } = req.query
  res.json({
    msg: 'get API - controlador',
    nombre,
    apellido,
    page,
    limit,
  })
}

const addUser = async (req, res = response) => {
  const { google, status, ...rest } = req.body
  const user = new User(rest)

  const salt = bcryptjs.genSaltSync()
  user.password = bcryptjs.hashSync(user.password, salt)

  await user.save()
  res.json(user)
}

const editUser = async (req, res = response) => {
  const { id } = req.params
  const { _id, password, email, google, role, cc, status, ...updateData } =
    req.body

  if (password) {
    const salt = bcryptjs.genSaltSync()
    updateData.password = bcryptjs.hashSync(password, salt)
  }

  const user = await User.findByIdAndUpdate(id, updateData, { new: true })
  res.json(user)
}

const deleteUser = (req, res = response) => {
  const id = req.params.id
  res.json({
    msg: 'delete API - controlador',
    id,
  })
}

module.exports = {
  getUsers,
  addUser,
  editUser,
  deleteUser,
}
