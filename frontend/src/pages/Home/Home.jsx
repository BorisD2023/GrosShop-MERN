import "./Home.css";
import { Link } from "react-router-dom";

import FooterNav from "../../components/FooterNav/FooterNav";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import ProductListComponente from "../../components/ProductListComponente/ProductListComponente";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const Home = () => {
  const { isLoggedIn, logout } = useContext(UserContext);
  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }
  console.log(isLoggedIn);
    return ( 
        <>
            <HeaderNav/>
            <main>
            <h2>Home Page</h2>
              <ProductListComponente/>
                <Link to="/productlist">Productlist</Link>
            </main>
            <FooterNav/>
        </>
     );
}
 
export default Home;
