import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";
import ListagemDependentes from "./listagemDependentes";

export default class RemoverDependentes extends Processo {
  private clientes: Cliente[]
  constructor() {
    super()
    this.clientes = Armazem.InstanciaUnica.Clientes
  }

  processar(): void {
      console.clear()
      console.log('Remoção de dependentes')
      const titularRemove = this.entrada.receberTexto('Digite o nome do titular para remover dependentes: ')
      const titular = this.clientes.find(cli => cli.Nome === titularRemove)
      if (!titular) {
        console.log('Titular não encontrado - Verifique o nome inserido ou se o titular existe')
      } else {
        if (titular.Dependentes.length === 0) {
          console.log('Este titular não possui nenhum dependente!')
        } else {
          let removeType = this.entrada.receberNumero(
            `Qual tipo de exclusão deseja fazer?\n` +
            `1 | Remover dependente específico\n` +
            `2 | Remover todos os dependentes\n`+ 
            `- `
          )
          switch (removeType) {
            case 1:
              this.processo = new ListagemDependentes()
              this.processo.processar()
              const indexToRemove = this.entrada.receberNumero('Selecione o índice do dependente para remover: ')
              if (0 > indexToRemove || indexToRemove > titular.Dependentes.length) {
                console.log('Selecione um índice válido')
              } else {
                const dependenteToRemove = titular.Dependentes[indexToRemove-1]
                titular.removerDependente(dependenteToRemove)
                console.log(`${dependenteToRemove.Nome} removido com sucesso dos dependentes de ${titular.Nome}`)
              }
              break
            case 2:
              titular.Dependentes = []
              console.log(`Todos os dependentes foram removidos do titular: ${titular.Nome}`)
              break
            default:
              console.log('Opção inválida... Tente novamente')
          }
        }
      }
  }
}