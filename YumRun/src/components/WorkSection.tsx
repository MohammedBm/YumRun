import { SquareMousePointer, Truck, Utensils } from "lucide-react";
const workInfoData = [
  {
    image: <Utensils size={140} className="text-beep-100" />,
    title: "Browse & Select",
    text: "Explore our menu from top-rated restaurants.",
  },
  {
    image: <SquareMousePointer size={140} className="text-beep-100" />,
    title: "Customize & Order",
    text: "Personalize your meal and place your order with just a few taps.",
  },
  {
    image: <Truck size={140} className="text-beep-100" />,
    title: "Track & Enjoy",
    text: "Stay updated with real-time tracking from the restaurant to your doorstep",
  },
];
export const WorkSection = () => {
  return (
    <div className="mt-64 flex  justify-center flex-col ">
      <div className="flex justify-center items-center flex-col">
        <h1 className="text-center max-w-[90%] font-bold text-5xl text-gray-600">
          How It Works
        </h1>
        <p className="text-center max-w-[65%] font-semibold text-2xl mt-10 text-gray-500">
          Ordering from YumRun is simple and convenient. Follow these easy steps
          to get your favorite meals delivered right to your door:
        </p>
      </div>

      <div className="flex mt-20 justify-center items-center flex-col gap-6 md:flex-row">
        {workInfoData.map((data) => (
          <div className="flex items-center font-bold" key={data.title}>
            <div className="flex flex-col justify-center items-center text-center w-96">
              {data.image}

              <h2 className="mt-12 font-bold text-3xl text-gray-600">
                {data.title}
              </h2>
              <p className="mt-12 font-semibold text-xl text-gray-600">
                {data.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
