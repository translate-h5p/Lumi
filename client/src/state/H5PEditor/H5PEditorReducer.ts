import Logger from '../../helpers/Logger';
import * as Sentry from '@sentry/browser';
import i18next from 'i18next';

import {
    IH5PEditorState,
    H5PEditorActionTypes,
    H5PEDITOR_CLOSE_TAB,
    H5PEDITOR_OPEN_TAB,
    H5PEDITOR_SELECT_TAB,
    H5PEDITOR_UPDATE_TAB,
    H5PEDITOR_LOADED,
    H5PEDITOR_EXPORT_REQUEST,
    H5PEDITOR_EXPORT_SUCCESS,
    H5PEDITOR_EXPORT_ERROR,
    H5P_LOADEDITORCONTENT_SUCCESS,
    H5P_LOADPLAYERCONTENT_REQUEST,
    H5P_LOADPLAYERCONTENT_SUCCESS,
    H5PEDITOR_UPDATE_SUCCESS,
    H5PEDITOR_UPDATE_REQUEST,
    H5PEDITOR_SAVE_REQUEST,
    H5PEDITOR_SAVE_SUCCESS,
    H5PEDITOR_SAVE_ERROR,
    H5P_IMPORT_SUCCESS,
    Modes,
    H5PEDITOR_EXPORT_CANCEL,
    H5PEDITOR_SAVE_CANCEL,
    H5PEDITOR_OPEN_EXPORT_DIALOG
} from './H5PEditorTypes';

export const initialState: IH5PEditorState = {
    activeTabIndex: 0,
    tabList: [],
    showExportDialog: false
};

const log = new Logger('reducer:tabs');

