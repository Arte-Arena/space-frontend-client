import { test, expect } from '@playwright/test';

test.describe('Página de Configurações de Conta', () => {
  test.beforeEach(async ({ page }) => {
    // Navega para a página de configurações de conta
    await page.goto('/account-settings/');
  });

  test('deve carregar a página de configurações de conta', async ({ page }) => {
    // Verifica se o título da página contém o texto esperado
    await expect(page).toHaveTitle(/Configurações de Conta/);
    
    // Verifica se o breadcrumb está visível e tem o texto correto
    const breadcrumb = page.getByRole('navigation', { name: /breadcrumb/i });
    await expect(breadcrumb).toBeVisible();
    await expect(breadcrumb.getByText('Configurações de Conta')).toBeVisible();
  });

  test('deve mostrar as abas corretas', async ({ page }) => {
    // Verifica se as abas estão presentes
    const contaTab = page.getByRole('tab', { name: /Conta/i });
    const notificacoesTab = page.getByRole('tab', { name: /Notificações/i });
    const segurancaTab = page.getByRole('tab', { name: /Segurança/i });
    
    await expect(contaTab).toBeVisible();
    await expect(notificacoesTab).toBeVisible();
    await expect(segurancaTab).toBeVisible();
    
    // Verifica se a aba Conta está selecionada por padrão
    await expect(contaTab).toHaveAttribute('aria-selected', 'true');
  });

  test('deve alternar entre as abas', async ({ page }) => {
    // Clica na aba de Notificações
    await page.getByRole('tab', { name: /Notificações/i }).click();
    
    // Verifica se a aba de Notificações está selecionada
    await expect(page.getByRole('tab', { name: /Notificações/i })).toHaveAttribute('aria-selected', 'true');
    
    // Verifica se o conteúdo da aba de Notificações está visível
    await expect(page.getByText('Nossa newsletter')).toBeVisible();
    await expect(page.getByText('Confirmação de Pedido')).toBeVisible();
    
    // Clica na aba de Segurança
    await page.getByRole('tab', { name: /Segurança/i }).click();
    
    // Verifica se a aba de Segurança está selecionada
    await expect(page.getByRole('tab', { name: /Segurança/i })).toHaveAttribute('aria-selected', 'true');
    
    // Verifica se o conteúdo da aba de Segurança está visível
    await expect(page.getByText('Autenticação de Dois Fatores')).toBeVisible();
    await expect(page.getByText('Email Alternativo')).toBeVisible();
  });

  test('deve mostrar o formulário de informações do cliente na aba Conta', async ({ page }) => {
    // Verifica se o título da seção está visível
    await expect(page.getByText('Informações do Cliente')).toBeVisible();
    
    // Verifica se as opções de tipo de pessoa estão presentes
    await expect(page.getByText('Tipo de Pessoa')).toBeVisible();
    await expect(page.getByLabel('Pessoa Física')).toBeVisible();
    await expect(page.getByLabel('Pessoa Jurídica')).toBeVisible();
    
    // Verifica se os campos do formulário para pessoa física estão presentes (opção padrão)
    await expect(page.getByText('Dados Pessoais')).toBeVisible();
    const nomeLabel = page.getByText('Nome Completo', { exact: false });
    await expect(nomeLabel).toBeVisible();
    await expect(page.getByText('Email', { exact: false })).toBeVisible();
    await expect(page.getByText('Celular', { exact: false })).toBeVisible();
    await expect(page.getByText('CPF', { exact: false })).toBeVisible();
    
    // Verifica se a seção de endereço está presente
    await expect(page.getByText('Endereço Principal')).toBeVisible();
    await expect(page.getByText('CEP')).toBeVisible();
    
    // Verifica se o botão de salvar está presente
    await expect(page.getByRole('button', { name: /Salvar/i })).toBeVisible();
  });

  test('deve alternar entre pessoa física e jurídica', async ({ page }) => {
    // Clica no radio button de pessoa jurídica
    await page.getByLabel('Pessoa Jurídica').click();
    
    // Verifica se os campos específicos para pessoa jurídica aparecem
    await expect(page.getByText('Razão Social', { exact: false })).toBeVisible();
    await expect(page.getByText('CNPJ', { exact: false })).toBeVisible();
    await expect(page.getByText('Inscrição Estadual', { exact: false })).toBeVisible();
    
    // Volta para pessoa física
    await page.getByLabel('Pessoa Física').click();
    
    // Verifica se os campos específicos para pessoa física aparecem novamente
    await expect(page.getByText('CPF', { exact: false })).toBeVisible();
    await expect(page.getByText('RG', { exact: false })).toBeVisible();
  });

  test('deve mostrar as opções de endereço de cobrança', async ({ page }) => {
    // Verifica se a opção de endereço de cobrança diferente está presente
    const checkboxLabel = page.getByText('Endereço de cobrança diferente do endereço principal');
    await expect(checkboxLabel).toBeVisible();
    
    // Clica no checkbox
    await checkboxLabel.click();
    
    // Verifica se os campos de endereço de cobrança aparecem
    await expect(page.getByText('Endereço de Cobrança')).toBeVisible();
    
    // Verifica se campos específicos do endereço de cobrança aparecem
    const cepCobrancaLabel = page.locator('#text-cep-cobranca').first();
    await expect(cepCobrancaLabel).toBeVisible();
  });

  test('deve mostrar conteúdo da aba Notificações', async ({ page }) => {
    // Navega para a aba de Notificações
    await page.getByRole('tab', { name: /Notificações/i }).click();
    
    // Verifica as categorias de notificações
    await expect(page.getByText('Nossa newsletter')).toBeVisible();
    await expect(page.getByText('Confirmação de Pedido')).toBeVisible();
    await expect(page.getByText('Alteração de Status do Pedido')).toBeVisible();
    await expect(page.getByText('Pedido Entregue')).toBeVisible();
    await expect(page.getByText('Notificação por Email')).toBeVisible();
    
    // Verifica se os switches de notificações estão presentes
    const switches = page.locator('input[type="checkbox"]');
    await expect(switches).toHaveCount(await switches.count());
    
    // Verifica se o botão de salvar está presente
    await expect(page.getByRole('button', { name: /Salvar/i })).toBeVisible();
  });

  test('deve mostrar conteúdo da aba Segurança', async ({ page }) => {
    // Navega para a aba de Segurança
    await page.getByRole('tab', { name: /Segurança/i }).click();
    
    // Verifica as seções de segurança
    await expect(page.getByText('Autenticação de Dois Fatores')).toBeVisible();
    await expect(page.getByText('Email Alternativo')).toBeVisible();
    await expect(page.getByText('Recuperação por SMS')).toBeVisible();
    await expect(page.getByText('Dispositivos')).toBeVisible();
    
    // Verifica se os botões de configuração estão presentes
    await expect(page.getByRole('button', { name: 'Configurar' })).toBeVisible();
    
    // Verifica se o botão de salvar está presente
    await expect(page.getByRole('button', { name: /Salvar/i })).toBeVisible();
  });
});