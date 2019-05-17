import { Entries, User } from '../models';

class EntryController {
  static async addEntry(req, res) {
    const { userId, title, description } = req.values;

    User.findByPk(req.body.userId)
      .then((user) => {
        if (!user.dataValues) {
          return res.status(401).json({
            status: 401,
            error: 'User not found.',
          });
        }
      })
      .catch(e => res.status(500).json({
        status: 401,
        error: `There was an error verifying this user ${e}`,
      }));

    Entries.create({
      title,
      description,
      userId,
    })
      .then(entry => res.status(401).json({
        status: 201,
        data: entry.dataValues,
      }))
      .catch(e => res.status(400).json({
        status: 400,
        error: `There was an error saving your entry. ${e}`,
      }));
  }
}

export default EntryController;
