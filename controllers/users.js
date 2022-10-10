const { response, request } = require('express')
const bcryptjs = require('bcryptjs')

const User = require('../models/user')

const getUsers = async (req = request, res = response) => {
  const { page = 1, limit = 5 } = req.query
  const offsetIndex = (parseInt(page) - 1) * parseInt(limit)
  const [total, users] = await Promise.all([
    User.countDocuments({ status: true }),
    User.find({ status: true }).limit(parseInt(limit)).skip(offsetIndex),
  ])

  res.json({
    total,
    users,
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

const deleteUser = async (req, res = response) => {
  const { id } = req.params
  const deletedUser = await User.findByIdAndUpdate(id, {
    status: false,
    new: true,
  })
  res.json(deletedUser)
}

module.exports = {
  getUsers,
  addUser,
  editUser,
  deleteUser,
}
