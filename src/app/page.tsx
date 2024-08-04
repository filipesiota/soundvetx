"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormSection } from "@/components/form-section";
import { FormGrid } from "@/components/form-grid";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MainTitle } from "@/components/main-title";
import { toast } from "sonner";
import { CheckboxItem } from "@/components/checkbox-item";
import { useState } from "react";
import { CheckboxOption } from "@/components/checkbox-item";
import { Textarea } from "@/components/ui/textarea";
import { XRayRequest, XRayRequestSchema } from "@/@types/xray-request";
import { sendRequest } from "@/utils/request";
import { RequestError, RequestMessage } from "@/@types/request-response";

const softTissues: CheckboxOption[] = [
	{ id: "chest", label: "Tórax" },
	{ id: "abdomen", label: "Abdômen" }
];

const skullItems: CheckboxOption[] = [
	{ id: "mandible", label: "Mandíbula" },
	{ id: "jaw", label: "Maxilar" },
	{ id: "tympanicBullae", label: "Bulas Timpânicas" }
];

const axialSkeletonItems: CheckboxOption[] = [
	{ id: "cervical", label: "Coluna Cervical" },
	{ id: "thoracic", label: "Coluna Torácica" },
	{ id: "lumbar", label: "Coluna Lombar" },
	{ id: "cervicothoracic", label: "Cervico Torácica" },
	{ id: "thoracolumbar", label: "Tóraco-lombar" },
	{ id: "lumbosacral", label: "Lombossacral" },
	{ id: "tail", label: "Cauda" }
];

const appendicularSkeletonItems: CheckboxOption[] = [
	{ id: "rightThoracicLimb", label: "Membro Torácico Direito" },
	{ id: "leftThoracicLimb", label: "Membro Torácico Esquerdo" },
	{ id: "rightPelvicLimb", label: "Membro Pélvico Direito" },
	{ id: "leftPelvicLimb", label: "Membro Pélvico Esquerdo" },
	{ id: "postTraumaPelvis", label: 'Pelve "Pós-Trauma"' },
	{ id: "dysplasiaControlPelvis", label: 'Pelve "Controle Displasia"' }
];

const combos: CheckboxOption[] = [
	{ id: "preSurgical", label: "Pré-cirúrgico (RX tórax e US abdominal)" },
	{ id: "metastases", label: "Pesquisa de metástases (RX tórax e US abdominal)" },
	{ id: "postTrauma", label: "Pós trauma (RX e US abdominal)" }
];

export default function ExamRequestPage() {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<XRayRequest>({
		resolver: zodResolver(XRayRequestSchema),
		defaultValues: {
			veterinarianClinic: "",
			veterinarianName: "",
			patientName: "",
			patientSpecies: "",
			patientSex: "",
			patientAge: undefined,
			patientBreed: "",
			patientTutor: "",
			examSuspicion: "",
			examComplementaryDone: "",
			softTissues: [],
			skullItems: [],
			axialSkeletonItems: [],
			appendicularSkeletonItems: [],
			combos: [],
			observations: ""
		}
	});

	async function onSubmit(values: XRayRequest) {
		setIsSubmitting(true);

		try {
			const { message, data } = await sendRequest({
				url: "/api/generate-report",
				method: "POST",
				data: values
			});

			console.log(data);

			toast.success(message.clientMessage);
		} catch (error: any) {
			const { serverMessage, clientMessage } = error as RequestMessage;
			console.error(serverMessage);
			toast.error(clientMessage);
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<main className="flex flex-col items-center w-full max-w-screen-md mx-auto py-8">
			<MainTitle title="SoundvetX" subtitle="Radiologia em animais de companhia e pets exóticos" />

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full gap-8 mt-10">
					<FormSection title="Dados do Requerente">
						<FormGrid cols={2}>
							<FormField
								control={form.control}
								name="veterinarianClinic"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Clínica Veterinária</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="veterinarianName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Médica(o) Veterinária(o)</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</FormGrid>
					</FormSection>

					<FormSection title="Dados do Paciente">
						<FormGrid cols={3}>
							<FormField
								control={form.control}
								name="patientName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nome</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="patientSpecies"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Espécie</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="patientSex"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Sexo</FormLabel>
										<FormControl>
											<Select onValueChange={field.onChange} defaultValue={field.value}>
												<SelectTrigger>
													<SelectValue placeholder="" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="Macho">Macho</SelectItem>
													<SelectItem value="Fêmea">Fêmea</SelectItem>
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="patientAge"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Idade</FormLabel>
										<FormControl>
											<Input type="number" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="patientBreed"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Raça</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="patientTutor"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tutor(a)</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</FormGrid>
					</FormSection>

					<FormSection title="Dados do Exame">
						<FormField
							control={form.control}
							name="examSuspicion"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Suspeita</FormLabel>
									<FormControl>
										<Textarea className="resize-none" rows={2} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="examComplementaryDone"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Exame complementar realizado</FormLabel>
									<FormControl>
										<Textarea className="resize-none" rows={2} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</FormSection>

					<FormSection title="Solicitação">
						<FormGrid cols={2}>
							<FormField
								control={form.control}
								name="softTissues"
								render={() => (
									<FormItem>
										<FormLabel>Tecidos moles</FormLabel>
										<div className="grid grid-cols-1 gap-2 items-top">
											{softTissues.map(softTissue => (
												<CheckboxItem key={softTissue.id} name="softTissues" formControl={form.control} option={softTissue} />
											))}
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="skullItems"
								render={() => (
									<FormItem>
										<FormLabel>Crânio</FormLabel>
										<div className="grid grid-cols-2 gap-2 items-top">
											{skullItems.map(skullItem => (
												<CheckboxItem key={skullItem.id} name="skullItems" formControl={form.control} option={skullItem} />
											))}
										</div>
										<FormDescription>*Exames com necessidade de sedação para melhor posicionamento.</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="axialSkeletonItems"
								render={() => (
									<FormItem>
										<FormLabel>Esqueleto Axial</FormLabel>
										<div className="grid grid-cols-2 gap-2 items-top">
											{axialSkeletonItems.map(axialSkeletonItem => (
												<CheckboxItem key={axialSkeletonItem.id} name="axialSkeletonItems" formControl={form.control} option={axialSkeletonItem} />
											))}
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="appendicularSkeletonItems"
								render={() => (
									<FormItem>
										<FormLabel>Esqueleto Apendicular</FormLabel>
										<div className="grid grid-cols-1 gap-2 items-top">
											{appendicularSkeletonItems.map(appendicularSkeletonItem => (
												<CheckboxItem key={appendicularSkeletonItem.id} name="appendicularSkeletonItems" formControl={form.control} option={appendicularSkeletonItem} />
											))}
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>
						</FormGrid>

						<FormField
							control={form.control}
							name="combos"
							render={() => (
								<FormItem>
									<FormLabel>Combos</FormLabel>
									<div className="grid grid-cols-1 gap-2 items-top">
										{combos.map(combo => (
											<CheckboxItem key={combo.id} name="combos" formControl={form.control} option={combo} />
										))}
									</div>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="observations"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Observações</FormLabel>
									<FormControl>
										<Textarea className="resize-none" rows={4} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormDescription className="text-center">*Os exames de imagem devem ser correlacionados com a Clínica do paciente e demais exames complementares.</FormDescription>
					</FormSection>

					<Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Enviando...' : 'Enviar'}</Button>
				</form>
			</Form>
		</main>
	);
}
