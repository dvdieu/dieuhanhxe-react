import React from 'react';

//layouts
import BasicLayout from '../../../../layouts/BasicLayout';
//components
import Confirm from '../../components/Confirm';


const CreatePost = () => {
    return (
        <Confirm />
    )
}

CreatePost.Layout = BasicLayout;

export default CreatePost;