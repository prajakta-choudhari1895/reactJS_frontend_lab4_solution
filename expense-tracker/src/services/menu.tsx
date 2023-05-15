import axios from "axios";
import { json } from "stream/consumers";
import IDataList from "../model/IDataList";

export const getdata = () => {
    return axios.get<IDataList[]>("http://localhost:3001/items")
    .then( response => response.data)
}

export const pushDataFromUser = (newPurchase: Omit<IDataList,"id">)=>{
    return axios.post<IDataList>('http://localhost:3001/items',newPurchase,
    {
        headers:{
            'Content-Type':'application/json'
        }
    }
).then(response=>response.data);
}