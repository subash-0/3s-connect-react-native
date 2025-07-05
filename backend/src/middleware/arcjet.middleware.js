import { aj } from "../config/arcjet.js";

export const arcjetMiddleware =async (req,res,next)=>{
  try {

  const decision =   await aj.protect(req,{
    requested:1
  });
  if(decision.isDenied){
    if(decision.reason.isRateLimit()){
      return res.status(429).json({
        error:"Too Many requests",
        message:"Rate Limit exceeds, please try again later"
      })
    } else if(decision.reason.isBot()){
      return res.status(403).json({
        error:"Bot access is denied",
        message:"Automated Requests are not allowed"
      })
    }else{
      return res.status(403).json({
        error:"Forbidden",
        message:"Access denied by security Policy"
      })
    }
  }
  if(decision.results.some(result=> result.reason.isBot() && result.reason.isSpoofed())){
    return res.status(403).json({
      error:"Spoofed bot detected !",
      message:"Malicious bot activity detected !"
    })

  }
  next();
    
  } catch (error) {
    console.log("Middleware error", error)
    next();
    
  }
}