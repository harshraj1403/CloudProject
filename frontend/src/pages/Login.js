import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, isLoading } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)
  }

  return (
    // <form className="login" onSubmit={handleSubmit}>
    //   <h3>Log In</h3>
      
    //   <label>Email address:</label>
    //   <input 
    //     type="email" 
    //     onChange={(e) => setEmail(e.target.value)} 
    //     value={email} 
    //   />
    //   <label>Password:</label>
    //   <input 
    //     type="password" 
    //     onChange={(e) => setPassword(e.target.value)} 
    //     value={password} 
    //   />

    //   <button disabled = {isLoading} >Log in</button>
    //   {error && <div className="error">{ error } </div>}
    // </form>
    <form className="login" onSubmit={handleSubmit}>
    <h3>Log In</h3>

    <label>Email address:</label>
    <input 
      type="email" 
      onChange={(e) => setEmail(e.target.value)} 
      value={email} 
    />

    <label>Password:</label>
    <input 
      type="password" 
      onChange={(e) => setPassword(e.target.value)} 
      value={password} 
    />

    <button disabled={isLoading}>Log in</button>

    {error && <div className="error">{error}</div>}
  </form>

  )
}
export default Login

// import { useState } from "react";
// import { useLogin } from "../hooks/useLogin";
// import './Login.css';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const { login, error, isLoading } = useLogin();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await login(email, password);
//   };

//   return (
//     <div className="login-container">
//       <form className="login-form" onSubmit={handleSubmit}>
//         <h3 className="login-title">Log In</h3>

//         <label className="form-label">Email Address</label>
//         <input 
//           type="email" 
//           onChange={(e) => setEmail(e.target.value)} 
//           value={email} 
//           className="input-field"
//           required 
//         />

//         <label className="form-label">Password</label>
//         <input 
//           type="password" 
//           onChange={(e) => setPassword(e.target.value)} 
//           value={password} 
//           className="input-field"
//           required
//         />

//         <button 
//           type="submit" 
//           disabled={isLoading} 
//           className="submit-button"
//         >
//           {isLoading ? "Logging In..." : "Log In"}
//         </button>

//         {error && <div className="error-message">{error}</div>}
//       </form>
//     </div>
//   );
// };

// export default Login;
