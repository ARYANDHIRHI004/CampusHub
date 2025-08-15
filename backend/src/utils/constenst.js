import dotenv from "dotenv"

dotenv.config()

export const UserRolesEnum = {
    ADMIN: "Admin",
    STUDENT: "Student",
    FACULTY: "Faculty",
}

export const AvailableUserRoles = Object.values(UserRolesEnum)

export const environment = {
    MONGODB_URI: process.env.MONGODB_URI,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY,
    PORT: process.env.PORT,
}