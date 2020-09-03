import React from 'react';

//antd
import { Row, Input, Typography } from 'antd';
//components
import DriverCard from '../../components/DriverCard';

const { Search } = Input;
const { Title } = Typography;

const data = [];
const _TENTAIXE = ['NGUYỄN VĂN A', 'NGUYỄN VĂN B', 'NGUYỄN VĂN C', 'NGUYỄN VĂN D', 'NGUYỄN VĂN E'];
const _DIACHI = ['41 Sơn Tây, Kim Mã', '14 Nguyễn Trãi, Thanh Xuân', '66 Hồ Mê Trì, Từ Liêm', '25 Mễ Trì, Từ Liêm', '21 Nguyễn Văn Trác, Hà Đông'];
const _SODIENTHOAI = ['0963255692', '0968526584', '0357012598', '0975153548', '0972351568'];
const _HINHANH = ['taixe1.jpeg', 'taixe2.jpeg', 'taixe3.jpeg', 'taixe4.jpeg', 'taixe5.jpeg']

for (let i = 0; i < 5; i++) {
    data.push({
        key: i,
        ten_tai_xe: _TENTAIXE[i],
        trong_tai: i + 1 + ' tấn',
        dia_chi: _DIACHI[i],
        so_dien_thoai: _SODIENTHOAI[i],
        hinh_anh: _HINHANH[i]
    });
}

const Drivers = () => {
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
                <Title level={2}>Tài xế</Title>
                <Search
                    size="large"
                    style={{ width: 400 }}
                    placeholder="Tìm kiếm"
                    onSearch={value => console.log(value)}
                    enterButton />
            </div>
            <Row gutter={[16, 16]}>
                {
                    data.map(item => {
                        return (
                            <DriverCard key={item.key} driver={item} />
                        )
                    })
                }
            </Row>
        </>
    )
}

export default Drivers;
