import {signalStoreFeature, withComputed, withState} from "@ngrx/signals";
import {computed} from "@angular/core";

export type CallState = 'init' | 'loading' | 'loaded' | { error: string };
export type CallStateState = { callState: CallState };

export function withCallState() {
  return signalStoreFeature(
    withState<CallStateState>({ callState: 'init' }),
    withComputed(({ callState }) => ({
      isInit: computed(() => callState() === 'init'),
      isLoading: computed(() => callState() === 'loading'),
      isLoaded: computed(() => callState() === 'loaded'),
      error: computed(() => {
        const status = callState();
        return typeof status === 'object' ? status.error : null;
      }),
    }))
  )
}

export function setLoading(): CallStateState {
  return { callState: 'loading' };
}

export function setLoaded(): CallStateState {
  return { callState: 'loaded' };
}

export function setError(error: string): CallStateState {
  return { callState: { error } };
}
