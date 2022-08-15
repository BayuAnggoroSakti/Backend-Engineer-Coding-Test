module.exports = (sequelize, Sequelize) => {
    const Todo_items = sequelize.define("todo_items", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          activity_group_id: {
            type: Sequelize.INTEGER,
            allowNull: false
          },
          title: {
            allowNull: false,
            type: Sequelize.STRING
          },
          priority: {
            allowNull: false,
            defaultValue: 'very-high',
            type: Sequelize.STRING
          },
          is_active: {
            type: Sequelize.INTEGER,
            defaultValue: 1,
            allowNull: false
          },
         
    });
  
    return Todo_items;
  };
  