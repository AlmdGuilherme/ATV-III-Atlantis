import Impressor from "../interfaces/impressor";
import Hospedagem from "../modelos/hospedagem";

export default class ImpressorHospedagem implements Impressor {
  private hospedagem: Hospedagem
  constructor(hospedagem: Hospedagem) {
    this.hospedagem = hospedagem
  }

  imprimir(): string {
    let descricao = `---------------------------------------\n`+
                    `-- Cliente: ${this.hospedagem.Cliente.Nome}\n`+
                    `-- Acomodacao: ${this.hospedagem.Acomodacao.NomeAcomadacao.toString()}\n`+
                    `-- Check-in: ${this.hospedagem.DateCheckin}\n`+
                    `-- Checkout: ${this.hospedagem.DateChecout}`
    return descricao
  }
}