export default function tabReducer(
    state: IH5PEditorState = initialState,
    action: H5PEditorActionTypes
): IH5PEditorState {
    try {
        log.debug(`reducing ${action.type}`);
        switch (action.type) {
            case H5PEDITOR_OPEN_EXPORT_DIALOG:
                return {
                    ...state,
                    showExportDialog: true
                };

            case H5PEDITOR_SAVE_REQUEST:
                return {
                    ...state,
                    tabList: state.tabList.map((tab, index) =>
                        index === state.activeTabIndex
                            ? {
                                  ...tab,
                                  loadingIndicator: true
                              }
                            : tab
                    )
                };

            case H5PEDITOR_SAVE_SUCCESS:
                return {
                    ...state,
                    tabList: state.tabList.map((tab, index) =>
                        index === state.activeTabIndex
                            ? {
                                  ...tab,
                                  loadingIndicator: false,
                                  path: action.payload.path
                              }
                            : tab
                    )
                };

            case H5PEDITOR_SAVE_ERROR:
                return {
                    ...state,
                    tabList: state.tabList.map((tab, index) =>
                        index === state.activeTabIndex
                            ? {
                                  ...tab,
                                  loadingIndicator: false
                              }
                            : tab
                    )
                };

            case H5PEDITOR_SAVE_CANCEL:
                return {
                    ...state,
                    tabList: state.tabList.map((tab, index) =>
                        index === state.activeTabIndex
                            ? {
                                  ...tab,
                                  loadingIndicator: false
                              }
                            : tab
                    )
                };

            case H5P_LOADEDITORCONTENT_SUCCESS:
                return {
                    ...state,
                    tabList: state.tabList.map((tab, index) =>
                        tab.id === action.payload.tabId
                            ? {
                                  ...tab,
                                  loadingIndicator: false
                              }
                            : tab
                    )
                };

            case H5PEDITOR_UPDATE_REQUEST:
                return {
                    ...state,
                    tabList: state.tabList.map((tab, index) =>
                        tab.id === action.payload.tabId
                            ? {
                                  ...tab,
                                  loadingIndicator: true
                              }
                            : tab
                    )
                };

            case H5PEDITOR_UPDATE_SUCCESS:
                return {
                    ...state,
                    tabList: state.tabList.map((tab, index) =>
                        tab.id === action.payload.tabId
                            ? {
                                  ...tab,
                                  contentId: action.payload.contentId,
                                  name: action.payload.metadata.title,
                                  mainLibrary:
                                      action.payload.metadata.mainLibrary,
                                  viewDisabled: false,
                                  loadingIndicator: false
                              }
                            : tab
                    )
                };

            case H5PEDITOR_LOADED:
                return {
                    ...state,
                    tabList: state.tabList.map((tab, index) =>
                        tab.id === action.payload.tabId
                            ? {
                                  ...tab,
                                  viewDisabled: false,
                                  loadingIndicator: false
                              }
                            : tab
                    )
                };

            case H5PEDITOR_EXPORT_REQUEST:
                return {
                    ...state,
                    tabList: state.tabList.map((tab, index) =>
                        tab.contentId === action.payload.contentId
                            ? {
                                  ...tab,
                                  loadingIndicator: true
                              }
                            : tab
                    ),
                    showExportDialog: false
                };

            case H5PEDITOR_EXPORT_SUCCESS:
                return {
                    ...state,
                    tabList: state.tabList.map((tab, index) =>
                        tab.contentId === action.payload.contentId
                            ? {
                                  ...tab,
                                  loadingIndicator: false
                              }
                            : tab
                    )
                };

            case H5PEDITOR_EXPORT_CANCEL:
                return {
                    ...state,
                    tabList: state.tabList.map((tab, index) =>
                        tab.contentId === action.payload.contentId
                            ? {
                                  ...tab,
                                  loadingIndicator: false
                              }
                            : tab
                    )
                };

            case H5PEDITOR_EXPORT_ERROR:
                return {
                    ...state,
                    tabList: state.tabList.map((tab, index) =>
                        tab.contentId === action.payload.contentId
                            ? {
                                  ...tab,
                                  loadingIndicator: false
                              }
                            : tab
                    ),
                    showExportDialog: false
                };

            case H5P_LOADPLAYERCONTENT_REQUEST:
                return {
                    ...state,
                    tabList: state.tabList.map((tab) =>
                        tab.contentId === action.payload.contentId
                            ? {
                                  ...tab,
                                  loadingIndicator: true
                              }
                            : tab
                    )
                };

            case H5P_LOADPLAYERCONTENT_SUCCESS:
                return {
                    ...state,
                    tabList: state.tabList.map((tab) =>
                        tab.contentId === action.payload.contentId
                            ? {
                                  ...tab,
                                  loadingIndicator: false
                              }
                            : tab
                    )
                };

            case H5PEDITOR_CLOSE_TAB:
                return {
                    ...state,
                    activeTabIndex: 0,
                    tabList: state.tabList.filter(
                        (tab) => tab.id !== action.payload.id
                    )
                };

            case H5P_IMPORT_SUCCESS:
                return {
                    ...state,
                    activeTabIndex: state.tabList.length,
                    tabList: [
                        ...state.tabList,
                        {
                            id: action.payload.tabId,
                            path: action.payload.path,
                            contentId: action.payload.h5p.id,
                            loadingIndicator: false,
                            viewDisabled: false,
                            mainLibrary: action.payload.h5p.library.split(
                                ' '
                            )[0],
                            name: action.payload.h5p.metadata.title,
                            mode: Modes.edit
                        }
                    ]
                };

            case H5PEDITOR_OPEN_TAB:
                return {
                    ...state,
                    activeTabIndex: state.tabList.length,
                    tabList: [
                        ...state.tabList,
                        {
                            id: action.payload.id,
                            loadingIndicator: true,
                            viewDisabled: true,
                            mainLibrary: '',
                            name: i18next.t('editor.default_name'),
                            path: undefined,
                            mode: Modes.edit,
                            ...action.payload.tab
                        }
                    ]
                };
            // if (
            //     state.tabList.some(
            //         (tab) => tab.path === action.payload.tab.path
            //     ) &&
            //     action.payload.tab.path
            // ) {
            //     return {
            //         ...state,
            //         activeTabIndex: findIndex(
            //             state.tabList,
            //             (tab) => tab.path === action.payload.tab.path
            //         )
            //     };
            // }
            // return {
            //     ...state,
            //     activeTabIndex: state.tabList.length,
            //     tabList: [...state.tabList, action.payload.tab]
            // };

            case H5PEDITOR_SELECT_TAB:
                return {
                    ...state,
                    activeTabIndex: action.payload.value
                };

            case H5PEDITOR_UPDATE_TAB:
                return {
                    ...state,
                    tabList: state.tabList.map((tab) =>
                        tab.id === action.payload.tabId
                            ? { ...tab, ...action.payload.update }
                            : tab
                    )
                };

            default:
                return state;
        }
    } catch (error) {
        Sentry.captureException(error);

        log.error(error);
        return state;
    }
}
