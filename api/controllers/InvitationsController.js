

module.exports = {

/**
 * @api {post} /api/invitations Request an invitation to the Slack Channel
 * @apiName CreateInvitation
 * @apiGroup Invitations
 *
 * @apiParam {String} email Email address for the invite.
 *
 * @apiSuccess {String} msg Success confirmation message
 * @apiError {String} err Error message
 */
	create: function(req, res){
	    SlackApiService.sendInvite({email: req.body.email}, function(err, statusCode, slackResponse){
	      if (err){
	        return res.status(statusCode).json({"err": err});
	      }

	      Invites.create({emailAddress: req.body.email, dateSubmitted: new Date()})
	      	.then(sails.log.info)
	      	.catch(sails.log.error);

	    //respond with the returned status code and slack's response
	      res.status(statusCode).json(slackResponse);
	    });
	},

	getAll: function(req, res) {
		Invites.find()
		.then(function(err, data){
			if (err){
				res.status(500).json(err);
			}
			res.status(200).json(data);
		})
	}
};