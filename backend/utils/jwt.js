const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const db = require("./fakedb")
const { sign } = require("jsonwebtoken")
const { hash, compare } = require("bcrypt")
const { verify } = require("jsonwebtoken")

require("dotenv").config()
const app = express()
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

const isAuth=(req,res)=>{
    // console.log(req);
    const authorization=req.headers["authorization"];
    if(!authorization){
        // return res.send("user invalid");
        throw new Error("invalid user")
    }
    const token=authorization.split(" ")[1];
     verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decode)=>{
        console.log(err);
        console.log("hello");
        console.log(decode?.id);
        if(err) return res.status(403).json({message:"forbidden"})
        if(decode?.id!=null){
            return res.json({message:"this is protected data.."})
        }
        return res.status(403).json({message:"something error.."})
    })
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extends: false }))

app.use(cookieParser())

app.post("/register", async (req, res) => {
    const { email, password } = req.body
    try {
        const isAlready = db.find(user => user.email == email);
        if (isAlready) {
            console.log("Already user exist..");
            return res.json({ message: "Already user exist..." })
        }
        const hashPassword = await hash(password, 10);

        db.push({ id: db.length, email: email, password: hashPassword })
        console.log(db);

        id = user.id
        const accessToken = sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "15s"
        })
        const refreshToken = sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "7d"
        })

        user.refreshToken = refreshToken;
        console.log(db);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            path: "refrsh_token"
        })
        res.send({
            accessToken,
            email: req.body.email
        })

    } catch (err) {
        console.log(err);
    }
})

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = db.find(user => user.email == email);
        if (!user) {
            console.log("user not found..");
            return res.json({ message: "user not found.." });
        }
        const validPassword = compare(password, user.password);
        if (!validPassword) {
            console.log("enter valid password..");
            return res.json({ message: "enter valid password.." });
        }
        console.log(user);
        id = user.id
        const accessToken = sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "15s"
        })
        const refreshToken = sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "7d"
        })

        user.refreshToken = refreshToken;
        console.log(db);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            path: "refrsh_token"
        })
        res.send({
            accessToken,
            email: req.body.email
        })
    }
    catch (err) {
        console.log(err);
    }
})

app.post("/logout", (req, res) => {
    res.clearCookie("refreshToken", { path: "/refresh_token" })
    return res.send("user logout");
})

app.post("/protected", async (req, res) => {
    try {
        return isAuth(req, res)

    } catch (err) {
        console.log(err.message);
        res.send(err.message)
    }
})

app.post("/refresh_token", (req, res) => {
    const token = req.cookies.refreshToken;

    //token exist ?
    if (!token) {
        return res.send({ accessToken: "" })
    }
    let payload = null;

    //refreshToken valid ?
    try {
        payload = verify(token, process.env.REFRESH_TOKEN_SECRET)
    }
    catch (err) {
        res.send(err)
    }

    const user = db.find(user => user.id == payload.id)
    //user exist ?
    if (!user) {
        return res.send({ accessToken: "" })
    }
    //refreshToken exist ?
    if (user.refreshToken !== token) {
        return res.send({ accessToken: "" })
    }
    id = user.id
    const accessToken = sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15s"
    })
    const refreshToken = sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d"
    })

    user.refreshToken = refreshToken;
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "refrsh_token"
    })
    return res.send({ accessToken });

})

app.get("/", (req, res) => {
    res.send("hi")
})

app.listen(process.env.PORT, () => {
    console.log(`server listening on ${process.env.PORT}...`);
})
