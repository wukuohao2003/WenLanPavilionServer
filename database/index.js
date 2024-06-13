const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_SERVER_IP)
mongoose.connection.on('open', () => console.log("Mongodb is connected ..."))

const userModel = mongoose.model('User', new mongoose.Schema({
  userAccount: String,
  userName: String,
  userDesc: String,
  userAvatar: String,
  friendList: {
    type: [mongoose.Types.ObjectId],
    default: [],
    ref: "User"
  },
  messageList: {
    type: [mongoose.Types.ObjectId],
    ref: "User",
    default: []
  }
}), 'User')

const creationModel = mongoose.model("Creation", new mongoose.Schema({
  creationTitle: String,
  creationCover: String,
  creationContent: String,
  creationCollection: Number,
  creationLike: Number,
  creationShare: Number,
  userID: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  },
  typeName: {
    type: mongoose.Types.ObjectId,
    ref: "Types"
  }
}), "Creation")

const creationTypesModel = mongoose.model("CreationTypes", new mongoose.Schema({
  typeName: String,
}), "CreationTypes")


const messageModel = mongoose.model("Messages", new mongoose.Schema({
  senderID: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  },
  recipientID: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  },
  messageDetail: String,
  sendTime: Date
}), "Messages")

module.exports = {
  userModel,
  creationModel,
  creationTypesModel,
  messageModel,
}