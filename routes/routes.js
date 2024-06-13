const express = require('express')
const router = express.Router()
const { userModel, creationModel, creationTypesModel, messageModel, } = require('../database/index')

// 首页数据
router.post("/getTypes", async (req, res) => {
  const typesList = await creationTypesModel.find()
  res.json({
    code: 200,
    typesList
  })
})

router.post("/getCreations-all", async (req, res) => {
  const { typeName } = req.body
  if (!typeName) {
    res.json({
      code: 200,
      creationList: await creationModel.find().populate("userID")
    }
    )
  } else {
    const creationList = await creationModel.find({ typeName }).populate("userID")
    res.json({
      code: 200,
      creationList
    })
  }
})

// 消息数据
router.post("/getMessageList", async (req, res) => {
  const { _id } = req.body
  const { messageList } = await userModel.findOne({ _id }).populate("messageList")
  res.json({
    code: 200,
    messageList
  })
})


module.exports = router