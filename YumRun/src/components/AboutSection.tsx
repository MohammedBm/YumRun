import Hero from "../assets/food.svg";

export const AboutSection = () => {
  return (
    <div className="mt-64  relative flex items-center justify-center flex-col md:flex-row ">
      <div className="flex ">
        <img src={Hero} alt="" />
      </div>
      <div className="flex justify-center flex-1 flex-col">
        <p className="font-extrabold text-beep-100 text-2xl">About</p>
        <h1 className="text-[clamp(2rem,4vw,3.5rem)] text-gray-500 max-w-[700px]">
          Food Is An Important Part Of A Balanced Diet
        </h1>
        <p className="text-[clamp(1rem,3vw,1.4rem)] max-w-[500px]  text-gray-500 my-6">
          YumRun, we believe that great food should be convenient and
          accessible.
        </p>
        <p className="text-[clamp(1rem,3vw,1.4rem)] max-w-[500px]  text-gray-500 my-6">
          Founded with a passion for culinary excellence, we partner with the
          best local restaurants to bring you a diverse selection of
          mouthwatering dishes
        </p>
      </div>
    </div>
  );
};
