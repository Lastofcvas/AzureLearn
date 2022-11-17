import type { Action } from 'redux';
import { StateObservable } from 'redux-observable';
import type { Observable } from 'rxjs';
import { RootState } from './store';
import { api } from '.';
import createApi from '../api/createApi';

type Api = ReturnType<typeof createApi>;

type Dependencies = {
    api: Api
}

export type Epic<TAction extends Action> = (
    action$: Observable<TAction>,
    state$: StateObservable<RootState>,
    dependencies: Dependencies
) => Observable<Action>