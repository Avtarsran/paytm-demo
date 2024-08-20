const zod = require("zod")

const userValidationSignUp = zod.object({
    firstName: zod.string().min(3).max(50),
    lastName: zod.string().min(3).max(50),
    userName: zod.string().min(3).max(50),
    password: zod.string().min(6).max(30)
})

const userValidationSignIn = zod.object({
    userName: zod.string().min(3).max(50),
    password: zod.string().min(6).max(30)
})

const userValidationUpdate = zod.object({
    firstName: zod.string().min(3).max(50).optional(),
    lastName: zod.string().min(3).max(50).optional(),
    password: zod.string().min(6).max(30).optional()
})

module.exports={
    userValidationSignUp,
    userValidationSignIn,
    userValidationUpdate
}