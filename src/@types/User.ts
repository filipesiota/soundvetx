export type User = {
    id: number;
    name: string;
    email: string;
    crmv?: string;
    uf?: string;
    canSendWhatsapp: boolean;
    type: "admin" | "veterinarian";
};