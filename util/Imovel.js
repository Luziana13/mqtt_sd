const Reserva = require("./Reserva");
const Cliente = require("./Cliente");

class Imovel{


    constructor(codigo, nome, tipo, endereco){


        this.codigo = codigo;
        this.nome = nome;
        this.tipo = tipo;
        this.endereco = endereco;
        this.disponivel = true;
        this.reservas = [];


    }

    reservar(dataInicialReserva, dataFinalReserva){
        dataInicialReserva = new Date(dataInicialReserva);
        dataFinalReserva = new Date(dataFinalReserva);
        var str_dataI = dataInicialReserva.getDate() + '/' + dataInicialReserva.getMonth() + '/' + dataInicialReserva.getFullYear();
        var str_dataF = dataFinalReserva.getDate() + '/' + dataFinalReserva.getMonth() + '/' + dataFinalReserva.getFullYear();
        this.setaDisponibilidade(dataInicialReserva, dataFinalReserva);
        
        if (this.disponivel){   
            try {
                
                const r = new Reserva(this, dataInicialReserva, dataFinalReserva); 
                
                this.reservas.push(r);
                this.setaDisponibilidade(dataInicialReserva, dataFinalReserva);
                
                return `A Reserva do imovel ${this.nome} para os dias ${str_dataI} à ${str_dataF}, foi realizada com sucesso!!`;
            } catch (e) {
                console.log(e);
            }
           
        } else {
          //  console.log("Não foi possível reservar o Imovel neste período.");
            return `Não foi possível reservar do Imovel ${this.nome} nos dias de ${str_dataI} à ${str_dataF}`;
        }


        
    }


    mostrarReservas(){
        return this.reservas;
    }
 

    existeReserva(){

        if (this.reservas.length > 0){
            return true
        }    
        return false;

    }
    
    setaDisponibilidade(dataInicial, dataFinal){

        dataInicial = new Date(dataInicial);
        dataFinal = new Date(dataFinal);
        
        if(this.existeReserva()){
            
            for (let reservaAtual of this.reservas){

                const teste = (dataInicial >= reservaAtual.dataInicialReserva && dataFinal <= reservaAtual.dataFinalReserva) ||
                (dataInicial >= reservaAtual.dataInicialReserva && dataInicial <= reservaAtual.dataFinalReserva) ||
                (dataFinal >= reservaAtual.dataInicialReserva && dataFinal <= reservaAtual.dataFinalReserva);

                if (teste){
                    this.disponivel = false;
                } else {
                    this.disponivel = true;
                }
              }    
            }
        else{
            
                this.disponivel = true;
            }
    }


    

   setaDataInicialReserva (data) {
      this.dataInicialReserva = new Data(data);
    }


    setaDataFinalReserva(dias){
        this.dataFinalReserva = this.dataInicialReserva.adicionarDias(dias);
    }
 }
 

 module.exports = Imovel; 