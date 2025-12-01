import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";
import RemoverDependentes from "./removerDependentes";

export default class ExcluirCliente extends Processo {
  private clientes: Cliente[]
  constructor() {
    super()
    this.clientes = Armazem.InstanciaUnica.Clientes
  }
  processar(): void {
    let cliente = this.entrada.receberTexto("Nome do cliente para excluir: ")
    let fetchCliente = this.clientes.find(cli => cli.Nome === cliente)
    if (!fetchCliente) {
      console.log("Cliente não encontrado - Verifique o nome informado ou se o cliente existe!")
    } else {
      if (fetchCliente.Dependentes.length > 0) {
        console.log('Não é possível excluir um cliente (titular) com dependentes')
        console.log('Deseja remover o(s) depentente(s) deste cliente para realizar a exclusão?')
        let choice = this.entrada.receberNumero(
          '1| Sim\n' +
          '2| Não\n' +
          '- '
        )
        switch (choice) {
          case 1:
            this.processo = new RemoverDependentes()
            this.processo.processar()
            break
          case 2:
            console.log('Cliente com dependentes não removido')
            break
          default:
            console.log('Opção inválida... tente novamente')
        }
      } else if (fetchCliente.Dependentes.length === 0 || !fetchCliente.Titular) {
        const indexCliente = Armazem.InstanciaUnica.Clientes.findIndex(cli => cli === fetchCliente)
        Armazem.InstanciaUnica.Clientes.splice(indexCliente, 1)
      } else if (fetchCliente.Titular) {
        const titular = fetchCliente.Titular
        titular.Dependentes = titular.Dependentes.filter(deps => deps !== fetchCliente)
        const indexCliente = Armazem.InstanciaUnica.Clientes.findIndex(cli => cli === fetchCliente)
        Armazem.InstanciaUnica.Clientes.splice(indexCliente, 1)

      }
    }
  }
}
