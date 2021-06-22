import './App.css';

function App({notes}) {

  const data = notes.map(
    note => <li key={note.id}> {note.content} </li>
  )
  console.log(data);
  return (
    <>
      <ul>
        {data}
      </ul>
    </>
  );
}

export default App;
