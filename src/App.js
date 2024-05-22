import { useEffect, useState } from 'react';
import { Route, BrowserRouter, Routes, useNavigate, useLocation} from 'react-router-dom';
import './App.css';
import { SignIn } from './pages/SignIn';
import Cookies from 'universal-cookie';
import { SelectChat } from './pages/SelectChat';
import { SignOut } from './components/SignOut';
import { signOut } from 'firebase/auth';
import { auth } from './utils/firebase';
import { ChatPage } from './pages/ChatPage';
import { CreateChat } from './pages/CreateChat';
const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get('auth-token'));
  const navagate = useNavigate();

  // useEffect(() => {
  //   if(location.pathname.includes("/chat/")) {
  //     let tmp = location.pathname.slice(location.pathname.lastIndexOf("/") + 1, location.pathname.length) ;
  //     setChatId(tmp);
  //   }else{
  //     setChatId(null);
  //     navagate("/selectChat/");
  //   }
  // }, [location]);

  const handleSignOut = async () => {
    await signOut(auth);
    setIsAuth(null);
    cookies.remove('auth-token');
    navagate("/");
  }

  if (!isAuth){
    return <div className='App'>
      <SignIn setIsAuth={setIsAuth}/>
    </div>;
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" exact Component={SelectChat}/>
        <Route path="/create/" Component={CreateChat}/>
        <Route path="/chats/" Component={ChatPage}/>
      </Routes>
      <SignOut onSignOut={handleSignOut}/>
    </div>
  );
}

export default App;
