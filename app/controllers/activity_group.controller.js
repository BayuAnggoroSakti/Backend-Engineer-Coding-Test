const db = require("../models");
const Activity_group = db.activity_group;
const Op = db.Sequelize.Op;
const todo_item = db.todo_item;
const sequelize = db.sequelize;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    // res.status(400).send({
    //     name: "Bad Request",
    //     status: "BadRequest",
    //     message: "notNull Violation: activity_groups.title cannot be null",
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

  if (!req.body.email) {
    // res.status(400).send({
    //     name: "BadRequest",
    //     status: "BadRequest",
    //     message: "notNull Violation: activity_groups.email cannot be null",
    //     code: 400,
    //     className: "bad-request",
    //     data:{},
    //     errors: {}
    // });
    res.status(400).send({
      status: "Bad Request",
      message: "email cannot be null",
      data:{}
    });
    return;
  }


  const activity_group = {
    title: req.body.title,
    email: req.body.email
  };

  Activity_group.create(activity_group)
    .then(data => {
      res.status(201).send({
        status: "Success",
        message: "Success",
        data:data
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the activity_group."
      });
    });
};

// Retrieve all activity_groups from the database.
// exports.findAll = (req, res) => {
//   const email = req.query.email;
//   const condition_email = email ? { email: { [Op.eq]: `${email}` } } : null;

//   Activity_group.findAll({ where:  condition_email })
//     .then(data => {
//       res.send({
//         limit:1000,
//         skip:0,
//         total: data.length,
//         data: data
//       });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving activity_groups."
//       });
//     });
// };
exports.findAll = (req, res) => {
  const email = req.query.email;
  const condition_email = email ? { email: { [Op.eq]: `${email}` } } : null;

  Activity_group.findAll({ where:  condition_email })
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
          err.message || "Some error occurred while retrieving activity_groups."
      });
    });
};

// Find a single activity_group with an id
exports.findOne = (req, res)  => {
  const id = req.params.id;
  Activity_group.findByPk(id, {raw: true})
    .then(data => {
      if (data) {
        // const condition = {activity_group_id: { [Op.eq]: `${id}` }} ;
        // todo_item.findAll({where : condition})
        // .then(data2 => {
        //   res.send({
        //     id: data["id"],
        //     title: data["title"],
        //     created_at: data["createdAt"],
        //     todo_items: data2
        //   })
        // })
        res.send({
          status: "Success",
          message: "Success",
          data: data
        })
      }else{
      res.status(404).send({
        name: "NotFound",
        status: "Not Found",
        message: `Activity with ID ${id} Not Found`,
        data:{},
        code: 404,
        className: "not-found",
        errors: {}
      });
      }
      
    })
    .catch(err => {
      res.status(404).send({
        message: "Error retrieving Activity Group with id=" + id
      });
    });
};

// Update a Activity Group by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Activity_group.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        Activity_group.findByPk(id)
          .then(data => {
           // res.send(data);
           res.send({
            status: "Success",
            message: "Success",
            data: data
           });
          })
          .catch(err => {
            res.status(404).send({
              status:"Error",
              message: "Error retrieving Activity Group with id=" + id,
              data:{}
            });
          });
      } else {
        // res.status(404).send({
        //   name: "NotFound",
        //   message: "No record found for id "+id,
        //   code: 404,
        //   className: "not-found",
        //   errors: {}
        // });
        res.status(404).send({
          status:"Not Found",
          message: `Activity with ID ${id} Not Found`,
          data:{}
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Activity Group with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id_query = req.query.id;
  const id = id_query ? id_query : req.params.id;
  //const condition = id_query ? `(${id_query})`  : `(${req.params.id})`;
  const condition = id_query ? { id: [id_query] }  : { id:  req.params.id};
  Activity_group.destroy({ where:  condition })
  //sequelize.query(`DELETE FROM activity_groups where id IN ${condition} `)
    .then(num => {
      console.log(num.length);
      if (num == 1) {
        // res.send([{
        //   message: `Activity_group with id IN ${id} was deleted successfully!`
        // }]);
        res.send({
          status: "Success",
          message: `Success`,
          data: {}
        });
      } else {
        res.status(404).send({
          status:"Not Found",
          message: `Activity with ID ${id} Not Found`,
          data:{}
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        status: "Error",
        message: "Could not delete Activity with id=" + id,
        data:{}
      });
    });
};
