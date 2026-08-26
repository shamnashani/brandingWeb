import React from 'react'
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Home from './Home'
import Hero from './Hero';
import WhoWeAre from './section2';
import Divisions from './section3';
import WhyChooseUs from './whychooseUs';
import Login from './Login';
import Constructions from './Constructions.jsx'
import Film from './Film';
import Infroge from './Infroge'
import AdminHome from './AdminHome.jsx';
import ScrollTop from './ScrollTop.jsx';
import ResetPass from './ResetPass.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AdminReviews from './AdminReviews.jsx';
import AdminEnquiries from './AdminEnquiries.jsx';
import AdminRoute from './AdminRoute.jsx';
import AdminUsers from './AdminUsers.jsx';
import GetInTouch from './GetInTouch.jsx';
import ReviewForm from './ReviewForm.jsx';
import AdminSettings from './AdminSettings.jsx';
import AdminPolicies from "./AdminPolicies";
import EditPolicy from "./EditPolicy";
import PrivacyPolicy from "./PrivacyPolicy";
import Add_project from './Add_project.jsx';
import Add_service from './Add_service.jsx';
import AdminViewproject from './AdminViewproject.jsx';
import Adminviewservice from './Adminviewservice.jsx';
import AdminEditproject from './AdminEditproject.jsx';
import AdminEditservice from './AdminEditservice.jsx';
import TermsAndConditions from './T&C.jsx';
 

function Routess() {
  return (
    <GoogleOAuthProvider clientId='836818006085-io56p3s2r58jk55dgfnksmo8l9s262fn.apps.googleusercontent.com'>
    <BrowserRouter>
    <ScrollTop/>
    <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/hero' element={<Hero></Hero>}></Route>
        <Route path='/who' element={<WhoWeAre></WhoWeAre>}></Route>
        <Route path='/division' element={<Divisions></Divisions>}></Route>
        <Route path='/choose' element={<WhyChooseUs></WhyChooseUs>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/construction' element={<Constructions></Constructions>}></Route>
        <Route path='/film' element={<Film></Film>}> </Route>
        <Route path='/tech' element={<Infroge></Infroge>}></Route>
        <Route path='/adminhome' element={<AdminRoute><AdminHome></AdminHome></AdminRoute>}></Route>
        <Route path='/reset-password/:token' element={<ResetPass></ResetPass>}></Route>
        <Route path='/admin/review' element={<AdminReviews></AdminReviews>}></Route>
        <Route path='/admin/enquiries' element={<AdminEnquiries></AdminEnquiries>}></Route>
        <Route path='/admin/users' element={<AdminUsers></AdminUsers>} ></Route>
        <Route path='/getintouch' element={<GetInTouch></GetInTouch>}></Route>
        <Route path='/submit-review' element={<ReviewForm></ReviewForm>}></Route>
        <Route path='/settings' element={<AdminSettings></AdminSettings>}></Route>
        <Route path="/admin/policies" element={<AdminPolicies />}/>
        <Route path="/admin/policies/new" element={<EditPolicy />}/>
        <Route path="/admin/policies/edit/:id" element={<EditPolicy />}/>
        <Route path="/privacy-policy" element={<PrivacyPolicy />}/>
        <Route path='/project' element={<Add_project></Add_project>} ></Route>
        <Route path='/service' element={<Add_service></Add_service>} ></Route>
        <Route path='/adminviewproject' element={<AdminViewproject></AdminViewproject>} ></Route>
        <Route path='/adminviewservice' element={<Adminviewservice></Adminviewservice>} ></Route>
        <Route path='/admineditproject/:id' element={<AdminEditproject></AdminEditproject>} ></Route>
        <Route path='/admineditservice/:id' element={<AdminEditservice></AdminEditservice>} ></Route>
        <Route path='/terms-and-conditions' element={<TermsAndConditions></TermsAndConditions>}></Route>
        </Routes>
        </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default Routess
