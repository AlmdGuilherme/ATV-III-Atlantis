import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";

export default class UpdateCliente extends Processo {
  private clientes: Cliente[]
  constructor() {
    super()
    this.clientes = Armazem.InstanciaUnica.Clientes
  }

  processar(): void {
    let nomeClienteUpdate = this.entrada.receberTexto("Nome do cliente para editar: ")
    let cliente = this.clientes.find(cli => cli.Nome === nomeClienteUpdate)
    if (cliente) {
      let nome = this.entrada.receberTexto("Digite o novo nome do cliente: ")
      let nomeSocial = this.entrada.receberTexto("Digite o novo nome social do cliente: ")
      let dataNascimento = this.entrada.receberData("Data de nascimento: ")
      cliente.Nome = nome
      cliente.NomeSocial = nomeSocial
      cliente.DataNascimento = dataNascimento
      console.log("Cliente atualizado com sucesso!")
    } else {
      console.log("Cliente não encontrado: Verifique o nome digitado!")
    }
  }
}