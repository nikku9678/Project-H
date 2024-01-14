import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DocQuestion from "./pages/docQuestion/DocQuestion"

import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Doctor from "./pages/doctor/Doctor";
import Chat from "./pages/chat/Chat";
import DoctorLogin from "./pages/doctorLogin/DoctorLogin";
import DocHome from "./pages/docHome/DocHome";
import DocProfile from "./pages/docProfile/DocProfile";
import Stats from './components/stats/stats'
import AccessLogin from "./components/acessKey/accessLogin";
import AdminLogin from "./components/adminLogin/adminLogin"
import Admin from "./pages/admin/admin";
import BookingPage from "./components/session/BookingPage";
import SessionBookedForDoctorByUser from "./components/session/userBookedSession";
import DoctorSessionPage from "./components/session/docterSessionPage";
import DoctorQuestionPage from "./components/question/newDocterQuestion/question";
import UserDocProfile from "./components/userDocterProfile/profile";
import ChatHome from "./pages/chat/ChatHome";
import RegisterAdmin from "./pages/registerAdmin/registerAdmin";

import DoctorList from "./pages/doctorList/doctorList";
import UserListPage from "./pages/userList/userList";
import ChatListPage from "./pages/chatList/chatList";
import AddDoctorForm from "./pages/addDoctor/addDoctor";
import ChatById from "./pages/getChatById/chatById";

import UserWallet from "./components/userWallet/Wallet";
import UserProfile from "./components/Profile/userProfile";
import DocNotification from "./components/DocNotification/DocNotification";
import Refresh from "./components/RefreshPage/Refresh";
import EditAccessKey from "./components/acessKey/editAccessKey";
import Sessions from "./pages/session/session";
import Help from "./pages/Help/Help";
import UpdateUserWallet from "./components/userWallet/updateUserWallet";
import Que from "./pages/Question/Que";
import UserAns from "./pages/Question/UserAns";
import ChatToken from "./pages/chatToken/chatToken";
import Error from "./pages/Error/Error";
import Upload from "./pages/Quiz/Upload";
import Quiz from "./pages/Quiz/Quiz";
import TakeQuiz from "./pages/Quiz/TakeQuiz";
import Progress from "./pages/Quiz/Progress";
import Result from "./pages/Quiz/Result";
import Answer from "./pages/Quiz/Answer";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/doctorLogin" element={<DoctorLogin />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/doctorList" element={<Doctor />}></Route>
        <Route path="/chat" element={<ChatHome />}></Route>
        <Route path="/docHome" element={<DocHome />}></Route>
        <Route path="/docHome/profile" element={<DocProfile />}></Route>
        <Route path="/docHome/stat" element={<Stats/>}></Route>
        <Route path="/sessions" element= {<Sessions/>}></Route>
        {/* <Route path="/doc/addQuestion" element={<DoctorQuestionPage/>}></Route> */}
        <Route path="/docHome/session" element={<DoctorSessionPage />}></Route>
        <Route path="/docHome/userSession" element={<SessionBookedForDoctorByUser />}></Route>
        <Route path='/user/docter' element={<UserDocProfile/>}></Route>
        <Route path="/docterList/session" element={<BookingPage/>}></Route>
        <Route path="/user/wallet" element={<UserWallet/>}></Route>
        <Route path="/user/profile" element={<UserProfile/>}></Route>
        <Route path="/doctor/notification" element={<DocNotification/>}></Route>
        <Route path="/user/refresh" element={<Refresh/>}></Route>
        <Route path="/help" element={<Help/>}></Route>
        <Route path="/doc/addQuestion" element={<Que/>}></Route>
        <Route path="/user-ans" element={<UserAns/>}></Route>


        <Route path="/adminLogin" element={<AccessLogin />}></Route>
        <Route path="/adminLoginPage" element={<AdminLogin />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/admin/doctorList" element={<DoctorList/>}></Route>
        <Route path="/admin/userList" element={<UserListPage/>}></Route>
        <Route path="/admin/chatList" element={<ChatListPage/>}></Route>
        <Route path="/admin/addDoctor" element={<AddDoctorForm/>}></Route>
        <Route path="/admin/chatById" element={<ChatById/>}></Route>
        <Route path="/admin/registerAdmin" element={<RegisterAdmin/>}></Route>
        <Route path="/admin/editAccessKey" element={<EditAccessKey/>}></Route>
        <Route path="/session" element={<Sessions/>}></Route>
        <Route path="/admin/updateUserWallet" element={<UpdateUserWallet />}/>
        <Route path="/chat-token" element={<ChatToken />}/>
        <Route path="/error" element={<Error />}/>
        <Route path="/upload" element={<Upload />}/>
        <Route path="/quiz" element={<Quiz />}/>
        <Route path="/takequiz" element={<TakeQuiz />}/>
        <Route path="/progress" element={<Progress />}/>
        <Route path="/res" element={<Result />}/>
        <Route path="/answer" element={<Answer />}/>
      </Routes>
       
      
    </BrowserRouter>
  );
}

export default App;
