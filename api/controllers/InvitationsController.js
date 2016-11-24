module.exports = {

/**
 * @api {post} /api/invitations Request an invitation to the Slack Channel
 * @apiName CreateInvitation
 * @apiGroup Invitations
 *
 * @apiParam {String} email Email address for the invite.
 *
 * @apiSuccess {String} msg Success confirmation message
 */
	create: function(req, res){
		sails.log.info("invite sent");
		res.status(200).json({"it": "worked"});
	}
};