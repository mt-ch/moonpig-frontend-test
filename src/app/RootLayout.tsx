import { NavLink, Outlet, useNavigation } from "react-router-dom";
import { paths } from "./paths";

import Logo from "../assets/img/moonpig-logo.png";
import Image from "../components/ui/image";
import Loader from "../components/ui/loader";

export function RootLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="w-full h-full">
      <nav
        className="flex items-center justify-between border-b border-gray-200 fixed top-0 left-0 right-0 bg-white z-10 py-4 px-4 lg:px-8 h-18"
        aria-label="Main"
      >
        <NavLink to={paths.products} end>
          <Image src={Logo} alt="Moonpig Logo" className="w-32 h-auto object-contain" />
        </NavLink>
      </nav>
      <main className="max-w-7xl mx-auto bg-white px-4 pt-22 pb-8 lg:px-8 lg:pt-34 lg:pb-16 h-full min-h-screen flex flex-col" aria-busy={isLoading}>
        {isLoading ? (
          <div className="flex flex-col flex-1 items-center justify-center">
            <Loader />
          </div>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
}
