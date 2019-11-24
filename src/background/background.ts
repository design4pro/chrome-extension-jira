import * as logger from '../shared/util/logger';
import Background, { WindowExtension } from './model/background';

const backgroundScript = new Background();

Promise.resolve()
    .then(() => backgroundScript.registerActionsInBackground((window as unknown) as WindowExtension)) // wait until all background scripts have loaded
    .catch(error => {
        logger.error('background init error: ', error);
    })
    //.then(gsSession.runStartupChecks) // performs crash check (and maybe recovery) and tab responsiveness checks
    .catch(error => {
        logger.error('background startup checks error: ', error);
    })
    .then(() => backgroundScript.initAsPromised()) // adds handle(Un)SuspendedTabChanged listeners!
    .catch(error => {
        logger.error('background init error: ', error);
    })
    .finally(() => {
        // gsAnalytics.performStartupReport();
        // gsAnalytics.performVersionReport();
    });
