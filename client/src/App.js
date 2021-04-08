import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainMenu from './views/MainMenu';
import RoomMenu from './views/RoomMenu';
import Instructions from './views/Instructions';
import SelectRoom from './views/SelectRoom';
import './App.css';


function App() {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={MainMenu}/>
                <Route path ='/room-menu' component={RoomMenu}/>
                <Route path ='/instructions' component={Instructions}/>
                <Route path ='/select-room' component={SelectRoom}/>
            </Switch>
        </Router>
    );
}

export default App;
