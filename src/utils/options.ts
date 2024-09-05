import { CheckboxOption } from "@/components/checkbox-item"
import { ComboboxItem } from "@/components/combobox"
import { UserType, UserTypeOption } from "@/types/user"

export const species: CheckboxOption[] = [
	{ id: "canine", label: "Canino" },
	{ id: "feline", label: "Felino" },
	{ id: "wild", label: "Silvestre" }
]

export const sexOptions: CheckboxOption[] = [
	{ id: "male", label: "Macho" },
	{ id: "female", label: "Fêmea" }
]

export const paymentMethods: CheckboxOption[] = [
	{ id: "petLove", label: "Pet Love" },
	{ id: "private", label: "Particular" }
]

export const softTissues: CheckboxOption[] = [
	{ id: "chest", label: "Tórax" },
	{ id: "abdomen", label: "Abdômen" },
	{ id: "skyline", label: "Skyline" },
]

export const skullItems: CheckboxOption[] = [
	{ id: "mandible", label: "Mandíbula", hasObservation: true },
	{ id: "toothRoots", label: "Raízes dentárias", hasObservation: true },
	{ id: "tympanicBullae", label: "Bulas Timpânicas", hasObservation: true },
	{ id: "skullcap", label: "Calota craniana", hasObservation: true }
]

export const axialSkeletonItems: CheckboxOption[] = [
	{ id: "cervical", label: "Coluna Cervical", hasObservation: true },
	{ id: "thoracic", label: "Coluna Torácica" },
	{ id: "lumbar", label: "Coluna Lombar" },
	{ id: "cervicothoracic", label: "Cervico Torácica" },
	{ id: "thoracolumbar", label: "Tóraco-lombar" },
	{ id: "lumbosacral", label: "Lombossacral" },
	{ id: "tail", label: "Cauda" }
]

export const appendicularSkeletonThoracicLimb: CheckboxOption[] = [
	{ id: "right", label: "Direito" },
	{ id: "left", label: "Esquerdo" }
]

export const appendicularSkeletonThoracicLimbOptions: CheckboxOption[] = [
	{ id: "completeStudy", label: "Estudo Completo" },
	{ id: "shoulder", label: "Ombro" },
	{ id: "umerus", label: "Úmero" },
	{ id: "elbow", label: "Cotovelo" },
	{ id: "radio", label: "Rádio/Ulna" },
	{ id: "carpus", label: "Carpo/Dígitos" },
]

export const appendicularSkeletonPelvicLimb: CheckboxOption[] = [
	{ id: "right", label: "Direito" },
	{ id: "left", label: "Esquerdo" }
]

export const appendicularSkeletonPelvicLimbOptions: CheckboxOption[] = [
	{ id: "femur", label: "Fêmur" },
	{ id: "knee", label: "Joelho" },
	{ id: "tibia", label: "Tíbia/Fíbula" },
	{ id: "tarsus", label: "Art. Tarsica/Dígitos" }
]

export const appendicularSkeletonPelvis: CheckboxOption[] = [
	{ id: "VDLL", label: "VD + LL" },
	{ id: "pelvisAndKnee", label: "Pelve + Joelho (TPLO)" }
]

export const federativeUnits: ComboboxItem[] = [
	{ value: "AC", label: "AC" },
	{ value: "AL", label: "AL" },
	{ value: "AP", label: "AP" },
	{ value: "AM", label: "AM" },
	{ value: "BA", label: "BA" },
	{ value: "CE", label: "CE" },
	{ value: "DF", label: "DF" },
	{ value: "ES", label: "ES" },
	{ value: "GO", label: "GO" },
	{ value: "MA", label: "MA" },
	{ value: "MT", label: "MT" },
	{ value: "MS", label: "MS" },
	{ value: "MG", label: "MG" },
	{ value: "PA", label: "PA" },
	{ value: "PB", label: "PB" },
	{ value: "PR", label: "PR" },
	{ value: "PE", label: "PE" },
	{ value: "PI", label: "PI" },
	{ value: "RJ", label: "RJ" },
	{ value: "RN", label: "RN" },
	{ value: "RS", label: "RS" },
	{ value: "RO", label: "RO" },
	{ value: "RR", label: "RR" },
	{ value: "SC", label: "SC" },
	{ value: "SP", label: "SP" },
	{ value: "SE", label: "SE" },
	{ value: "TO", label: "TO" }
];

export const UserTypes: UserTypeOption[] = [
	{ value: UserType.Admin, label: "Administrador" },
	{ value: UserType.Dev, label: "Desenvolvedor" },
	{ value: UserType.Veterinarian, label: "Veterinário" }
]