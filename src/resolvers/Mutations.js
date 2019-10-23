const {copyValueToObjectIfDefined, propertyExists} = require("./helper/objectHelper");
const { UserInputError } = require("apollo-server");


// Mutation functions get listed below
 async function createApp(_, args, context, info){
    return await context.prisma.mutation.createApp({
         data:{
             name: args.name,
             type: args.type
         }
     }, info);
 }
 async function createFeedback(_, args, context, info){
    return await context.prisma.mutation.createFeedback({
         data:{
             email: copyValueToObjectIfDefined(args.email),
             comment: args.comment,
             app:{
                 connect:{
                     id: args.appID
                 }
             },
             created: await new Date().toString()
         }
     }, info);
 }




// Export the functions below to be included through client facing graphQL interface

module.exports = {
    createApp,
    createFeedback
};
