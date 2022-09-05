export const headersList =  () => {
    return {
        "Accept": "*/*",
        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
        "Content-Type": "application/json"
       };
}

export const url =  "http://127.0.0.1/api";