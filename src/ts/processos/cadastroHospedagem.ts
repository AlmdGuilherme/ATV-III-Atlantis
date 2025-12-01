import Processo from "../abstracoes/processo";
import DiretorCasalSimples from "../diretores/diretorCasalSimples";
import DiretorFamiliaMais from "../diretores/diretorFamiliaMais";
import DiretorFamiliaSimples from "../diretores/diretorFamiliaSimples";
import DiretorFamiliaSuper from "../diretores/diretorFamiliaSuper";
import DiretorSolteiroMais from "../diretores/diretorSolteiroMais";
import DiretorSolteiroSimples from "../diretores/diretorSolteiroSimples";
import Armazem from "../dominio/armazem";
import MenuTipoAcomodacao from "../menus/menuTipoAcomodacao";
import Acomodacao from "../modelos/acomodacao";
import Cliente from "../modelos/cliente";
import Hospedagem from "../modelos/hospedagem";

export default class CadastroHospedagem extends Processo {
  private hospedagens: Hospedagem[]
  private acomodacoes: Acomodacao[]
  private clientes: Cliente[]

  constructor() {
    super()
    this.acomodacoes = Armazem.InstanciaUnica.Acomodacoes
    this.hospedagens = Armazem.InstanciaUnica.Hospedagens
    this.clientes = Armazem.InstanciaUnica.Clientes
    this.menu = new MenuTipoAcomodacao()
  }

  processar(): void {
    console.log("Bem vindo!")
    console.log("Aqui irá realizar o cadastro da sua hospedagem...")
    console.log("Por favor, insira o nome de um cliente já cadastrado para iniciar.")
    let cliente = this.entrada.receberTexto("| Nome: ")
    let acomodacao: Acomodacao | null = null
    const clienteEncontrado = this.clientes.find(cli => cli.Nome === cliente)
    if (!clienteEncontrado) {
      console.log("Nenhum cliente encontrado, verifique o nome digitado!")
    } else {
      while (acomodacao === null) {
        this.menu.mostrar()
        this.opcao = this.entrada.receberNumero('Selecione o tipo de acomodação desejada: ')
        switch (this.opcao) {
          case 1: 
            acomodacao = new DiretorCasalSimples().construir()
            break
          case 2:
            acomodacao = new DiretorFamiliaSimples().construir()
            break
          case 3:
            acomodacao = new DiretorFamiliaMais().construir()
            break
          case 4:
            acomodacao = new DiretorFamiliaSuper().construir()
            break
          case 5: 
            acomodacao = new DiretorSolteiroSimples().construir()
            break
          case 6: 
            acomodacao = new DiretorSolteiroMais().construir()
            break
          default:
            console.log("Selecione uma opção válida!")
        }
      }
      const dataChegada = new Date()
      const dataSaida = this.entrada.receberData('Digite até quando será a sua estadia: ')
      let hospedagem = new Hospedagem(acomodacao, clienteEncontrado, dataChegada, dataSaida)
      this.hospedagens.push(hospedagem)
      console.log("Cadastro de hospedagem realizado com sucesso!")
    }
  }
}