const express = require('express');
const { validate } = require('express-validation');
const controller = require('../../controllers/user.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
const { listUsers, createUser, replaceUser, updateUser } = require('../../validations/user.validation');

const router = express.Router();

/**
 * Load user when API with userId route parameter is hit
 */
router.param('userId', controller.load);
router.route('/')
    /**
     * @api {get} v1/users List Users
     * @apiDescription Get a list of users
     */
    .get(authorize(ADMIN), validate(listUsers), controller.list)
    /**
     * @api {post} v1/users Create User
     * @apiDescription Create a new user
     */
    .post(authorize(ADMIN), validate(createUser), controller.create)
router.route('/me')
    /**
     * @api {get} v1/users/me User Profile
     * @apiDescription Get logged in user profile information
     */
    .get(authorize(), controller.me)

router.route('/:userId')
    /**
     * @api {get} v1/users/:id Get User
     * @apiDescription Get user information
     */
    .get(authorize(LOGGED_USER), controller.get)
    /**
     * @api {put} v1/users/:id Replace User
     * @apiDescription Replace the whole user document with a new one
     */
    .put(authorize(LOGGED_USER), validate(replaceUser), controller.replace)
    /**
     * @api {patch} v1/users/:id Update User
     * @apiDescription Update some fields of a user document
     */
    .patch(authorize(LOGGED_USER), validate(updateUser), controller.update)
    /**
     * @api {patch} v1/users/:id Delete User
     * @apiDescription Delete a user
     */
    .delete(authorize(LOGGED_USER), controller.remove)

module.exports = router;
