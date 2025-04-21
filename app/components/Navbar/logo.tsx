"use client";

import Image from "next/image";
import Link from "next/link";

const Logo = () => {
    return (
        <Link href="/">
            <Image alt="Logo" className="w-16 sm:w-20 md:w-16 lg:w-16 xl:w-16 cursor-pointer ml-5" height="100" width="100" src="/images/logo.png" />
        </Link>
    );
};
export default Logo;
