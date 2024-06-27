import { useEffect, useRef } from 'react';

// eslint-disable-next-line no-unused-vars
const useClickAway = <T extends HTMLElement = HTMLElement>(cb: (e: MouseEvent | TouchEvent) => void) => {
	const ref = useRef<T>(null);
	const refCb = useRef(cb);

	useEffect(() => {
		refCb.current = cb;
	}, [cb]);

	useEffect(() => {
		const handler = (e: MouseEvent | TouchEvent) => {
			const element = ref.current;
			if (element && !element.contains(e.target as Node)) {
				refCb.current(e);
			}
		};

		document.addEventListener('mousedown', handler);
		document.addEventListener('touchstart', handler);

		return () => {
			document.removeEventListener('mousedown', handler);
			document.removeEventListener('touchstart', handler);
		};
	}, []);

	return ref;
};

export default useClickAway;
