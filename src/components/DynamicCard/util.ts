/* Added a module-level counter for deterministic key generation */
let idCounter = 0;

export const getKey = (key: string) => {
	idCounter++;
	return `${key}-${idCounter}`;
};
