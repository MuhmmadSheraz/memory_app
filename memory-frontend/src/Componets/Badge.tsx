import React from 'react';

export const Badge = () => {
    return (
        <span
            onClick={(e) => {
                e.stopPropagation(); // will stop listen to card wrapper if click on badge
            }}
            className="bg-blue-100 my-1 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-200 dark:text-blue-800"
        >
            Default
        </span>
    );
};
