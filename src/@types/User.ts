export type User = {
    id: number;
    name: string;
    email: string;
    crmv: string | undefined;
    uf: string | undefined;
    canSendWhatsapp: boolean;
    type: string;
};