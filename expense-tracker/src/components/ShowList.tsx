import React, {useEffect, useState} from 'react';
import {getdata, pushDataFromUser} from '../services/menu';
import IDataList from '../model/IDataList';
import ExpenseTracker from './ExpenseTracker';

export default function Showlist(){

    const [items, setItems] = useState<IDataList[]>([]);
    const [error, setError] = useState<Error|null>(null);
    const [sum, setSum] = useState<number|null>(0);
    const [rahulSpent, setRahulSpent] =  useState<number>(0);
    const [rameshSpent, setRameshSpent] =  useState<number>(0);
    const [showForm,setShowForm] = useState<boolean>(false);

    useEffect(()=>{
        const fetchMenu = async () => {
            try{
                const data = await getdata();
                setItems(data);
                setSum(data.reduce((result,p) => result+p.price,0));
                calculateShare(data);
            }
            catch(error: any){
                console.error(error);
                setError(error);
            }
        };
        fetchMenu();
    },[showForm]);

       const calculateShare = (data: IDataList[]) => {
            
        var rahulSpentTotal : number = 0;
        var rameshSpentTotal: number = 0;
            
        data.map(
            mappedData => (
                mappedData.payeeName == 'Rahul' ? (rahulSpentTotal = rahulSpentTotal+mappedData.price) :
                (rameshSpentTotal = rameshSpentTotal + mappedData.price)
            )
        );
        setRahulSpent(rahulSpentTotal);
        setRameshSpent(rameshSpentTotal);
    };

    return (
        
        <>
        <header id="page-Header">Expense Tracker</header>
        <>
        <div className='use-inline date header-color'>Date</div>
        <div className='use-inline header-color'>Product Purchased</div>
        <div className='use-inline price header-color'>Price</div>
        <div className='use-inline header-color payee'>Payee</div>
        <button id="Add-Button" onClick={()=>setShowForm(true)}>Add</button>
        {
            showForm && (
                <div className='form'>
                    <ExpenseTracker onTrue={()=>setShowForm(false)} onClose={()=>setShowForm(false)}></ExpenseTracker>
                </div>
            )
        }
        </>
        {
            items && items.map(
                (item,index) => {
                    return (
                        <div key={index}>
                            <div className='use-inline date'>{item.setDate}</div>
                            <div className='use-inline'>{item.product}</div>
                            <div className='use-inline price'>{item.price}</div>
                            <div className={`use-inline payee ${item.payeeName}`}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             >{item.payeeName}</div>
                        </div>
                    )
                }
            )
        }
        <div className='use-inline total-label'>Total:</div>
        <span className='use-inline total numfield'>{sum}</span><br/>
        <div className='use-inline total-label'>Rahul paid:</div>
        <span className='use-inline total Rahul numfield'>{rahulSpent}</span><br/>
        <div className='use-inline total-label'>Ramesh paid:</div>
        <span className='use-inline total Ramesh numfield'>{rameshSpent}</span><br/>
        <span className='use-inline payable total-label'>{rahulSpent > rameshSpent ? "Pay Rahul: ":"Pay Ramesh:"}</span>
        <span className='use-inline payable price numfield'>{Math.abs(rahulSpent-rameshSpent)/2}</span>
        {
            error && (
                <>
                {error.message}
                </>
            )
        }
        </>
    );
}