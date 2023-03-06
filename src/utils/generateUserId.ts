export const generateUserId = (): string => {
    return new Date().getTime().toString()
}