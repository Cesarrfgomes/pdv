declare namespace Express {
    export interface Request {
        usuario: {
            id: number;
            nome: string;
            email: string;
            senha: string
        }
    }
}