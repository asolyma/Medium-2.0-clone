/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex justify-between p-5 max-w-7xl mx-auto">
      <div className="flex space-x-2">
        <Link href={"/"} passHref>
          <a>
            <img
              className="w-44 object-contain "
              src="/Medium-Logo-Black-RGB@4x.png"
              alt=""
            />
          </a>
        </Link>
        <div className=" hidden sm:flex space-x-5 justify-center items-center">
          <h3>About</h3>
          <h3>Contact</h3>
          <h3 className="text-white bg-green-600 rounded-full px-2 py-1">
            Follow
          </h3>
        </div>
      </div>
      <div className="flex items-center space-x-5 text-green-600">
        <h3>Signin</h3>
        <h3 className="border px-4 py-1 border-green-600 rounded-full min-w-fit">
          Get Started
        </h3>
      </div>
    </header>
  );
};

export default Header;
