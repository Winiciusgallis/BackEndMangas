const joi =require('joi')

const MANGA=joi.object({
  nomemanga:joi.string().required().min(3).max(255),
  synopsis:joi.string().required().min(3).max(1500),
  author:joi.string().required().min(3).max(255),
  themes:joi.string().required().min(3).max(255),
  status:joi.string().required().min(3),
  genres:joi.string().required().min(3).max(255),
  capamanga:joi.string().required().min(3).max(255),
})

function validateManga(req,res,next){
    const {nomemanga, synopsis,author,themes,status,genres,capamanga } = req.body;

    const {error}=MANGA.validate( {nomemanga, synopsis,author,themes,status,genres,capamanga})

    if(error){
      next({status:400,message:error.details[0].message});    }
    next()
}



module.exports=validateManga