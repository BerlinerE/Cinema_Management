import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoginPage from '../components/LoginPage';
import MainPage from '../components/MainPage';
import ManageMoviesPage from '../components/ManageMoviesPage';
import ManageSubscriptionsPage from '../components/ManageSubscriptionsPage';
import ManageUsersPage from '../components/ManageUsersPage';
import CreateAccount from '../components/CreateAccountPage';
import UsersPage from '../components/UsersPage';
import AddUserPage from '../components/AddUserPage';
import EditUserPage from '../components/EditUserPage';
import AddMoviePage from '../components/AddMoviePage';
import MoviesPage from '../components/MoviesPage';
import EditMoviePage from '../components/EditMoviePage';
import AllMembersPage from '../components/AllMembersPage';
import AddMemberPage from '../components/AddMemberPage';
import EditMemberPage from '../components/EditMemberPage';
import Timer from '../components/Timer'; 

const AppRoutes = () => {
  const user = useSelector((state) => state.user.user);
  const userId = user && user.user ? user.user._id : '';
  return (
    <>
          {userId && <Timer />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/main" element={<MainPage />}>
          <Route path="movies" element={<ManageMoviesPage />}>
            <Route path="all-movies" element={<MoviesPage />} />
            <Route path="add-movie" element={<AddMoviePage />} />
            <Route path=":movieId" element={<EditMoviePage />} />
          </Route>
          <Route path="subscriptions" element={<ManageSubscriptionsPage />}>
            <Route path="all-members" element={<AllMembersPage />} />
            <Route path="add-member" element={<AddMemberPage />} />
            <Route path=":memberId" element={<EditMemberPage />} /> 
          </Route>
          <Route path="manage-users" element={<ManageUsersPage />}>
            <Route path="all-users" element={<UsersPage />} />
            <Route path="add-user" element={<AddUserPage />} />
            <Route path=":userId" element={<EditUserPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
