import React from 'react'

function Answer({questions}) {
  return (
    <div>
      <div>
          <h2>All Answers</h2>
          {questions.map(({ id, question, correctAnswer }) => (
            <p key={id}>
              <strong>{question}</strong> - {correctAnswer}
            </p>
          ))}
        </div>
        avdsv
    </div>
  )
}

export default Answer
