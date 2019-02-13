export class ListItem {
    key: number;
    foreignKey: number;
    value: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}