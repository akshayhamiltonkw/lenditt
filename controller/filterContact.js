const contacts = require("../model/filterContact");
var contactList = [
  "+91 1234567890",
  "+911234567890",
  "1234567890",
  "1234567890",
  "+91 2345654323",
  "+91 9766619238",
  "9766619238",
  "123456524152",
];
const getData = async (req, res) => {
  try {
    function makeUnique(contactList) {
      var uniqueContacts = [];
      for (var i = 0; i < contactList.length; i++) {
        var currentContact = contactList[i];
        var currentContactWithoutWhitespace = "";

        // remove whitespaces
        for (var j = 0; j < currentContact.length; j++) {
          if (currentContact[j] !== " ") {
            currentContactWithoutWhitespace += currentContact[j];
          }
        }

        if (uniqueContacts.indexOf(currentContactWithoutWhitespace) === -1) {
          uniqueContacts.push(currentContactWithoutWhitespace);
        }
      }
      return uniqueContacts;
    }

    var uniqueContacts = makeUnique(contactList);

    contacts.sync().then(() => {
      uniqueContacts.forEach(function (contact) {
        contacts
          .findOne({
            where: {
              contacts: contact,
            },
          })
          .then(function (record) {
            if (!record) {
              contacts.create({
                contacts: contact,
              });
            }
          });
      });
      res.status(201).send({ data: "contact inserted successfully" });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getData,
};
