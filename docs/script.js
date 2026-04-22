    document.addEventListener('DOMContentLoaded', () => {
    // Preisstruktur
    const priceConfig = {
        'Fulltune': {
            prices: [10000, 10000, 10000, 10000],
            selector: '#fulltune'
        },
        'Primärfarbe': {
            prices: [650, 650, 650, 650],
            selector: '#primaerfarbe'
        },
        'Sekundärfarbe': {
            prices: [650, 650, 650, 650],
            selector: '#sekundaerfarbe'
        },
        'Perleffekt': {
            prices: [650, 650, 650, 650],
            selector: '#perleffekt'
        },
        'Nummernschildfarbe': {
            prices: [150, 150, 150, 150],
            selector: '#nummernschildfarbe'
        },
        'Custom-Kennzeichen': {
            prices: [200000, 200000, 200000, 200000],
            selector: '#customkennzeichen'
        },
        'Reifenfarbe': {
            prices: [650, 650, 650, 650],
            selector: '#reifenfarbe'
        },
        'Reifenqualm': {
            prices: [650, 650, 650, 650],
            selector: '#reifenqualm'
        },
        'Xenon Scheinwerfer': {
            prices: [650, 650, 650, 650],
            selector: '#xenon'
        },
        'Unterboden': {
            prices: [650, 650, 650, 650],
            selector: '#unterboden'
        },
        'felgen': {
            prices: [750, 750, 750, 750],
            selector: '#felgen'
        },
        'fenstertoenung': {
            prices: [250, 250, 250, 250],
            selector: '#fenstertoenung'
        },
        'headlights': {
            prices: [
                [0, 0, 0, 0],
                [150000, 150000, 150000, 150000],
                [100000, 100000, 100000, 100000]
            ],
            selector: '#headlights',
            isDropdown: true
        },
        'Fahrzeugteile': {
            prices: [450, 450, 450, 450], // Preise pro Stück
            selector: '#fahrzeugteile-anzahl'
        },
        'Hupen': {
            prices: [350, 350, 350, 350],
            selector: '#hupe'
        }
    };

    const anzahlElement = document.getElementById('fahrzeugteile-anzahl');
    const plusBtn = document.getElementById('fahrzeugteile-plus');
    const minusBtn = document.getElementById('fahrzeugteile-minus');

    let anzahl = 0;

    function updateCounter() {
        anzahlElement.textContent = anzahl;
        minusBtn.disabled = anzahl === 0;
        updatePrice();
    }

    plusBtn.addEventListener('click', () => {
        anzahl++;
        updateCounter();
    });

    minusBtn.addEventListener('click', () => {
        if (anzahl > 0) anzahl--;
        updateCounter();
    });

    // Gutschein-Regeln – beide Gutscheine sollen exakt gleich behandelt werden
    const voucherRules = {
        'gutschein1': {
            '1': {
                disable: {
                    elements: ['#fulltune','#bremsen','#getriebe','#motor','#turbo','#federung','#panzerung'],
                    condition: (mainIndex) => mainIndex === 0
                }
            },
            '2': {
                disable: {
                    elements: ['#fulltune','#bremsen','#getriebe','#motor','#turbo','#federung','#panzerung'],
                    condition: (mainIndex) => mainIndex === 1
                }
            },
            '3': {
                disable: {
                    elements: ['#primaerfarbe', '#sekundaerfarbe', '#perleffekt'],
                    condition: () => true
                }
            },
            '7': {
                disable: {
                    elements: ['#nummernschild', '#customkennzeichen'],
                    condition: () => true
                }
            },
            '5': {
                disable: {
                    elements: ['#reifenfarbe', '#reifenqualm','#fenstertoenung'],
                    condition: () => true
                },
                additionalActions: () => {
                    const felgen = document.querySelector('#felgen');
                    if (felgen) felgen.value = '0';
                }
            },
            '6': {
                disable: {
                    elements: ['#hupe'],
                    condition: () => true
                }
            },
            '4': {
                disable: {
                    elements: ['#unterboden'],
                    condition: () => true
                },
                additionalActions: () => {
                    const felgen = document.querySelector('#headlights');
                    if (headlights) headlights.value = '0';
                }
            }
        },
        'gutschein2': {
            '1': {
                disable: {
                    elements: ['#fulltune','#bremsen','#getriebe','#motor','#turbo','#federung','#panzerung'],
                    condition: (mainIndex) => mainIndex === 0
                }
            },
            '2': {
                disable: {
                    elements: ['#fulltune','#bremsen','#getriebe','#motor','#turbo','#federung','#panzerung'],
                    condition: (mainIndex) => mainIndex === 1
                }
            },
            '3': {
                disable: {
                    elements: ['#primaerfarbe', '#sekundaerfarbe', '#perleffekt'],
                    condition: () => true
                }
            },
            '7': {
                disable: {
                    elements: ['#nummernschild', '#customkennzeichen'],
                    condition: () => true
                }
            },
            '5': {
                disable: {
                    elements: ['#reifenfarbe', '#reifenqualm','#fenstertoenung'],
                    condition: () => true
                },
                additionalActions: () => {
                    const felgen = document.querySelector('#felgen');
                    if (felgen) felgen.value = '0';
                }
            },
            '6': {
                disable: {
                    elements: ['#hupe'],
                    condition: () => true
                }
            },
            '4': {
                disable: {
                    elements: ['#unterboden'],
                    condition: () => true
                },
                additionalActions: () => {
                    const felgen = document.querySelector('#headlights');
                    if (headlights) headlights.value = '0';
                }
            }
        }
    };

    const zuordnungSelectElement = document.getElementById('zuordnungSelect');
    if (zuordnungSelectElement) {
        const infoBox = document.getElementById('zuordnungInfo');
        const optionInfo = {
            'bennys': 'Primär: <br> Sekundär:  <br> Perleffekt: <br> Reifenqualm: - <br> Unterboden: -',
            'fib': '<br> Es wird nicht nach dem Ausweis gefragt! <br><br>',
            'md': 'Primär: Alabaster Weiß <br> Sekundär: Alabaster Weiß <br> Perlerffekt: Alabaster weiß <br> Keine Troll Felgen und keine Fenstertönung <br>',
            'md spezial unit': 'Primär: <br> Sekundär: <br> Perlerffekt: <br>',
            'pd': 'Primärfarbe: Matt Schwarz <br> Sekundärfarbe: Matt Schwarz <br> Perleffekt: <br>',
            'tmf': 'Primärfarbe: Shell (braun) <br> Sekundärfarbe: <br> Perleffekt: Shell (braun) <br>',
            'tmf unmarked': 'Primärfarbe: <br> Sekundärfarbe: <br> Perleffekt: <br>',
            'pd cid': 'Primärfarbe: <br> Sekundärfarbe: <br> Perleffekt: <br>', 
            'pd gtf': 'Primärfarbe: <br> Sekundärfarbe: <br> Perleffekt: <br>',
            'pd jugular': 'Primärfarbe: <br> Sekundärfarbe: <br> Perleffekt: <br>', 
            'pd jugulargtf': 'Primärfarbe: <br> Sekundärfarbe: <br> Perleffekt: <br>', 
            'pd s.p.f.u': 'Primärfarbe: <br> Sekundärfarbe: <br> Perleffekt: <br>', 
            'pd swat': 'Primärfarbe: <br> Sekundärfarbe: <br> Perleffekt: <br>',
            'pd unmarked': 'Primärfarbe:  <br> Sekundärfarbe: <br> Perleffekt: <br>', 
            'unicorn': 'Primärfarbe: <br> Sekundärfarbe:  <br> Perleffekt:  <br> Reifenqualm: ',   
            'blood rose mc': 'Primär: Dunkles Rot <br> Sekundär: <br> Perleffekt: Dunkle Nacht (schwarz)',
            'onepiece': 'Primär: Metallic Grau <br> Sekundär: <br> Perleffekt: Helles Gold',
            'onepiece ug': 'Primär: Matt Schwarz <br> Sekundär: <br> Perleffekt: Helles Gold',
            '069': 'Primär: Verbotenes Blau <br> Sekundär: <br> Perleffekt: Mitternachtsblau',
            '666': 'Primär: Matt Grau <br> Sekundär: <br> Perleffekt: Elektrisches Rosa',
            'district 67': 'Primär: Paradies Blau <br> Sekundär: <br> Perleffekt: Matt Schwarz',
            'k-town': 'Primär: Matt Schwarz <br> Sekundär: <br> Perleffekt: Hellgrün ',
            'zivi vip2': 'Info: Bekommen 40% auf alle Fahrzeuge'

            
            // Hier kannst du weitere Zuordnungen und Infos hinzufügen
        };

        function updateZuordnungInfo() {
            const selectedValue = zuordnungSelectElement.value.toLowerCase();
            if (optionInfo[selectedValue]) {
                infoBox.innerHTML = optionInfo[selectedValue];
                infoBox.style.display = 'block';
            } else {
                infoBox.style.display = 'none';
            }
        }

        // Bei Änderung des Dropdowns Info-Box aktualisieren und Preis neu berechnen
        zuordnungSelectElement.addEventListener('change', () => {
            updateZuordnungInfo();
            updatePrice();
        });

        // Initial beim Laden der Seite
        updateZuordnungInfo();
    }

    // DOM-Elemente
    const mainOptions = document.querySelectorAll('.main-option');
    const priceDisplay = document.getElementById('total-price');

    // Gutschein-Handler: beide Voucher-Dropdowns werden hier verarbeitet
    function handleVoucherChanges() {
        const voucherSelects = [
            document.getElementById('gutschein1'),
            document.getElementById('gutschein2')
        ];
        const mainIndex = [...mainOptions].findIndex(opt => opt.checked);
        
        // Rücksetzen aller Elemente, die von beiden Gutscheinen beeinflusst werden
        Object.values(voucherRules.gutschein1).forEach(rule => {
            rule.disable.elements.forEach(selector => {
                const element = document.querySelector(selector);
                if (element) {
                    element.disabled = false;
                    if (element.type === 'checkbox') {
                        element.checked = element.checked && !element.disabled;
                    }
                }
            });
        });
        
        // Verarbeitung beider Voucher-Felder
        voucherSelects.forEach((voucherSelect, index) => {
            if (!voucherSelect) return;
            const selectedOption = voucherSelect.value;
            // Überspringen, falls kein Gutschein gewählt wurde
            if (selectedOption === "0" || selectedOption.toLowerCase() === "keiner") return;
            
            // Wähle den passenden Regelsatz: Gutschein 1 oder Gutschein 2
            const rules = index === 0 ? voucherRules.gutschein1 : voucherRules.gutschein2;
            const rule = rules[selectedOption];
            if (rule) {
                if (rule.disable.condition(mainIndex)) {
                    rule.disable.elements.forEach(selector => {
                        const element = document.querySelector(selector);
                        if (element) {
                            element.disabled = true;
                            if (element.type === 'checkbox') {
                                element.checked = false;
                            }
                        }
                    });
                }
                if (rule.additionalActions) {
                    rule.additionalActions();
                }
            }
        });
    }

    // Preisberechnung
    function updatePrice() {
        let total = 0;
        const mainIndex = [...mainOptions].findIndex(opt => opt.checked);
        if (mainIndex === -1) return;

        Object.entries(priceConfig).forEach(([name, config]) => {
            const element = document.querySelector(config.selector);
            if (!element || element.disabled) return;

            if (config.isDropdown) {
                // Korrekte Dropdown-Behandlung
                const selectedValue = parseInt(element.value);
                if (!isNaN(selectedValue) && selectedValue >= 0) {
                    const priceArray = config.prices[selectedValue] || [];
                    total += priceArray[mainIndex] || 0;
                }
            } else {
                // Checkbox-Behandlung
                if (element.checked) {
                    total += config.prices[mainIndex] || 0;
                }
            }
        });

        const fahrzeugteileConfig = priceConfig['Fahrzeugteile'];
        const currentAnzahl = parseInt(document.getElementById('fahrzeugteile-anzahl').textContent);
        total += currentAnzahl * fahrzeugteileConfig.prices[mainIndex];

        // Rabatt-Optionen:
        const zuordnungSelect = document.getElementById('zuordnungSelect');
        if (zuordnungSelect) {
            const optionVal = zuordnungSelect.value.toLowerCase();
            console.log("Debug: Dropdown 'zuordnungSelect' value:", optionVal);
            if (optionVal === 'bennys') {
                total *= 0.5;
            } else if (optionVal.includes('vip2')) {
                total *= 0.6
            } else if (optionVal.includes('vip')) {
                // Wenn Fahrzeugtyp bereits gewählt, entsprechend 30 % (privatauto) oder 40 % (frakdienstauto)
                const carType = document.querySelector('input[name="contractType"]:checked');
                if (carType) {
                    console.log("Debug: Radiobutton 'contractType' selected:", carType.value);
                    if (carType.value === 'privatauto') { // Privatauto
                        total *= 0.7;
                    } else if (carType.value === 'frakdienstauto') { // Frak/Dienstauto
                        total *= 0.6;
                    }
                } else {
                    console.log("Debug: Kein Fahrzeugtyp ausgewählt, defaulting to 30% discount");
                    total *= 0.7;
                }
            }
        }
        
        priceDisplay.textContent = new Intl.NumberFormat('de-DE', { useGrouping: false }).format(total);

    }

    // Event-Listener für Main Options mit Reset der Gruppen
    mainOptions.forEach(option => {
        option.addEventListener('change', () => {
            anzahl = 0;
            updateCounter();

            // Spezielles Reset für option-items, falls vorhanden
            document.querySelectorAll('.option-items input, .option-items select').forEach(input => {
                if (input.type === 'checkbox' || input.type === 'radio') {
                    input.checked = false;
                } else {
                    input.value = '';
                }
            });
            // Reset der Gruppen: option-items, input-group, gutschein-group, felgen-group, headlights-group
            ['option-item', 'input-group', 'gutschein-group', 'felgen-group', 'headlights-group'].forEach(className => {
                document.querySelectorAll('.' + className).forEach(group => {
                    group.querySelectorAll('input, select').forEach(input => {
                        if (input.type === 'checkbox' || input.type === 'radio') {
                            input.checked = false;
                        } else {
                            input.value = '';
                        }
                    });
                });
            });
            const infoBox = document.getElementById('zuordnungInfo');
            if (infoBox) {
                infoBox.style.display = 'none';
 // Oder falls du eine Standardnachricht setzen willst: infoBox.innerHTML = 'Wähle eine Option';
            }

            const zuordnungSelect = document.getElementById('zuordnungSelect');
            if (zuordnungSelect) {
                zuordnungSelect.value = 'zivilist';  // Hier den Wert explizit auf 'zivilist' setzen
                // Optional: Event auslösen, damit die Preisberechnung mit dem neuen Wert funktioniert
                $(zuordnungSelect).trigger('change');
            }

            handleVoucherChanges();
            updatePrice();
        });
    });

    Object.values(priceConfig).forEach(config => {
        const element = document.querySelector(config.selector);
        if (element) {
            if (config.isDropdown) {
                element.addEventListener('change', () => {
                    handleVoucherChanges();
                    updatePrice();
                });
            } else {
                element.addEventListener('change', updatePrice);
            }
        }
    });

    document.querySelectorAll('.check-box').forEach(element => {
        element.addEventListener('change', updatePrice);
    });

    // Event-Listener für beide Gutschein-Dropdowns hinzufügen
    const gutschein1 = document.getElementById('gutschein1');
    if (gutschein1) {
        gutschein1.addEventListener('change', () => {
            handleVoucherChanges();
            updatePrice();
        });
    }
    const gutschein2 = document.getElementById('gutschein2');
    if (gutschein2) {
        gutschein2.addEventListener('change', () => {
            handleVoucherChanges();
            updatePrice();
        });
    }

    // Event-Listener für das Dropdown "zuordnungSelect"
    const zuordnungSelect = document.getElementById('zuordnungSelect');
    if (zuordnungSelect) {
        zuordnungSelect.addEventListener('change', updatePrice);
    }
    
    // *** WICHTIG: Event-Listener für die Radiobuttons des Fahrzeugtyps ***
    document.querySelectorAll('input[name="contractType"]').forEach(input => {
        input.addEventListener('change', updatePrice);
    });

    // Initialisierung
    handleVoucherChanges();
    updatePrice();
});

