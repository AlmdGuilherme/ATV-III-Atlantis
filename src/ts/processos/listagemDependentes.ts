import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import ImpressaorCliente from "../impressores/impressorCliente";
import Impressor from "../interfaces/impressor";
import Cliente from "../modelos/cliente";

export default class ListagemDependentes extends Processo {
  private clientes: Cliente[]
  private impressor!: Impressor
  constructor() {
    super()
    this.clientes = Armazem.InstanciaUnica.Clientes
  }

  processar(): void {
    console.clear()
    const clienteTitular = this.entrada.receberTexto('Digite o nome do titular para listar os dependentes: ')
    const fetchedCliente = this.clientes.find(cli => cli.Nome === clienteTitular)
    if (!fetchedCliente) {
      console.log('Titular não encontrado: Verifique o nome informado ou se o titular existe!')
    } else {
      if (fetchedCliente.Dependentes.length !== 0) {
        let index = 1
        fetchedCliente.Dependentes.forEach(cliente => {
          this.impressor = new ImpressaorCliente(cliente)
          console.log(`${index} | ${cliente.Nome}\n` + this.impressor.imprimir())

        })
      } else {
        console.log('Este cliente não possui dependentes!')
      }
    }
  }
}