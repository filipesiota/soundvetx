import { Veterinarian, VeterinarianResponseData } from "@/@types/Veterinarian";
import { prisma } from "@/prisma/client";
import { hash } from "bcrypt";

export class CreateUserUseCase {
	async execute({ fullName, crmv, uf, email, password, confirmPassword }: Veterinarian) {
		const userAlreadyExists = await prisma.user.findFirst({
			where: {
				email
			}
		});

		if (userAlreadyExists) {
			throw {
				message: {
					serverMessage: "Email address already exists",
					clientMessage:
						"O endereço de e-mail informado já existe em nossa base de dados."
				}
			};
		}

		const veterinarianAlreadyExists = await prisma.veterinarian.findFirst({
			where: {
				crmv,
				uf
			}
		});

		if (veterinarianAlreadyExists) {
			throw {
				message: {
					serverMessage: "Veterinarian already exists",
					clientMessage:
						"Um veterinário com o CRMV informado na UF selecionada já existe em nossa base de dados."
				}
			};
		}

		if (password !== confirmPassword) {
			throw {
				message: {
					serverMessage: "Passwords do not match",
					clientMessage: "As senhas informadas não coincidem."
				}
			};
		}

		const passwordHash = await hash(password, 8);

		const veterinarian = await prisma.veterinarian.create({
			data: {
				user: {
					create: {
						name: fullName,
						email,
						password: passwordHash
					}
				},
				crmv,
				uf
			},
			include: {
				user: true
			}
		});

		return {
			id: veterinarian.user.id,
			name: veterinarian.user.name,
			email: veterinarian.user.email,
			crmv: veterinarian.crmv,
			uf: veterinarian.uf,
			canSendWhatsapp: veterinarian.user.canSendWhatsapp
		};
	}
}
