// import axios from 'axios';
// import environment from '../utils/utils.js';

// export const verification_data = async (requestOptions, Token) => {
//     return new Promise(async (resolve, reject) => {
//         const data = requestOptions;
//         console.log("dataconst----",data);
//         const headers = {
//             'X-Api-Key': environment.apiKey,
//             // 'Content-Type': 'application/json',
//         }
        
//         await axios.post(`${environment.baseURLverification}/service`, data,{
//             headers: headers
//         })
//         .then(function (response) {
//             if (response && response.data) {
//                 resolve(response.data);
//             }
//             else {
//                 resolve([]);
//             }
            
//         })
//         .catch(function (error) {
//             console.log( " reject =========== ", error);
//             resolve([]);
//             // reject(false);
//         });
//     });
// }
