import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { addPage } from '../db';

interface SortableItemProps {
    id: any;
    children: React.ReactNode;
}

const SortableItem: React.FC<SortableItemProps> = ({ id, children }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {children}
        </div>
    );
};

interface Paragraph {
    id: number;
    content: string;
}

let nextId = 1;

const NewPage: React.FC = () => {
    const [title, setTitle] = useState('');
    const [paragraphs, setParagraphs] = useState<Paragraph[]>([{ id: 0, content: '' }]);
    const navigate = useNavigate();

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleAddParagraph = () => {
        setParagraphs([...paragraphs, { id: nextId++, content: '' }]);
    };

    const handleParagraphChange = (id: number, value: string) => {
        const newParagraphs = paragraphs.map(p => p.id === id ? { ...p, content: value } : p);
        setParagraphs(newParagraphs);
    };

    const handleRemoveParagraph = (id: number) => {
        const newParagraphs = paragraphs.filter(p => p.id !== id);
        setParagraphs(newParagraphs);
    };

    const handleDragEnd = (event: { active: any; over: any; }) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setParagraphs((items) => {
                const oldIndex = items.findIndex(item => item.id === active.id);
                const newIndex = items.findIndex(item => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const handleSave = async () => {
        await addPage({ title, paragraphs: paragraphs.map(p => p.content) });
        navigate('/');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">New Page</h1>
            <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={paragraphs.map(p => p.id)} strategy={verticalListSortingStrategy}>
                    {paragraphs.map((paragraph, index) => (
                        <SortableItem key={paragraph.id} id={paragraph.id}>
                            <div className="mb-4">
                                <label htmlFor={`paragraph-${paragraph.id}`} className="block text-gray-700 text-sm font-bold mb-2">Paragraph {index + 1}</label>
                                <textarea
                                    id={`paragraph-${paragraph.id}`}
                                    value={paragraph.content}
                                    onChange={(e) => handleParagraphChange(paragraph.id, e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
                                />
                                <button
                                    onClick={() => handleRemoveParagraph(paragraph.id)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mt-2"
                                >
                                    Remove
                                </button>
                            </div>
                        </SortableItem>
                    ))}
                </SortableContext>
            </DndContext>

            <button
                onClick={handleAddParagraph}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
                Add Paragraph
            </button>
            <button
                onClick={handleSave}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Save
            </button>
        </div>
    );
};

export default NewPage;
