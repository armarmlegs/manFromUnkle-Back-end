//ce middle ware a pour but de proteger les routes, 
// il recupere le cookie de connexion et verifie si le user rattaché à ce cookie à pour role Admin, si ce n'est pas le cas, il refuse l'acces à la route




module.exports = function (req,res,next) {
    console.log(req.session.user)
    if(!req.session.user.role === 'admin') return res.status(403).send('access denied')
    next();
}


//je n'arrive pas à récuperer req.session.user la fonctionnalité ne marche pas.