// Hauptoptionen-Handler
function onlyOne(checkbox) {
    const checkboxes = document.querySelectorAll('.main-option');
    checkboxes.forEach(item => {
        if (item !== checkbox) item.checked = false;
    });
}

    // Überprüfen und anpassen des Platzhalters beim Öffnen des Dropdowns
window.addEventListener("load", function () {
    const dienstnummer = sessionStorage.getItem("dienstnummer") || sessionStorage.getItem("user");
    const dienstnummerBox = document.querySelector(".dienstnummer-info");

    // Dienstnummer anzeigen
    if (dienstnummerBox) {
        if (dienstnummer) {
            dienstnummerBox.innerHTML = `Dienstnummer des Arbeiters: ${dienstnummer}`;
        } else {
            dienstnummerBox.innerHTML = "Dienstnummer des Arbeiters: Unbekannt";
        }

        dienstnummerBox.style.visibility = "visible";
    }

    // Senden Button
    const sendenButton = document.getElementById("sendenButton");

    if (sendenButton) {
        sendenButton.addEventListener("click", () => {
            const workerNumber = sessionStorage.getItem("dienstnummer") || sessionStorage.getItem("user") || "Unbekannt";
            const customerName = document.getElementById("kundenname").value;
            let finalPrice = document.getElementById("total-price").textContent;

            const headlightsValue = document.getElementById("headlights").value;
            if (headlightsValue === "1") {
                finalPrice += " (inkl. Headlights)";
            } else if (headlightsValue === "2") {
                finalPrice += " (inkl. Headlightsfarbe)";
            }

            if (document.getElementById("customkennzeichen").checked) {
                finalPrice += " (inkl. Kennzeichen)";
            }

            const zuordnungSelect = $('#zuordnungSelect');
            const zuordnungText = zuordnungSelect.find("option:selected").text();
            const filteredZuordnungText = zuordnungText.replace(/[^\p{L}\s]/gu, '');

            const dienstnummerValue = document.getElementById("dienstnummerkunde").value;
            const dienstnummerText = dienstnummerValue
                ? ` -- Dienstnummer: ${dienstnummerValue}`
                : "";

            const message = `${workerNumber} - ${customerName} | ${finalPrice} | ${filteredZuordnungText}${dienstnummerText}`;

            const webhooks = {
        "mitarbeiter_01.html": "https://discordapp.com/api/webhooks/1495787692833767464/5CZhZ6QgSTZnEcF53RLEOWV-HwWmbHHBVDWaYsl0oKbE8x_Z2SF7pAqyJAZEqO4P6p66",
        "mitarbeiter_02.html": "https://discordapp.com/api/webhooks/1495787737482002563/GTYU3l7JEa6ljGpXRuuueX_JnYY4bXzIdsPPYLuJwIdEMBigOAxUq0XgRzaIjyuJL4OC",
        "mitarbeiter_03.html": "https://discordapp.com/api/webhooks/1495787770981912594/3m69fdfrEVrSiKYhwasFH7ziE2mUG6bD4CdFMfEwp8DFodJgrxJfKu2cqLlQgyBlUYMV",
        "mitarbeiter_04.html": "https://discordapp.com/api/webhooks/1495787803953336402/jtZnv1_D0kAHudxQ_PyA-SvtmsdfuwBzcHufD6fK8Hq5NggNcuI6xWpkqCP5SZlg_ZUa",
        "mitarbeiter_05.html": "https://discordapp.com/api/webhooks/1495787848757154064/gvpJqACWtmE3TjduQgnolgCC6RulJ4tAxkrKbMK4hMLWzEV9h5qy32vD-HcWjZyVFl1e",
        "mitarbeiter_06.html": "https://discordapp.com/api/webhooks/1495787874573090917/9RCvUydTeyG9Q1L8nxfdSnoKTy0liBXDrt8F9KOqFZ_GJYi7r3aMUlKwQJtenWDKnucl",
        "mitarbeiter_07.html": "https://discordapp.com/api/webhooks/1495877685887504556/Itg4b-KQCOGXWjq_og4PEnywS50rIVTPGCmWzSAiZYVXr-__4CG-jx1bSjdqvb0dv88_",
        "mitarbeiter_08.html": "https://discordapp.com/api/webhooks/1495877764002353234/nIZmxQXLPmmF1W2XyDsGmIcX5mX-64hLvX3eNKUbEscpiUkOIdhkhjj4LaNgjPaygxiA",
        "mitarbeiter_09.html": "https://discordapp.com/api/webhooks/1495877845111537764/mKRxgFi3AjcJwSYOOFA_aPiKhjTvIJIF2ar3ro6oU8_Wjg-VZXQhfaihCqxT7QGEQjap",
        "mitarbeiter_10.html": "https://discordapp.com/api/webhooks/1495878060246040760/Mo46VBCb-kG7-3-wef3ZE62FYVr3ZuC0CIOD94xi1cvacI_g6ba6Y9QkQeOjPlpa4avK",
        "mitarbeiter_11.html": "https://discordapp.com/api/webhooks/1495877931946217532/v7w7CcXZR0TGtq0zgI_uK79qYTTeET8zrCpYydMt-sdZAI8JSFxbXPdpYzhT-m67p-i6",
        "mitarbeiter_12.html": "https://discordapp.com/api/webhooks/1495878172800057354/Y015a0nGGNbx_p8IqsEM_nbx9wfBxqU4k4y0mjzx-7YimOE_Xjr_wXVIgGXCYmNyBTo6",
        "mitarbeiter_13.html": "https://discordapp.com/api/webhooks/1495878376311754862/Um8yn7yZdUl9BtVxTCQZIKMZKdv2PEUQRU6lt7ga66PcScnzOzmRc1p5x2BcsUwRCc3x",
        "mitarbeiter_14.html": "https://discordapp.com/api/webhooks/1495878447237566614/IuisDbyrX3lvR_ypjKLp6ZryKJJhzPi_e_TL_Uy-5h7T6RPKzuWqlJkfaLwt9I9ATWcX",
        "mitarbeiter_15.html": "https://discordapp.com/api/webhooks/1495878568033386598/n1ycsqPuUFyPAd_AVYVRA-JUS0VvPMPDmFoKLFM6uRv9mVXXw1q7ZFw8xO_YvX0U6dlL",
        "mitarbeiter_16.html": "https://discordapp.com/api/webhooks/1495878844471836792/RgeeDC_5gdsEbr3C6umIetPUbW0iYUw_RtnRBtSV-clArrDSWS1Z7AUzLy1q4029iux9",
        "mitarbeiter_17.html": "https://discordapp.com/api/webhooks/1495878899421286511/UHgu9rR_xD9HhU5248JCrWM3_zgYYavfQkbjGeCZxddZPuUY-mftMeh-tbQ9pAcMx48d",
        "mitarbeiter_18.html": "https://discordapp.com/api/webhooks/1495878973366861895/x5vrZCEPS9ccXL0JDsQGkVw-JjWkgSz-YQ79ewMRK5GJosO2kWwh2Yn6vOm_o3lXnGpf",
        "mitarbeiter_19.html": "https://discordapp.com/api/webhooks/1495880576903942284/WEjiUTqjgnCbJCmyXqIg7y8zN4iOUGM51lp2Dc6N8KKF6ylvxfBiGGrf5_HvVhJYWoSd",
        "mitarbeiter_20.html": "https://discordapp.com/api/webhooks/1495880672647057631/FlM_LCnhVU3J8JvQBSDblExMBVfAQmWRjbb3_2_1PFj1sp_dyE6r0pJmBpCHgsOu00sl",
        "mitarbeiter_21.html": "https://discordapp.com/api/webhooks/1495880737839255662/uiskS-XlMVHa26kZs32DgBakaZsfhbgMMil69m-mlMjgjhpJaQwQmsZrANpLYOJZR8C8",
        "mitarbeiter_22.html": "https://discordapp.com/api/webhooks/1495881145823399986/Mq3hZpYq4XHHEDLhvjBxETpnNkzC5Ttzd-Y1O89hjZeJsZ_dX60tUxKok6V79WXtpkh9",
        "mitarbeiter_23.html": "https://discordapp.com/api/webhooks/1495881217936068758/72KFDZB0VrgOKzIYTtjmrGWuZAiNzVssUejzFwAqp8u0QdYekKEBxv9VFTUNsG_TfZM-",
        "mitarbeiter_24.html": "https://discordapp.com/api/webhooks/1495881406189015132/Pr5TrVkPh6nBb7ZcbQhYUSOilCORB-kxBE4v3YGg7q9NA2uwbBUESzffuRL5H_1zh4LS",
        "mitarbeiter_25.html": "https://discordapp.com/api/webhooks/1495881446794199101/BAZ4kWYe4nWj5CtxtVwxKSIVEzFx0uenzkxCjtunm_gu5kCl82CmZPeClWCILvfNXIoc",
        "mitarbeiter_26.html": "https://discordapp.com/api/webhooks/1495882112501420063/FNsE8SPzKZ66ZUVKWDMHUhb8l4d_XdJLeURCSTjgf8oxeeaLaVYE4wecyODeRj7B7kgh",
        "mitarbeiter_27.html": "https://discordapp.com/api/webhooks/1495882245754327070/jB8CQg_X6Aw_b09Q5eWEwIPFHTiDEcqZoXEQ9MF05oT4D0b2VuhOOGNRHS-a7Bojc74r",
        "mitarbeiter_28.html": "https://discordapp.com/api/webhooks/1495889198522302656/QsG_9Gc1zXU1An7SvzgqKXqm7VWdDljcH_pymLyBuLmMLh2s4gZ2AgMWeBUFV3GPUWni",
        "mitarbeiter_29.html": "https://discordapp.com/api/webhooks/1495889247675089079/f3gL4F2r_UsRgMp_lDmSS4A-TVxsZBclKSr5fjd8orzH8TqINbxrEO2PPrULu-ZFD1dQ",
        "mitarbeiter_30.html": "https://discordapp.com/api/webhooks/1496641404515127417/yQMaJ0iZzXRDL9vHZAp-HeoeycMb1VHOF_4xWxCBfUMP4Ilhi841hn_KG5WS3W7RZevG",
        "mitarbeiter_31.html": "https://discordapp.com/api/webhooks/1495889367498100748/NiEus5XxvX1A65cjJ_pg6L6XfTlgEKWT8iIqW9TA3sodO8narMuETtHwYyolPLuzdZn3",
        "mitarbeiter_32.html": "https://discordapp.com/api/webhooks/1495889428340539573/AUowxPAaQpRJ_6B8Ci2DAZWbISATzQk0Q_4hsOqfACs3IeGyNe1d3-4qhpZSD7S3vSgV",
        "mitarbeiter_33.html": "https://discordapp.com/api/webhooks/1495889481868247240/gxWZFW5gyCN_h2dtUujVZzccJvQnpSuu6W0YzTNBlsF8jcilEJ--ltHk47_Zn5VwA0x3",
        "mitarbeiter_34.html": "https://discordapp.com/api/webhooks/1495889830469701955/l5p9vCGRpUqQfVy9-Po6UPa1lI8byDwq-SoRfXK-bQ8SuxMOq3IZnFa2vjNHyRUy7xUD",
        "mitarbeiter_35.html": "https://discordapp.com/api/webhooks/1495890135340941435/4-wHilfGhmx-Mqo-lxQPSnJWx3c8v9rU3xsKeaXnwwLFeiLaceHMmzmLY6kvoedhS_XJ",
        "mitarbeiter_36.html": "https://discordapp.com/api/webhooks/1495890181155192862/gANIpgAqcq-tvq91gPqr2YDAuOdNo3ksJec-7mAyAgm6RIBklzOdjgxlrlOHtuv3LRQU",
        "mitarbeiter_37.html": "https://discordapp.com/api/webhooks/1495890305998913736/fFrpDIwTOUVMuSTffK7MM5riISoTlXV2yg4zZIIluZrzgn2U6VV9GIrb57QBnohBLoXw",
        "mitarbeiter_38.html": "https://discordapp.com/api/webhooks/1495890364463190109/gkiKs0V9H78viXzOOzKXL2GFA1ZKgNS-qAkw8kRfrpP28uXI6wKTrytD4Ogh3wH-_uFs",
        "mitarbeiter_39.html": "https://discordapp.com/api/webhooks/1495897781192360108/UuDhn9VW3fle2MXS2R49QZDza2hDhX_OYqhRf0yaTxgEL9Ew4uWciITaTzHM4GrH3PIi",
        "mitarbeiter_40.html": "https://discordapp.com/api/webhooks/1495897832018935950/DbQq7cVyT5agFGMxgxHVmlbrd_IFeOasdFvRXofcC_aJNfOuA-HBmN7GjEqgwHMUbzAi",
        "mitarbeiter_41.html": "https://discordapp.com/api/webhooks/1495897876650393843/9ou_Kwgs0k3tkC3pNJDtmWEw2mtNK5qoyiAxofNViqOpRp8nf9Mm2FnR1dEidpIf7Mau",
        "mitarbeiter_42.html": "https://discordapp.com/api/webhooks/1495897943952199872/vlGGExeX5jU-26BA5xnfwDmJNjnZIZJ-djMlLSl8tZMCSJWqc8OStXp8gxLruv4lCG2n",
        "mitarbeiter_43.html": "https://discordapp.com/api/webhooks/1495897985803096197/jQTRvFPnw6kWozNOI3_ZAEr4iB_PBaJepyc5KnUcFC7lqUkhbpXb4vZskYdIgrHDlO5c",
        "mitarbeiter_44.html": "https://discordapp.com/api/webhooks/1495898034481926244/fa8Ruh4jBjQ0I5Awb18maaq9LfELH5Xb-iDc-aiolifQOJ5Md78SHaygX93NLMLkdIZl",
        "mitarbeiter_45.html": "https://discordapp.com/api/webhooks/1495898144008048640/4of59sqrRbUoxxYxLjqNYoJmLF31boYhHl0W1V8MIWL3GrhJkksBkdtlA32wP3NMwsij",
        "mitarbeiter_46.html": "https://discordapp.com/api/webhooks/1495899970895872192/nsRgZSur6hAJ14mgaY8cXazyii2jSm4LwrsH-3I7YS9vP_gaffM7VaCwt3gZAcXmtFDD",
        "mitarbeiter_47.html": "https://discordapp.com/api/webhooks/1495900078638895134/jGTCfrcNcI4ZiYNq9bgIxytQ5UBr3kgQ9VdA4VGy7gZiq0mfrZ1Tmysj_ZexSa15v9zN",
        "mitarbeiter_48.html": "https://discordapp.com/api/webhooks/1495900123451097290/7btMuEDCpKV9g-Jy2NGgQQ-oDeYQ_N0MLkbU_bzRxwhyK6x_eAGshwP1DaH0NOS0Anwh",
        "mitarbeiter_49.html": "https://discordapp.com/api/webhooks/1495900470550728825/VjhLXVHxU_RmUx3Ga4QW15ZvuCzbPcRUqxNauIWVLeIE6clYIqFw2rffc6XlrnV5dxwg",
        "mitarbeiter_50.html": "https://discordapp.com/api/webhooks/1495900516700655758/4mEZYxqhADeVgvNwXiwarPi-KYv_v3CwAbx5wQIq6CwjUcDmob_xJ0ztGXaj9kQTspNb",
        "mitarbeiter_51.html": "https://discordapp.com/api/webhooks/1495901703545950418/U3npfH2OT0iQOk8QMslpgOadDWchrl9os9wNJcGj5KzPEBnj4axuIIlOvC0i0eA_Jp94",
        "mitarbeiter_52.html": "https://discordapp.com/api/webhooks/1495901751771926579/vwyrNl_XCTtEOiPSJLTKOscIfmk6Ppjuz7o9me9s_oSCJv8WAlhjC0W0hiy3LWRFzgB3",
        "mitarbeiter_53.html": "https://discordapp.com/api/webhooks/1495901796986785914/YqY5SkODDAVkUNLSFycGGCW5zk1KlR9hwO6eBX46217Fs0mlfHu4SJ3q18-npxONzgsd",
        "mitarbeiter_54.html": "https://discordapp.com/api/webhooks/1495901895510851665/rV15fBZnGgJY3-6BCARPSNnLrEkfxJArqgPe_LoGbPTOMfbF8Ror8wmhQxkmWprU-AF3",
        "mitarbeiter_55.html": "https://discordapp.com/api/webhooks/1495902013618126908/SSxBj4Gh8CzRDUFRLPWpC5JBFGPcG_2Jmhq4eiBt746_Y3DIVilVNSfPtYnWBtC8nUhe",
        "mitarbeiter_56.html": "https://discordapp.com/api/webhooks/1495902157524832366/ltRrdavfxZQ3cQp7hx9Oy39Rqd-nEFT72ggkCaMrwxeC-ziKWKcOzchIvZ5otZTGVJ6a",
        "mitarbeiter_57.html": "https://discordapp.com/api/webhooks/1495902213179052154/63F5RPmszPvpi_AOWDLzAEM-ZtVuup71SYKB7JFRjcZ_oBU8Xo4-YsaNFsUWzea5Fnzv",
        "mitarbeiter_58.html": "https://discordapp.com/api/webhooks/1495902263120629851/PbP4W9jZfSQku8iSZqgxKjMZK57DxmFzwiC0VKaU3U6iqH87wVBbTA0r-4kCp7QzrMTL",
        "mitarbeiter_59.html": "https://discordapp.com/api/webhooks/1495902309119430778/4HV6BcC6Cbj3WGtydG_4n8FdlJ3sRiW5XveP9LqkPhZ4ue0Tn0UYC9QHRerHl4KKwjJj",
        "mitarbeiter_60.html": "https://discordapp.com/api/webhooks/1495902360470425630/PqVNcYgVAxCEnKXHaMwBQQyIf0V8TxhrWPeImF1p-jIrbS7U88OWbXuZXLYGvQ-jWbT7",
        "mitarbeiter_61.html": "WEBHOOK_61",
        "mitarbeiter_62.html": "WEBHOOK_62",
        "mitarbeiter_63.html": "WEBHOOK_63",
        "mitarbeiter_64.html": "WEBHOOK_64",
        "mitarbeiter_65.html": "WEBHOOK_65",
        "mitarbeiter_66.html": "WEBHOOK_66",
        "mitarbeiter_67.html": "WEBHOOK_67",
        "mitarbeiter_68.html": "WEBHOOK_68",
        "mitarbeiter_69.html": "WEBHOOK_69",
        "mitarbeiter_70.html": "WEBHOOK_70",
        "mitarbeiter_200.html": "https://discordapp.com/api/webhooks/1495904966492160171/OxLM8YqverDKiT1rHvB_B-xjtIpMIYUHrPOgs1_ct0KDb2hKpF4BRFmb3xRSNZEJLKWq",
        "mitarbeiter_201.html": "https://discordapp.com/api/webhooks/1495905026420379830/AvAgcfiQrbgXqG4qnny-ekbXN9LwtFsrelVNHZBDY_VuX5Z309gPAhADv1EXhHzqgLIK",
        "mitarbeiter_202.html": "https://discordapp.com/api/webhooks/1495905069298876476/Rki8icWXt_wiypL-satuD-91lqEs4mFx-rk1vHhFGk12VCc63FrlYBkAX61U41P2wWok",
        "mitarbeiter_203.html": "https://discordapp.com/api/webhooks/1495905975834509504/r-XsgR2jeA7QlP93DKINTuIkR59niT9lKEovG2nctMPjot-yl7SkhsduXN7gjNjUtawx",
        "mitarbeiter_204.html": "https://discordapp.com/api/webhooks/1495906068109463572/HlL4aoJ0-UfzTqsfwWN08OuSfeg0f5FKFD3SjL-ymt1BB25EO8uekbRBmpDwi5nYSGos",
        "mitarbeiter_205.html": "https://discordapp.com/api/webhooks/1495906116683567105/sxhEwHFQqUFB-Nr9J-Gi6KLUQoQF0TaLnrLDIkwpnfXgcuVaBxzJ5aufmxmsUsvbZiAo",
        "mitarbeiter_206.html": "https://discordapp.com/api/webhooks/1495906163135614976/4270MV6yPdWhA9QLIcOLoYZIzaG3jVfBUYqNN9r2EWAzdL--U__NR_HLiPYEZmXDpohy",
        "mitarbeiter_207.html": "https://discordapp.com/api/webhooks/1495906211177173112/q5Xo3Zg1k6fqntF6-WBLZBbtod18CJAWfxE1MVzuLCYTtKDgmpdDpN3WOJmsMhSZw88-",
        "mitarbeiter_208.html": "https://discordapp.com/api/webhooks/1495906283705073816/nlIIF9aql1VwmZR18m2cT206ejBn_OfFy1umxs3AsgQPj0YqoabHVf3Im9luBjapcLUr",
        "mitarbeiter_209.html": "https://discordapp.com/api/webhooks/1495912557842661499/09miqibJiB1fMNib5ipQq83OmOKLZvzKnfG1rJ2kM9djhARpzgv-fzE3bPFx7O3uuNDa",
        "mitarbeiter_210.html": "https://discordapp.com/api/webhooks/1495912630693400707/pHjLXOewHHE597-d1pquFWPi8OSl8NQNZY4-phn7KqJsu2GBkbeGwnDxP-6RjltxiNXP",
        "mitarbeiter_211.html": "https://discordapp.com/api/webhooks/1495912686012207135/cUg-2pjXAYzP_wWYMGlt5PdtrXuqUNaYB7YGQDRtL3aqDbunNRA6TQEzNuRD-tXcktgr",
        "mitarbeiter_212.html": "https://discordapp.com/api/webhooks/1495912726604812499/aXl9ofnP5egRLapBLvbMxm6CLJHX6_iNi4zeN6jPv6pz7EoOc_geCrNbSw8SSO4fZFHK",
        "mitarbeiter_213.html": "WEBHOOK_213",
        "mitarbeiter_214.html": "WEBHOOK_214",
        "mitarbeiter_215.html": "WEBHOOK_215",
        "mitarbeiter_216.html": "WEBHOOK_216",
        "mitarbeiter_217.html": "WEBHOOK_217",
        "mitarbeiter_218.html": "WEBHOOK_218",
        "mitarbeiter_219.html": "WEBHOOK_219",
        "mitarbeiter_220.html": "WEBHOOK_220"
        
    };

    const currentPage = window.location.pathname.split("/").pop();
            const webhookURL = webhooks[currentPage];

            if (!webhookURL) {
                console.error("Kein Webhook für diese Seite gefunden!");
                return;
            }

            fetch(webhookURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    content: message
                })
            })
            .then(response => response.text())
            .then(data => console.log("Erfolg:", data))
            .catch(error => console.error("Fehler:", error));
        });
    }
});
