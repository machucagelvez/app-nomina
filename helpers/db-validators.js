const Role = require('../models/role')
const User = require('../models/user')

const isValidRole = async (role = '') => {
  const existsRole = await Role.findOne({ role })
  if (!existsRole) {
    throw new Error(`Role ${role} does not exist`)
  }
}

const checkEmail = async (email = '') => {
  const existsEmail = await User.findOne({ email })
  if (existsEmail) {
    throw new Error(`Email ${email} already registered`)
  }
}

const userById = async (id) => {
  const existsUser = await User.findById(id)
  if (!existsUser || !existsUser.status) {
    throw new Error(`ID ${id} does not exist`)
  }
}

module.exports = {
  isValidRole,
  checkEmail,
  userById,
}
