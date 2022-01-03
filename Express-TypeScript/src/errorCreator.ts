class CustomError extends Error {
    status: number | undefined;
}

export const createNewError = (message: string, status: number) => {
    const error = new CustomError()
    error.message = message || "Internal Server Error";
    error.status = status || 501;
    return error
}