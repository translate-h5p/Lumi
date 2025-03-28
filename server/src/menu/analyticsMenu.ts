import electron from 'electron';
import SocketIO from 'socket.io';
import i18next from 'i18next';

import helpMenu from './helpMenu';

export default (window: electron.BrowserWindow, websocket: SocketIO.Server) => [
    {
        label: i18next.t('menu.file.label'),
        submenu: [
            {
                accelerator: 'CmdOrCtrl+O',
                click: () => {
                    websocket.emit('action', {
                        payload: {},
                        type: 'IMPORT_ANALYTICS'
                    });
                },
                label: i18next.t('menu.file.open')
            },
            { type: 'separator' } as any,
            {
                label: i18next.t('menu.quit'),
                role: 'quit'
            } as any
        ]
    },
    {
        label: i18next.t('menu.file.edit'),
        submenu: [
            {
                label: i18next.t('menu.file.undo'),
                accelerator: 'CmdOrCtrl+Z',
                role: 'undo'
            },
            {
                label: i18next.t('menu.file.redo'),
                accelerator:
                    process.platform !== 'darwin'
                        ? 'CmdOrCtrl+Y'
                        : 'Shift+CmdOrCtrl+Z',
                role: 'redo'
            },
            {
                type: 'separator'
            },
            {
                label: i18next.t('menu.file.cut'),
                accelerator: 'CmdOrCtrl+X',
                role: 'cut'
            },
            {
                label: i18next.t('menu.file.copy'),
                accelerator: 'CmdOrCtrl+C',
                role: 'copy'
            },
            {
                label: i18next.t('menu.file.paste'),
                accelerator: 'CmdOrCtrl+V',
                role: 'paste'
            },
            {
                label: i18next.t('menu.file.select_all'),
                accelerator: 'CmdOrCtrl+A',
                role: 'selectAll'
            }
        ]
    },
    helpMenu(window, websocket)
];
