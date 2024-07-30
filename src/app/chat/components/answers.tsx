import React from 'react'

interface IAnswersProps {
  message: string
  prompt: string
}

const Answers: React.FC<IAnswersProps> = ({ prompt, message }) => {
  return (
    <>
      <div className="flex justify-end rounded bg-yellow-100 p-1 text-gray-800">
        {prompt}
      </div>
      <div className="rounded bg-blue-100 p-1 text-gray-800">{message}</div>
    </>
  )
}

export default Answers
