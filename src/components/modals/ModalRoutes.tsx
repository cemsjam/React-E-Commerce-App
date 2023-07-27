import LoginModal from "./LoginModal";
import QuickviewModal from "./QuickviewModal";
import RegisterModal from "./RegisterModal";

export const modalRoutes = [
  {
    name: "login",
    element: LoginModal,
  },
  {
    name: "register",
    element: RegisterModal,
  },
  {
    name: "quickview",
    element: QuickviewModal,
  },
];
