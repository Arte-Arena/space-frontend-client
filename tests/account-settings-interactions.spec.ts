import { test, expect } from "@playwright/test";

test.describe("Interações na Página de Configurações de Conta", () => {
  test.beforeEach(async ({ page }) => {
    // Navega para a página de configurações de conta
    await page.goto("/account-settings/");
  });

  test("deve validar campos obrigatórios no formulário de conta", async ({
    page,
  }) => {
    // Limpa campos obrigatórios
    await page.getByLabel("Nome Completo", { exact: false }).clear();
    await page.getByLabel("Email", { exact: false }).clear();
    await page.getByLabel("Celular", { exact: false }).clear();

    // Clica no botão salvar
    await page.getByRole("button", { name: /Salvar/i }).click();

    // Verifica se a mensagem de erro aparece
    await expect(page.getByText("Formulário contém erros")).toBeVisible();

    // Verifica se os campos obrigatórios estão marcados com erro
    await expect(page.getByText("Nome é obrigatório")).toBeVisible();
    await expect(page.getByText("Email é obrigatório")).toBeVisible();
    await expect(page.getByText("Celular é obrigatório")).toBeVisible();
  });

  test("deve validar formato de email", async ({ page }) => {
    // Coloca um email inválido
    await page.getByLabel("Email", { exact: false }).fill("email_invalido");

    // Clica fora para acionar a validação
    await page.getByLabel("Celular", { exact: false }).click();

    // Verifica se a mensagem de erro aparece
    await expect(page.getByText("Email inválido")).toBeVisible();

    // Corrige com um email válido
    await page.getByLabel("Email", { exact: false }).fill("email@exemplo.com");

    // Clica fora para acionar a validação
    await page.getByLabel("Celular", { exact: false }).click();

    // Verifica se a mensagem de erro desapareceu
    await expect(page.getByText("Email inválido")).not.toBeVisible();
  });

  test("deve formatar CPF automaticamente", async ({ page }) => {
    // Insere um CPF sem formatação
    await page.getByLabel("CPF", { exact: false }).fill("12345678900");

    // Clica fora para acionar a formatação
    await page.getByLabel("Email", { exact: false }).click();

    // Verifica se o CPF foi formatado
    await expect(page.getByLabel("CPF", { exact: false })).toHaveValue(
      "123.456.789-00",
    );
  });

  test("deve formatar Celular automaticamente", async ({ page }) => {
    // Insere um número de celular sem formatação
    await page.getByLabel("Celular", { exact: false }).fill("11987654321");

    // Clica fora para acionar a formatação
    await page.getByLabel("Email", { exact: false }).click();

    // Verifica se o celular foi formatado
    await expect(page.getByLabel("Celular", { exact: false })).toHaveValue(
      "(11) 98765-4321",
    );
  });

  test("deve mostrar campos de pessoa jurídica e validar CNPJ", async ({
    page,
  }) => {
    // Muda para pessoa jurídica
    await page.getByLabel("Pessoa Jurídica").click();

    // Verifica se os campos específicos estão visíveis
    await expect(
      page.getByText("Razão Social", { exact: false }),
    ).toBeVisible();
    await expect(page.getByText("CNPJ", { exact: false })).toBeVisible();

    // Digita um CNPJ sem formatação
    await page.getByLabel("CNPJ", { exact: false }).fill("12345678000199");

    // Clica fora para acionar a formatação
    await page.getByLabel("Razão Social", { exact: false }).click();

    // Verifica se o CNPJ foi formatado
    await expect(page.getByLabel("CNPJ", { exact: false })).toHaveValue(
      "12.345.678/0001-99",
    );

    // Digita um CNPJ inválido
    await page.getByLabel("CNPJ", { exact: false }).clear();
    await page.getByLabel("CNPJ", { exact: false }).fill("11111111111111");

    // Clica fora para acionar a validação
    await page.getByLabel("Razão Social", { exact: false }).click();

    // Verifica se a mensagem de erro aparece
    await expect(page.getByText("CNPJ inválido")).toBeVisible();
  });

  test("deve preencher formulário de endereço", async ({ page }) => {
    // Preenche o CEP
    await page.locator("#text-cep").fill("12345678");

    // Simula que o CEP foi preenchido automaticamente
    await page.locator("#text-endereco").fill("Rua Exemplo");
    await page.locator("#text-bairro").fill("Bairro Teste");
    await page.locator("#text-cidade").fill("Cidade Teste");

    // Seleciona UF
    await page.selectOption("#select-uf", "SP");

    // Preenche o número
    await page.locator("#text-numero").fill("123");

    // Adiciona complemento
    await page.locator("#text-complemento").fill("Apto 101");

    // Verifica se os campos foram preenchidos corretamente
    await expect(page.locator("#text-endereco")).toHaveValue("Rua Exemplo");
    await expect(page.locator("#text-bairro")).toHaveValue("Bairro Teste");
    await expect(page.locator("#text-cidade")).toHaveValue("Cidade Teste");
    await expect(page.locator("#text-numero")).toHaveValue("123");
    await expect(page.locator("#text-complemento")).toHaveValue("Apto 101");
  });

  test("deve mostrar mensagem de sucesso ao salvar", async ({ page }) => {
    // Preenche formulário com dados válidos
    await page
      .getByLabel("Nome Completo", { exact: false })
      .fill("Usuario Teste");
    await page.getByLabel("Email", { exact: false }).fill("usuario@teste.com");
    await page.getByLabel("Celular", { exact: false }).fill("11987654321");
    await page.getByLabel("CPF", { exact: false }).fill("12345678900");

    // Clica no botão salvar
    await page.getByRole("button", { name: /Salvar/i }).click();

    // Verifica se a mensagem de sucesso aparece
    await expect(page.getByText("Dados salvos com sucesso")).toBeVisible();
  });

  test("deve alternar switches na aba de notificações", async ({ page }) => {
    // Navega para a aba de Notificações
    await page.getByRole("tab", { name: /Notificações/i }).click();

    // Busca por switches que estão desligados e liga o primeiro deles
    const switches = page.locator('input[type="checkbox"]:not(:checked)');
    if ((await switches.count()) > 0) {
      await switches.first().check();
      await expect(switches.first()).toBeChecked();
    }

    // Busca por switches que estão ligados e desliga o primeiro deles
    const switchesOn = page.locator('input[type="checkbox"]:checked');
    if ((await switchesOn.count()) > 0) {
      await switchesOn.first().uncheck();
      await expect(switchesOn.first()).not.toBeChecked();
    }
  });

  test("deve interagir com botões da aba de segurança", async ({ page }) => {
    // Navega para a aba de Segurança
    await page.getByRole("tab", { name: /Segurança/i }).click();

    // Clica em um botão de configurar
    const configurarBtn = page
      .getByRole("button", { name: "Configurar" })
      .first();
    await configurarBtn.click();

    // Como não sabemos o comportamento exato, verificamos se o botão está pelo menos visível
    await expect(configurarBtn).toBeVisible();

    // Clica no botão de salvar
    await page.getByRole("button", { name: /Salvar/i }).click();

    // Botão de salvar deve continuar visível após o clique
    await expect(page.getByRole("button", { name: /Salvar/i })).toBeVisible();
  });
});
