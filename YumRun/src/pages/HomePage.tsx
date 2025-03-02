// @ts-nocheck
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { AboutSection } from "@/components/AboutSection";
import { WorkSection } from "@/components/WorkSection";
import { BottomSection } from "@/components/BottomSection";

const HomePage = () => {
  const naviagte = useNavigate();
  const handleSearchSubmit = (searchFormVlaues: SearchForm) => {
    naviagte({
      pathname: `/search/${searchFormVlaues.searchQuery}`,
    });
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="justify-center items-center flex mt-28">
        <img src={Logo} className="" />
      </div>
      <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center mt-15">
        <h1 className="text-3xl font-bold tracking-tight text-beep-200">
          YumRun: Delicious Meals Delivered to Your Doorstep!
        </h1>
        <span className="text-xl">
          Your next delicious meal is just a tap away!
        </span>
        <SearchBar
          placeholder="Search by City or Town"
          onSubmit={handleSearchSubmit}
        />
      </div>

      <AboutSection />
      <WorkSection />
      <BottomSection />
    </div>
  );
};

export default HomePage;
