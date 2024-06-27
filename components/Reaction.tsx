import useClickAway from '@/hook/useClickAway';
import { Reaction } from '@/model/Reaction';
import { MessageCircleMore } from 'lucide-react';
import { MouseEvent, useCallback, useState } from 'react';

interface Props {
	reaction: Reaction;
}

const OneReaction = ({
	reaction,
}: Props) => {
	const [open, setOpen] = useState(false);

	const toggle = useCallback((e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		setOpen((prev) => !prev);
	}, []);
	const onClose = useCallback(() => {
		setOpen(false);
	}, []);
	const ref = useClickAway<HTMLDivElement>(onClose);

	return (
		<div ref={ref} style={{ left: reaction.x, top: reaction.y }} className="fixed flex gap-4">
			<div className="cursor-pointer" onClick={toggle}>
				<MessageCircleMore size="2rem" className="text-blue-400" />
			</div>

			{ open && <div className="border border-gray-400 rounded-md p-4">
				<div>{reaction.emoji}</div>
				<div>{reaction.comment}</div>
			</div> }
		</div>
	);
};

export default OneReaction;
