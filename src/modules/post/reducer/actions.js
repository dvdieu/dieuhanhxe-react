import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    setStep: ['params'],
});

export const PostTypes = Types;
export default Creators;