module.exports = app => {
  const model = require("../controllers/activity_group.controller.js");

  var router = require("express").Router();

  // API - ACTIVITY GROUP
  router.post("", model.create);
  router.post("/", model.create);
  router.get("/", model.findAll);
  router.get("/:id", model.findOne);
  router.patch("/:id", model.update);
  router.delete("/:id", model.delete);
  router.delete("/", model.delete);

  app.use('/activity-groups', router);
  app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error(err);
        return res.status(400).send({ status: 400, message: err.message }); // Bad request
    }
    next();
});
};
