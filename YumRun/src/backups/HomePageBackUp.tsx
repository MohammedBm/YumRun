// @ts-nocheck
import takeaway from "../assets/takeaway.svg";
import deliver from "../assets/deliver.svg";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const naviagte = useNavigate();
  const handleSearchSubmit = (searchFormVlaues: SearchForm) => {
    naviagte({
      pathname: `/search/${searchFormVlaues.searchQuery}`,
    });
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
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

      <div className="grid md:grid-cols-2 gap-5">
        <img src={takeaway} />
        <div className="flex flex-col item-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            Takeaway faster than you can say "YumRun"!
          </span>
          <span>
            We deliver your favorite meals from your favorite restaurants right
            to your doorstep.
          </span>
          <div className="flex item-center justify-center">
            <img src={deliver} className="item-center" width={300} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
