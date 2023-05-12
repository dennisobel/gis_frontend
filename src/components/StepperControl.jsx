import { useEffect, useState } from "react";
import { useStepperContext } from "../contexts/StepperContext";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function StepperControl({ handleClick, currentStep, steps }) {
  const [showPasswordMismatchToast, setShowPasswordMismatchToast] =
    useState(false);
  const state = useSelector((state) => state);

  useEffect(() => {
    if (
      currentStep === 3 &&
      state.global.multiStepSignup.userData.accountInformation.password !==
        state.global.multiStepSignup.userData.accountInformation
          .confirmPassword &&
      !showPasswordMismatchToast
    ) {
      toast.warn(
        "Your passwords do not match. The 'NEXT' button will be disabled till you get them to match"
      );
      setShowPasswordMismatchToast(true);
    }
  }, [
    state.global.multiStepSignup.userData.accountInformation.confirmPassword,
  ]);

  return (
    <div className="container mt-4 mb-8 flex justify-around">
      <ToastContainer />
      <button
        onClick={() => handleClick()}
        className={`cursor-pointer rounded-xl border-2 border-slate-300 bg-white py-2 px-4 font-semibold uppercase text-slate-400 transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white  ${
          currentStep === 1 ? " cursor-not-allowed opacity-50 " : ""
        }`}
      >
        Back
      </button>

      <button
        disabled={
          currentStep === 5 &&
          !state.global.multiStepSignup.userData.reviewAccept.terms
        }
        onClick={() => handleClick("next")}
        className={`rounded-lg py-2 px-4 font-semibold uppercase transition duration-200 ease-in-out
              ${
                (currentStep === 5 &&
                  !state.global.multiStepSignup.userData.reviewAccept.terms) ||
                (currentStep === 3 &&
                  state.global.multiStepSignup.userData.accountInformation
                    .password !==
                    state.global.multiStepSignup.userData.accountInformation
                      .confirmPassword)
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                  : "bg-teal-500 text-white cursor-pointer hover:bg-slate-700 hover:text-white"
              }
            `}
      >
        {currentStep === steps.length - 1 ? "Confirm" : "Next"}
      </button>
    </div>
  );
}
