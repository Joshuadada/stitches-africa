export type ApiResponse<T> = {
    isSuccessful: boolean,
    error: any,
    responseStatus: string,
    statusCode: number,
    message: string,
    data: T
}