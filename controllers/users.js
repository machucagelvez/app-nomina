const { response, request } = require('express')

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

const addUser = (req, res = response) => {
  const { nombre, edad } = req.body
  res.json({
    msg: 'post API - controlador',
    nombre,
    edad,
  })
}

const editUser = (req, res = response) => {
  const id = req.params.id
  res.json({
    msg: 'put API - controlador',
    id,
  })
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
