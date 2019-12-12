const {copyValueToObjectIfDefined, propertyExists} = require("./helper/objectHelper");
const { UserInputError } = require("apollo-server");
const { verifyToken } = require("../Auth/recaptchaVerification");


// Mutation functions get listed below
 async function createApp(_, args, context, info){
    return await context.prisma.mutation.createApp({
         data:{
             name: args.name,
             type: args.type
         }
     }, info);
 }
 async function createFeedback(_, args, context, info) {
   const recaptcha = await verifyToken(args.token);
   if (!recaptcha.success) {
     recaptcha.score = 0;
   }
   return await context.prisma.mutation.createFeedback(
     {
       data: {
         email: copyValueToObjectIfDefined(args.email),
         comment: args.comment,
         app: {
           connect: {
             id: args.appID
           }
         },
         created: await new Date().toString(),
         botScore: recaptcha.score
       }
     },
     info
   );
 }





// Export the functions below to be included through client facing graphQL interface

module.exports = {
    createFeedback,
};
