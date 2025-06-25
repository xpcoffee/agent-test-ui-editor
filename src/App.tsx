import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllPages } from './db';

interface Page {
    id: number;
    title: string;
    content: string;
}

const App: React.FC = () => {
    const navigate = useNavigate();
    const [pages, setPages] = useState<Page[]>([]);

    useEffect(() => {
        const fetchPages = async () => {
            const allPages = await getAllPages();
            setPages(allPages);
        };
        fetchPages();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">Pages</h1>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => navigate('/pages/new')}
                >
                    New Page
                </button>
            </div>
            <ul>
                {pages.map((page) => (
                    <li key={page.id} className="border-b py-2">
                        <a href={`/pages/${page.id}`} className="text-xl font-bold">{page.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;