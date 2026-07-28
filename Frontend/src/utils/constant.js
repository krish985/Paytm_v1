let PROD_URL = true

let BASE_URL = PROD_URL == true ? `https://paytm-v1-tchq.onrender.com/api/v1` : "http://localhost:3000/api/v1"


export default BASE_URL