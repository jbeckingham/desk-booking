const {WebClient} = require("@slack/web-api")

// DO NOT COMMIT TOKEN
// Bot token can be found in the slack app project -> OAuth & Permissions tab -> Bot User OAuth Token

const TOKEN = "get token from slack and paste here. DO NOT COMMIT IT"

const slackApi = {
  getMoneyhubUsers() {
    const web = new WebClient(TOKEN)
    return web.users.list().then(response => {
      return response.members.filter(
        user =>
          !user.deleted &&
          user.profile.email &&
          user.profile.email.includes("moneyhub")
      )
    })
  },
}

module.exports = slackApi
