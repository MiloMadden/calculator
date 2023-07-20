
import Dashboard from "./components/Dashboard";

const App = ()=>{



 return(
  <>
    <div className="container">
      <h1 className="text-center mt-4 text-primary">Simple Calculator</h1>
      <div className="row my-4">
        <div className="col-8 m-auto p-4">
          <Dashboard /> 
        </div>
      </div>
      
    </div>
    
  </>
 )



}

export default App;