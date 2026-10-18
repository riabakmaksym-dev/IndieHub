import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Profile from './pages/Profile.jsx';
import Developers from './pages/Developers.jsx';
import Teams from './pages/Teams.jsx';
import TeamDetails from './pages/TeamDetails.jsx';
import CreateTeam from './pages/CreateTeam.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
  return (
    <>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/developers" element={<Developers />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/:id" element={<TeamDetails />} />
          <Route path="/create-team" element={<CreateTeam />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;