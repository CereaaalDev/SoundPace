import { Outlet } from "react-router-dom";
import HeroSection from "./HeroSection";
import { InfoCards } from "./InfoCards";

export default function Home() {
  return (
    <>
      <HeroSection />
      <InfoCards />
      <Outlet />
    </>
  );
}
