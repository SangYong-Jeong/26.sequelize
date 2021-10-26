const express = require('express');
const router = express.Router();
const { User, Board, sequelize, Sequelize } = require('../../models');
const createError = require('http-errors');
const bcrypt = require('bcrypt');

router.get('/create', async (req, res, next) => {
  try {
    const result = await User.create({
      userid: 'moongtak7',
      userpw: await bcrypt.hash('111111', Number(process.env.BCRYPT_ROUND)),
      username: '뭉탁탈',
      email: 'mmaf@naver.com',
    });
    res.json(result);
  } catch (err) {
    next(createError(err));
  }
});

router.get('/update/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    // User.update({고칠내용}, {WHERE})
    const result = await User.update(
      {
        username: '뭉탁탁탁탁',
      },
      {
        where: { id },
      }
    );
    res.json(result);
  } catch (err) {
    next(createError(err));
  }
});

router.get('/delete/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    // User.destroy({WHERE})
    const result = await User.destroy({
      where: { id },
    });
    res.json(result);
  } catch (err) {
    next(createError(err));
  }
});

// https://sequelize.org/master/manual/model-querying-basics.html
router.get('/read', async (req, res, next) => {
  try {
    /* field 옵션 */
    // const result = await User.findAll()
    /* const result = await User.findAll({ 
      attributes: ['id', 'username'] 
    }) */
    /* const result = await User.findAll({ 
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('id')), 'id_count'],
      ]
    }) */
    /* const result = await User.findAll({ 
      attributes: {
        exclude: ['userpw']
      }
    }) */

    /* WHERE 옵션 */
    const { Op } = Sequelize;
    // const result = await User.findAll({
    //   where: {
    //     id: 1
    //   }
    // })
    /* const result = await User.findAll({ 
      where: {
        [Op.and]: [
          {username: '뭉탁'},
          {userid: 'moongtak2'},
        ]
      }
    }) */
    /* const result = await User.findAll({ 
      where: {
          username: '뭉탁',
          userid: 'moongtak2',
      }
    }) */
    /* const result = await User.findAll({ 
      order: [
        ['username', 'desc']
      ],
    }) */
    /* const result = await User.findAll({ 
      order: [
        ['username', 'desc']
      ],
      offset: 2,
      limit: 2
    }) */
    const result = await User.findAll({
      order: [['username', 'desc']],
      offset: 2,
      limit: 2,
    });
    res.json(result);
  } catch (err) {
    next(createError(err));
  }
});

router.get('/read2', async (req, res, next) => {
  try {
    const result = await User.findAll({
      attributes: ['username', 'email', 'id'],
      where: {},
      order: [
        // ['username', 'desc'],
        ['id', 'desc'],
      ],
      include: [
        { model: Board, attributes: ['content', 'writer'] },
        // { model: UserInfo, attributes: ["content", "writer"] },
      ],
      // ORDER BY username DESC, id ASC
    });
    res.json(result);
  } catch (err) {
    next(createError(err));
  }
});

router.get('/read3', async (req, res, next) => {
  try {
    const result = await User.getProfile();
    res.status(200).json(result);
  } catch (err) {
    next(createError(err));
  }
});

module.exports = router;
