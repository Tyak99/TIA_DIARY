import { Entries, User } from '../models';

class entriesController {
  static async addEntry(req, res) {
    const { userId, title, description } = req.body;

    try {
      const result = await User.findByPk(req.body.userId);
      if (!result) {
        return res.status(401).json({
          status: 401,
          error: 'User not found.',
        });
      }

      const createdEntry = await Entries.create({
        title,
        description,
        id: userId,
      });

      console.log('entry is ', createdEntry);
      return res.status(201).json({
        status: 201,
        data: [rows[0]],
      });
    } catch (e) {
      return res.status(400).json({
        status: 400,
        error: `There was an error sending your message. ${e}`,
      });
    }
  }
}
const { addEntry } = entriesController;

export { addEntry };
