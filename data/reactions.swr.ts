import { Reaction } from '@/model/Reaction';
import useSWRImmutable from 'swr/immutable';
import useSWRMutation from 'swr/mutation';

export const useReactionsGet = () => (useSWRImmutable<Reaction[]>('reactions', (key: string) => {
	const reactions = localStorage.getItem(key);
	return reactions ? JSON.parse(reactions) : [];
}));

export const useReactionsPost = (options?: any) => useSWRMutation(
	'reactions',
	(key: string, { arg }: { arg: Reaction }) => {
		const reactions = localStorage.getItem(key);
		const newReactions = reactions ? [...JSON.parse(reactions), arg] : [arg];
		localStorage.setItem(key, JSON.stringify(newReactions));
	},
	options,
);
