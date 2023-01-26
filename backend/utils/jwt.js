const {sign,verify}=require("jsonwebtoken")

const createAccessToken = (id ) => {
    return sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m"
    })
}

const createRefreshToken = ( id ) => {
    return sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d"
    })
}

const sendAccessToken=(req,res,accessToken)=>{
    res.send({
        accessToken,
        email:req.body.email
    })
}

const sendRefreshToken=(res,refreshToken)=>{
    res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        path:"refrsh_token"
    })
}

const verifyAuth=(req)=>{
    const authorization=req.headers["authorization"];
    if(!authorization){
        throw new Error("invalid user")
    }
    const token=authorization.split(" ")[1];
    const user=verify(token,process.env.ACCESS_TOKEN_SECRET)
    console.log(user);
    return user.id;

}

module.exports = {
    createAccessToken,
    createRefreshToken,
    sendAccessToken,
    sendRefreshToken,
    verifyAuth
}