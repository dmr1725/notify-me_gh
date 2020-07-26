import { decode } from 'jsonwebtoken'
export const isAuthenticated = ()=>{
    const token = sessionStorage.getItem('jwt')

    try {
        decode(token)
        const {exp} = decode(token)
        // console.log(exp)
        if (Date.now() >= exp * 1000) {
            return false;
        }


    } catch(err){
        return false
    }

    return true

}