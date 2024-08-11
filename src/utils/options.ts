import { CheckboxOption } from "@/components/checkbox-item"
import { FederativeUnit } from "@/types/federative-unit"

export const softTissues: CheckboxOption[] = [
	{ id: "chest", label: "Tórax" },
	{ id: "abdomen", label: "Abdômen" }
]

export const skullItems: CheckboxOption[] = [
	{ id: "mandible", label: "Mandíbula" },
	{ id: "jaw", label: "Maxilar" },
	{ id: "tympanicBullae", label: "Bulas Timpânicas" }
]

export const axialSkeletonItems: CheckboxOption[] = [
	{ id: "cervical", label: "Coluna Cervical" },
	{ id: "thoracic", label: "Coluna Torácica" },
	{ id: "lumbar", label: "Coluna Lombar" },
	{ id: "cervicothoracic", label: "Cervico Torácica" },
	{ id: "thoracolumbar", label: "Tóraco-lombar" },
	{ id: "lumbosacral", label: "Lombossacral" },
	{ id: "tail", label: "Cauda" }
]

export const appendicularSkeletonItems: CheckboxOption[] = [
	{ id: "rightThoracicLimb", label: "Membro Torácico Direito" },
	{ id: "leftThoracicLimb", label: "Membro Torácico Esquerdo" },
	{ id: "rightPelvicLimb", label: "Membro Pélvico Direito" },
	{ id: "leftPelvicLimb", label: "Membro Pélvico Esquerdo" },
	{ id: "postTraumaPelvis", label: 'Pelve "Pós-Trauma"' },
	{ id: "dysplasiaControlPelvis", label: 'Pelve "Controle Displasia"' }
]

export const combos: CheckboxOption[] = [
	{ id: "preSurgical", label: "Pré-cirúrgico (RX tórax e US abdominal)" },
	{ id: "metastases", label: "Pesquisa de metástases (RX tórax e US abdominal)" },
	{ id: "postTrauma", label: "Pós trauma (RX e US abdominal)" }
]

export const federativeUnits: FederativeUnit[] = [
	{ name: "Acre", abbreviation: "AC" },
	{ name: "Alagoas", abbreviation: "AL" },
	{ name: "Amapá", abbreviation: "AP" },
	{ name: "Amazonas", abbreviation: "AM" },
	{ name: "Bahia", abbreviation: "BA" },
	{ name: "Ceará", abbreviation: "CE" },
	{ name: "Distrito Federal", abbreviation: "DF" },
	{ name: "Espírito Santo", abbreviation: "ES" },
	{ name: "Goiás", abbreviation: "GO" },
	{ name: "Maranhão", abbreviation: "MA" },
	{ name: "Mato Grosso", abbreviation: "MT" },
	{ name: "Mato Grosso do Sul", abbreviation: "MS" },
	{ name: "Minas Gerais", abbreviation: "MG" },
	{ name: "Pará", abbreviation: "PA" },
	{ name: "Paraíba", abbreviation: "PB" },
	{ name: "Paraná", abbreviation: "PR" },
	{ name: "Pernambuco", abbreviation: "PE" },
	{ name: "Piauí", abbreviation: "PI" },
	{ name: "Rio de Janeiro", abbreviation: "RJ" },
	{ name: "Rio Grande do Norte", abbreviation: "RN" },
	{ name: "Rio Grande do Sul", abbreviation: "RS" },
	{ name: "Rondônia", abbreviation: "RO" },
	{ name: "Roraima", abbreviation: "RR" },
	{ name: "Santa Catarina", abbreviation: "SC" },
	{ name: "São Paulo", abbreviation: "SP" },
	{ name: "Sergipe", abbreviation: "SE" },
	{ name: "Tocantins", abbreviation: "TO" }
]