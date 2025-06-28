import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllPages, deletePage, type Page } from './db';

const App: React.FC = () => {
    const navigate = useNavigate();
    const [pages, setPages] = useState<Page[]>([]);

    useEffect(() => {
        fetchPages();
    }, []);

    const fetchPages = async () => {
        const allPages = await getAllPages();
        setPages(allPages);
    };

    const handleDeletePage = async (id: number) => {
        await deletePage(id);
        fetchPages();
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">Pages</h1>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => navigate('/pages/new')}
                    aria-label="New Page"
                >
                    New Page
                </button>
            </div>
            <ul>
                {pages.map((page) => (
                    <li key={page.id} className="border-b py-2 flex justify-between items-center">
                        <a href={`/pages/${page.id}`} className="text-xl font-bold">{page.title}</a>
                        <button
                            onClick={() => handleDeletePage(page.id)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;