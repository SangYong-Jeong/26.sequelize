module.exports = (sequelize, DataType) => {
  // define("객체명", "객체속성", "객체옵션")
  const Board = sequelize.define('Board', {
    id: {
      type: DataType.INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    writer: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    title: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    content: {
      type: DataType.TEXT,
      allowNull: false,
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    tableName: 'board',
    timestamps: true, 
    paranoid: true,   
  });

  Board.associate = (models) => {
    Board.belongsTo(models.User, { foreignKey: 'user_id', sourceKey: 'id' })
  }


  return Board;
};
