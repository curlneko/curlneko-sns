const registerSchema = {
    name: {
        notEmpty: true,
        errorMessage: 'Invalid name',
    },
    email: {
        notEmpty: true,
        isEmail: true,
        errorMessage: 'Invalid email',
    },
    password: {
        notEmpty: true,
        errorMessage: 'Invalid password',
    }
}

module.exports = { registerSchema };