import React from 'react';
import {
    BsFillBookmarkFill,
    BsHeartFill,
    BsFillArrowLeftCircleFill
} from 'react-icons/bs';
import { FaComment } from 'react-icons/fa';
import { InputTag } from '../Componets/InputTag';

const MemoryDetail = () => {
    return (
        <div className="flex  flex-col md:flex-row">
            <img
                className="h-[50vh] md:min-h-screen w-full md:w-1/2"
                src="https://images.ctfassets.net/hrltx12pl8hq/4NhtYxiAxVzEzQQVFl5c0h/e70608b02fa41bd0841a56824e78bbff/UHP-Abstract-_0_00_00_00_.jpg?fit=fill&w=1200&h=630"
            />
            <BsFillArrowLeftCircleFill
                className="absolute top-5 left-5 bg-transparent text-gray-100 cursor-pointer"
                size={40}
            />
            <div className="flex flex-col mt-2 px-3 lg:px-5 w-full md:w-1/2 mb-2">
                <h1 className="text-3xl lg:text-4xl font-semibold text-center mt-5">
                    Memory Title
                </h1>
                <h3 className="text-base lg:text-lg mt-5 text-clip">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Obcaecati ut illo voluptate corrupti perspiciatis
                    blanditiis?F Lorem ipsum, dolor sit amet consectetur
                    adipisicing elit. Enim totam dolores placeat nihil unde
                    rerum sed magnam illo, voluptatem laborum quaerat
                    repudiandae eum molestias nisi perspiciatis iure, labore
                    commodi consectetur?
                </h3>
                <div className="mt-5">
                    <InputTag title="Beautiful" />
                    <InputTag title="Beautiful" />
                    <InputTag title="Beautiful" />
                    <InputTag title="Beautiful" />
                    <InputTag title="Beautiful" />
                    <InputTag title="Beautiful" />
                </div>
                <div className="flex items-center justify-between mt-5">
                    <div className="flex space-x-4 items-center">
                        <BsHeartFill
                            size={24}
                            className="text-gray-300 hover:text-red-500 hover:scale-125 transition-all transform ease-out duration-200 cursor-pointer"
                        />
                        <div className="mx-2 my-3 text-sm lg:text-base">
                            <p>
                                Liked by
                                <span className="font-semibold">
                                    {' '}
                                    Hamza and 254 others
                                </span>
                            </p>
                        </div>
                    </div>
                    <BsFillBookmarkFill
                        size={24}
                        className="text-gray-300 hover:text-red-500 hover:scale-125 transition-all transform ease-out duration-200 cursor-pointer"
                    />
                </div>
                {/* Add UI Comments later */}
                <div className="mt-20 font-semibold text-center text-cyan-500">
                    <h1>Comments Comming Soon...</h1>
                </div>
            </div>
        </div>
    );
};

export default MemoryDetail;
