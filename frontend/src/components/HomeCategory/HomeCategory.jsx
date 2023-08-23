import { categoryContext } from "../../context/Context";
import "./HomeCategory.css"
import { useContext } from "react";

import veggetableImg from "../../assets/img/veggetableCat.png"
import meatImg from "../../assets/img/meatCat.png"
import animalImg from "../../assets/img/animalCat.png"
import moreImg from "../../assets/img/moreCat.png"

import { Link } from "react-router-dom";


const HomeCategory = () => {
    const {setCategoryFilter} = useContext(categoryContext)


    return (
    <>
        <section className="home-category-section">
            <Link to="/productlist"><img onClick={() => setCategoryFilter("Vegetable")} src={veggetableImg} alt="vegetable" /></Link>
            <Link to="/productlist"><img onClick={() => setCategoryFilter("Meat")} src={meatImg} alt="meat" /></Link>
            <Link to="/productlist"><img onClick={() => setCategoryFilter("Animal")} src={animalImg} alt="animal" /></Link>
            <Link to="/productlist"><img onClick={() => setCategoryFilter("All")} src={moreImg} alt="more" /></Link>
        </section>
    </>  
);
}
 
export default HomeCategory;