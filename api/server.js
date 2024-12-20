
require('dotenv').config();
const express = require('express');
const cors = require('cors')
const {expressjwt: jwt} = require('express-jwt');
const jwks = require('jwks-rsa');
const axios = require('axios')
const dashboardRouter = require('./dashboard');

const app = express();
const port = 3000;


app.use(express.json());
app.use(cors({
  origin: process.env.FRONT_END_URL,
  optionsSuccessStatus: 200 
}));


const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache:true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri : 'https://dev-lzivcdxx75bygd3q.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'this is unique identifier',
  issuer: 'https://dev-lzivcdxx75bygd3q.us.auth0.com/',
  algorithms: ['RS256']
});


// user authentication
app.use(jwtCheck);


// adding the user info in req.user
app.use(async (req, res, next) => {
  try{
    const token = req.headers.authorization.split(" ")[1];
    const res = await axios.get('https://dev-lzivcdxx75bygd3q.us.auth0.com/userinfo',{
      headers: {
        authorization : `Bearer ${token}`
      }
    });
    req.user = res.data;
    
    next();
  }
  catch(error){
    next(error)
  }
})




app.use('/dashboard', dashboardRouter);



// Error handling
app.use((req, res, next)=>{
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
})

app.use((error, req, res, next)=>{
  const status = error.status || 500;
  const message = error.message || 'Internal server error';
  res.status(status).send(message);
  console.log(error);
  
})


// starting the backend
app.listen(port, () => {
  console.log(`Express app is running at http://localhost:${port}`);
});
