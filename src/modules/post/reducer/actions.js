import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    setStep: ['params'],
    showList: [],
});

export const PostTypes = Types;
export default Creators;