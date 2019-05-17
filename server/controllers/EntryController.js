import models from '../models';

const { Entries, User } = models;

class EntryController {
  static async addEntry(req, res) {
    const { userId, title, description } = req.values;

    User.findByPk(req.body.userId)
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            status: 404,
            error: 'User not found.',
          });
        }
      })
      .catch(e => res.status(500).json({
        status: 500,
        error: `There was an error verifying this user ${e}`,
      }));

    Entries.create({
      title,
      description,
      userId,
    })
      .then(entry => res.status(201).json({
        status: 201,
        data: entry.dataValues,
      }))
      .catch(e => res.status(500).json({
        status: 500,
        error: `There was an error saving your entry. ${e}`,
      }));
  }
}

export default EntryController;
