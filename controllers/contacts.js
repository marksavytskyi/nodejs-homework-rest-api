const {listContacts, getContactById, addContact, removeContact, updateContact, updateStatusContact} = require("../models/contacts");
const HttpError = require("../helpers/HttpError");
const ctrlWrapper = require("../helpers/ctrlWrapper");

const getAll = async (req, res) => {
  const {_id: owner} = req.user;

  const contacts = await listContacts({...req, owner});
  res.status(200).json(contacts);
};

const getById = async (req, res) => {
  const contact = await getContactById(req.params.contactId);

  if (!contact) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(contact);
};

const create = async (req, res) => {
  const {_id} = req.user;
  const result = await addContact({...req.body, owner: _id});

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(201).json(result);
};

const remove = async (req, res) => {
  const result = await removeContact(req.params.contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json({message: "contact deleted"});
};

const update = async (req, res) => {
  const result = await updateContact(req.params.contactId, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const favorite = async (req, res) => {
  if (!req.body) {
    throw HttpError(400, "missing field favorite");
  }

  const result = await updateStatusContact(req.params.contactId, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};
module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  create: ctrlWrapper(create),
  remove: ctrlWrapper(remove),
  update: ctrlWrapper(update),
  favorite: ctrlWrapper(favorite),
};
