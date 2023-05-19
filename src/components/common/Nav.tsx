import { Form, Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionLink = motion(Link);
const MotionForm = motion(Form);

function Nav({ hideLogo = false, query }: { hideLogo?: boolean; query?: string }) {
  return (
    <nav className="w-full h-20 bg-white sticky top-0">
      <section className="max-w-5xl h-full mx-auto flex items-center">
        {!hideLogo && (
          <MotionLink to="/" className="block text-2xl font-bold font-display leading-none" layoutId="logo">
            dut.life
          </MotionLink>
        )}
        {!hideLogo && (
          <MotionForm className="max-w-2xl w-full ml-12" action="/search" layoutId="searchForm">
            <input
              className="bg-gray-100 text-md font-normal outline-none px-4 py-2.5 rounded-xl flex w-full"
              name="q"
              placeholder="유저, 작품, 또는 커뮤니티 글 검색"
              defaultValue={query}
            />
          </MotionForm>
        )}
      </section>
    </nav>
  );
}

export default Nav;
