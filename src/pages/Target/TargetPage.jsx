import React, { useContext, useEffect, useState } from 'react';
import TargetService from '../../services/target.service';
import { GlobalContext } from '../../contexts/Global/GlobalContext';
import { GlobalSetCreateTaskForm } from '../../contexts/Global/GlobalAction';

const TargetPage = () => {
    const [targetList, setTargetList] = useState([]);
    const { dispatch, createTaskForm } = useContext(GlobalContext);

    useEffect(() => {
        if (!createTaskForm.show) {
            const getAllTargets = async () => {
                const result = await TargetService.getAllTargets();
                if (result) {
                    setTargetList(result.targets);
                }
            };
            getAllTargets();
        }
    }, [createTaskForm.show]);

    const handleUpdateTarget = (target_id) => {
        dispatch(
            GlobalSetCreateTaskForm({
                targetId: target_id,
                show: true,
                header: 'Update Target',
                formType: 'update',
                formObject: 'target',
            })
        );
    };

    return (
        <div className="target-page w-full h-full flex flex-col gap-20">
            <span className="text-header">Target</span>
            <div className="flex flex-col gap-10 w-full">
                {targetList.map((target) => {
                    return (
                        <div
                            className="flex gap-3 cursor-pointer"
                            onClick={() => {
                                handleUpdateTarget(target.id);
                            }}
                        >
                            <div className="w-20">{target.title ?? ''}</div>
                            <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-400">
                                <div
                                    class="bg-blue-600 h-2.5 rounded-full"
                                    style={{ width: `${target.progress}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TargetPage;
