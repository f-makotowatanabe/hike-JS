// ==UserScript==
// @name         HIKE - Iframe pagina Chamado CRIA
// @namespace    http://tampermonkey.net/
// @version      2025-06-16
// @description  Ajustes na usabilidade do HIKE
// @author       Makoto
// @match        https://plusoft-itsm.inpaas.com/forms-v2/bpmruntime.userflows.forms.bpm_workflow_81d0f4_w30j6e/*
// @include      https://plusoft-itsm.inpaas.com/forms-v2/bpmruntime.userflows.forms.bpm_workflow_81d0f4_w30j6e/*
// @include      https://plusoft-itsm.inpaas.com/#!/forms/BPM_WORKFLOW_81D0F4/bpmruntime.userflows.forms.bpm_workflow_81d0f4_w30j6e/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function delayo() {
        const inputPrefixo = document.querySelector('[ng-model="vm.entity.data.prefix_alias"]').value;
        const inputTitulo = document.getElementById("field-title").value;
        const inputHoraAlocada = document.getElementById("field-field_currency_28ef7c").value;

        const localRenderiza = document.querySelector(".page-actions.pull-right");

        if (inputHoraAlocada == '') {

            let novoElemento = '<div style="text-align: center; margin-top: 20px;"><strong>'+inputPrefixo+' - '+inputTitulo+'</strong></div><div style="margin-top: 10px; font-size: 16px; font-weight:bold; padding: 3px; background-color: var(--gray-300); border: 2px solid red;" class="alert text-center">Preencha o campo "Horas Alocadas"<button type="button" class="close" data-dismiss="alert" aria-label="Close" style="color: white; padding: 3px 10px; position: initial; top: initial; right: initial;">X Fechar</button></div>';
            localRenderiza.insertAdjacentHTML("afterend", novoElemento);

        } else {

            let novoElemento = '<div style="text-align: center; margin-top: 20px;"><strong>'+inputPrefixo+' - '+inputTitulo+'</strong></div>';
            localRenderiza.insertAdjacentHTML("afterend", novoElemento);
        }


//teste



    } setTimeout(delayo, 5000);

})();
