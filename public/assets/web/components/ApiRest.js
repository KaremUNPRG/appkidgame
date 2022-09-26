export const headersList =  () => {
    return {
        "Accept": "*/*",
        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
        "Content-Type": "application/json"
       };
}

export const url =  "https://appkidgame-production.up.railway.app/api";