import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainMenu from './views/MainMenu';
import RoomMenu from './views/RoomMenu';
import Instructions from './views/Instructions';
import SelectRoom from './views/SelectRoom';
import CreateRoom from './views/CreateRoom';
import Room from './views/Room';
import './App.css';


function App() {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={MainMenu}/>
                <Route path ='/room-menu' component={RoomMenu}/>
                <Route path ='/instructions' component={Instructions}/>
                <Route path ='/select-room' component={SelectRoom}/>
                <Route path ='/create-room' component={CreateRoom}/>
                <Route path ='/room' component={Room}/>
            </Switch>
        </Router>
    );
}

export default App;
