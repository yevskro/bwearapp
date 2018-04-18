module.exports = function(req, res, next){
    if(req.originalUrl === '/signout'){
        req.session = null
        res.redirect('/')
    }
    /*
    else if(req.method === 'GET' && req.cookies.session === undefined){
        req.session.id = null
        req.session.role = null
    }*/
    next()
}