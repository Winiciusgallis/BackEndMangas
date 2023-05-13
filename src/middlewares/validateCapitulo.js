const joi =require('joi')

const CAP=joi.object({
  nomemanga:joi.string().required().min(3).max(255),
  cap_num:joi.number().integer().required().disallow(joi.string()).strict(),
  manga_id:joi.number().integer().positive().required().disallow(joi.string()).strict(),
  })
  
  function validateCapitulo(req,res,next){
      const {nomemanga,cap_num,manga_id} = req.body;
  
      const {error}=CAP.validate( {nomemanga,cap_num,manga_id})
  
      if(error){
        next({status:400,message:error.details[0].message});  }
      next()
  }
  
  
  
  module.exports=validateCapitulo
