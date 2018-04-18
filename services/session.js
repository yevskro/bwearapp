module.exports = {
    sendError: function(res, msg, status){ res.status(status).send({error: msg}) },
    handle: function(req, res, user, err){
        if(err){
            this.sendError(res, err, 400)
        }
        else{
            req.session.id = user.id
            req.session.role = user.role
            res.status(201).send({"Content-Type": "application/json"})
        }
    }
}