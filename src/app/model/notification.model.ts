export class Notification {
    success: boolean;
    payload: any;
    erros: string[];
    warnings: string[];
    validations: string[];

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}