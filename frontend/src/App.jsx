import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./component/Header";
import HomePage from "./component/HomePage";
import RegisterPage from "./User/RegisterPage";
import LoginPage from "./User/LoginPage";
import Profile from "./User/Profile";
import MyRecepies from "./User/MyRecepies";
import Details from "./component/Details";
import Footer from "./component/Footer";
import RecipesCard from "./component/RecipesCard";
import RecipeForm from "./User/RecipeForm";
import EditForm from "./User/EditForm";
import AboutUs from "./component/AboutUs";
import RecipeList from "./component/RecipesCard";
import DashboardLayout from "./User/DashboardLayout";
import UserProfile from "./User/UserProfile";
import UserComments from "./User/UserComments";
import AddCategory from "./User/AddCategory";
import Likes from "./User/Likes";

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/profile" element={<UserProfile/>} />
        <Route path="/Myrecepies" element={<MyRecepies/>} />

        <Route path="/recipes/:id" element={<Details />} />
        <Route path="/recipes" element={<RecipeList/>} />
        <Route path="/mes-recettes" element={<MyRecepies />} />
        <Route path="/ajouter-recette" element={<RecipeForm />} />
        <Route path="/modifier-recette/:id" element={<EditForm />} />
        <Route path="/comment" element={<UserComments/>} />
        <Route path="/category" element={<AddCategory/>} />
        <Route path="/favoris" element={<Likes/>} />

      </Routes>
     
    </Router>
  );
}

export default App;
