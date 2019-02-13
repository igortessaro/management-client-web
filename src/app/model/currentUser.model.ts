export class CurrentUser {
    id: number;
    name: string;
    email: string;
    userType: number;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}