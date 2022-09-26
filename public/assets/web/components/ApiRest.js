export const headersList =  () => {
    return {
        "Accept": "*/*",
        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
        "Content-Type": "application/json"
       };
}

<<<<<<< HEAD
export const url =  "http://127.0.0.1/api";
=======
export const url =  "https://appkidgame-production.up.railway.app/api";
>>>>>>> b8bc3265efb1856d7851af2d43c73289c382e804
