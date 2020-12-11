class Reserva{


    constructor(imovel, dataInicialReserva, dataFinalReserva){

        this.imovel = imovel;
        this.dataInicialReserva = new Date(dataInicialReserva);
        this.dataFinalReserva = new Date(dataFinalReserva);
        this.qteDiasReserva = (this.dataFinalReserva - this.dataInicialReserva)/1000/60/60/24;


    }
 

 }
 

 module.exports = Reserva; 