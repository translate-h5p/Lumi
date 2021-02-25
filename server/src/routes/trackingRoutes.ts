import express from 'express';
import matomo from '../matomo';
import * as Sentry from '@sentry/node';
import IServerConfig from '../IServerConfig';
import fsExtra from 'fs-extra';
import electron from 'electron';
import * as os from 'os';
import { machineId } from 'node-machine-id';
import cryptoRandomString from 'crypto-random-string';

const id = cryptoRandomString({ length: 16 });

export default function (serverConfig: IServerConfig): express.Router {
    const router = express.Router();
    router.post(
        `/`,
        async (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) => {
            try {
                if (
                    (await fsExtra.readJSON(serverConfig.settingsFile))
                        .usageStatistics
                ) {
                    console.log(os.type());
                    const { action, category, name, value } = req.body;
                    const data = {
                        url: '/Lumi',
                        _id: id,
                        uid: await machineId(),
                        e_c: category,
                        e_a: action,
                        e_n: name,
                        e_v: value,
                        lang: electron.app.getLocale(),
                        country: electron.app.getLocaleCountryCode(),
                        ua: os.type()
                    };
                    matomo.track(data);
                }
                res.status(200).end();
            } catch (error) {
                Sentry.captureException(error);
                res.status(200).end();
            }
        }
    );

    return router;
}
