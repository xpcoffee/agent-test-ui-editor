import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPage, type Page } from '../db';

const PageView: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [page, setPage] = useState<Page | null>(null);

    useEffect(() => {
        const fetchPage = async () => {
            const pageData = await getPage(Number(id));
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
            <div>
                {page.paragraphs.map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                ))}
            </div>
        </div>
    );
};

export default PageView;
