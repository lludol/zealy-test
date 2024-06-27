import useClickAway from '@/hook/useClickAway';
import { MessageCircle, SendHorizonal, Smile } from 'lucide-react';
import {
	useCallback, useState, MouseEvent, useMemo,
} from 'react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

interface Props {
	x: number;
	y: number;

	onClose: () => void;
	// eslint-disable-next-line no-unused-vars
	onSubmit: (emoji: string, comment: string) => void;
}

const ReactionForm = ({
	x,
	y,
	onClose,
	onSubmit,
}: Props) => {
	const ref = useClickAway<HTMLDivElement>(onClose);
	const [comment, setComment] = useState('');

	const [emojiOpen, setEmojiOpen] = useState(false);
	const [emoji, setEmoji] = useState<string | null>(null);

	const onInput = useCallback((e: MouseEvent<HTMLDivElement>) => {
		setComment(e.currentTarget.innerText);
	}, []);

	const valid = useMemo(() => emoji !== null, [emoji]);

	const onEmojiClick = useCallback((emojiData: EmojiClickData) => {
		setEmoji(emojiData.emoji);
		setEmojiOpen(false);
	}, []);

	const toggleEmojiPicker = useCallback(() => {
		setEmojiOpen((prev) => !prev);
	}, []);

	const beforeSubmit = useCallback(() => {
		if (valid && emoji) {
			onSubmit(emoji, comment);
		}
	}, [valid, emoji, comment, onSubmit]);

	return (
		<div ref={ref} className='fixed flex gap-4' style={{ left: x, top: y }}>
			<MessageCircle size="2rem" className="text-blue-400" />

			<div className="flex flex-col border border-gray-400 rounded-md">
				<div contentEditable className="p-4 min-w-52 max-w-80 outline-none" data-placeholder="Add a comment" onInput={onInput}/>

				<div className="flex items-center justify-between border-t border-gray-400 p-4">
					<div className="flex gap-md items-center gap-1">
						<Smile size="1.25rem" className="cursor-pointer text-blue-400" onClick={toggleEmojiPicker} />
						{ emoji && <div>{emoji}</div> }
					</div>

					<SendHorizonal size="1.25rem" className={`${valid ? 'text-blue-400 cursor-pointer' : 'text-gray-400'}`} onClick={beforeSubmit} />
				</div>

				{ emojiOpen && <div className="p-4 absolute left-[2rem] top-full">
					<EmojiPicker open={emojiOpen} onEmojiClick={onEmojiClick} />
				</div> }
			</div>
		</div>
	);
};

export default ReactionForm;
