import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsConfig } from '@ngxs/store/src/symbols';
import { NgxsDevtoolsOptions } from '@ngxs/devtools-plugin/src/symbols';
import { NgxsLoggerPluginOptions } from '@ngxs/logger-plugin/src/symbols';
import { NgxsEmitPluginModule } from '@ngxs-labs/emitter';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { ALL_STATES } from './all-states';

export const OPTIONS_CONFIG: Partial<NgxsConfig> = {
    developmentMode: true
};

export const DEVTOOLS_REDUX_CONFIG: NgxsDevtoolsOptions = {
    disabled: false
};

export const LOGGER_CONFIG: NgxsLoggerPluginOptions = {
    disabled: false
};

@NgModule({
    imports: [
        CommonModule,
        NgxsModule.forRoot(
            [
                ...ALL_STATES
            ], OPTIONS_CONFIG),
        NgxsReduxDevtoolsPluginModule.forRoot(DEVTOOLS_REDUX_CONFIG),
        NgxsLoggerPluginModule.forRoot(LOGGER_CONFIG),
        NgxsEmitPluginModule.forRoot(),
        NgxsStoragePluginModule.forRoot({
            key: [...ALL_STATES]
        })
    ],
    exports: [NgxsModule]
})
export class NgxsStoreModule { }