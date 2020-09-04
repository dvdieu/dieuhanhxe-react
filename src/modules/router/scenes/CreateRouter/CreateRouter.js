import React, { useState } from 'react';
import Warehouses from '../../../warehouse/scenes/Warehouses';
import SetupWarehouse from '../SetupWarehouse';
import HintRouter from '../HintRouter';
import Schedule from '../../../driver/scenes/Schedule';

const CreateRouter = () => {
    const [step, setStep] = useState(0);

    return (
        <div>
            {
                // danh sach kho
                step === 0 &&
                <Warehouses onClickNext={() => setStep(1)} />
            }
            {
                //thiết lập định tuyến
                step === 1 &&
                <SetupWarehouse onClickNext={() => setStep(2)} />
            }
            {
                step === 2 &&
                <HintRouter onClickNext={() => setStep(3)} />
            }
            {
                step === 3 &&
                <Schedule onOk={() => setStep(2)} onClickPrevious={() => setStep(2)} />
            }
        </div>
    )
}

export default CreateRouter;