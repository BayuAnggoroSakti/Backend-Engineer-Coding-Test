module.exports = (sequelize, Sequelize) => {
  const Activity_groups = sequelize.define("activities", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    title: {
      type: Sequelize.STRING
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING
    }
  });

  return Activity_groups;
};
