import Image from 'next/image';
import React from 'react'

const AuthPagesHeader = () => {
  return (
    <div className="self-start flex items-center gap-1">
      <span className="relative size-12 px-3">
          <Image
              src="/images/PayFlex-Logo.jpg"
              alt="PayFlex's Logo"
              fill
              priority
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
          />
      </span>
      <h1 className='text-2xl font-bold'>PayFlex</h1>
    </div>
  )
}

export default AuthPagesHeader;