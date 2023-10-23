const connection = require('./connection');

const create = async (requisition) => {
  try {
    const query = {
      ...requisition
    };
    const db = await connection();
    const insertMessageOnDatabase = await db.collection('messages').insertOne(query);
    return 'message inserted on database';  
  } catch (error) {
    console.error(error);
    return error;
  }
};

const getLastThirtyMessages = async () => {
  const query = {};
  const orderby = {
    $natural: -1
  };
  const db = await connection();
  const lastMessages = await db.collection('messages').find().sort(orderby).limit(30).toArray();
  // https://stackoverflow.com/questions/4421207/how-to-get-the-last-n-records-in-mongodb
  return lastMessages.reverse();
};

const getContacts = async (req, res) => {
  const db = await connection();
  const contacts = await db.collection('messages').aggregate([ { $match: { "source": "telegram" } }, { $group: { _id: "$chat.id", document: { $first: "$$ROOT" } } } ]).toArray();
  return contacts;
};


module.exports = {
  create,
  getLastThirtyMessages,
  getContacts
};