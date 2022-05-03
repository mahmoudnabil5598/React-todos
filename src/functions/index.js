import * as api from '..//api';
 export const readtodos =async()=>
 {
     try
     {
        const {data}=await api.readtodos();
        return data;
     }
     catch(error)
     {
        console.log(error);
     }
 }
 export const createtodos =async(todo)=>
 {
     try
     {
        const {data}=await api.createtodos(todo);
        return data;
     }
     catch(error)
     {
        console.log(error);
     }
 }
 export const updatetodo =async(id,todo)=>
 {
     try
     {
        const {data}=await api.updatetodo(id,todo);
        return data;
     }
     catch(error)
     {
        console.log(error);
     }
 }

 export const deletetodo =async(id)=>
 {
     try
     {
        await api.deletetodo(id);
     }
     catch(error)
     {
        console.log(error);
     }
 }