const Contact = require("../service/schemas/contact.js");

const listContacts = async (req) => {
  const {owner} = req;
  const {page = 1, limit = 10, favorite} = req.query;
  const skip = (page - 1) * limit;

  if (favorite) {
    return await Contact.find({owner, favorite}, "-createdAt -updatedAt", {skip, limit}).populate("owner", "name email");
  }

  return await Contact.find({owner}, "-createdAt -updatedAt", {skip, limit}).populate("owner", "name email");
};

const getContactById = async (contactId) => {
  const res = await Contact.findById(contactId);
  return res || null;
};

const removeContact = async (contactId) => {
  const res = await Contact.findByIdAndDelete(contactId);

  return res || null;
};

const addContact = async (req) => {
  const result = await Contact.create(req);
  return result || null;
};

const updateContact = async (contactId, body) => {
  const res = await Contact.findByIdAndUpdate(contactId, body, {new: true});

  return res || null;
};

const updateStatusContact = async (contactId, body) => {
  const res = await Contact.findByIdAndUpdate(contactId, body, {new: true});
  return res || null;
};
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
