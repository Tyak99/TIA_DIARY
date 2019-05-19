import models from '../models';
import Helper from '../utils/helper';
import validateSignupInput from '../utils/validation';

const { User } = models;

class UserController {
  static createUser(req, res) {
    const { errors, isValid } = validateSignupInput(req.body);
    if (!isValid) {
      return res.status(400).json({
        status: 400,
        error: errors,
      });
    }
    User.findOne({ where: { email: req.body.email } }).then((email) => {
      if (email) {
        console.log(email);
        return res.status(409).json({
          status: 409,
          error: `The email ${req.body.email} already exists`,
        });
      }
    });
    const encryptedPassword = Helper.hashPassword(req.body.password);
    User.create({
      email: req.body.email.toLowerCase(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: encryptedPassword,
    })
      .then((user) => {
        const { password, firstName, ...newUser } = user.dataValues;
        const token = Helper.generateToken(user.id, user.email);
        return res.status(201).json({
          status: 'success',
          data: [
            {
              userToken: token,
              email: req.body.email,
            },
          ],
        });
      })
      .catch((error) => {
        return res.status(400).json({
          status: 'failed',
          error: 'Unable to create user',
        });
      });
    return null;
  }

  static login(req, res) {
    const { email, password } = req.body;

    User.findOne({ where: { email } }).then((user) => {
      if (!user) {
        return res.status(401).json({
          status: 401,
          error: 'invalid credentials',
        });
      }

      if (user.password !== password) {
        return res.status(401).json({
          status: 401,
          error: 'invalid credentials',
        });
      }

      return res.status(200).json({
        status: 200,
        data: user,
      });
    });
  }
}

export default UserController;
