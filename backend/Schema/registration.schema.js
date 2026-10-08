const { z } = require("zod");

const registerSchema = z.object({
  userName: z
    .string()
    .min(5, { message: "username must be of more then 5 characters" }),
  email: z.email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain an uppercase letter")
    .regex(/[a-z]/, "Password must contain a lowercase letter")
    .regex(/[0-9]/, "Password must contain a number")
    .regex(/[!@#$%^&*]/, "Password must contain a special character"),
});

module.exports = registerSchema;
