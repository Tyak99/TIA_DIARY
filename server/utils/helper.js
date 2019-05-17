import bcrpyt from 'bcrypt';
import jwt from 'jsonwebtoken';

class Helper {
  static hashPassword(password) {
    return bcrpyt.hashSync(password, bcrpyt.genSaltSync(10));
  }

  static generateToken(id, email) {
    const token = jwt.sign({
      // eslint-disable-next-line object-shorthand
      userId: id, email: email,
    },
    process.env.my_secret, {
      expiresIn: 86400,
    });
    return token;
  }
}

export default Helper;
