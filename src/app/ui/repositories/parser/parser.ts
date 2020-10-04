
export interface IAbstractParser<T> {
    parse(payload): T;
}

export abstract class AbstractParser<T> implements IAbstractParser<T> {
    
    abstract parse(payload): T;

    parseList(payload: any): Array<T> {
        if (!payload || !Array.isArray(payload)) {
            return [];
        }

        return payload.map(p => this.parse(p))
            .filter(p => p);
    }
}