import Image from "next/image";

const Loading = () => {
  return (
    // <div className='flex h-full min-h-full items-center justify-center fixed inset-0 bg-black bg-opacity-50 z-50'>
    //   <div className="loader"></div>
    // </div>
    // <div className="w-screen h-screen flex gap-4 p-4 flex-wrap justify-center items-center">
    //   {/* <img className="w-20 h-20 animate-spin" src="https://www.svgrepo.com/show/448500/loading.svg" alt="Loading icon" /> */}
    //   {/* <img className="w-20 h-20 animate-spin" src="https://www.svgrepo.com/show/173880/loading-arrows.svg" alt="Loading icon" /> */}
    //   {/* <img className="w-20 h-20 animate-spin" src="https://www.svgrepo.com/show/491270/loading-spinner.svg" alt="Loading icon" /> */}
    //   {/* <img className="w-20 h-20 animate-spin" src="https://www.svgrepo.com/show/474682/loading.svg" alt="Loading icon" /> */}
    //   {/* <img className="w-20 h-20 animate-spin" src="https://www.svgrepo.com/show/169757/loading-process.svg" alt="Loading icon" /> */}
    //   {/* <img className="w-20 h-20 animate-spin" src="https://www.svgrepo.com/show/70469/loading.svg" alt="Loading icon" /> */}

      
    //   {/* <img className="w-20 h-20 animate-spin" src="https://www.svgrepo.com/show/199956/loading-loader.svg" alt="Loading icon" /> */}
    // {/* </div> */}
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="relative size-20 animate-spin">
        <Image
          src="https://www.svgrepo.com/show/199956/loading-loader.svg"
          alt="Loading icon"
          fill
          priority
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  )
}

export default Loading;

