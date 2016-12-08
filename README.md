# slack_invite_bot

a [Sails](http://sailsjs.org) application

**Note** There is no publically documented API to invite users to Slack teams. However, as per this blog post (https://levels.io/slack-typeform-auto-invite-sign-ups/) there is an API used by Slack:

`users.admin.invite`

**Grats**

There are several implementations of this same task on github. Grats to those who got there first.

#Running this Server

Generate a Slack API Token. Create apikey.js in the root directory and export an object with one property: `token` with the value of your Slack Token.