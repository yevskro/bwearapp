module.exports = function(req, res, next){
        if(req.method === 'GET')
            res.sendFile(`${process.cwd()}/client/build/index.html`)

        if(req.headers.accept === 'application/json')
            next()
    }