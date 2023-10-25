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

const getLastThirtyMessages = async (chatId) => {
  const query = { "chat.id": chatId }
  const orderby = {
    $natural: -1
  };
  const db = await connection();
  const lastMessages = await db.collection('messages').find(query).sort(orderby).limit(30).toArray();
  return lastMessages.reverse();
};

const getContacts = async (req, res) => {
  const db = await connection();
  const contacts = await db.collection('messages').aggregate([ { $match: { "source": "telegram" } }, { $group: { _id: "$chat.id", info: { $first: "$$ROOT" } } } ]).toArray();
  return contacts;
};


module.exports = {
  create,
  getLastThirtyMessages,
  getContacts
};