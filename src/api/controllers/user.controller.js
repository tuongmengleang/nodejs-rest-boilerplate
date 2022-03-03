const httpStatus = require('http-status');
const { omit } = require('lodash');
const User = require('../models/user.model');

/**
 * Load user and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
    try {
        const user = await User.get(id);
        req.locals = { user };
        return next();
    } catch (error) {
        return next(error);
    }
};

/**
 * Get user list
 * @public
 */
exports.list = async (req, res, next) => {
    try {
        const users = await User.list(req.query);
        const transformedUsers = users.map((user) => user.transform());
        res.json(transformedUsers);
    } catch (error) {
        next(error);
    }
};

/**
 * Create new user
 * @public
 */
exports.create = async (req, res, next) => {
    try {
        const user = new User(req.body);
        const savedUser = await user.save();
        res.status(httpStatus.CREATED);
        res.json(savedUser.transform());
    } catch (error) {
        next(User.checkDuplicateEmail(error));
    }
};

/**
 * Get logged in user info
 * @public
 */
exports.me = async (req, res) => res.json(req.user.transform());
;

/**
 * Get user
 * @public
 */
exports.get = (req, res) => res.json(req.locals.user.transform());

/**
 * Update existing user
 * @public
 */
exports.replace = async (req, res, next) => {
    try {
        const { user } = req.locals;
        const newUser = new User(req.body);
        const ommitRole = user.role !== 'admin' ? 'role' : '';
        const newUserObject = omit(newUser.toObject(), '_id', ommitRole);

        await user.updateOne(newUserObject, { override: true, upsert: true });
        const savedUser = await User.findById(user._id);

        res.json(savedUser.transform());
    } catch (error) {
        next(User.checkDuplicateEmail(error));
    }
};

/**
 * Update existing user
 * @public
 */
exports.update = async (req, res) => {
    const ommitRole = req.locals.user.role !== 'admin' ? 'role' : '';
    const updatedUser = omit(req.body, ommitRole);
    const user = Object.assign(req.locals.user, updatedUser);

    user.save()
        .then((savedUser) => res.json(savedUser.transform()))
        .catch((e) => next(User.checkDuplicateEmail(e)));
};

/**
 * Delete user
 * @public
 */
exports.remove = async (req, res) => {
    const { user } = req.locals;

    user.remove()
        .then(() => res.status(httpStatus.NO_CONTENT).end())
        .catch((e) => next(e));
};
