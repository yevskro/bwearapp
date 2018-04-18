module.exports = function(req, res, next){
    const urlSplit = req.originalUrl.split('/')
    if(urlSplit[1] === 'admin' && req.session && req.session.role !== 0){
        res.sendStatus(403)
    }
    else if((req.session && req.session.id) && (urlSplit[1] === 'signup' || urlSplit[1] === 'signin')){
        res.redirect('/')
    }
    else next()
}