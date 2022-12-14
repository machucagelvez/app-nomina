const { Router } = require('express')
const { check } = require('express-validator')
const {
  getUsers,
  editUser,
  addUser,
  deleteUser,
} = require('../controllers/users')
const { isValidRole, checkEmail, userById } = require('../helpers/index')
const { fieldValidator } = require('../middlewares/field-validator')

const router = Router()

router.get(
  '/',
  [
    check('limit', 'limit must be a number').isInt().optional(),
    check('page', 'page must be a number').isInt().optional(),
    fieldValidator,
  ],
  getUsers
)

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
      'cc',
      'C.C. is required and must be at least 5 characters long'
    ).isLength({ min: 5 }),
    fieldValidator,
  ],
  addUser
)

router.put(
  '/:id',
  [check('id', 'Invalid ID').isMongoId(), check('id').custom(userById)],
  fieldValidator,
  editUser
)

router.delete(
  '/:id',
  [check('id', 'Invalid ID').isMongoId(), check('id').custom(userById)],
  fieldValidator,
  deleteUser
)

module.exports = router
