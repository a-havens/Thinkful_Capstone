const router = require("express").Router();
const controller = require("./reservations.controller");

router.route("/")
  .get(controller.list)
  .post(controller.create);

router.route("/:reservationId")
  .get(controller.read)
  .put(controller.update);

router.route("/:reservationId/status")
  .put(controller.updateStatus);

router.route("/:reservationDate")
.get(controller.read)


module.exports = router;
