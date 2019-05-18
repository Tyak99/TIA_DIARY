class Validator {
  static addEntry(req, res, next) {
    if (req.body === undefined) {
      return res.status(400).json({
        status: 400,
        error: 'Please enter a request body',
      });
    }
    req.values = {};

    Object.entries(req.body).forEach((input) => {
      req.values[input[0]] = typeof input[1] === 'string' ? input[1].trim() : input[1];
    });
    const regex = /^[\w\s,.;:"'@?/]{2,}$/;

    const { title, description, userId } = req.values;
    const errors = [];

    if (title === '' || title === undefined) {
      errors.push('Entry must have a title.');
    } else if (!regex.test(title)) {
      errors.push('Invalid title.');
    }

    if (description === '' || description === undefined) {
      errors.push('Please enter a description.');
    } else if (!regex.test(description)) {
      errors.push('Invalid description.');
    }

    if (userId === undefined) {
      errors.push('Entry must have a user Id');
    } else if (typeof userId !== 'number') {
      errors.push('User Id must be a number');
    }

    if (errors.length !== 0) {
      return res.status(400).json({
        status: 400,
        error: errors,
      });
    }

    next();
  }
}

export default Validator;
