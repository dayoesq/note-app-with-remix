interface INote {
    id: string;
    title: string;
    content: string;
}

type Notes = {
    notes: INote[];
};
