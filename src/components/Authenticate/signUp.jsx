/* jshint ignore:start */
import userEvent from "@testing-library/user-event";
import React,{useState} from "react";
import {useNavigate,Link} from "react-router-dom";

function SignUp(props) {

  const [User, setUser] = useState({name:"",email:"",password:"",cpassword:""});
  const {alert} = props;

  const onchange = (e)=>{
    const {name,value} = e.target;
    setUser({...User,[name]:value});
  }

  const Navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(User.password !== User.cpassword){
          alert("Invalid Passward","danger");
          setUser({name:"",email:"",password:"",cpassword:""})
        }
        else{
        const {name,password,email} = User;
        const response = await fetch("http://localhost:80/auth/createuser", {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name,email,passward:password})
        })
        const json = await response.json();
        console.log(json);

        if (json.succses && json.passward === User.cpassword) {
            // redirect
            // save the authToken to local storage
            localStorage.setItem("token", json.AuthToken);
            // use history hook for redirect
            Navigate('/');
            alert("Account Created Successfully","success");
        }
        else{
           alert("Invalid credintial weather the Email already exsist","danger");
           setUser({name:"",email:"",password:"",cpassword:""})
        }
        }
    }


  return (
    <>
    <h1 className="h1 my-4">SignUp Now</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input type="text" className="form-control" id="name" name="name" required minLength={5} 
          value={User.name} onChange={onchange} />
          { User.name.length < 5 ?
          
          <p className="mx-3 my-1 text-danger">
            <i className="fa-solid fa-star fa-2xs"></i> Maximum leangth should be 5 words </p> 
          : null
        }
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={onchange}
            value={User.email}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            required minLength={5}
            onChange={onchange}
            value={User.password}
          />
          { User.password.length < 5 ?
          
          <p className="mx-3 my-1 text-danger">
            <i className="fa-solid fa-star fa-2xs"></i> Maximum leangth should be 5 words </p> 
          : null
        }
        </div>

        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            required minLength={5}
            onChange={onchange}
            value={User.cpassword}
          />
          { User.password !== User.cpassword ?
          
          <p className="mx-3 my-1 text-danger">
            <i className="fa-solid fa-star fa-2xs"></i> Confirm Passward Should be Same as Passward </p> 
          : null
        }
        </div>

        <button  type="submit" className="btn btn-primary">
          SignUp
        </button>
      </form>
      <p className="mt-4">Already Regestered Click To <Link className="fs-11"  to="/login">LogIn</Link> </p>

    </>
  );
}

export default SignUp;
