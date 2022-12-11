import type { LinksFunction, LoaderArgs, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { getStoredNotes } from '~/data/notes';

import styles from '~/styles/note-details.css';

export default function NoteDetailsPage() {
    const note = useLoaderData();
    return (
        <main id='note-details'>
            <header>
                <nav>
                    <Link to='/notes'>Back to all notes</Link>
                </nav>
                <h1>{note.title}</h1>
            </header>
            <p id='note-details-content'>{note.content}</p>
        </main>
    );
}

export const loader = async ({ params }: LoaderArgs) => {
    const notes = await getStoredNotes();
    const selectedNote = notes.find((note: INote) => note.id === params.noteId);
    if (!selectedNote) {
        throw json({
            message: `The selected note with id: ${params.noteId} could not be found`,
            status: 404
        });
    }
    return selectedNote;
};

export const meta: MetaFunction = ({ data }) => {
    return { title: data.title, description: data.content };
};

export const links: LinksFunction = () => {
    return [{ rel: 'stylesheet', href: styles }];
};
