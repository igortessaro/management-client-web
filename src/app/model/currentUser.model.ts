export class CurrentUser {
    name: string;
    email: string;
    userType: number;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}