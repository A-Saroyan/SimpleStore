const settings =  require('../utils/config')

const isAdmin =  async function (req,res,next)
{
    let user = req.user;
   
    if(user.role === settings.superUser)
    {
        next ();
    }

    else
    {
        res.status(403).send({message: "You dont have permissions for this operation !!!"});
    }
}


module.exports = isAdmin
