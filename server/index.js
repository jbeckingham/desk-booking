const {WebClient} = require("@slack/web-api")

const TOKEN = "get token from slack and do no commit"
const web = new WebClient(TOKEN)
web.users.list().then((response) => {
  const moneyhubUsers = response.members.filter((user) => !user.deleted && user.profile.email && user.profile.email.includes("moneyhub"))
  console.log("?????????????????????????", moneyhubUsers.length)
})

