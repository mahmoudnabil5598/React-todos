import axios from 'axios'
const url ="todos";
export const readtodos =()=>axios.get(url);
export const createtodos =newtodo=>axios.post(url,newtodo);
export const updatetodo=(id,updatetodo)=>axios.patch(`${url}/${id}`,updatetodo);
export const deletetodo=(id)=>axios.delete(`${url}/${id}`,deletetodo);