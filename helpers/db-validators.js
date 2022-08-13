const Role = require('../models/role')
const User = require('../models/user')

const isValidRole = async (role = '') => {
  const existeRol = await Role.findOne({ role })
  if (!existeRol) {
    throw new Error(`Role ${role} does not exist`)
  }
}

const checkEmail = async (email = '') => {
  const existsEmail = await User.findOne({ email })
  if (existsEmail) {
    throw new Error(`Email ${email} already registered`)
  }
}

module.exports = {
  isValidRole,
  checkEmail,
}
