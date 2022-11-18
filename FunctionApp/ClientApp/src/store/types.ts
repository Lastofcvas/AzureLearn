import type { Action } from 'redux';
import { StateObservable } from 'redux-observable';
import type { Observable } from 'rxjs';
import { RootState } from './store';
import { Api } from '../api/createApi';

export type StoreDependencies = {
    api: Api
}

export type Epic<TAction extends Action> = (
    action$: Observable<TAction>,
    state$: StateObservable<RootState>,
    dependencies: StoreDependencies
) => Observable<Action>