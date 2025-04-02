'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Logo = () => {
    const router = useRouter();

    return(
        <Image
            alt="Logo"
            className='sm:w-25 cursor-pointer ml-5'
            height="100"
            width="100"
            src="/images/logo.png"
        />
    )
}

export default Logo;