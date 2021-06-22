import React from 'react'

const Total = ({course}) => {
	const reducer = (accumulator, value) => accumulator + value;
	const total = course.parts.map(part => part.exercises).reduce(reducer);
	return (
		<p><strong>total of {total} exercises</strong></p>
	)
} 

export default Total