const App = () => {
  return ( 
    <div>
      <form action="/submit" method="POST">
        <input type="text" placeholder="Enter your name" />
        <button type="submit">Submit</button>
      </form>
    </div>
   );
}
 
export default App;