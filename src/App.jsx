import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";

import SignIn from "./pages/Auth/sign-in";
import SignUp from "./pages/Auth/sign-up";
import CompleteProfile from "./pages/Auth/CompleteProfile"

import UserAskSubscription from "./pages/User/AskSubscription";
import UserEditPassword from "./pages/User/UserEditPassword";
import UserEditProfile from "./pages/User/UserEditProfile";
import UserProfile from "./pages/User/UserProfile";

import Offres from "./pages/User/Offres";
import TenderDetails from "./pages/User/TenderDetails";
import UserHome from "./pages/User/UserHome";

import AdminHome from "./pages/Admin/AdminHome";

import AjoutTenders from "./pages/Admin/Add_Edit/AjoutTenders";
import EditTenderForm from "./pages/Admin/Add_Edit/EditTenders";
import Tenders from "./pages/Admin/Tenders";

import Secteurs from "./pages/Admin/Secteurs";

import Utilisateurs from "./pages/Admin/Utilisateurs";

import AjoutAdmin from "./pages/Admin/Add_Edit/AjoutAdmin";
import Administrateurs from "./pages/Admin/Administrateurs";
import EditAdmin from "./pages/Admin/Add_Edit/EditAdmin";

import Abonnements from "./pages/Admin/Abonnements";
import AjoutAbonnements from "./pages/Admin/Add_Edit/AjoutAbonnement";
import EditAbonnement from "./pages/Admin/Add_Edit/EditAbonnement";

import Contacts from "./pages/Admin/Contacts";

import EditPassword from "./pages/Admin/Add_Edit/EditPassword";
import EditProfile from "./pages/Admin/Add_Edit/EditProfile";
import Profile from "./pages/Admin/Profile";

import Favorites from "./pages/User/Favorites";
import EditPasswordAdmin from "./pages/Admin/Add_Edit/EditAdminsPassword";

// va contenir l'url et la page(template) de cette derniere
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/userhome" element={<UserHome />} />
      <Route path="/favoris" element={<Favorites />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/profile/edit" element={<UserEditProfile />} />
      <Route path="/profile/edit/password" element={<UserEditPassword />} />
      <Route path="/userhome/demandeabonnement" element={<UserAskSubscription />} />

      <Route path="/userhome/offres" element={<Offres />} />
      <Route path="/tenderdetails/:id" element={<TenderDetails />} />

      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/CompleteProfile" element={<CompleteProfile />} />


      <Route path="/admin" element={<AdminHome />} />

      <Route path="/admin/tenders" element={<Tenders />} />
      <Route path="/admin/tenders/ajout" element={<AjoutTenders />} />
      <Route path="/admin/tenders/edit" element={<EditTenderForm />} />

      <Route path="/admin/secteurs" element={<Secteurs />} />
      <Route path="/admin/utilisateurs" element={<Utilisateurs />} />

      <Route path="/admin/administrateurs" element={<Administrateurs />} />
      <Route path="/admin/administrateurs/ajout" element={<AjoutAdmin />} />
      <Route path="/admin/administrateurs/edit" element={<EditAdmin />} />
      <Route path="/admin/administrateurs/edit/adminpassword" element={<EditPasswordAdmin />} />

      <Route path="/admin/abonnements" element={<Abonnements />} />
      <Route path="/admin/abonnements/ajout" element={<AjoutAbonnements />} />
      <Route path="/admin/abonnements/edit" element={<EditAbonnement />} />

      <Route path="/admin/contacts" element={<Contacts />} />

      <Route path="/admin/profile" element={<Profile />} />
      <Route path="/admin/profile/edit" element={<EditProfile />} />
      <Route path="/admin/profile/edit/password" element={<EditPassword />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
