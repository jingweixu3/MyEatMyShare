module.exports = (req, res, next) =>{
    if (!req.user){
        console.log("require login");
        return res.status(401).send({error: 'You must login!'});
    }

    next();
}; 