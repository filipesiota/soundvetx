export type User = {
    id: number;
    name: string;
    email: string;
    canSendWhatsapp: boolean;
    type: "admin" | "veterinarian";
};