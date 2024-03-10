import React, { useEffect } from "react";
import styles from "./Home.css";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import MainSlider from "../MainSlider/MainSlider";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
export default function Home() {
 useEffect(() => {
   document.title = "Home";
 })
  return (
    <>
      <MainSlider />
      <CategoriesSlider />
       <FeaturedProducts/>
    
    </>
  );
}
