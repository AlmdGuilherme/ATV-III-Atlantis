import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";
import CadastrarDocumentosCliente from "./cadastroDocumentosCliente";

export default class CadastroClienteDependente extends Processo {
  private clientes: Cliente[]
  constructor() {
    super()
    this.clientes = Armazem.InstanciaUnica.Clientes
  }
  processar(): void {
    console.log('Iniciando cadastro de cliente dependente...')
    const cliente = this.entrada.receberTexto('Digite o nome do titular para atribuir o dependente: ')
    const titular = this.clientes.find(cli => cli.Nome === cliente)
    if (!titular) {
      console.log('Titular não encontrado: Verifique o nome inserido ou se o titular existe!')
    } else {
      let nome = this.entrada.receberTexto('Nome do cliente: ')
      let nomeSocial = this.entrada.receberTexto('Qual o nome social do cliente: ')
      let dataNascimento = this.entrada.receberData('Qual a data de nascimento: ')
      let clienteDep = new Cliente(nome, nomeSocial, dataNascimento)

      this.processo = new CadastrarDocumentosCliente(clienteDep)
      this.processo.processar()

      let armazem = Armazem.InstanciaUnica.Clientes
      armazem.push(clienteDep)
      titular.adicionarDependente(clienteDep)
      console.log('Dependente cadastrado e atribuido com sucesso!')
    }
  }
}