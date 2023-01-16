import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  RecoilState,
} from 'recoil';

export const questionsState = atom<string[]>({
  key: 'questionsState', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export const questionLoadingState = atom<boolean>({
  key: 'questionLoadingState', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});
