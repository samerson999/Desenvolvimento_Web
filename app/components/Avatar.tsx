'use client';

import Image from "next/image"

const Avatar = () => {
    return ( 
        <Image
          className="bg-blue-900 rounded-full py-0"  
          height="30"
          width="30"
          alt="Avatar"
          src="/images/Avatar.png"
        />
     );
}
 
export default Avatar;