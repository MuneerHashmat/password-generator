import {ContentCopy, KeyboardDoubleArrowDown } from '@mui/icons-material';
import "./App.css"
import { useState } from 'react';

function App() {

  const [password, setPassword]=useState("password");
  const [passwordLength, setPasswordLength]=useState(8);
  const [includeUppercase, setIncludeUppercase]=useState(true);
  const [includeNumbers,setIncludeNumbers]=useState(true);
  const [includeSymbols,setIncludeSymbols]=useState(true);
  const [copied,setCopied]=useState(false);

  const generatePassword=()=>{

      if(passwordLength<6 || passwordLength>128){
        alert("Please enter a valid length!");
        return;
      }
      const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const lowerCase = "abcdefghijklmnopqrstuvwxyz";
      const numbers = "0123456789";
      const symbols = "!@#$%^&*()_-+[]{};:,.<>?";

      let allChars=lowerCase;
      let categories=[lowerCase];

      if(includeUppercase){
        categories.push(upperCase);
        allChars+=upperCase;
      }

      if(includeNumbers){
        categories.push(numbers);
        allChars+=numbers
      }

      if(includeSymbols){
        categories.push(symbols);
        allChars+=symbols;
      }

      //randomly shuffle categoris array
      categories.sort(() => Math.random() - 0.5);

      let generatedPassword="";


      //making sure that password contains at least one character from each specified category
      categories.forEach((category)=> {
        generatedPassword += category.charAt(Math.floor(Math.random() * category.length));
      });

      //Filling the remaining length with random characters
      for (let i = generatedPassword.length; i < passwordLength; i++) {
        let randomIndex = Math.floor(Math.random() * allChars.length);
        generatedPassword += allChars[randomIndex];
      }

      setPassword(generatedPassword);
  }

  const copyPassword=()=>{
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(()=>{
      setCopied(false)
    },1000)
  }

  return (
    <>
      <div className=" bg-customColor shadow-customShadow py-5 px-8 rounded-xl">
          <h1 className="font-bold text-3xl text-center">Password Generator</h1>
          <div className=" mt-8 flex flex-col gap-2 items-center">
              <p className="text-xl">Enter length of the password (min-6, max-128)</p>
              <input type="number" 
              value={passwordLength} 
              onChange={(e)=>setPasswordLength(e.target.value)} className=" h-10 w-full p-2 border border-black rounded-lg text-xl" />

              <div className="flex items-center gap-12 mt-2">
                <div className="flex flex-col gap-2">
                  <div className="flex gap-3">
                    <input type="checkbox" 
                    checked={includeUppercase} 
                    onChange={()=>setIncludeUppercase(!includeUppercase)} className=" scale-150"/>
                    <label className="text-xl w-44">Include Uppercase</label>
                  </div>

                  <div className="flex gap-3">
                    <input type="checkbox" 
                    checked={includeNumbers} 
                    onChange={()=>setIncludeNumbers(!includeNumbers)}
                    className=" scale-150"/>
                    <label className="text-xl w-44">Include Numbers</label>
                  </div>

                  <div className="flex gap-3">
                    <input type="checkbox" 
                    checked={includeSymbols} 
                    onChange={()=>setIncludeSymbols(!includeSymbols)}
                    className=" scale-150"/>
                    <label className="text-xl w-44">Include Symbols</label>
                  </div>
                </div>

                <button 
                onClick={generatePassword}
                className="text-2xl px-4 bg-blue-500 h-8 shadow-md rounded-lg hover:scale-110 transition-all">Generate</button>
              </div>
          </div>

          <div className=' mt-10 flex flex-col items-center'>
            <p className='text-xl'>Generated password <KeyboardDoubleArrowDown sx={{fontSize: "28px", color:"brown", borderRadius:"50%", backgroundColor:"wheat",marginBottom:"5px", marginLeft:"2px"}}/></p>

            <div className='flex items-center gap-5 mt-3'>
              <div className='bg-gray-50 max-w-80 text-2xl mt-3 py-2 px-3 rounded-lg'>
                <p className='wrap'>{password}</p>
              </div>
              <button onClick={copyPassword} className='hover:scale-110 transition-all flex flex-col'>
                <ContentCopy sx={{fontSize:"38px", marginTop:"10px", backgroundColor:"wheat", padding:"5px", borderRadius:"20%"}}/> 
                {copied? <span className=' text-sm font-bold text-red-500'>Copied!</span> : null} 
              </button>
            </div>
          </div>
      </div>
    </>
  )
}

export default App
