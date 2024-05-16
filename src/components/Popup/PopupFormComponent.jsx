import React, { useContext, useEffect, useState } from 'react';
import './styles.css';
import ReactDOM from 'react-dom';
import { IconClose, IconTrashBin } from '../../icons';
import { GlobalContext } from '../../contexts/Global/GlobalContext';
import { GlobalSetCreateTaskForm } from '../../contexts/Global/GlobalAction';
import { timeListDetail, timeListOption } from '../../constants';
// import TextboxComponent from '../Textbox/TextboxComponent';
// import ButtonComponent from '../Button/ButtonComponent';
import { useNavigate } from 'react-router-dom';
import TextboxComponent from '../Textbox/TextboxComponent';
import SelectSingleComponent from '../Select/SelectSingleComponent';
import TaskService from '../../services/task.service';
import { formatDate, formatTime } from '../../utils/DateTimeUtil';
import TargetService from '../../services/target.service';

const PopupFormComponent = () => {
    const { selectedDate, createTaskForm, dispatch } =
        useContext(GlobalContext);
    const [title, setTitle] = useState('');
    const [startTime, setStartTime] = useState(
        formatTime(createTaskForm.startTime)
    );
    const [endTime, setEndTime] = useState(formatTime(createTaskForm.endTime));
    const [targetId, setTargetId] = useState(null);
    const navigate = useNavigate();
    const [targetList, setTargetList] = useState([]);

    const handleCancel = () => {
        dispatch(GlobalSetCreateTaskForm({ show: false }));
        // popup.onCancel?.();
    };

    const handleDelete = async () => {
        const result = await TaskService.deleteTask(createTaskForm.taskId);
        console.log(result);
        if (result) {
            alert('Delete task successfully');
        }
        handleCancel();
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (createTaskForm.formType === 'add') {
            const result = await TaskService.createTask({
                title: title,
                date: formatDate(selectedDate),
                start_time: startTime,
                end_time: endTime,
                notes: null,
                target_id: targetId,
            });
            console.log(result);
            if (result) {
                alert('Create task successfully');
            }
        } else if (createTaskForm.formType === 'update') {
            // const result = await TaskService.deleteTask(createTaskForm.taskId);
            // console.log(result);
            // if (result) {
            //     alert('Create task successfully');
            // }
        }
        // createTaskForm.onSave();
        handleCancel();
    };

    useEffect(() => {
        const getAllTargets = async () => {
            const result = await TargetService.getAllTargets();
            if (result) {
                setTargetList(result.targets);
            }
        };
        getAllTargets();
    }, []);

    // if (!popup.show || popup.target !== popupTarget.createPodcastForm)
    //     return null;
    return ReactDOM.createPortal(
        <div className="popup-component">
            <form className="popup-form-container" onSubmit={onSubmit}>
                <div className="popup-header">
                    <span className="text-xl font-bold">
                        {createTaskForm.header}
                    </span>

                    <div className="popup-header-close" onClick={handleCancel}>
                        <IconClose className="popup-header-close-icon h-5 w-5" />
                    </div>
                    {createTaskForm.formType === 'update' ? (
                        <div
                            className="relative w-5 top-0 left-0"
                            onClick={handleDelete}
                        >
                            <IconTrashBin
                                fill="red"
                                className="cursor-pointer h-5 w-5"
                            />
                        </div>
                    ) : null}
                </div>

                <div className="popup-body pr-24 gap-6">
                    <div className="flex items-center justify-between gap-8 w-full">
                        <span className="">Title</span>
                        <TextboxComponent
                            className="w-[85%]"
                            // key={new Date()}
                            value={title}
                            // required
                            onChange={setTitle}
                            placeholder="Title..."
                        />
                    </div>
                    <div className="flex items-center justify-between gap-8 w-full">
                        <span className="">Date</span>
                        <TextboxComponent
                            className="w-[85%]"
                            // key={new Date()}
                            value={createTaskForm.date}
                            disabled
                            // required
                            // onChange={setTitle}
                            // placeholder="Title..."
                        />
                    </div>
                    <div className="flex items-center justify-between gap-8 w-full">
                        <span className="">Target</span>
                        <SelectSingleComponent
                            // key={clearTime}
                            className="w-[85%]"
                            options={targetList ?? []}
                            renderKey="title"
                            valueKey="id"
                            placeholder="Target"
                            onSelect={(option) => {
                                setTargetId(option.id);
                            }}
                            nullable
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-10">
                        <SelectSingleComponent
                            // key={clearTime}
                            className="w-full"
                            options={timeListOption}
                            renderKey="display"
                            valueKey="id"
                            placeholder="Start Time"
                            defaultValue={createTaskForm.startTime}
                            onSelect={(option) =>
                                setStartTime(formatTime(option.display))
                            }
                            nullable
                        />
                        <SelectSingleComponent
                            // key={clearTime}
                            className="w-full"
                            options={timeListOption}
                            renderKey="display"
                            valueKey="id"
                            placeholder="End Time"
                            onSelect={(option) =>
                                setEndTime(formatTime(option.display))
                            }
                            nullable
                        />
                    </div>
                </div>

                <div className="popup-footer">
                    <div className="flex w-full justify-end px-4 py-2">
                        {/* <ButtonComponent type="submit" label={'Save'} /> */}
                        <button
                            type="submit"
                            className="flex justify-center items-center bg-[#3A6DEE] px-8 py-[0.75rem] rounded-md"
                        >
                            <span className="text-white">Save</span>
                        </button>
                    </div>
                </div>
            </form>
        </div>,
        document.body
    );
};

export default PopupFormComponent;
