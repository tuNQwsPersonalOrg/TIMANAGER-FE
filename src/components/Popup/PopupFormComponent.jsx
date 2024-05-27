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
import { convertTime, formatDate, formatTime } from '../../utils/DateTimeUtil';
import TargetService from '../../services/target.service';
import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers';

const PopupFormComponent = () => {
    const { selectedDate, createTaskForm, dispatch } =
        useContext(GlobalContext);
    const [title, setTitle] = useState(createTaskForm?.title);
    const [startTime, setStartTime] = useState(
        formatTime(createTaskForm.startTime)
    );
    const [endTime, setEndTime] = useState(formatTime(createTaskForm.endTime));
    const [target, setTarget] = useState({
        id: null,
        title: 'None',
    });
    const [targetList, setTargetList] = useState([]);
    const [deadline, setDeadline] = useState(dayjs());
    const [progress, setProgress] = useState(0);
    const [targetTitle, setTargetTitle] = useState('');
    const [fetchTime, setFetchTime] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);
    const [date, setDate] = useState(createTaskForm.date);

    const handleCancel = () => {
        dispatch(GlobalSetCreateTaskForm({ show: false }));
        // popup.onCancel?.();
    };

    const handleDelete = async () => {
        if (createTaskForm.formObject !== 'target') {
            const result = await TaskService.deleteTask(
                createTaskForm.taskId ?? null
            );
            console.log(result);
            if (result) {
                alert('Delete task successfully');
            }
        } else {
            const result = await TargetService.deleteTarget(
                createTaskForm.targetId ?? null
            );
            console.log(result);
            if (result) {
                alert('Delete target successfully');
            }
        }
        handleCancel();
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (createTaskForm.formType === 'add' || !createTaskForm.formType) {
            if (createTaskForm.formObject !== 'target') {
                const result = await TaskService.createTask({
                    title: title,
                    date: formatDate(date),
                    start_time: startTime,
                    end_time: endTime,
                    notes: null,
                    target_id: target.id,
                });
                console.log(result);
                if (result) {
                    alert('Create task successfully');
                }
            } else {
                const result = await TargetService.createTarget({
                    title: targetTitle,
                    deadline: deadline.format('YYYY-MM-DD HH:mm:ss'),
                    notes: null,
                });
                console.log(result);
                if (result) {
                    alert('Create target successfully');
                }
            }
        } else if (createTaskForm.formType === 'update') {
            if (createTaskForm.formObject !== 'target') {
                const result = await TaskService.updateTask(
                    createTaskForm.taskId,
                    {
                        title: title,
                        date: formatDate(date),
                        start_time: formatTime(convertTime(startTime)),
                        end_time: formatTime(convertTime(endTime)),
                        notes: null,
                        target_id: target.id,
                    }
                );

                if (result) {
                    alert('Update task successfully');
                }
            } else {
                const result = await TargetService.updateTarget(
                    createTaskForm.targetId,
                    {
                        title: targetTitle,
                        deadline: deadline.format('YYYY-MM-DD HH:mm:ss'),
                        progress: progress,
                        notes: null,
                    }
                );

                if (result) {
                    alert('Update target successfully');
                }
            }
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
        const getTaskDetail = async (task_id) => {
            setIsLoading(true);
            const result = await TaskService.getTaskDetail(task_id);
            console.log('task detail', result.task.title);
            if (result) {
                setTitle(result.task.title);
                setStartTime(result.task.start_time);
                setEndTime(result.task.end_time);
                setTarget({
                    id: result.task.target.id ?? null,
                    title: result.task.target.title ?? 'None',
                });
                setDate(result.task.start_time);
            }
            setIsLoading(false);
        };

        const getTargetDetail = async (target_id) => {
            setIsLoading(true);
            const result = await TargetService.getTargetDetail(target_id);
            if (result) {
                setProgress(result.target.progress);
                setTargetTitle(result.target.title);
                setDeadline(dayjs(result.target.deadline));
            }
            setIsLoading(false);
        };

        try {
            setIsLoading(true);
            getAllTargets();
            if (createTaskForm.taskId) getTaskDetail(createTaskForm.taskId);
            if (createTaskForm.targetId)
                getTargetDetail(createTaskForm.targetId);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
            setFetchTime(new Date());
        }
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
                            key={fetchTime}
                            value={
                                createTaskForm.formObject === 'target'
                                    ? targetTitle
                                    : title
                            }
                            // required
                            onChange={
                                createTaskForm.formObject === 'target'
                                    ? setTargetTitle
                                    : setTitle
                            }
                            placeholder="Title..."
                            reset
                        />
                    </div>
                    {createTaskForm.formObject !== 'target' ? (
                        <>
                            <div className="flex items-center justify-between gap-8 w-full">
                                <span className="">Date</span>
                                <TextboxComponent
                                    className="w-[85%]"
                                    key={fetchTime}
                                    value={dayjs(date).format('DD/MM/YYYY')}
                                    disabled
                                    reset
                                    // required
                                    // onChange={setTitle}
                                    placeholder="Date"
                                />
                            </div>
                            <div className="flex items-center justify-between gap-8 w-full">
                                <span className="">Target</span>
                                <SelectSingleComponent
                                    key={fetchTime}
                                    className="w-[85%]"
                                    defaultValue={target.title}
                                    options={targetList ?? []}
                                    renderKey="title"
                                    valueKey="id"
                                    placeholder="Target"
                                    onSelect={(option) => {
                                        setTarget({
                                            title: option.title,
                                            id: option.id,
                                        });
                                        setTitle(option.title);
                                    }}
                                    nullable
                                    actionOption="Add new target..."
                                    onAction={() => {
                                        dispatch(
                                            GlobalSetCreateTaskForm({
                                                show: true,
                                                header: 'Add target',
                                                formObject: 'target',
                                            })
                                        );
                                    }}
                                />
                            </div>

                            <div className="grid grid-cols-3 gap-10">
                                {/* {startTime ? (
                                    <> */}
                                <SelectSingleComponent
                                    key={startTime}
                                    className="w-full"
                                    options={timeListOption}
                                    renderKey="display"
                                    valueKey="id"
                                    placeholder="Start Time"
                                    defaultValue={convertTime(startTime)}
                                    onSelect={(option) =>
                                        setStartTime(formatTime(option.display))
                                    }
                                />
                                <SelectSingleComponent
                                    key={endTime + 'e'}
                                    className="w-full"
                                    options={timeListOption}
                                    renderKey="display"
                                    valueKey="id"
                                    placeholder="End Time"
                                    defaultValue={convertTime(endTime)}
                                    onSelect={(option) =>
                                        setEndTime(formatTime(option.display))
                                    }
                                    nullable
                                />
                                {/* </>
                                ) : null} */}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center justify-between gap-8 w-full">
                                <span className="">Deadline</span>
                                <DateTimePicker
                                    className="w-[85%]"
                                    value={deadline}
                                    onChange={(newValue) => {
                                        setDeadline(newValue);
                                        console.log(
                                            newValue.format(
                                                'YYYY-MM-DD HH:mm:ss'
                                            )
                                        );
                                    }}
                                />
                            </div>
                            <div className="flex items-center justify-between gap-8 w-full">
                                <span className="">Progress</span>
                                <TextboxComponent
                                    key={fetchTime}
                                    inputType="number"
                                    className="w-[85%]"
                                    value={progress}
                                    // required
                                    onChange={setProgress}
                                    reset
                                    max={100}
                                    min={0}
                                />
                            </div>
                        </>
                    )}
                </div>

                <div className="popup-footer">
                    <div className="flex w-full justify-end px-4 py-2">
                        {/* <ButtonComponent type="submit" label={'Save'} /> */}
                        <button
                            type="submit"
                            className="flex justify-center items-center bg-[#3A6DEE] px-8 py-[0.75rem] rounded-md"
                            disabled={isLoading}
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
