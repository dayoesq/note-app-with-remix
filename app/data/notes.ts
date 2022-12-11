import fs from 'fs/promises';
import * as path from 'path';

const resolvePath = (directory: string) => {
    return path.join(process.cwd(), directory);
};

export const getStoredNotes = async () => {
    const rawFileContent = await fs.readFile(resolvePath('app/notes.json'), {
        encoding: 'utf-8'
    });
    const data = JSON.parse(rawFileContent);
    const storedNotes = data.notes ?? [];
    return storedNotes;
};

export const storeNotes = (notes: INote[]) => {
    return fs.writeFile(
        resolvePath('app/notes.json'),
        JSON.stringify({ notes: notes || [] })
    );
};
