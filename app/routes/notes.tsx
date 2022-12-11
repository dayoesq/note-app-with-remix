import type {
    ActionArgs,
    LinksFunction,
    LoaderFunction,
    MetaFunction
} from '@remix-run/node';
import { redirect } from '@remix-run/node';
import NoteList, { links as noteListLink } from '~/components/NoteList';
import styles from '../styles/new-note.css';
import { getStoredNotes, storeNotes } from '~/data/notes';
import {
    Form,
    useActionData,
    useLoaderData,
    useTransition
} from '@remix-run/react';

export default function NotesPage() {
    const notes = useLoaderData();
    const navigation = useTransition();
    const data = useActionData();
    const isSubmitting = navigation.state === 'submitting';
    return (
        <main>
            <Form method='post' id='note-form'>
                {data?.message && (
                    <p style={{ color: 'red' }}>{data.message}</p>
                )}
                <p>
                    <label htmlFor='title'>Title</label>
                    <input type='text' id='title' name='title' required />
                </p>
                <p>
                    <label htmlFor='content'>Content</label>
                    <textarea id='content' name='content' rows={5} required />
                </p>
                <div className='form-actions'>
                    <button disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Add Note'}
                    </button>
                </div>
            </Form>
            <NoteList notes={notes} />
        </main>
    );
}

export const loader: LoaderFunction = async () => {
    const notes = await getStoredNotes();
    return notes;
};

export const action = async ({ request }: ActionArgs) => {
    const formData = await request.formData();
    const noteData = Object.fromEntries(formData);

    if (noteData.title.toString().trim().length < 5) {
        return { message: 'The title is too short.' };
    }
    const existingNotes = await getStoredNotes();
    noteData.id = new Date().toISOString();
    const updatedNotes = existingNotes.concat(noteData);
    await storeNotes(updatedNotes);
    return redirect('/notes');
};

export const meta: MetaFunction = () => {
    return { title: 'All notes', description: 'All your notes in one place' };
};

export const links: LinksFunction = () => {
    return [...noteListLink(), { rel: 'stylesheet', href: styles }];
};
