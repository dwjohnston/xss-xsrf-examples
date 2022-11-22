
import { stat } from 'fs';
import React, { useCallback, useEffect, useState } from 'react';

export type BalancePageProps = {
};



const useBalance = () : {
  status: "loading" | "success" | "error", 
  data: {
    balance: number
  } | null, 

  updateBalance: (amount: number) => void; 
} => {



  const [status, setStatus] = useState("loading" as "loading" | "success" | "error"); 
  const [data, setData] = useState(null);



  useEffect(() => {

    console.log("firing")
    fetch("/api/get-balance", {
    
    }).then((res) => {
       if(res.status >= 400){
        setStatus("error"); 
        setData(null); 
       }
  
       else res.json().then((json) => {
        setData(json);
        setStatus("success");
  
       }); 
    }); 
  }, [setData, setStatus])




  const updateBalance = useCallback((amount: number) => {

    setStatus("loading");
    fetch(`/api/update-balance?changeAmount=${amount}`, {
      
    }).then((res) => {
       if(res.status >= 400){
        setStatus("error"); 
        setData(null); 
       }
  
       else {

        console.log("get here2")

        res.json().then((json) => {
        setData(json);

        console.log("get here")
        setStatus("success");
       }); 
      }
    }); 
  }, [setStatus, setData]); 



  return {
    status, data, updateBalance
  }
}

export const BalancePage = (props: BalancePageProps) => {
  const {  } = props;


  const { status, updateBalance, data} = useBalance();

  return (
    <div>
      <h1>Balance</h1>


      {status === "loading" && <p>Loading...</p> }
      {status ==="error" && <p className ="error">Sorry, something went wrong</p>}

      {data?.balance && <p>{data.balance}</p>}


      <form onSubmit = {(e) => {
        e.preventDefault(); 

        //@ts-ignore
        const data = new FormData(e.target); 


        
        //@ts-ignore
        updateBalance(data.get("amount")); 
      }}>
        <h2>Update balance</h2>

        <label>Increase/decrease by: <input type ="number" name ="amount"/> </label>
        <input type ="submit"/>
      </form>


      
    </div>
  );
};
