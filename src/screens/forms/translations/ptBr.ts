export const formsTranslates = {
  clientForms: {
    federalUnits: {
      SP: "São Paulo",
      AC: "Acre",
      AL: "Alagoas",
      AP: "Amapá",
      AM: "Amazonas",
      BA: "Bahia",
      CE: "Ceará",
      DF: "Distrito Federal",
      ES: "Espírito Santo",
      GO: "Goiás",
      MA: "Maranhão",
      MT: "Mato Grosso",
      MS: "Mato Grosso do Sul",
      MG: "Minas Gerais",
      PA: "Pará",
      PB: "Paraíba",
      PR: "Paraná",
      PE: "Pernambuco",
      PI: "Piauí",
      RJ: "Rio de Janeiro",
      RN: "Rio Grande do Norte",
      RS: "Rio Grande do Sul",
      RO: "Rondônia",
      RR: "Roraima",
      SC: "Santa Catarina",
      SE: "Sergipe",
      TO: "Tocantins",
      EX: "Estrangeiro",
    },
    formLabels: {
      document: "CPF:",
      name: "Nome completo:",
      address: "Endereço:",
      city: "Cidade:",
      uf: "UF: ",
      ufAriaLabel: "Unidades Federativas brasileiras",
      zipCode: "CEP: ",
      number: "Número:",
      neighborhood: "Bairro",
    },
    formPlaceholder: {
      document: "000.000.000-00",
      name: "Informe seu nome completo",
      address: "Av./Rua/Alameda/Viela...",
      city: "Informe sua cidade",
      uf: "UF",
      zipCode: "XXXXX-XXX",
      number: "Nº 1234",
      neighborhood: "Bairro/Vila...",
    },
    feedbackMessage: {
      document: "Informe o cpf",
      name: "Informe seu nome completo",
      address: "Informe o endereco",
      city: "Informe sua cidade",
      zipCode: "Informe o cep",
      number: "Informe seu numero",
      neighborhood: "Informe o bairro",
    },
    buttons: {
      register: "Cadastrar",
      goBack: "Voltar",
    },
  },
  categoriesForm: {
    labels: {
      name: "Nome: ",
      description: "Descrição: ",
    },
    placeholders: {
      name: "Nome da categoria",
      description: "Descrição da categoria",
    },
    feedback: {
      name: "Informe o nome da categoria",
      description: "Informe a descrição da categoria",
    },
    buttons: {
      register: "Cadastrar",
      goBack: "Voltar",
    },
  },
  providersForm: {
    labels: {
      name: "Nome da Empresa/Fornecedor",
      address: "Descrição: ",
      phoneNumber: "Número de Telefone",
      email: "Endereço de Email",
      website: "Site",
      description: "Descrição da Empresa",
    },
    placeholders: {
      name: "Digite o nome da empresa/fornecedor",
      address: "Digite o endereço",
      phoneNumber: "Digite o número de telefone",
      email: "Digite o endereço de email",
      website: "Digite o site (opcional)",
      description: "Digite a descrição da empresa",
    },
    buttons: {
      register: "Cadastrar Fornecedor",
      goBack: "Voltar",
    },
  },
  productsForm: {
    labels: {
      name: "Nome do Produto",
      description: "Descrição",
      unitPrice: "Preço Unitário",
      stockQuantity: "Quantidade em estoque",
      brand: "Marca",
      model: "Modelo",
      manufacturingDate: "Data de fabricação",
      category: "Categoria do Produto",
      provider: "Fornecedor"
    },
    placeholders: {
      name: "Digite o nome do produto",
      description: "Digite a descrição do produto",
      unitPrice: "Digite o preço unitário",
      stockQuantity: "Digite a quantidade em estoque",
      brand: "Digite a marca do produto",
      model: "Digite o modelo do produto",
      manufacturingDate: "Escolha a data de fabricação",
      category: "Selecione uma categoria",
      provider: "Selecione um fornecedor"
    },
    buttons: {
      register: "Cadastrar Produto",
      goBack: "Voltar",
    },
  },
  saleForm: {
    labels:{
      client: "Cliente",
      quantity: "Quantidade de Produtos",
      value: "Valor",
      paymentMethod: "Forma de Pagamento"
    },
    placeholders:{
      client: "Digite o nome do cliente",
      quantity: "Digite a quantidade de produtos",
      value: "Digite o valor total da venda",
      paymentMethod: "Informe a forma de pagamento",
      seller: "Digite o nome do vendedor"
    },
    buttons: {
      register: "Cadastrar venda",
      goBack: "Voltar"
    }
  },
  purchaseForm: {
    labels:{
      provider: "Fornecedor",
      quantity: "Quantidade de Produtos",
      value: "Valor",
      paymentMethod: "Forma de Pagamento"
    },
    placeholders:{
      provider: "Digite o nome do fornecedor",
      quantity: "Digite a quantidade de produtos",
      value: "Digite o valor total da venda",
      paymentMethod: "Informe a forma de pagamento"
    },
    buttons: {
      register: "Cadastrar venda",
      goBack: "Voltar"
    }
  }
};
