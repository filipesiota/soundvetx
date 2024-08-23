export function getAbbreviationFromUf(uf: string) {
    const ufParts = uf.match(/\(([^)]+)\)/);
	const ufAbbreviation = ufParts ? ufParts[1] : uf;

    return ufAbbreviation;
}