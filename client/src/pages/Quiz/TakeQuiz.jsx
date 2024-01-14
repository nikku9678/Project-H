import React from 'react'
import { useNavigate } from 'react-router-dom'
import './TakeQuiz.css'
function TakeQuiz() {
    const navigate=useNavigate();
    const handleQuiz=()=>{
        navigate('/quiz')
    }
  return (
    <div className='mcq'>
      <h2>MCQ Generated</h2>
      <div className="take-btn">
      <button onClick={handleQuiz}>Take Quiz</button>
      </div>
    </div>
  )
}

export default TakeQuiz
