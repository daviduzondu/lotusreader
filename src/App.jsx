import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import New from './pages/New';
import Best from './pages/Best';
import Trending from './pages/Trending';
import Ask from './pages/Ask';
import Jobs from './pages/Jobs';
import PostView from './components/PostView';
import Show from './pages/Show';

function App() {

 return (
  <div className="App flex flex-col overflow-hidden">
   <Header />
   <div className='pt-14'>
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/new" element={<New />} />
    <Route path="/best" element={<Best />} />
    <Route path="/trending" element={<Trending />} />
    <Route path="/ask" element={<Ask />} />
    <Route path="/show" element={<Show />} />
    <Route path="/jobs" element={<Jobs />} />
    <Route path="/item/:id" element={<PostView />} />
   </Routes>
   </div>
  </div>
 );
}

export default App;
