const joi =require('joi')

const imagens1=joi.object({
  pag_num:joi.number().integer().positive().required().disallow(joi.string()).strict(),
  imag_url:joi.string().required().min(3).max(255),
  cap_id:joi.number().integer().positive().required().disallow(joi.string()).strict(),
  })
  
  function validateImagens(req,res,next){
      const { pag_num, imag_url,cap_id} = req.body;
  
      const {error}=imagens1.validate( {pag_num, imag_url,cap_id})
  
      if(error){
        next({status:400,message:error.details[0].message});    }
      
      next()
  }
  
  
  
  module.exports=validateImagens
