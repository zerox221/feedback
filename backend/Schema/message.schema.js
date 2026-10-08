const {z} = require('zod');

const messageSchema = z.object({
    content : z.string().min(10,{message : "feedback length should be grater then of 10 characters"})
})

module.exports = messageSchema;