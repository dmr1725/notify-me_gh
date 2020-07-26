import {SIGN_IN, APPOINTMENTS_ASSIGNED_QTY, APPOINTMENTS_GIVEN_QTY, SALES_QTY, RECENT_SALES,
        CHECK_AVAILABLE, TODAY, DEMO_GIVEN, COMPLETED, MAKE_SALE, RESCHEDULE, INCOMPLETE, SALES, DELETE_SALE} from './types'
import axios from 'axios'
const url = 'http://localhost:5000/api/user'



export const sign_in = (email, password)=>{

    // console.log(email)
    // este inner function redux-thunk la llama automaticamente
    return async (dispatch)=>{
        
        const response = await axios.post(`${url}/login`, {
           email: email,
           password: password
        })

        // console.log(response.data.token)
        if(response.data.token){
            sessionStorage.setItem('jwt', response.data.token)
        }
        
        dispatch({type: SIGN_IN, payload: response.data})

    }
    
}

export const appointments_assigned_qty = ()=>{
   
    const token = sessionStorage.getItem('jwt')

    return async (dispatch)=>{
        
        const response = await axios.get(`${url}/appointments_assigned_quantity`, {
           headers: {
               Authorization: `Bearer ${token}`
           }
        })

        // console.log(response.data)
       
        
        dispatch({type: APPOINTMENTS_ASSIGNED_QTY, payload: response.data})

    }
}

export const appointments_given_qty = ()=>{
   
    const token = sessionStorage.getItem('jwt')

    return async (dispatch)=>{
        
        const response = await axios.get(`${url}/appointments_given_quantity`, {
           headers: {
               Authorization: `Bearer ${token}`
           }
        })

        // console.log(response.data)
       
        
        dispatch({type: APPOINTMENTS_GIVEN_QTY, payload: response.data})

    }
}

export const sales_quantity = ()=>{
   
    const token = sessionStorage.getItem('jwt')

    return async (dispatch)=>{
        
        const response = await axios.get(`${url}/sales_quantity`, {
           headers: {
               Authorization: `Bearer ${token}`
           }
        })

        // console.log(response.data)
       
        
        dispatch({type: SALES_QTY, payload: response.data})

    }
}

export const recent_sales = ()=>{
   
    const token = sessionStorage.getItem('jwt')

    return async (dispatch)=>{
        
        const response = await axios.get(`${url}/last5_sales`, {
           headers: {
               Authorization: `Bearer ${token}`
           }
        })

        // console.log(response.data)
       
        
        dispatch({type: RECENT_SALES, payload: response.data})

    }
}

export const check_available = ()=>{
   
    const token = sessionStorage.getItem('jwt')

    return async (dispatch)=>{
        
        const response = await axios.get(`${url}/available`, {
           headers: {
               Authorization: `Bearer ${token}`
           }
        })

        // console.log(response.data)
       
        
        dispatch({type: CHECK_AVAILABLE, payload: response.data})

    }
}

export const today = ()=>{
   
    const token = sessionStorage.getItem('jwt')

    return async (dispatch)=>{
        
        const response = await axios.get(`${url}/appointments_today`, {
           headers: {
               Authorization: `Bearer ${token}`
           }
        })

        // console.log(response.data)
       
        
        dispatch({type: TODAY, payload: response.data})

    }
}

export const demo_given = (id, client_id)=>{
   
    const token = sessionStorage.getItem('jwt')

    return async (dispatch)=>{
        
        const response = await axios({
            method: 'patch',
            url: `${url}/demo_given`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                id: id,
                client_id: client_id
            }
        })
        // console.log(response.data)
       
        
        dispatch({type: DEMO_GIVEN, payload: response.data})

    }
}

export const completed = ()=>{
   
    const token = sessionStorage.getItem('jwt')

    return async (dispatch)=>{
        
        const response = await axios.get(`${url}/appointments_given_not_sales`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
         })
 
         // console.log(response.data)
        // console.log(response.data)
       
        
        dispatch({type: COMPLETED, payload: response.data})

    }
}

export const make_sale = (id, pid, date)=>{
    console.log(id, pid, date)
   
    const token = sessionStorage.getItem('jwt')
    
    // este inner function redux-thunk la llama automaticamente
    return async (dispatch)=>{
        
        const response = await axios({
            url: `${url}/make_sale`,
            method: 'post',
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                appointment_id: id,
                pid: pid,
                date: date
            }
        })

        // console.log(response.data)
        
        
        dispatch({type: MAKE_SALE, payload: response.data})

    }
    
}

export const re_schedule = (id, date, hour)=>{
    

   
    const token = sessionStorage.getItem('jwt')

    return async (dispatch)=>{
        
        const response = await axios({
            method: 'patch',
            url: `${url}/update_date_appointment`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                id: id,
                date,
                hour
            }
        })
        // console.log(response.data)
        dispatch({type: RESCHEDULE, payload: response.data})
    }
}

export const incomplete = ()=>{
   
    const token = sessionStorage.getItem('jwt')

    return async (dispatch)=>{
        
        const response = await axios.get(`${url}/appointments_not_given`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
         })

        // console.log(response.data)
       
        
        dispatch({type: INCOMPLETE, payload: response.data})

    }
}

export const allSales = ()=>{
   
    const token = sessionStorage.getItem('jwt')

    return async (dispatch)=>{
        
        const response = await axios.get(`${url}/allSales`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
         })

        // console.log(response.data)
       
        
        dispatch({type: SALES, payload: response.data})

    }
}


export const delete_sale = (id)=>{
   
    const token = sessionStorage.getItem('jwt')

    return async (dispatch)=>{
        
        const response = await axios.delete(`${url}/delete_sale`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                id
            }
         })

        console.log(response.data)
       
        
        dispatch({type: DELETE_SALE, payload: response.data})

    }
}

