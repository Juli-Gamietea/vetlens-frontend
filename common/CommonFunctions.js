export const callBackendAPI = async (url, requestData) => {
    const backendUrl = "";
    try {
        const response = await axios(backendUrl + url, requestData);
        return response.data;
    } catch (error) {
        throw new Error("API Error");
    }
}