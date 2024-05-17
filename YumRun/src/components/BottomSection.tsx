import takeaway from "../assets/takeaway.svg";
import deliver from "../assets/deliver.svg";

export const BottomSection = () => {
  return (
    <div className="mt-64 mb-24 grid md:grid-cols-2 gap-5">
      <img src={takeaway} />
      <div className="flex flex-col item-center justify-center gap-4 text-center">
        <span className="font-bold text-3xl tracking-tighter text-beep-100">
          Takeaway faster than you can say "YumRun"!
        </span>
        <span className="text-gray-600">
          We deliver your favorite meals from your favorite restaurants right to
          your doorstep.
        </span>
        <div className="flex item-center justify-center">
          <img src={deliver} className="item-center" width={300} />
        </div>
      </div>
    </div>
  );
};
