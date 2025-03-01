import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  incrementByAmount,
} from "../../store/slicers/counterSlicer";

import { useTranslation } from "react-i18next";
import { Button } from "@heroui/button";

import { toast } from "react-toastify";
function Home() {
  const { t, i18n } = useTranslation();
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div className="text-center p-5 ">
      <h1 className="text-[50px] border-b border-gray-600 ">
        texting Redux Toolkit
      </h1>
      <h1 className="text-3xl font-bold">Counter: {count}</h1>
      <div className="mt-4 flex justify-center gap-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => dispatch(incrementByAmount(5))}
        >
          +5
        </button>
      </div>
      <div className="text-center mt-10">
        <h1 className="text-2xl font-bold">{t("welcome")}</h1>
        <label className="block mt-4">{t("language")}:</label>
        <select
          className="border px-3 py-2 mt-2"
          value={i18n.language}
          onChange={(e) => i18n.changeLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="ps">پښتو (Pashto)</option>
          <option value="fa">دری (Dari)</option>
        </select>
      </div>
      <div className="my-5 flex items-center justify-center ">
        <Button
          onPress={() => {
            toast.success("i am clicked");
          }}
        >
          Click me to show toast
        </Button>
      </div>
    </div>
  );
}

export default Home;
