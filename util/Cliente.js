const Reserva = require("./Reserva");
const Imovel = require("./Imovel");

class Cliente {
    constructor(nome, cpf){
        this.nome = nome;
        this.cpf = cpf;
        this.imoveisDoCliente = [];
        this.reservasDoCliente = [];
    }

    cadastrarImovel(codigo, nome, tipo, endereco){
        const novoImovel = new Imovel(codigo, nome, tipo, endereco);
        this.imoveisDoCliente.push(novoImovel);
    }

    realizarReserva(imovel, dataInicialReserva, dataFinalReserva){
        
        const minhaReserva = imovel.reservar(dataInicialReserva, dataFinalReserva); //undefined
        if(minhaReserva !== undefined){
            console.log(minhaReserva);
            this.reservasDoCliente.push(minhaReserva);
            
        } 
    }

    datasDisponiveis(ArrayImoveis, codigoBuscado){
        const imovelSelecionado = ArrayImoveis.find(i => i.codigo == codigoBuscado);
        var datasDisp = `\nO imovel ${imovelSelecionado.nome} tem data para `  
        if(imovelSelecionado.reservas.length === 0 ){
            return (datasDisp + "todos os dias.");
        }else{
        for (let rer of imovelSelecionado.reservas){
            var str_dataI = rer.dataInicialReserva.getDate() + '/' + rer.dataInicialReserva.getMonth() + '/' + rer.dataInicialReserva.getFullYear();
            var str_dataF = rer.dataFinalReserva.getDate() + '/' + rer.dataFinalReserva.getMonth() + '/' + rer.dataFinalReserva.getFullYear();
           
            return (datasDisp + `todos dos dias exceto: ${str_dataI} À ${str_dataF}`);

        }     
     }
    }
    pesquisarPorCodigo(ArrayImoveis, codigoBuscado){
        for (let i = 0; ArrayImoveis.length; i++){
            if(ArrayImoveis[i].codigo === codigoBuscado){
                return ArrayImoveis[i];
            }
        }
    }

    ImoveisDisponiveis(ArrayImoveis){
        var resposta = []
        for (let imv of ArrayImoveis){
        
            if(imv.reservas.length === 0){
                resposta.push(`\nO Imovél ${imv.nome} não tem reserva`);
            }else{
                for(let rer of imv.reservas){
                    var str_dataI = rer.dataInicialReserva.getDate() + '/' + rer.dataInicialReserva.getMonth() + '/' + rer.dataInicialReserva.getFullYear();
                    var str_dataF = rer.dataFinalReserva.getDate() + '/' + rer.dataFinalReserva.getMonth() + '/' + rer.dataFinalReserva.getFullYear();
                    resposta.push(`\nO Imovél ${rer.imovel.nome} não estará disponível somente no período de: ${str_dataI} à ${str_dataF}`);
                    
            }
        }

    }     
      return resposta; 
    }
}

module.exports = Cliente;