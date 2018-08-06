module.exports = verifyToken = (req, res, next) => {
    //Get authorization header value
    const bearerHeader = req.headers['authorization'];
    
    //Check if bearer is undefined 
    if(typeof bearerHeader !== 'undefined'){
        //Split by space
        const bearer = bearerHeader.split(' ');
        //Get token from array
        const bearerToken = bearer[1];

        //Set token
        req.token = bearerToken;

        //Next middleware
        next();
    }else{
        //Forbidden
        res.sendStatus(403);
    }
};