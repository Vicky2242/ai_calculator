import React, {useState} from 'react'
import { explainExpression } from './lib/ai';


const App = () => {

  const [expr, setExpr] = useState("");

  const [result, setResult] = useState("");

  const[aiMsg, setAiMsg] = useState("Type an expression and press =");

  const[loading, setLoading] = useState(false);

  const [history, setHistory] = useState([]);

  const handleClick = (value) => {
    setExpr((prev) => prev + value);
  }

  const handleClear = () => {
    setExpr("");
    setResult("");
    setAiMsg("Type an expression and press=");
  }

  const handleBackSpace =() => {
    setExpr ((prev) => prev.slice(0, -1));
  }


  const handleEquals = () => {
    try {
      // Use Function constructor for safer parsing
      const value = Function(`"use strict"; return (${expr})`)();
      const resultStr = value.toString();
      setResult(resultStr);
      setAiMsg("Now click Ask AI to see steps!");
    } catch {
      setResult("Error");
    }
  };

  const handleAskAI = async () => {
    console.log("AI");
    setLoading(true)

    const text = await explainExpression (expr, result);
    setAiMsg(text);
    setLoading(false);
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#2e0260] to-[#15162c]'>
     <div className='max-w-6xl px-6 py-10 mx-auto'>
       <div className='mb-8 flex items-center justify-between'>
        <h1 className='text-white text-lg font-semibold'>
         🧮AI calculator
        </h1>
        <span className='text-white/80 text-sm'>By Vicky</span>
      </div>
      <div className='grid gap-6 lg:grid-cols-2'>
        <div className='bg-white/40 backdrop-blur-lg rounded-3xl shadow-xl p-6'>

        {/* display */}
          <div className='mb-4'>
            <div className='text-white/80 text-xs uppercase'>Expression</div>
            <div className='text-white text-lg min-h-[40px]'>{expr || "0"}</div>


            <div className='h-px bg-white/50 my-3'></div>

            <div className='text-white/80 text-xs uppercase'>Result</div>
            <div className='text-white text-lg min-h-[40px]'>{result || "0"}</div>
          </div>

        {/* keypad */}

        <div className='grid grid-cols-4 gap-3'>

          <button className='btn' onClick={() => handleClick("Math.sqrt(")}>√</button>
          <button className='btn' onClick={() => handleClick("**")}>^</button>
          <button className='btn' onClick={() => handleClick("Math.PI")}>π</button>
          <button className='btn' >v</button>

          <button className='btn danger' onClick={handleClear}>C</button>
          <button className='btn' onClick={handleBackSpace}>B</button>
          <button className='btn' onClick={() => handleClick("%")}>%</button>
          <button className='btn' onClick={() => handleClick("/")}>/</button>

          <button className='btn' onClick={() => handleClick("7")}>7</button>
          <button className='btn' onClick={() => handleClick("8")}>8</button>
          <button className='btn' onClick={() => handleClick("9")}>9</button>
          <button className='btn' onClick={() => handleClick("*")}>*</button>

          <button className='btn' onClick={() => handleClick("4")}>4</button>
          <button className='btn' onClick={() => handleClick("5")}>5</button>
          <button className='btn' onClick={() => handleClick("6")}>6</button>
          <button className='btn' onClick={() => handleClick("-")}>-</button>

          <button className='btn' onClick={() => handleClick("1")}>1</button>
          <button className='btn' onClick={() => handleClick("2")}>2</button>
          <button className='btn' onClick={() => handleClick("3")}>3</button>
          <button className='btn' onClick={() => handleClick("+")}>+</button>

          <button className='btn col-span-2' onClick={() => handleClick("0")}>0</button>
          <button className='btn' onClick={() => handleClick(".")}>.</button>
          <button className='btn' onClick={handleEquals}>=</button>
          
        </div>
        </div>

        {/* AI explain card */}

        <div className='bg-white/10 rounded-3xl shadow-xl p-6 relative'>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-white font-semibold'>AI Explanation</h2>
          <button className='btn ai'
          onClick={handleAskAI}
          disabled={loading}>
            {loading ? "Thinking..." : "Ask AI"}
          </button>
        </div>

        <div className='bg-white/10 rounded-3xl shadow-xl p-4 mt-6 mb-6'>
          <h2 className='text-white font-semibold mb-2'>History</h2>
          <ul className='text-white/80 text-sm max-h-[200px] overflow-y-auto space-y-1'>
            {history.length === 0 ? (
              <li>No history yet.</li>
            ) : (
              history.map((item, idx) => (
                <li key={idx}>
                  {item.expr} = <span className='text-white'>{item.result}</span>
                </li>
              ))
            )}
          </ul>
        </div>

        <p className='text-white/90 text-sm min-h-[180px]'>{aiMsg}</p>

        <div className='w-full text-center text-white/40 text-sm absolute bottom-5 left-1/2
        -translate-x-1/2'>
          privacy: We only send the final expression and result when you click "Ask AI".
        </div>
        </div>
      </div>
    </div> 
    </div>
  )
}

export default App
