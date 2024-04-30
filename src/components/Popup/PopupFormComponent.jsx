import React, { useContext, useState } from 'react';
import './styles.css';
import ReactDOM from 'react-dom';
import { IconClose, IconDangerous, IconInfo, IconWarning } from '../../icons';
import groupClass from '../../utils/ClassNameUtil';
import { GlobalContext } from '../../contexts/Global/GlobalContext';
import {
    GlobalSetCreateTaskForm,
    GlobalSetPopup,
} from '../../contexts/Global/GlobalAction';
import { popupTarget, timeList, timeListDisplay } from '../../constants';
// import TextboxComponent from '../Textbox/TextboxComponent';
// import ButtonComponent from '../Button/ButtonComponent';
import { useNavigate } from 'react-router-dom';
import TextboxComponent from '../Textbox/TextboxComponent';
import SelectSingleComponent from '../Select/SelectSingleComponent';

const PopupFormComponent = () => {
    const { createTaskForm, dispatch, fetchAPI } = useContext(GlobalContext);
    const [title, setTitle] = useState('');
    const [audioUrl, setAudioUrl] = useState('');
    const navigate = useNavigate();

    const handleCancel = () => {
        dispatch(GlobalSetCreateTaskForm({ show: false }));
        // popup.onCancel?.();
    };

    // const handleCreatePodcast = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const result = await fetchAPI(() =>
    //             PodcastService.createPodcast({
    //                 name: title,
    //                 podcast: audioUrl,
    //                 user: '6612148ab130b8ad6c70e2a3',
    //             })
    //         );
    //         console.log(result);
    //         if (result) {
    //             dispatch(
    //                 GlobalSetPopup({
    //                     type: 'info',
    //                     header: 'Create Podcast',
    //                     confirmMessage: 'Successfully create new podcast!',
    //                     show: true,
    //                     target: popupTarget.common,
    //                     onConfirm: () =>
    //                         navigate('/my-channel', {
    //                             state: {
    //                                 createdAt: Date.now(),
    //                             },
    //                         }),
    //                 })
    //             );
    //             popup.onConfirm?.();
    //         } else {
    //             dispatch(
    //                 GlobalSetPopup({
    //                     type: 'error',
    //                     header: 'Create Podcast',
    //                     confirmMessage:
    //                         'Something went wrong, please try again!',
    //                     target: popupTarget.common,
    //                     message:
    //                         'Maybe your data is in incorrect value format.',
    //                     show: true,
    //                 })
    //             );
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    console.log(title);
    // if (!popup.show || popup.target !== popupTarget.createPodcastForm)
    //     return null;
    return ReactDOM.createPortal(
        <div className="popup-component">
            <form
                className="popup-form-container"
                // onSubmit={handleCreatePodcast}
            >
                <div className="popup-header">
                    <span className="text-xl font-bold">
                        {createTaskForm.header}
                    </span>
                    <div className="popup-header-close" onClick={handleCancel}>
                        <IconClose className="popup-header-close-icon h-5 w-5" />
                    </div>
                </div>

                <div className="popup-body pr-24 gap-14">
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
                        <span className="">Target</span>
                        <SelectSingleComponent
                            // key={clearTime}
                            className="w-[85%]"
                            options={[
                                {
                                    name: 'target 1',
                                    id: 1,
                                },
                                {
                                    name: 'target 2',
                                    id: 2,
                                },
                            ]}
                            renderKey="name"
                            valueKey="id"
                            placeholder="Target"
                            // onSelect={handleSelectFilter(field[valueKey])}
                            nullable
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-10">
                        <SelectSingleComponent
                            // key={clearTime}
                            className="w-full"
                            options={timeList}
                            renderKey="display"
                            valueKey="id"
                            placeholder="Start Time"
                            defaultValue={createTaskForm.startTime}
                            // onSelect={handleSelectFilter(field[valueKey])}
                            nullable
                        />
                        <SelectSingleComponent
                            // key={clearTime}
                            className="w-full"
                            options={timeList}
                            renderKey="display"
                            valueKey="id"
                            placeholder="End Time"
                            // onSelect={handleSelectFilter(field[valueKey])}
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
