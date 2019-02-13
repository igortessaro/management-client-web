export class CustomerFilter {
    userId: number;
    name: string;
    gender: number;
    city: number;
    region: number;
    lastPurchaseInitial: string;
    lastPurchaseFinish: string;
    classification: number;
    seller: number;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}