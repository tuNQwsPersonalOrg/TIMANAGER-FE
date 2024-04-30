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
import { popupTarget } from '../../constants';
// import TextboxComponent from '../Textbox/TextboxComponent';
// import ButtonComponent from '../Button/ButtonComponent';
import { useNavigate } from 'react-router-dom';

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
                    <h3 className="popup-header-label">
                        {createTaskForm.header}
                    </h3>
                    <div className="popup-header-close" onClick={handleCancel}>
                        <IconClose className="popup-header-close-icon h-5 w-5" />
                    </div>
                    <div className="divider col-span-2" />
                </div>

                <div className="popup-body">
                    {/* <div className="flex items-center justify-between gap-4 max-w-[27rem] w-full">
                        <span className="required-field">Podcast Title</span>
                        <TextboxComponent
                            // key={new Date()}
                            value={title}
                            required
                            onChange={setTitle}
                        />
                    </div>
                    <div className="flex items-center justify-between gap-4 max-w-[27rem] w-full">
                        <span className="required-field">
                            Podcast Audio URL
                        </span>
                        <TextboxComponent
                            // key={new Date()}
                            value={audioUrl}
                            required
                            onChange={setAudioUrl}
                        />
                    </div> */}
                </div>

                <div className="popup-footer">
                    <div className="divider"></div>
                    <div className="flex w-full justify-end">
                        {/* <ButtonComponent type="submit" label={'Save'} /> */}
                        <button type="submit">Save</button>
                    </div>
                </div>
            </form>
        </div>,
        document.body
    );
};

export default PopupFormComponent;
