// ==UserScript==
// @name         HIKE - Iframe pagina Chamado
// @description  Melhorias na interface do HIKE
// @version      1.0
// @author       MakotoWatanabe
// @icon         https://hikeplatform.com/wp-content/themes/area-structure-1/assets/images/favicon.png
// @include      https://plusoft-itsm.inpaas.com/forms-v2/bpmruntime.userflows.forms.bpm_workflow_*
// @grant        none
// @run-at       document-idle
// ==/UserScript==


/*UPDATE*/


(function() {
    'use strict';
    const $ = window.jQuery; // Assign jQuery to the $ variable


    
    /* FUNCAO DE VERIFICAR O CHAMADO
    // ------------------------------------------------- */
    function verificaChamado() {

        /* Verifica qual area pertence o chamado
        // -------------------------------------------- */
        const area = document.querySelector('h5').textContent;

        /* Local onde renderiza os alerts
        // -------------------------------------------- */
        const RenderizaHeader = document.querySelector('.page-actions.pull-right');
        const RenderizaFlutuante = document.querySelector('.page-text-header');



        /* Adiciona os botões âncora
        // -------------------------------------------- */
        let botaoAncora = '<div class="JSbotaoAncora"><a href="#mainForm"><i class="fa fa-chevron-circle-up"></i></a><a href="#editor"><i class="fa fa-comment"></i></a></div>';
        RenderizaFlutuante.insertAdjacentHTML("afterbegin", botaoAncora);



        /* Adiciona o titulo do chamado no topo
        // -------------------------------------------- */
        const inputPrefixo = document.querySelector('[ng-model="vm.entity.data.prefix_alias"]').value;
        const inputTitulo = document.getElementById('field-title').value;

        let tituloDoChamado = '<div id="JStituloDoChamado">['+inputPrefixo+'] '+inputTitulo+'</div>';
        RenderizaHeader.insertAdjacentHTML("afterend", tituloDoChamado);
        //const PrefixoDoChamado = document.querySelector('[class="h1 no-select page-header-h1"]').textContent = inputPrefixo;



        /* Verifica o campo data no chamado
        // -------------------------------------------- */
        const inputData = document.getElementById('field-duedate').value;

        let hoje = new Date();
        let hoje_formatado = hoje.toLocaleDateString('pt-BR');

        function converteParaIso(dataBrComHora) {
            /* separa só a parte da data
            // -------------------------------------------- */
            const dataBr = dataBrComHora.split(' ')[0];
            const [dia, mes, ano] = dataBr.split('/');
            return `${ano}-${mes}-${dia}`;
        }

        const dataChamado = converteParaIso(inputData);
        const dataHoje = converteParaIso(hoje_formatado);

        function verificaData() {
            if (dataChamado == dataHoje) {
                let novoElemento = '<div class="JSverificaStatus amarelo">'+inputData+' - CHAMADO VENCE HOJE</div>';
                RenderizaFlutuante.insertAdjacentHTML("beforeend", novoElemento);

            } else if (dataChamado < dataHoje) {
                let novoElemento = '<div class="JSverificaStatus vermelho">'+inputData+' - CHAMADO ATRASADO</div>';
                RenderizaFlutuante.insertAdjacentHTML("beforeend", novoElemento);

            } else {
                let novoElemento = '<div class="JSverificaStatus verde">'+inputData+' - CHAMADO NO PRAZO</div>';
                RenderizaFlutuante.insertAdjacentHTML("beforeend", novoElemento);
            }
        }

        verificaData();



        /* Verifica se o campo hora no chamado está preenchido
        // -------------------------------------------- */
        let inputHoraAlocada = '';

        function verificaArea() {
            if (area == "Criação") {
                /* Capta valor do input CRIA
                // -------------------------------------------- */
                inputHoraAlocada = document.getElementById("field-field_currency_28ef7c")?.value || '';

                /* Arruma collapse quebrado CRIA
                // -------------------------------------------- */
                const ArrumaItensRelacionados = document.querySelector('a[data-target="#collapse-section1743106615271"]').setAttribute('data-target', '#collapse-section-1743106615271');
                const ArrumaItensVinculados = document.querySelector('a[data-target="#collapse-section1743106628590"]').setAttribute('data-target', '#collapse-section-1743106628590');

                /* Fecha collapse Itens vinculados
                // -------------------------------------------- */
                const ItensVinculado = document.querySelectorAll('a[data-target="#collapse-section-1743106628590"]');
                for (var cri = 0; cri < ItensVinculado.length; cri++) {
                    ItensVinculado[cri].click();
                    const FechaItensVinculados = document.querySelector('a[data-target="#collapse-section-1743106628590"]').setAttribute('data-target', '#collapse-section1743106628590');
                };
            }
            else if (area == "Campanhas") {
                /* Capta valor do input CAMP
                // -------------------------------------------- */
                inputHoraAlocada = document.getElementById("field-field_currency_5e8d28")?.value || '';

                /* Arruma collapse quebrado CAMP
                // -------------------------------------------- */
                const ArrumaItensRelacionados = document.querySelector('a[data-target="#collapse-section1741204439162"]').setAttribute('data-target', '#collapse-section-1741204439162');
                const ArrumaItensVinculados = document.querySelector('a[data-target="#collapse-section1743761535133"]').setAttribute('data-target', '#collapse-section-1743761535133');

                /* Fecha collapse Itens vinculados
                // -------------------------------------------- */
                const ItensVinculado = document.querySelectorAll('a[data-target="#collapse-section-1743761535133"]');
                for (var camp = 0; camp < ItensVinculado.length; camp++) {
                    ItensVinculado[camp].click();
                    const FechaItensVinculados = document.querySelector('a[data-target="#collapse-section-1743761535133"]').setAttribute('data-target', '#collapse-section1743761535133');
                };
            }
        }
        verificaArea();

        function verificaHoraAlocada() {
            if (inputHoraAlocada === '') {
                let popVerificaHoras = '<div class="JSverificaHora alert alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><i class="fa fa-times"></i>Fechar</button><strong>O campo Horas alocadas está vazio!</strong></div>';
                RenderizaFlutuante.insertAdjacentHTML("afterend", popVerificaHoras);
            }
        }
        verificaHoraAlocada();



    } setTimeout(verificaChamado, 5000);


    /*  SCROLL SUAVE
    // ------------------------------------------------- */
    
    document.querySelector('a[href^="#"]').addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
    document.querySelector('a[href^="#"]').addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const targetPosition = targetElement.offsetTop;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });

})
();
