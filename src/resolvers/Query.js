const {copyValueToObjectIfDefined} = require("./helper/objectHelper");
const { addFragmentToInfo } = require("graphql-binding");

// Query functions get listed below
async function applications(_, args, context, info){
    return await context.prisma.query.apps({
        where:{
            id: copyValueToObjectIfDefined(args.appID)
        },
        skip: copyValueToObjectIfDefined(args.skip),
        first: copyValueToObjectIfDefined(args.first)
    }, info);
}
async function feedback(_, args, context, info){
    return await context.prisma.query.feedbacks({
        where:{
            id: copyValueToObjectIfDefined(args.feedbackID),
            app:{
                id: copyValueToObjectIfDefined(args.appID)
            }    
        },
        skip: copyValueToObjectIfDefined(args.skip),
        first: copyValueToObjectIfDefined(args.first),
        orderBy: args.orderBy
    }, info);
}



// Export Query functions for inclusion in client facing graphQL interface
module.exports = {
    applications,
    feedback
};