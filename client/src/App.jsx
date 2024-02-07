import { useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchDataFromApi } from "./utils/api"
import { useSelector, useDispatch } from "react-redux"
import { getApiConfiguration, getGenres } from "./store/homeSlice";
import { Home } from "./pages/home/Home";
import { Details } from "./pages/details/Details";
import { PageNotFound } from "./pages/404/PageNotFound";
import { SearchResult } from "./pages/searchResult/SearchResult";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import Explore from "./pages/expolre/Explore";
import { SignUp } from "./pages/user/SignUp";
import { Login } from "./pages/user/Login";
import { auth } from "./utils/firebase";
import { login, logout } from "./store/userSlice";
import { Profile } from "./pages/user/Profile/Profile";
import { Subscription } from "./pages/subscription/Subscription";
import { Welcome } from "./pages/subscription/Welcome/Welcome";
import { Checkout } from "./pages/subscription/Checkout/Checkout";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth)
  const {url} = useSelector(state => state.home)

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged(userAuth => {
      if(userAuth) {
        console.log(userAuth);
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email
        }))
      } else {
        dispatch(logout())
      }
    })

    return unSubscribe
  }, [dispatch])

  useEffect(() => {
    fetchApiConfig()
    genresCall()
  }, [])

  const fetchApiConfig = () => {
    fetchDataFromApi('/configuration')
    .then((res) => {
      console.log(res);

      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original"
      }

      dispatch(getApiConfiguration(url))
    })
  }

  const genresCall = async () => {
    let promises = []
    let endPoints = ["tv", "movie"]
    let allGenres = {}

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`)) 
    })

    const data = await Promise.all(promises);
    console.log(data);
    data.map(({genres}) => {
      return genres.map((item) => (allGenres[item.id] = item))
    });

    dispatch(getGenres(allGenres))
  }

  return (
    <BrowserRouter>
      <Routes>
        {user? (
          <Route path="/" element={<Home/>}/>
        ): (
          <Route path="/" element={<Welcome/>}/>
        )}
        <Route path="/subscription" element = {<Subscription/>}/>
        <Route path="/checkout/:name/:price" element = {<Checkout/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element = {<Profile/>}/>
        <Route path="/:mediaType/:id" element={<Details/>}/>
        <Route path="/search/:query" element={<SearchResult/>}/>
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
