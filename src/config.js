require("dotenv").config();
// set runtime environment as'development' or 'production'
const env = process.env.NODE_ENV ? process.env.NODE_ENV : "production"; 

// Get app basic config settings for Prisma
const appName = process.env.APP_NAME;
const prodHost =  process.env.PRISMA_PROD_HOST


// OpenID provider clientID and Secret
const clientId = process.env.client_id;
const clientSecret = process.env.client_secret;

// Message queue username and password
const mqUser = process.env.MQ_USER;
const mqPass = process.env.MQ_PASS;

const development = {
 app: {
   port: 4000,
   multicore: false,
   tracing: true
 },
 prisma: {
     host:"localhost/" + appName + "/dev:4466",
     debug: true
 },
 rabbitMQ:{
   host:"localhost",
   user: mqUser,
   password: mqPass
 },
 openId:{
   url:"http://localhost:8000",
   id:clientId,
   secret:clientSecret
 },
};

const production = {
 app: {
   port: 4000,
   multicore: true,
   tracing: false
 },
 prisma: {
     host: prodHost + "/" + appName + "/prod",
     debug: false
 },
rabbitMQ:{
  host:"mq.gccollab.ca",
  user: mqUser,
  password: mqPass
},
openId:{
  url:"https://account.gccollab.ca",
  id:clientId,
  secret:clientSecret
},
};

const config = {
 development,
 production
};

module.exports = config[env];
