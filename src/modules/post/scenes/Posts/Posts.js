import React from 'react';
//components
import Confirm from '../../components/Confirm';
//lib
import Immutable from 'seamless-immutable';
//redux
import { useSelector } from "react-redux";
import { Table, Typography } from 'antd';

const { Title } = Typography;

const Posts = () => {
    const post_reducer = useSelector(state => state.post_reducer);
    const post = Immutable.asMutable(post_reducer, { deep: true });
    const { show_list } = post;

    return (
        <>
            {
                show_list ? <Confirm /> :
                    <>
                        <Title level={4} type="secondary">{"Lịch trình di chuyển"}</Title>
                        <Table data={null} />
                    </>
            }
        </>
    )
}

export default Posts;