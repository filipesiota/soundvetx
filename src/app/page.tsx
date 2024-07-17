export default function Home() {
	return (
		<main className="flex flex-col items-center w-full max-w-3xl mx-auto py-8 px-4">
			<div className="flex flex-col gap-2 items-center">
				<h2 className="sm:text-6xl text-4xl font-bold tracking-tight text-gray-900">
					SoundvetX
				</h2>
				<p className="text-base leading-6 text-gray-900">
					Radiologia em animais de companhia e pets exóticos
				</p>
			</div>

			<form className="w-full mt-12">
				<h2 className="text-2xl font-semibold leading-7 text-gray-900">
					Dados do Requerente
				</h2>

				<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
					<div className="sm:col-span-3">
						<label
							htmlFor="first-name"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Clínica Veterinária
						</label>
						<div className="mt-2">
							<input
								id="first-name"
								name="first-name"
								type="text"
								autoComplete="given-name"
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div className="sm:col-span-3">
						<label
							htmlFor="last-name"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Last name
						</label>
						<div className="mt-2">
							<input
								id="last-name"
								name="last-name"
								type="text"
								autoComplete="family-name"
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div className="sm:col-span-4">
						<label
							htmlFor="email"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Email address
						</label>
						<div className="mt-2">
							<input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div className="sm:col-span-3">
						<label
							htmlFor="country"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Country
						</label>
						<div className="mt-2">
							<select
								id="country"
								name="country"
								autoComplete="country-name"
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
							>
								<option>United States</option>
								<option>Canada</option>
								<option>Mexico</option>
							</select>
						</div>
					</div>

					<div className="col-span-full">
						<label
							htmlFor="street-address"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Street address
						</label>
						<div className="mt-2">
							<input
								id="street-address"
								name="street-address"
								type="text"
								autoComplete="street-address"
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div className="sm:col-span-2 sm:col-start-1">
						<label
							htmlFor="city"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							City
						</label>
						<div className="mt-2">
							<input
								id="city"
								name="city"
								type="text"
								autoComplete="address-level2"
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div className="sm:col-span-2">
						<label
							htmlFor="region"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							State / Province
						</label>
						<div className="mt-2">
							<input
								id="region"
								name="region"
								type="text"
								autoComplete="address-level1"
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div className="sm:col-span-2">
						<label
							htmlFor="postal-code"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							ZIP / Postal code
						</label>
						<div className="mt-2">
							<input
								id="postal-code"
								name="postal-code"
								type="text"
								autoComplete="postal-code"
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
				</div>
			</form>
		</main>
	);
}
