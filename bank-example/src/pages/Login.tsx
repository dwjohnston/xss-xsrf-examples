
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

export type LoginPageProps = {
};



export const LoginPage = (props: LoginPageProps) => {
  const {  } = props;


  const [hasError, setHasError] = useState(false);

  const nav = useNavigate();
  return (
    <div>
        <form onSubmit ={(e) => {
            e.preventDefault(); 

            //@ts-ignore
            const data = new FormData(e.target);

            fetch("/api/auth", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({
                user: data.get("user"),
                password: data.get("password")
              })
            }).then((res) => {
              if(res.status === 200){
                nav("/balance")
              }
              else {
                setHasError(true);
              }
            }); 

        }}>

          {hasError && <p className ="error">Auth failed, try again</p>}
          <label>Username <input name ="user" type ="text"/></label>
          <label>Password<input name ="password" type ="password"/></label>
          <input type ="submit"/>
        </form>
    </div>
  );
};
