import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import ImpressorHospedagem from "../impressores/impressorHospedagem";
import Impressor from "../interfaces/impressor";
import Hospedagem from "../modelos/hospedagem";

export default class ListagemHospedagens extends Processo {
  private hospedagens: Hospedagem[]
  private impressor!: Impressor
  constructor() {
    super()
    this.hospedagens = Armazem.InstanciaUnica.Hospedagens
  }

  processar(): void {
    console.clear()
    if (this.hospedagens.length !== 0) {
      console.log('Iniciando a listafem das hospedagens...')
      console.log(`-------------------------------------------------`)
      this.hospedagens.forEach(hospedagem => {
        this.impressor = new ImpressorHospedagem(hospedagem)
        console.log(this.impressor.imprimir())
        console.log(`-------------------------------------------------`)
      })
    } else {
      console.log('Ainda não há hospedagens cadastradas!')
    }
  }
}