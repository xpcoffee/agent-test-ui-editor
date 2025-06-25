import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { openDB } from 'idb';

interface Page {
    id: number;
    title: string;
    content: string;
}

const PageView: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [page, setPage] = useState<Page | null>(null);

    useEffect(() => {
        const fetchPage = async () => {
            const db = await openDB('pages-db', 1);
            const pageData = await db.get('pages', Number(id));
            setPage(pageData);
        };
        fetchPage();
    }, [id]);

    if (!page) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">{page.title}</h1>
            <div>{page.content}</div>
        </div>
    );
};

export default PageView;
