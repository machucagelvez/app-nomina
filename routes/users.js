const { Router } = require('express')
const { check } = require('express-validator')
const {
  getUsers,
  editUser,
  addUser,
  deleteUser,
} = require('../controllers/users')
const { isValidRole, checkEmail } = require('../helpers/index')
const { fieldValidator } = require('../middlewares/field-validator')

const router = Router()

router.get('/', getUsers)

router.post(
  '/',
  [
    check('first_name', 'First name is required').notEmpty(),
    check('last_name', 'Last name is required').notEmpty(),
    check('email', 'Invalid email').isEmail(),
    check('email').custom(checkEmail),
    check(
      'password',
      'Password is required and must be at least 6 characters long'
    ).isLength({ min: 6 }),
    check(
      'identity_card',
      'Identity card is required and must be at least 5 characters long'
    ).isLength({ min: 5 }),
    check('role').custom(isValidRole),
    fieldValidator,
  ],
  addUser
)

router.put('/:id', editUser)

router.delete('/:id', deleteUser)

module.exports = router
