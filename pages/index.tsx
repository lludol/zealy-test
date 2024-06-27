import { Inter } from 'next/font/google';
import { MouseEvent, useCallback, useState } from 'react';
import { useReactionsGet, useReactionsPost } from '@/data/reactions.swr';
import OneReaction from '@/components/Reaction';
import ReactionForm from '@/components/ReactionForm';

interface Position {
	x: number;
	y: number;
}

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	const { data: reactions, mutate } = useReactionsGet();

	const [show, setShow] = useState(false);
	const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

	const onClick = useCallback((e: MouseEvent) => {
		if (!show) {
			setPosition({
				x: e.clientX,
				y: e.clientY,
			});
			setShow(true);
		}
	}, [show]);

	const onClose = useCallback(() => {
		setShow(false);
	}, []);

	const { trigger: createReaction } = useReactionsPost({
		onSuccess: () => {
			mutate();
		},
	});
	const onSubmit = useCallback((emoji: string, comment: string) => {
		createReaction({
			emoji,
			comment,
			...position,
		});
		setShow(false);
	}, [createReaction, position]);

	return (
		<main
			className={`relative flex flex-col items-center min-h-screen p-24 ${inter.className}`}
			onClick={onClick}
		>
			<h1 className="text-xl font-medium">Cick anywhere to react</h1>

			{ reactions && reactions.map((reaction, index) => (
				<OneReaction key={index} reaction={reaction}/>
			))}

			{ show && <ReactionForm
				x={position.x}
				y={position.y}
				onClose={onClose}
				onSubmit={onSubmit}
			/> }
		</main>
	);
}
