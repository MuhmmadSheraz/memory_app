import React from 'react';
import { Card } from '../Componets/Card';
import { Header } from '../Componets/Header';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-100 ">
            <Header />

            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-2 px-2 ">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    );
};

export default Home;
