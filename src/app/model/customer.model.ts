export class Customer {
    classificationId: number;
    classification: string;
    name: string;
    phone: string;
    genderId: number;
    gender: string;
    cityId: number;
    city: string;
    regionId: number;
    region: string;
    lastPurchase: string;
    sellerId: number;
    seller: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}