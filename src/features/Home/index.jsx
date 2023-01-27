//import Login from '../auth/Login'

import HeroSection from "./HeroSection";
import { InfoCards } from "./InfoCards";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { Divider } from "../../components/divider";




function Home() {
  return (
    <>
      <HeroSection />
        <Divider/>
      <InfoCards  />
      <Outlet/>
    </>
  );
}
export default Home;
