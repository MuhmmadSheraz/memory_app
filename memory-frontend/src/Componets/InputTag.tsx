import React from 'react';
interface Props {
    title: string;
    onRemove?: () => void;
}
export const InputTag = ({ title, onRemove }: Props) => {
    return (
        <div className="m-1  text-xs inline-flex relative items-center font-bold leading-sm uppercase px-2 sm:px-3 py-2 bg-green-200 text-green-700 rounded-md">
            {title}
            <span className="text-white z-50 block bg-red-500 text-center  h-5 w-5 ml-1 sm:ml-4 p-1 pt-[2px] rounded-full">
                x
            </span>
        </div>
    );
};
