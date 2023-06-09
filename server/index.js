const express = require("express")
const slackApi = require("./slack-api")
const cors = require("cors")

const app = express()

app.use(cors({
  origin: ["http://localhost:3000"],
}))

app.listen(3001, () => {
  console.log("Desk booking server listening on port 3001")

  app.get("/moneyhub-users", (req, res) => {
    return slackApi.getMoneyhubUsers()
    .then((users) => {

      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>", users)
      return res.json(users)
    })
  })
})