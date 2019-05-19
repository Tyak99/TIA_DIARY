import models from '../models';

const { Entries } = models;

class EntryController {
  static getEntries(req, res) {
    Entries.findAll({
      where: { userId: 1 },
      order: [['updatedAt', 'ASC']],
    })
      .then((entries) => {
        if (entries.length === 0) {
          return res.status(200).json({
            status: res.statusCode,
            message: 'You have no entry',
            data: [],
          });
        }
        return res.status(200).json({
          status: res.statusCode,
          message: 'All user entries retrieved',
          data: entries,
        });
      });
  }
}

export default EntryController;
