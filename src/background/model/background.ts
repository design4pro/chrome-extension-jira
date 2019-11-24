import * as logger from '../../shared/util/logger';

export interface WindowExtension extends Window {
    initAsPromised: () => Promise<void>;
    getName: string;
}

class Background {
    public initAsPromised(): Promise<void> {
        return new Promise(resolve => {
            logger.log('background', 'PERFORMING BACKGROUND INIT...');

            this.addChromeListeners();

            logger.log('background', 'init successful');
            resolve();
        });
    }

    public get getName() {
        return 'background';
    }

    private addChromeListeners() {
        chrome.runtime.onInstalled.addListener(() => {
            logger.log('background', 'onInstalled....');
        });

        chrome.runtime.onStartup.addListener(() => {
            logger.log('background', 'onStartup....');
        });
    }

    public registerActionsInBackground(windowExtension: WindowExtension): void {
        windowExtension.getName = this.getName;
    }
}

export default Background;
