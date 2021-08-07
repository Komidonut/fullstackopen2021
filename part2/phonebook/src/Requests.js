import axios from 'axios'

const getBase = () => {
	const req = axios.get("http://localhost:3001/persons")
	return req.then(response => response.data)
}

const addRecord = newRecord => {
	const req = axios.post("http://localhost:3001/persons", newRecord)
	return req.then(response => response.data)
}
const deleteRecord = (id) => {
	const req = axios
		.delete(`http://localhost:3001/persons/${id}`)
	return req.then(response => response.data)
}


const callServer = { getBase, addRecord, deleteRecord }
export default callServer