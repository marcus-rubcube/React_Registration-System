export interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export async function fetchAddressByZipCode(
  zipCode: string
): Promise<ViaCepResponse> {
  const BASE_URL = `https://viacep.com.br/ws/${zipCode}/json/`;

  try {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
      throw new Error(`Request error: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(`ZIP code not found`);
    }

    return data;
  } catch (error: unknown) {
    throw new Error(`Error: ${error}`);
  }
}
