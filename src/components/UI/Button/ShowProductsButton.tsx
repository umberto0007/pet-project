import React from "react";

const ShowProductsButton = () => {
    return (
        <div className='absolute top-1/2 left-[231px] -translate-y-1/2 z-10'>
            <button className="
                        relative
                        bg-purple-600
                        hover:scale-[1.05]
                        transition duration-300 ease-in-out
                        tracking-wide
                        rounded-md
                        px-6 py-5
                        text-white
                        whitespace-nowrap
                        before:absolute
                        before:top-1/2
                        before:-left-2
                        before:-translate-y-1/2
                        before:content-['']
                        before:border-y-[12px]
                        before:border-y-transparent
                        before:border-r-[10px]
                      before:border-purple-600
                      "
            >
                Показать товары
            </button>
        </div>
    )
}

export default ShowProductsButton;