const logger = function(req, res, next) {
    console.log("post request")
    next()
}

module.exports = logger