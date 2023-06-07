const express = require("express");
const ctrl = require("../../controllers/contacts");
const authenticate = require("../../middlewares/authenticate");

// const validateBody = require("../../middlewares/validateBody");
// const schemas = require("../../schemas/contacts");
const router = express.Router();

router.get("/", authenticate, ctrl.getAll);

router.get("/:contactId", authenticate, ctrl.getById);

router.post("/", authenticate, ctrl.create);

router.delete("/:contactId", authenticate, ctrl.remove);

router.put("/:contactId", authenticate, ctrl.update);

router.patch("/:contactId/favorite", authenticate, ctrl.favorite);

module.exports = router;
