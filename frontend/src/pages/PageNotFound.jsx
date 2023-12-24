import { Link } from "react-router-dom";
import PageNotFoundImg from "./../imgs/404.png";
import WebLogo from "./../imgs/full-logo.png";

const NotFoundPage = () => {
  return (
    <section className="h-cover relative p-10 flex flex-col items-center gap-20 text-center">
      <img
        src={PageNotFoundImg}
        alt=""
        className="select-none border-2 border-grey w-72 aspect-square object-cover rounded"
      />
      <h1 className="text-4xl font-mono leading-10 max-sm:text-3xl capitalize">
        Page not found!
      </h1>
      <p className="text-dark-grey text-xl leading-7 -mt-12">
        The page you are looking for doesn't exists. Head back to the{" "}
        <Link to={"/"} className="text-black underline">
          home page
        </Link>
      </p>
      <div className="mt-auto">
        <img
          src={WebLogo}
          alt=""
          className="h-8 object-contain block mx-auto select-none"
        />
        <p className="mt-3 text-dark-grey">
          Read millions of stories around the world
        </p>
      </div>
    </section>
  );
};

export default NotFoundPage;
