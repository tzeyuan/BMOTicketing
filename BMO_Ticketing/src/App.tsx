import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Event from "./pages/Event";
import TicketDetails from "./pages/TicketDetails";
import Merchandise from "./pages/Merchandise";
import Community from "./pages/Community";
import AboutUs from "./pages/AboutUs";
import Profile from "./pages/Profile";
import Payment from "./pages/Payment";


function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/events" element={<Event />} />
                <Route path="/ticket/:id" element={<TicketDetails />} />
                <Route path="/merchandise" element={<Merchandise />} />
                <Route path="/community" element={<Community />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile" element={<Payment />} />
            </Routes>
        </Router>
    );
}

export default App;
