import React, { useReducer } from 'react';
//antd
import { Table } from 'antd';
//table
import useTable from './useTable';
import useSearch from './useSearch';
//hook
import fleetState from './fleetState';

const Fleets = () => {
    //state
    const { reducer_state, initial_state } = fleetState();
    const [state, dispatchState] = useReducer(reducer_state, initial_state);
    const { data_source, pagination } = state;

    const { columns, handleTableChange, onRow } = useTable({ pagination });
    const { fetch_fleets } = useSearch({ dispatchState });
    //pagination
    const { total_items, page_number, page_size } = pagination;

    return (
        <>
            <Table
                rowSelection={null}
                rowKey="id"
                columns={columns}
                dataSource={data_source}
                // scroll={{ x: 1300 }}
                pagination={{ current: page_number, pageSize: page_size, total: total_items }}
                loading={fetch_fleets}
                onChange={handleTableChange}
                onRow={onRow}
            />
        </>
    )
}

export default Fleets;