const db = require("../models");
const Op = db.Sequelize.Op;
const Todo_item = db.todo_item;
const sequelize = db.sequelize;


exports.create = (req, res) => {
    let priority = "";
  // Validate request
  if (!req.body.title) {
    // res.status(400).send({
    //     name: "BadRequest",
    //     message: "notNull Violation: todo_items.title cannot be null",
    //     code: 400,
    //     className: "bad-request",
    //     data:{},
    //     errors: {}
    // });
    res.status(400).send({
      status: "Bad Request",
      message: "title cannot be null",
      data:{}
  });
    return;
  }

  if (!req.body.activity_group_id) {
    // res.status(400).send({
    //     name: "BadRequest",
    //     message: "notNull Violation: todo_items.activity_group_id cannot be null",
    //     code: 400,
    //     className: "bad-request",
    //     data:{},
    //     errors: {}
    // });
    res.status(400).send({
      status: "Bad Request",
      message: "activity_group_id cannot be null",
      data:{}
  });
    return;
  }

  if (!req.body.priority ) {
    priority = "very-high";
  } else if ( req.body.priority !== "high" && req.body.priority !== "very-high" && req.body.priority !== "normal" && req.body.priority !== "very-low" && req.body.priority !== "low" ){
    console.log(req.body.priority);
    res.status(500).send({
        name: "GeneralError",
        message: "Data truncated for column 'priority' at row 1 "+req.body.priority,
        code: 500,
        className: "general-error",
        errors: {}
    });
    return;
  } else {
    priority = req.body.priority;
  }

  const todo_item = {
    title: req.body.title,
    activity_group_id: req.body.activity_group_id,
    priority: priority,
  };

  Todo_item.create(todo_item)
    .then(data => {
      res.status(201).send({
        status: "Success",
        message: "Success",
        data: data
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the todo_items."
      });
    });
};

// Retrieve all todo_items from the database.
exports.findAll = (req, res) => {
  const activity_group_id = req.query.activity_group_id;
  const condition_activity_group_id = activity_group_id ? { activity_group_id: { [Op.like]: `%${activity_group_id}%` } } : null;

  Todo_item.findAll({ where:  condition_activity_group_id })
    .then(data => {
      res.send({
        limit:1000,
        skip:0,
        total: data.length,
        status: "Success",
        message: "Success",
        data: data
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving todo items."
      });
    });
};

// Find a single todo_item with an id
exports.findOne = (req, res)  => {
  const id = req.params.id;
  Todo_item.findByPk(id)
    .then(data => {
      if (data) {
        res.send({
          status: "Success",
          message: "Success",
          data: data
        })
      }else{
      res.status(404).send({
        name: "NotFound",
        status: "Not Found",
        message: `Todo with ID ${id} Not Found`,
        code: 404,
        className: "not-found",
        errors: {}
      });
      }
      
    })
    .catch(err => {
      res.status(404).send({
        message: "Error retrieving Todo Items with id=" + id
      });
    });
};

// Update a Todo Item by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  if (!req.body.priority) {
    console.log('ignore');
  }
  else if ( req.body.priority !== "high" && req.body.priority !== "very-high" && req.body.priority !== "normal" && req.body.priority !== "very-low" && req.body.priority !== "low" ){
    console.log(req.body.priority);
    res.status(500).send({
        name: "GeneralError",
        message: "Data truncated for column 'priority' at row 1 "+req.body.priority,
        code: 500,
        className: "general-error",
        errors: {}
    });
    return;
  }

  Todo_item.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        Todo_item.findByPk(id)
          .then(data => {
            res.send({
              status: "Success",
              message: "Success",
              data: data
             });
          })
          .catch(err => {
            res.status(500).send({
              message: "Error retrieving Todo Item with id=" + id
            });
          });
      } else {
        res.status(404).send({
          status:"Not Found",
          message: `Todo with ID ${id} Not Found`,
          data:{}
        });
        // res.status(404).send({
        //   name: "NotFound",
        //   status:"Not Found",
        //   message: `Todo with ID ${id} Not Found`,
        //   code: 404,
        //   className: "not-found",
        //   errors: {}
        // });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Todo Item with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id_query = req.query.id;
  const id = id_query ? id_query : req.params.id;
  //const condition = id_query ? `(${id_query})`  : `(${req.params.id})`;
  const condition = id_query ? { id: [id_query] }  : { id:  req.params.id};
  Todo_item.destroy({ where:  condition })
    //sequelize.query(`DELETE FROM todo_items where id IN ${condition} `)
    .then(num => {
      if (num == 1) {
        res.send({
          status: "Success",
          message: `Success`,
          data: {}
          //message: `Todo Items with id IN ${id} was deleted successfully!`
        });
      } else {
        res.status(404).send({
          status:"Not Found",
          message: `Todo with ID ${id} Not Found`,
          data:{}
          //message: `Cannot delete Todo Items with id IN ${id}. Maybe Todo Items was not found!`
      });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Todo Item with id=" + id
      });
    });
};
