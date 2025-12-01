import Acomodacao from "./acomodacao";
import Cliente from "./cliente";

export default class Hospedagem {
  private tipoAcomodacao: Acomodacao;
  private clienteHospede: Cliente;
  private checkin: Date;
  private checkout: Date;

  constructor (tipoAcomodacao: Acomodacao, clienteHospede: Cliente, checkin: Date, checkout: Date) {
    this.tipoAcomodacao = tipoAcomodacao;
    this.clienteHospede = clienteHospede;
    this.checkin = checkin
    this.checkout = checkout  
  }

  public get Acomodacao() {return this.tipoAcomodacao}
  public get Cliente() {return this.clienteHospede}
  public get DateCheckin() { return this.checkin}
  public get DateChecout() {return this.checkout}

  public mudarDataSaida(novaAcomodacao: Acomodacao, novaDataSaida: Date): void {
    this.tipoAcomodacao = novaAcomodacao;
    this.checkout = novaDataSaida;
  }
}