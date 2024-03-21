import RouteByComponent from './routes';
import './styles/html.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/styles/theme.css'

function App() {
  return (
    <div className="App" style={{ marginTop: "40px" }}>
      <RouteByComponent/>
    </div>
  );
}

export default App;
