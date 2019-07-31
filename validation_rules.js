module.exports = {
    register: {
        userName: "required|alpha_num",
        email: "required|email",
        password: "required|min:8"
    },
    login: {
        userName: "alpha_num",
        email: "email",
        password: "required|min:8"
    }
};